// Lee el contenido editado desde Supabase y lo mezcla con los textos por
// defecto. Cacheado con la etiqueta "content": al guardar en el editor, una
// Server Action llama a updateTag("content") y el cambio se ve al instante.
import { DEFAULTS, type SiteContent } from "./schema";

export const CONTENT_TAG = "content";

export async function getSiteContent(): Promise<SiteContent> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return { ...DEFAULTS };

  try {
    const res = await fetch(`${url}/rest/v1/site_content?select=key,value`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { tags: [CONTENT_TAG], revalidate: 3600 },
    });
    if (!res.ok) return { ...DEFAULTS };
    const rows = (await res.json()) as { key: string; value: string }[];
    const content: SiteContent = { ...DEFAULTS };
    for (const r of rows) if (r.key in DEFAULTS) content[r.key] = r.value;
    return content;
  } catch {
    // Si Supabase no responde, el sitio sigue en pie con los textos por defecto.
    return { ...DEFAULTS };
  }
}
