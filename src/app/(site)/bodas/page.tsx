import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BudgetCTA from "@/components/sections/BudgetCTA";
import { weddingDetails } from "@/lib/mock/seed";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "G-creatiON Weddings — Fotografía y cine de boda · Catalunya",
  description:
    "Fotografía y cine de boda natural, emocional y cinematográfico. Desde Camprodon a toda Catalunya y más allá. Pidan su presupuesto.",
  openGraph: {
    title: "G-creatiON Weddings",
    description: "No queremos que solo recuerden cómo se veía su boda. Queremos que puedan volver a sentir cómo se vivió.",
    images: [{ url: "/images/boda-beso-frente-bn.jpg", alt: "El novio besa la frente de la novia" }],
  },
};

// G-creatiON Weddings (Laly, 2026-10-12): menos texto, más imagen. Primero el
// blanco y negro (fotogramas), después el color (las historias). Textos del
// titular editables en /admin/contenido → "Página Weddings".
const STYLE = ["Natural", "Emocional", "Cinematográfico", "Espontáneo"];

// Portada: tres fotos que se funden despacio.
const HERO_SLIDES = [
  { src: "/images/boda-beso-frente-bn.jpg", alt: "El novio besa la frente de la novia", pos: "object-[center_35%]" },
  { src: "/images/boda-baile-pareja-bn.jpg", alt: "Los novios bailan y se sonríen", pos: "object-[center_30%]" },
  { src: "/images/boda-novio-perfume-bn.jpg", alt: "El novio se pone perfume antes de la ceremonia", pos: "object-[center_25%]" },
];

const MOMENTS = ["Las miradas", "Los nervios", "Las palabras", "Las risas", "Los abrazos", "La familia", "La fiesta", "Los pequeños detalles"];

const FRAMES = [
  { src: "/images/boda-novio-perfume-bn.jpg", alt: "El novio se pone perfume antes de la ceremonia", tall: true },
  { src: "/images/boda-novio-padrinos-bn.jpg", alt: "El novio con sus padrinos, todos de traje", tall: false },
  { src: "/images/boda-zapatos-bn.jpg", alt: "Los zapatos del novio en sus manos", tall: true },
  { src: "/images/boda-miradas-bn.jpg", alt: "Los novios se miran frente a frente", tall: false },
  { src: "/images/boda-anillos-bn.jpg", alt: "Las alianzas sobre la mesa junto al ramo", tall: false },
  { src: "/images/boda-invitado-risa-bn.jpg", alt: "Un invitado se ríe con gafas de sol durante la ceremonia", tall: false },
  { src: "/images/boda-baile-pareja-bn.jpg", alt: "Los novios bailan y se sonríen", tall: true },
  { src: "/images/boda-novio-ventana-bn.jpg", alt: "El novio junto a la ventana, mirando hacia abajo", tall: true },
];

