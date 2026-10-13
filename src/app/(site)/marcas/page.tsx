import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BudgetCTA from "@/components/sections/BudgetCTA";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "G-creatiON Marcas — Contenido, reels, webs y redes para marcas · Camprodon",
  description:
    "Video, reels, fotografía, diseño web, redes y métricas de Instagram para marcas y negocios. A'BRASA'M, Els Ocells, Visit Camprodon y más. Pide presupuesto.",
  openGraph: {
    title: "G-creatiON Marcas",
    description: "Que tu marca se vea. Y se recuerde.",
    images: [{ url: "/images/guille-camara.jpg", alt: "Guille grabando con la cámara" }],
  },
};

// Universo Marcas (Laly, 2026-10-12): dar visibilidad a marcas y negocios.
// Papel claro (`.theme-brand`), tinta negra y naranja. Poco texto; las marcas
// reales en grande. Editable en /admin/contenido → "Página Marcas".
const SERVICES = [
  { name: "Video & reels", line: "Piezas pensadas para dónde se van a ver." },
  { name: "Fotografía", line: "Producto, espacios, equipo y oficio." },
  { name: "Diseño web", line: "Webs claras, rápidas y con tu contenido dentro." },
  { name: "Redes & métricas", line: "Instagram con intención, y números para decidir." },
  { name: "Diseño gráfico", line: "Piezas, campañas y tarjetas que se recuerdan." },
];

export default async function MarcasPage() {
  const content = await getSiteContent();
  const t = (k: string) => content[k] ?? "";
  const lines = (k: string) =>
    t(k)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  const title = lines("marcas.hero.title");
  const brands = lines("marcas.brands").map((l) => {
    const [name, ...rest] = l.split(/\s+[—–-]\s+/);
    return { name: name.trim(), detail: rest.join(" ").trim() };
  });

  return (
    <main>
      {/* Portada */}
      <section className="px-5 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40 lg:px-20">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <p className="slate mb-8 flex items-center gap-3 text-accent">
                <span className="rec" /> G-creatiON Marcas
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="poster text-[clamp(3.2rem,9vw,8.4rem)]">
                {title.map((l, i) => (
                  <span key={l} className={`block ${i === title.length - 1 ? "text-accent" : ""}`}>
                    {l}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-xl leading-relaxed text-fg/80">{t("marcas.hero.sub")}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contacto?area=marcas&motivo=presupuesto"
                  className="slate group inline-flex items-center gap-3 bg-fg px-7 py-4 text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Pedir presupuesto
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a href="#marcas" className="slate link-quiet">
                  Ver marcas
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/guille-camara.jpg"
                alt="Guille grabando con la cámara"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <ol className="border-t border-fg/15">
          {SERVICES.map((s, i) => (
            <li key={s.name} className="border-b border-fg/15">
              <Reveal delay={i * 0.04}>
                <div className="grid items-baseline gap-2 py-6 md:grid-cols-12 md:gap-8 md:py-8">
                  <span className="slate text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <p className="poster text-[clamp(2rem,4.4vw,3.8rem)] md:col-span-6">{s.name}</p>
                  <p className="text-muted md:col-span-5">{s.line}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Marcas */}
      <section id="marcas" className="bg-fg px-5 py-24 text-bg md:px-12 md:py-32 lg:px-20">
        <Reveal>
          <p className="slate mb-10 text-bg/60">Marcas con las que trabajamos</p>
        </Reveal>
        <ul>
          {brands.map((b, i) => (
            <li key={b.name} className="group border-t border-bg/15 last:border-b">
              <Reveal delay={i * 0.04}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5 md:py-6">
                  <p className="poster text-[clamp(2.2rem,6vw,5.4rem)] transition-colors duration-300 group-hover:text-accent">
                    {b.name}
                  </p>
                  {b.detail && <p className="slate text-bg/60">{b.detail}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Cómo cobramos, en una línea */}
      <section className="px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <Reveal>
          <p className="poster max-w-5xl text-[clamp(2.2rem,6vw,5.4rem)]">
            No vendemos horas. <span className="text-accent">Producimos historias.</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-lg text-lg text-muted">
            Y la web también la hacemos nosotros. Esta, por ejemplo.
          </p>
        </Reveal>
      </section>

      <BudgetCTA
        area="marcas"
        tone="sport"
        kicker="Pide presupuesto"
        title="¿Qué tiene que contar tu marca?"
        text="Dinos qué haces y qué necesitas. Te enviamos una propuesta sin compromiso."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para contenido de mi marca. Marca: … Qué necesito: …"
      />
    </main>
  );
}
