"use client";

// Cliente de Supabase para el navegador. Usa la clave PUBLICABLE: todo lo que
// puede hacer está limitado por las reglas RLS de supabase/migrations.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
