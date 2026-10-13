import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Wordmark from "@/components/ui/Wordmark";
import BudgetCTA from "@/components/sections/BudgetCTA";

export const metadata: Metadata = {
  title: "G-creatiON Diseño & Web — Páginas web, identidad y diseño gráfico · Camprodon",
  description:
    "Páginas web, identidad visual, piezas gráficas y presencia digital para negocios. Pide presupuesto.",
  openGraph: {
    title: "G-creatiON Diseño & Web",
    description: "Tu negocio, bien presentado.",
    images: [{ url: "/images/laly-retrato.jpg", alt: "Laly, de G-creatiON" }],
  },
};

// Universo Diseño & Web (Laly, 2026-10-13): el área de Laly. Cuadrícula de
// plano sobre negro (`.theme-design`). Poco texto, castellano neutro.
const SERVICES = [
  { name: "Páginas web", line: "Claras, rápidas y con tu contenido dentro." },
  { name: "Identidad visual", line: "Logo, colores y tipografías que se reconocen." },
  { name: "Piezas gráficas", line: "Flyers, carteles, tarjetas y campañas." },
  { name: "Presencia digital", line: "Google, redes y perfiles en orden." },
  { name: "Métricas de Instagram", line: "Qué funciona, qué no y qué hacer después." },
];

const STEPS = ["Nos cuentas tu negocio.", "Diseñamos y te lo mostramos.", "Lo publicamos y lo dejamos funcionando."];

export default function DisenoWebPage() {
  return (
    <main>
      {/* Portada */}
      <section className="px-5 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40 lg:px-20">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <p className="slate mb-8 flex items-center gap-3 text-accent">
                <span className="rec" /> G-creatiON Diseño & Web
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="poster text-[clamp(3.2rem,9vw,8.4rem)]">
                Tu negocio,
                <br />
                <span className="text-accent">bien presentado.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-xl leading-relaxed text-fg/80">
                Páginas web, identidad visual y piezas gráficas. Diseñadas por Laly.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contacto?area=web&motivo=presupuesto"
                  className="slate group inline-flex items-center gap-3 bg-accent px-7 py-4 text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Pedir presupuesto
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a href="#ejemplo" className="slate link-quiet">
                  Ver un ejemplo
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:col-span-5">
            <figure>
              <div className="viewfinder relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/laly-retrato.jpg"
                  alt="Laly, de G-creatiON"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="slate mt-3 text-muted">Laly · Diseño y desarrollo web</figcaption>
            </figure>
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

      {/* Ejemplo: esta misma web */}
      <section id="ejemplo" className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <Reveal>
          <p className="slate mb-6 text-muted">Un ejemplo</p>
          <p className="poster mb-10 text-[clamp(2.2rem,5vw,4.4rem)]">
            Esta web <span className="text-accent">también es nuestra.</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link href="/" className="group block">
            {/* Marco de navegador */}
            <div className="overflow-hidden border border-fg/20 bg-surface shadow-2xl">
              <div className="flex items-center gap-2 border-b border-fg/15 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-fg/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/25" />
                <span className="slate ml-4 truncate text-muted">g-creation · inicio</span>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/sport-btt-grupo-montana.jpg"
                  alt="Portada de la web de G-creatiON"
                  fill
                  sizes="(min-width: 768px) 80vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/55" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                  <p className="text-2xl md:text-4xl">
                    <Wordmark />
                  </p>
                  <p className="poster mt-4 max-w-[14ch] text-[clamp(1.6rem,4.4vw,4rem)]">
                    Creamos imágenes que hacen que las historias <span className="text-accent">sigan vivas.</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Cómo trabajamos, en 3 pasos */}
      <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <ol className="grid gap-px bg-fg/15 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s} className="bg-bg p-6 md:p-10">
              <Reveal delay={i * 0.06}>
                <p className="poster text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-xl leading-snug">{s}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <BudgetCTA
        area="web"
        tone="sport"
        kicker="Pide presupuesto"
        title="¿Tu negocio necesita una web?"
        text="Cuéntanos qué haces y qué necesitas. Te enviamos una propuesta sin compromiso."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para una web / diseño. Mi negocio: … Qué necesito: …"
      />
    </main>
  );
}
