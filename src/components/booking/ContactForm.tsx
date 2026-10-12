"use client";

// Variante `profesional` de modulos/04-accion.md, adaptada a una productora:
// en vez de "motivo de consulta" genérico, un brief corto del proyecto (área,
// formato, cuándo, dónde). Se guarda en el mock (aparece en /admin) y, al
// confirmar, ofrece mandar el mismo brief por WhatsApp — ese canal sí es real.
// Sin promesas de tiempo de respuesta: G-creatiON no dio ninguna.
import { useState } from "react";
import { submitInquiry } from "@/lib/inquiries";
import { areas, formats } from "@/lib/mock/seed";
import { useContent } from "@/components/content/ContentProvider";

type Contact = "mail" | "telefono" | "whatsapp";
const CONTACT_LABEL: Record<Contact, string> = { mail: "Email", telefono: "Teléfono", whatsapp: "WhatsApp" };

export default function ContactForm({ initialArea }: { initialArea?: string }) {
  const C = useContent().contact;
  const startArea = areas.find((a) => a.id === (initialArea ?? "marcas")) ?? areas[0];
  const [form, setForm] = useState({
    areaId: startArea.id,
    projectFormat: startArea.id === "bodas" ? "Bodas" : formats[0].name,
    eventDate: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "whatsapp" as Contact,
    website: "", // honeypot
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const area = areas.find((a) => a.id === form.areaId)!;
  const isWedding = form.areaId === "bodas";
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: un humano nunca completa este campo oculto.
    if (form.website) {
      setSent(true);
      return;
    }
    setSending(true);
    setFailed(false);
    const { ok } = await submitInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      reason: area.name,
      projectFormat: form.projectFormat,
      eventDate: form.eventDate,
      location: form.location,
      preferredContact: form.preferredContact,
    });
    setSending(false);
    // Si falla el guardado, el visitante igual puede mandarlo por WhatsApp/email.
    if (ok) setSent(true);
    else setFailed(true);
  };

  const brief = [
    `Hola G-creatiON, soy ${form.name}.`,
    `Área: ${area.name} · Formato: ${form.projectFormat}`,
    form.eventDate ? `Cuándo: ${form.eventDate}` : null,
    form.location ? `Dónde: ${form.location}` : null,
    "",
    form.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  if (sent) {
    return (
      <div className="border border-fg/15 bg-surface p-8 md:p-12">
        <p className="slate mb-6 flex items-center gap-3 text-accent">
          <span className="rec" /> Recibido
        </p>
        <h2 className="poster text-[clamp(2.2rem,5vw,3.6rem)]">Gracias, {form.name.split(" ")[0] || "de verdad"}.</h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted">
          Tenemos tu idea. Te escribimos por {CONTACT_LABEL[form.preferredContact].toLowerCase()} para hablarla.
          Si prefieres adelantarte, mándanos el mismo resumen:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(brief)}`}
            target="_blank"
            rel="noreferrer"
            className="slate bg-accent px-6 py-4 text-bg"
          >
            Enviar por WhatsApp
          </a>
          <a
            href={`mailto:${C.email}?subject=${encodeURIComponent(`Proyecto — ${area.name}`)}&body=${encodeURIComponent(brief)}`}
            className="slate border border-fg/30 px-6 py-4"
          >
            Enviar por email
          </a>
        </div>
      </div>
    );
  }

  const input =
    "w-full border-b border-fg/25 bg-transparent py-3 text-base text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent";
  const label = "slate mb-2 block text-muted";
  const chip = (active: boolean) =>
    `slate border px-4 py-3 text-left transition-colors ${
      active ? "border-accent bg-accent text-bg" : "border-fg/20 text-fg hover:border-fg/60"
    }`;

  return (
    <form onSubmit={submit} className="space-y-10">
      <fieldset>
        <legend className={label}>¿Qué quieres contar?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {areas.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={form.areaId === a.id}
              onClick={() => {
                set("areaId", a.id);
                if (a.id === "bodas") set("projectFormat", "Bodas");
                else if (form.projectFormat === "Bodas") set("projectFormat", formats[0].name);
              }}
              className={chip(form.areaId === a.id)}
            >
              <span className="mr-2 opacity-60">{a.number}</span>
              {a.name}
            </button>
          ))}
        </div>
      </fieldset>

      {!isWedding && (
        <label className="block">
          <span className={label}>Formato</span>
          <select value={form.projectFormat} onChange={(e) => set("projectFormat", e.target.value)} className={input}>
            {formats
              .filter((f) => f.name !== "Bodas")
              .map((f) => (
                <option key={f.name} value={f.name} className="bg-bg">
                  {f.name} — {f.detail}
                </option>
              ))}
          </select>
        </label>
      )}

      <div className="grid gap-10 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{isWedding ? "Fecha de la boda" : "¿Cuándo?"}</span>
          <input
            type="text"
            value={form.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
            placeholder={isWedding ? "Ej. junio 2027" : "Fecha o temporada"}
            className={input}
          />
        </label>
        <label className="block">
          <span className={label}>{isWedding ? "Lugar" : "¿Dónde?"}</span>
          <input
            type="text"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Pueblo, ciudad o espacio"
            className={input}
          />
        </label>
      </div>

      <label className="block">
        <span className={label}>{isWedding ? "Contadnos vuestra boda" : "Cuéntanos la idea"}</span>
        <textarea
          rows={4}
          required
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={
            isWedding
              ? "Cómo os imagináis el día, qué no queréis perderos…"
              : "Qué necesitas comunicar, para quién y con qué objetivo."
          }
          className={input}
        />
      </label>

      <div className="grid gap-10 sm:grid-cols-3">
        <label className="block sm:col-span-3">
          <span className={label}>Nombre</span>
          <input type="text" required autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className={input} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Email</span>
          <input type="email" required autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={input} />
        </label>
        <label className="block">
          <span className={label}>Teléfono</span>
          <input type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={input} />
        </label>
      </div>

      {/* Honeypot — invisible para personas */}
      <label aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        Web
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
      </label>

      <fieldset>
        <legend className={label}>¿Cómo prefieres que te contactemos?</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CONTACT_LABEL) as Contact[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={form.preferredContact === c}
              onClick={() => set("preferredContact", c)}
              className={chip(form.preferredContact === c)}
            >
              {CONTACT_LABEL[c]}
            </button>
          ))}
        </div>
      </fieldset>

      {failed && (
        <p className="text-sm text-accent">
          No pudimos enviarlo. Escríbenos directamente por{" "}
          <a href={`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(brief)}`} target="_blank" rel="noreferrer" className="underline">
            WhatsApp
          </a>{" "}
          o a{" "}
          <a href={`mailto:${C.email}`} className="underline">
            {C.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="slate group inline-flex items-center gap-3 bg-accent px-8 py-5 text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {sending ? "Enviando…" : "Enviar"}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
