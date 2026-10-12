"use server";

// Tras guardar en el editor, invalida la caché del contenido para que la web
// muestre el cambio en la siguiente visita (segundos, sin redeploy).
// Solo un admin puede dispararlo.
import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TAG } from "@/lib/content/get";

export async function refreshSite(): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) return { ok: false };
  updateTag(CONTENT_TAG);
  return { ok: true };
}
