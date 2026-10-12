import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BudgetCTA from "@/components/sections/BudgetCTA";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "G-creatiON Eventos — Fotografía y vídeo de conciertos y eventos · Catalunya",
  description:
    "Conciertos, actos institucionales, eventos públicos y fiestas: fotografía, vídeo y cobertura en directo. Pide presupuesto.",
  openGraph: {
    title: "G-creatiON Eventos",
    description: "Pasa una vez. Lo contamos para siempre.",
    images: [{ url: "/images/evento-banda-neon-publico.jpg", alt: "Concierto con el público delante del escenario" }],
  },
};

// Universo Eventos (Laly, 2026-10-12): escenario y noche (`.theme-live`),
// poco texto y mucha foto. Fotos reales de conciertos de G-creatiON.
const PHOTOS = [
  { src: "/images/evento-cantante-escenario.jpg", alt: "Cantante en el escenario con focos detrás", tall: true },
  { src: "/images/evento-bajista-rock.jpg", alt: "Bajista cantando entre humo y luces rojas", tall: false },
  { src: "/images/evento-saxo.jpg", alt: "Detalle de un saxofón bajo luz violeta", tall: false },
  { src: "/images/evento-duo-voces.jpg", alt: "Dos cantantes comparten micrófono", tall: false },
  { src: "/images/evento-silueta.jpg", alt: "Silueta de un músico con gorra a contraluz", tall: true },
  { src: "/images/evento-guitarrista-voz.jpg", alt: "Guitarrista cantando con los ojos cerrados", tall: false },
  { src: "/images/evento-cantante-gafas.jpg", alt: "Cantante con gafas de sol y micrófono", tall: false },
  { src: "/images/evento-guitarra-acustica.jpg", alt: "Músico con guitarra acústica entre humo", tall: false },
  { src: "/images/evento-bajista-rosa.jpg", alt: "Bajista bajo luz azul", tall: false },
  { src: "/images/evento-guitarras-duo.jpg", alt: "Dos guitarristas tocando juntos", tall: false },
  { src: "/images/evento-cantante-banda.jpg", alt: "Cantante y guitarrista bajo los focos", tall: false },
];

export default async function EventosPage() {
  const content = await getSiteContent();
  const t = (k: string) => content[k] ?? "";
  const lines = (k: string) =>
    t(k)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  const title = lines("eventos.hero.title");
  const clients = lines("eventos.clients").map((l) => {
    const [name, ...rest] = l.split(/\s+[—–-]\s+/);
    return { name: name.trim(), detail: rest.join(" ").trim() };
  });
  const types = lines("eventos.types").map((l) => {
    const [name, ...rest] = l.split(/\s*\|\s*/);
    return { name: name.trim(), detail: rest.join(" ").trim() };
  });

  return (
    <main>
      {/* Portada */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-14 pt-32 md:px-12 md:pb-20 lg:px-20">
        <Image
          src="/images/evento-banda-neon-publico.jpg"
          alt="Concierto con el público delante del escenario"
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/10" />
        <div className="relative z-10">
          <Reveal>
            <p className="slate mb-8 flex items-center gap-3 text-accent">
              <span className="rec" /> En directo
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="poster text-[clamp(3.2rem,11vw,10rem)]">
              {title.map((l, i) => (
                <span key={l} className={`block ${i === title.length - 1 ? "text-accent" : ""}`}>
                  {l}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-fg/20 pt-8">
              <p className="text-xl text-fg/85">{t("eventos.hero.sub")}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contacto?area=eventos&motivo=presupuesto"
                  className="slate group inline-flex items-center gap-3 bg-accent px-7 py-4 text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Pedir presupuesto
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a href="#fotos" className="slate link-quiet">
                  Ver fotos
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tipos de evento, en corto */}
      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <ul className="grid gap-px bg-fg/15 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((ty, i) => (
            <li key={ty.name} className="bg-bg p-6 md:p-8">
              <Reveal delay={i * 0.05}>
                <p className="slate text-accent">{String(i + 1).padStart(2, "0")}</p>
                <p className="poster mt-4 text-[clamp(1.6rem,2.6vw,2.2rem)]">{ty.name}</p>
                {ty.detail && <p className="mt-3 text-muted">{ty.detail}</p>}
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Fotos */}
      <section id="fotos" className="px-5 pb-24 md:px-12 md:pb-32 lg:px-20">
        <div className="columns-2 gap-3 md:columns-3 md:gap-5 [&>*]:mb-3 md:[&>*]:mb-5">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.06} className="break-inside-avoid">
              <div className={`viewfinder relative overflow-hidden ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Clientes */}
      {clients.length > 0 && (
        <section className="border-t border-fg/15 px-5 py-20 md:px-12 md:py-24 lg:px-20">
          <Reveal>
            <p className="slate mb-6 text-muted">Han confiado en nosotros</p>
            <ul className="divide-y divide-fg/15 border-y border-fg/15">
              {clients.map((c) => (
                <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-6">
                  <p className="poster text-[clamp(1.8rem,3.2vw,2.6rem)]">{c.name}</p>
                  {c.detail && <p className="text-muted">{c.detail}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* En una línea */}
      <section className="px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <Reveal>
          <p className="poster max-w-5xl text-[clamp(2rem,5vw,4.4rem)]">
            Stories mientras pasa. <span className="text-accent">Resumen cuando termina.</span>
          </p>
        </Reveal>
      </section>

      <BudgetCTA
        area="eventos"
        tone="sport"
        kicker="Pide presupuesto"
        title="¿Qué evento tenemos que contar?"
        text="Dinos qué es, cuándo y dónde. Te enviamos una propuesta sin compromiso."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para un evento. Tipo: … Fecha: … Lugar: …"
      />
    </main>
  );
}
