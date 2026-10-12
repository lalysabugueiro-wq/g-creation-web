-- G-creatiON — sistema real (modulos/08a-sistema-real.md + 09-cms.md).
-- Proyecto single-tenant: exclusivo de este negocio, sin business_slug.
-- Idempotente: se puede correr dos veces sin romper nada.

-- ------------------------------------------------------------------ admins
-- Quién puede editar el sitio y leer las consultas. Se da de alta a mano
-- (Auth tiene las altas públicas desactivadas).
create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists "admins se ven a sí mismos" on public.admins;
create policy "admins se ven a sí mismos" on public.admins
  for select to authenticated using (public.is_admin());

-- ---------------------------------------------------------- contenido (CMS)
-- Una fila por campo editable. Lo que no tiene fila usa el texto por defecto
-- del código (src/lib/content/schema.ts): nunca se pisa lo ya editado.
create table if not exists public.site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by text
);
alter table public.site_content enable row level security;

drop policy if exists "contenido público" on public.site_content;
create policy "contenido público" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "solo admins editan" on public.site_content;
create policy "solo admins editan" on public.site_content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Historial para "Deshacer": cada guardado deja el valor anterior acá.
create table if not exists public.site_content_history (
  id bigint generated always as identity primary key,
  key text not null,
  value text,
  created_at timestamptz not null default now(),
  created_by text
);
create index if not exists site_content_history_key_idx on public.site_content_history (key, created_at desc);
alter table public.site_content_history enable row level security;

drop policy if exists "historial solo admins" on public.site_content_history;
create policy "historial solo admins" on public.site_content_history
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------- consultas
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  phone text not null check (char_length(phone) between 3 and 60),
  message text not null check (char_length(message) between 1 and 5000),
  reason text,
  project_format text,
  event_date text,
  location text,
  preferred_contact text check (preferred_contact in ('mail', 'telefono', 'whatsapp')),
  status text not null default 'nueva' check (status in ('nueva', 'respondida', 'cerrada'))
);
alter table public.inquiries enable row level security;

-- El formulario público solo puede INSERTAR, y siempre como "nueva".
drop policy if exists "cualquiera envía consultas" on public.inquiries;
create policy "cualquiera envía consultas" on public.inquiries
  for insert to anon, authenticated with check (status = 'nueva');

drop policy if exists "solo admins leen consultas" on public.inquiries;
create policy "solo admins leen consultas" on public.inquiries
  for select to authenticated using (public.is_admin());

drop policy if exists "solo admins actualizan consultas" on public.inquiries;
create policy "solo admins actualizan consultas" on public.inquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------ imágenes
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/webp', 'image/jpeg', 'image/png'];

drop policy if exists "imágenes públicas" on storage.objects;
create policy "imágenes públicas" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-images');

drop policy if exists "solo admins suben imágenes" on storage.objects;
create policy "solo admins suben imágenes" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "solo admins borran imágenes" on storage.objects;
create policy "solo admins borran imágenes" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images' and public.is_admin());
