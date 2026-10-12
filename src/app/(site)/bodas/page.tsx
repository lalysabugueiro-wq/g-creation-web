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
    "Fotografía y cine de boda natural, emocional y cinematográfico. Desde Camprodon a toda Catalunya y más allá. Pedid presupuesto.",
  openGraph: {
    title: "G-creatiON Weddings",
    description: "No queremos que recordéis solo cómo se veía vuestra boda. Queremos que podáis volver a sentir cómo se vivió.",
    images: [{ url: "/images/boda-beso-frente-bn.jpg", alt: "El novio besa la frente de la novia" }],
  },
};

// G-creatiON Weddings (Laly, 2026-10-12): menos texto, más imagen. Primero el
// blanco y negro (fotogramas), después el color (las historias). Textos del
// titular editables en /admin/contenido → "Página Weddings".
const STYLE = ["Natural", "Emocional", "Cinematográfico", "Espontáneo"];

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
        <Image
          src="/images/boda-beso-frente-bn.jpg"
          alt="El novio besa la frente de la novia"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
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

      {/* Blanco y negro */}
      <section id="fotogramas" className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="columns-2 gap-3 md:columns-3 md:gap-5 [&>*]:mb-3 md:[&>*]:mb-5">
          {FRAMES.map((f, i) => (
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
        kicker="¿Ya tenéis fecha?"
        title={
          <>
            Contadnos vuestra boda <em className="text-accent">y os enviamos una propuesta.</em>
          </>
        }
        text="Fecha, lugar y cómo os imagináis el día. Sin compromiso."
        whatsappText="Hola G-creatiON, nos casamos y queremos pedir presupuesto. Fecha: … Lugar: …"
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

      {/* Cierre */}
      <section className="bg-surface px-5 py-28 text-center md:px-12 md:py-36 lg:px-20">
        <Reveal slow>
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.05]">
            ¿Os casáis? <em className="text-accent">Queremos ser parte de ese día.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contacto?area=bodas&motivo=presupuesto"
              className="slate inline-flex bg-accent px-8 py-4 text-bg transition-opacity duration-500 hover:opacity-90"
            >
              Pedir presupuesto
            </Link>
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent("Hola G-creatiON, nos casamos y queremos pedir presupuesto.")}`}
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
