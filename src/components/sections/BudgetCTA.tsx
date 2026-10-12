"use client";

// Llamado a la acción para pedir presupuesto (Laly, 2026-10-12): cada universo
// cierra (y a veces corta a mitad de página) con dos salidas claras — el
// formulario ya filtrado por universo, o WhatsApp con el mensaje escrito.
// `tone` adapta la piel: "wedding" (serif, eucalipto) o "sport" (naranja).
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/components/content/ContentProvider";

type Props = {
  area: "bodas" | "sport" | "marcas" | "turismo" | "eventos" | "web";
  tone: "wedding" | "sport";
  kicker: string;
  title: React.ReactNode;
  text: string;
  whatsappText: string;
  compact?: boolean;
};

export default function BudgetCTA({ area, tone, kicker, title, text, whatsappText, compact = false }: Props) {
  const C = useContent().contact;
  const formHref = `/contacto?area=${area}&motivo=presupuesto`;
  const waHref = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  if (tone === "wedding") {
    return (
      <section className={`bg-surface px-5 md:px-12 lg:px-20 ${compact ? "py-16 md:py-20" : "py-24 md:py-32"}`}>
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <Reveal slow className="md:col-span-7">
            <p className="slate mb-5 text-accent">{kicker}</p>
            <h2 className="font-serif text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.06]">{title}</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">{text}</p>
          </Reveal>
          <Reveal slow delay={0.15} className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Link
              href={formHref}
              className="slate bg-accent px-7 py-4 text-bg transition-opacity duration-500 hover:opacity-90"
            >
              Pedir presupuesto
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="slate border border-fg/30 px-7 py-4 transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              Escribir por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`grain relative overflow-hidden bg-accent px-5 text-bg md:px-12 lg:px-20 ${
        compact ? "py-16 md:py-20" : "py-24 md:py-36"
      }`}
    >
      <div className="relative z-10 grid items-end gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-8">
          <p className="slate mb-6 flex items-center gap-3">
            <span className="rec bg-bg!" /> {kicker}
          </p>
          <h2 className={`poster ${compact ? "text-[clamp(2.4rem,6vw,5rem)]" : "text-[clamp(3rem,9vw,8rem)]"}`}>{title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bg/85">{text}</p>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Link
            href={formHref}
            className="slate group inline-flex items-center gap-3 bg-bg px-7 py-4 text-fg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Pedir presupuesto
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="slate border border-bg/40 px-7 py-4 transition-colors hover:border-bg"
          >
            WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
