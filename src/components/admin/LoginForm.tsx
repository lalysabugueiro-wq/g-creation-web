"use client";

// Login real con Supabase Auth (modulos/08a-sistema-real.md): enlace mágico
// por email, sin contraseñas. Las altas públicas están desactivadas: solo
// entra quien ya está dado de alta (y además en la tabla admins para editar).
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();

  // Algunos enlaces de acceso (p. ej. generados desde el panel de Supabase)
  // llegan con la sesión en el #hash en vez de con ?code: se acepta igual.
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    if (!access_token || !refresh_token) return;
    createClient()
      .auth.setSession({ access_token, refresh_token })
      .then(({ error }) => {
        if (!error) {
          router.replace("/admin");
          router.refresh();
        }
      });
  }, [router]);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    params.get("error") ? "error" : "idle"
  );
  const [message, setMessage] = useState(
    params.get("error") ? "El enlace caducó o ya se usó. Pide uno nuevo." : ""
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
    if (error) {
      setState("error");
      setMessage(
        error.status === 429
          ? "Has pedido varios enlaces seguidos. Espera unos minutos y vuelve a probar."
          : "No pudimos enviar el enlace. Revisa que el email sea el de acceso al panel."
      );
      return;
    }
    setState("sent");
  };

  if (state === "sent") {
    return (
      <div className="border border-accent/60 bg-accent/10 px-6 py-6">
        <p className="slate text-accent">Revisa tu correo</p>
        <p className="mt-3 leading-relaxed">
          Te enviamos un enlace a <strong>{email}</strong>. Ábrelo <strong>en este mismo navegador</strong> y entrarás
          directo al panel.
        </p>
        <p className="mt-3 text-sm text-muted">Si no lo ves en unos minutos, mira en Spam o Promociones.</p>
        <button type="button" onClick={() => setState("idle")} className="slate mt-6 text-muted underline underline-offset-4">
          Usar otro email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <label className="block">
        <span className="slate mb-2 block text-muted">Tu email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-fg/25 bg-transparent py-3 text-base outline-none transition-colors focus:border-accent"
        />
      </label>
      {state === "error" && <p className="text-sm text-accent">{message}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="slate w-full bg-accent py-4 text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? "Enviando…" : "Enviarme el enlace de acceso"}
      </button>
      <p className="text-center text-xs text-muted">Sin contraseñas: te llega un enlace al correo para entrar.</p>
    </form>
  );
}