export default async function BodasPage() {
  const content = await getSiteContent();
  const t = (k: string) => content[k] ?? "";
  const wa = t("contact.whatsapp").replace(/\D/g, "");

  return (
    <main>
      {/* Portada en blanco y negro */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-paper px-5 pb-16 pt-32 md:px-12 md:pb-20 lg:px-20">
        {HERO_SLIDES.map((h, i) => (
          <div
            key={h.src}
            className={`absolute inset-0 ${i === 0 ? "" : "slow-fade opacity-0"}`}
            style={i === 0 ? undefined : { animationDelay: `${i * 6 - 18}s` }}
          >
            <Image
              src={h.src}
              alt={h.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`kenburns object-cover ${h.pos}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="relative z-10 max-w-3xl text-[#f4f2ee]">
          <Reveal slow>
            <p className="slate mb-6 text-[#f4f2ee]/75">G-creatiON Weddings</p>
          </Reveal>
          <Reveal slow delay={0.1}>
            <h1 className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] font-normal">
              {t("bodas.hero.title")}
            </h1>
          </Reveal>
          <Reveal slow delay={0.2}>
            <p className="mt-4 font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-tight italic text-[#f4f2ee]/85">
              {t("bodas.hero.subtitle")}
            </p>
          </Reveal>
          <Reveal slow delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contacto?area=bodas&motivo=presupuesto"
                className="slate bg-[#f4f2ee] px-7 py-4 text-[#1f2420] transition-opacity duration-500 hover:opacity-90"
              >
                Pedir presupuesto
              </Link>
              <a href="#fotogramas" className="slate link-quiet text-[#f4f2ee]/80">
                Ver fotos
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cinta de momentos */}
      <div aria-hidden className="overflow-hidden border-y border-rose/50 bg-bg py-5 md:py-7">
        <div className="marquee">
          {[0, 1].map((k) => (
            <p key={k} className="flex shrink-0 items-center font-serif text-[clamp(1.6rem,3vw,2.6rem)] italic">
              {MOMENTS.map((m) => (
                <span key={m} className="flex items-center">
                  <span className="px-6 md:px-10">{m}</span>
                  <span className="text-rose">✦</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Blanco y negro (1) */}
      <section id="fotogramas" className="px-5 pt-20 pb-12 md:px-12 md:pt-28 lg:px-20">
        <div className="columns-2 gap-3 md:columns-3 md:gap-5 [&>*]:mb-3 md:[&>*]:mb-5">
          {FRAMES.slice(0, 3).map((f, i) => (
            <Reveal key={f.src} slow delay={(i % 3) * 0.08} className="break-inside-avoid">
              <div className={`relative overflow-hidden ${f.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Plano de cine con frase */}
      <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-5 text-center md:min-h-[80svh]">
        <Image src="/images/boda-miradas-bn.jpg" alt="Los novios se miran frente a frente" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <Reveal slow className="relative z-10 max-w-4xl text-[#f4f2ee]">
          <p className="font-serif text-[clamp(2.2rem,5.6vw,5rem)] leading-[1.05]">
            Lo que pasa demasiado rápido,
            <br />
            <em>lo guardamos nosotros.</em>
          </p>
        </Reveal>
      </section>

      {/* Blanco y negro (2) */}
      <section className="px-5 pt-12 pb-20 md:px-12 md:pb-28 lg:px-20">
        <div className="columns-2 gap-3 md:columns-3 md:gap-5 [&>*]:mb-3 md:[&>*]:mb-5">
          {FRAMES.slice(3).filter((f) => !f.src.includes("miradas")).map((f, i) => (
            <Reveal key={f.src} slow delay={(i % 3) * 0.08} className="break-inside-avoid">
              <div className={`relative overflow-hidden ${f.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Estilo, en una línea */}
      <section className="bg-paper px-5 py-16 text-bg md:px-12 md:py-20 lg:px-20">
        <Reveal slow>
          <p className="text-center font-serif text-[clamp(1.8rem,4vw,3.4rem)] leading-tight">
            {STYLE.map((s, i) => (
              <span key={s}>
                {s}
                {i < STYLE.length - 1 && <span className="text-rose"> + </span>}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      <BudgetCTA
        compact
        area="bodas"
        tone="wedding"
        kicker="¿Ya tienen fecha?"
        title={
          <>
            Cuéntennos su boda <em className="text-accent">y les enviamos una propuesta.</em>
          </>
        }
        text="Fecha, lugar y cómo se imaginan el día. Sin compromiso."
        whatsappText="Hola G-creatiON, nos casamos y queremos pedir un presupuesto. Fecha: … Lugar: …"
      />

      {/* Detalles en color */}
      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {weddingDetails.map((d, i) => (
            <Reveal key={d.src} slow delay={i * 0.05}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={d.src} alt={d.alt} fill sizes="(min-width: 768px) 16vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 · 15 · 30 años */}
      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <Reveal slow>
          <div className="grid grid-cols-3 border-y border-rose/60 text-center">
            {["5", "15", "30"].map((y) => (
              <div key={y} className="border-r border-rose/60 py-10 last:border-r-0 md:py-14">
                <p className="font-serif text-[clamp(3rem,9vw,7rem)] leading-none">{y}</p>
                <p className="slate mt-4 text-muted">años después</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic text-accent">
            Para que puedan volver a ese día.
          </p>
        </Reveal>
      </section>

      {/* Cierre */}
      <section className="bg-surface px-5 py-28 text-center md:px-12 md:py-36 lg:px-20">
        <Reveal slow>
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.05]">
            ¿Se casan? <em className="text-accent">Queremos ser parte de ese día.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contacto?area=bodas&motivo=presupuesto"
              className="slate inline-flex bg-accent px-8 py-4 text-bg transition-opacity duration-500 hover:opacity-90"
            >
              Pedir presupuesto
            </Link>
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent("Hola G-creatiON, nos casamos y queremos pedir un presupuesto.")}`}
              target="_blank"
              rel="noreferrer"
              className="slate inline-flex border border-fg/30 px-8 py-4 transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
