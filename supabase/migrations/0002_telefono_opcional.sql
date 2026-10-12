-- Octubre 2026: el teléfono pasa a ser opcional en el formulario de contacto.
-- Hasta correr esto en Supabase (SQL Editor), el formulario guarda
-- "No indicado" cuando la persona no deja teléfono. Idempotente.
alter table public.inquiries alter column phone drop not null;
alter table public.inquiries drop constraint if exists inquiries_phone_check;
alter table public.inquiries add constraint inquiries_phone_check
  check (phone is null or char_length(phone) between 3 and 60);
