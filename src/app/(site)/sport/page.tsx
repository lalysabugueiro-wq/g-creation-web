import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BudgetCTA from "@/components/sections/BudgetCTA";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "G-creatiON Sport — Fotografía y vídeo deportivo · Pirineo y Catalunya",
  description:
    "Fotografía, vídeo, dron y cobertura en directo para clubes, torneos y carreras: golf, BTT, patinaje, básquet, fútbol, trail y obstáculos. Pide presupuesto.",
  openGraph: {
    title: "G-creatiON Sport",
    description: "El esfuerzo también merece ser contado.",
    images: [{ url: "/images/sport-celebracion-equipo.jpg", alt: "Equipo celebrando tras una carrera de obstáculos" }],
  },
};

// Universo Sport (Laly, 2026-10-12): todos los deportes, no solo montaña.
// Identidad: el naranja del estudio "a sangre", ritmo de competición y Anton
// grande. Textos y fotos de portada/galería editables en /admin/contenido →
// "Página Sport". Las disciplinas usan fotos reales de G-creatiON.
const DISCIPLINES = [
  { name: "Golf", src: "/images/sport-golf-swing.jpg", alt: "Golfista en pleno swing con el Pirineo detrás" },
  { name: "BTT & bici", src: "/images/sport-btt-sendero.jpg", alt: "Ciclista de BTT bajando por un sendero entre árboles" },
  { name: "Patinaje", src: "/images/sport-patinaje-pareja.jpg", alt: "Dos patinadoras haciendo una figura en el pabellón" },
  { name: "Básquet", src: "/images/sport-basquet.jpg", alt: "Jugador sujetando un balón de básquet" },
  { name: "Fútbol", src: "/images/sport-futbol.jpg", alt: "Detalle de botas y balón en un partido de fútbol" },
  { name: "Carreras & obstáculos", src: "/images/sport-obstaculos.jpg", alt: "Corredor colgado de las anillas en una carrera de obstáculos" },
];

export default async function SportPage() {
  const content = await getSiteContent();
  const t = (k: string) => content[k] ?? "";
  const lines = (k: string) =>
    t(k)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

  const title = lines("sport.hero.title");
  const [s1, s2] = lines("sport.statement");
  const moments = lines("sport.moments");
  const audiences = lines("sport.for");
  const stories = lines("sport.stories").map((l) => {
    const [name, ...rest] = l.split(/\s+[—–-]\s+/);
    return { name: name.trim(), detail: rest.join(" ").trim() };
  });
  const heroImage = t("sport.hero.image");
  const gallery = [1, 2, 3, 4, 5].map((n) => t(`sport.gallery.${n}`)).filter(Boolean);

  return (
    <main>
      {/* Portada */}
      <section
        className={`grain relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-14 pt-32 md:px-12 md:pb-20 lg:px-20 ${
          heroImage ? "bg-bg" : "bg-accent text-bg"
        }`}
      >
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt="Equipo celebrando al terminar la prueba"
              fill
              priority
              sizes="100vw"
              className="kenburns object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
          </>
        )}
        <div className="relative z-10">
          <Reveal>
            <p className={`slate mb-8 flex items-center gap-3 ${heroImage ? "text-accent" : ""}`}>
              <span className={`rec ${heroImage ? "" : "bg-bg!"}`} /> G-creatiON Sport
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="poster text-[clamp(3.2rem,11vw,10rem)]">
              {title.map((l, i) => (
                <span key={l} className={`block ${i === title.length - 1 && heroImage ? "text-accent" : ""}`}>
                  {l}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className={`mt-10 grid gap-8 border-t pt-8 md:grid-cols-12 md:items-end ${
                heroImage ? "border-fg/20" : "border-bg/25"
              }`}
            >
              <p className={`max-w-xl text-xl leading-relaxed md:col-span-6 ${heroImage ? "text-fg/85" : "text-bg/85"}`}>
                {t("sport.hero.sub")}
              </p>
              <div className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end">
                <Link
                  href="/contacto?area=sport&motivo=presupuesto"
                  className={`slate group inline-flex items-center gap-3 px-7 py-4 transition-transform duration-300 hover:-translate-y-0.5 ${
                    heroImage ? "bg-accent text-bg" : "bg-bg text-fg"
                  }`}
                >
                  Pedir presupuesto
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a href="#disciplinas" className="slate link-quiet">
                  Ver deportes
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tira de tiempos, como un cronometraje */}
        <div aria-hidden className={`slate relative z-10 mt-14 flex justify-between ${heroImage ? "text-muted" : "text-bg/60"}`}>
          <span>00:00 · Salida</span>
          <span className="hidden sm:inline">Juego</span>
          <span>Meta</span>
        </div>
      </section>

      {/* Frase grande */}
      {s1 && (
        <section className="px-5 py-28 md:px-12 md:py-40 lg:px-20">
          <Reveal>
            <p className="poster text-[clamp(2.6rem,8vw,7.5rem)]">
              {s1}
              {s2 && (
                <>
                  <br />
                  <span className="text-accent">{s2}</span>
                </>
              )}
            </p>
          </Reveal>
        </section>
      )}

      {/* Deportes que cubrimos */}
      <section id="disciplinas" className="px-5 pb-24 md:px-12 md:pb-32 lg:px-20">
        <Reveal>
          <p className="slate mb-10 flex items-center gap-3 text-muted">
            <span className="text-accent">01</span>
            <span className="h-px w-6 bg-fg/25" />
            Deportes que contamos
          </p>
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {DISCIPLINES.map((d, i) => (
            <li key={d.name}>
              <Reveal delay={(i % 3) * 0.06}>
                <figure className="group">
                  <div className="viewfinder relative aspect-[4/5] overflow-hidden md:aspect-[4/3]">
                    <Image
                      src={d.src}
                      alt={d.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/85 to-transparent p-4 pt-16 md:p-6 md:pt-20">
                      <figcaption className="poster text-[clamp(1.5rem,3vw,2.6rem)]">{d.name}</figcaption>
                    </div>
                  </div>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-8">
          <p className="max-w-xl text-muted">
            ¿Tu deporte no está aquí? También lo contamos. Lo que nos importa es la historia, no la disciplina.
          </p>
        </Reveal>
      </section>

      {/* Corte a mitad de página: presupuesto */}
      <BudgetCTA
        compact
        area="sport"
        tone="sport"
        kicker="Clubes, torneos y carreras"
        title="¿Tienes una competición a la vista?"
        text="Cuéntanos qué deporte, cuándo y dónde. Te preparamos una propuesta con lo que vamos a producir y su presupuesto, sin compromiso."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para cubrir un evento deportivo. Deporte: … Fecha: … Lugar: …"
      />

      {/* Lo que contamos: el recorrido */}
      <section className="bg-surface px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <p className="slate mb-6 text-accent">02 · Lo que contamos</p>
            <p className="poster text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Del calentamiento <span className="text-accent">a la meta.</span>
            </p>
          </Reveal>
          <ol className="md:col-span-7 md:col-start-6">
            {moments.map((m, i) => (
              <li key={m} className="border-t border-fg/15 last:border-b">
                <Reveal delay={i * 0.04}>
                  <div className="flex items-baseline gap-6 py-5">
                    <span className="slate w-14 shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="poster text-[clamp(1.6rem,3vw,2.4rem)]">{m}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cómo lo contamos */}
      <section className="px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="grid gap-px bg-fg/15 md:grid-cols-2">
          <Reveal className="bg-bg p-8 md:p-12">
            <p className="slate mb-6 text-accent">El instante</p>
            <p className="text-xl leading-relaxed text-fg/85 md:text-2xl">{t("sport.how")}</p>
          </Reveal>
          <Reveal delay={0.08} className="bg-bg p-8 md:p-12">
            <p className="slate mb-6 text-accent">Durante y después</p>
            <p className="text-xl leading-relaxed text-fg/85 md:text-2xl">{t("sport.live")}</p>
          </Reveal>
        </div>
      </section>

      {/* Galería */}
      {gallery.length > 0 && (
        <section className="px-5 pb-24 md:px-12 md:pb-32 lg:px-20">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-5">
            {gallery.map((src, i) => {
              // Ritmo: una ancha, dos medianas, repetir.
              const wide = i % 3 === 0;
              return (
                <Reveal key={src} delay={(i % 3) * 0.05} className={wide ? "col-span-2 md:col-span-4" : "md:col-span-2"}>
                  <div className={`viewfinder relative overflow-hidden ${wide ? "aspect-[16/10]" : "aspect-[3/4]"}`}>
                    <Image
                      src={src}
                      alt="Fotografía deportiva de G-creatiON"
                      fill
                      sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Para quién + historias */}
      <section id="historias" className="border-t border-fg/15 px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <p className="slate mb-6 text-muted">Para quién</p>
            <ul className="space-y-2">
              {audiences.map((a) => (
                <li key={a} className="poster text-[clamp(1.6rem,2.8vw,2.2rem)]">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <p className="slate mb-6 text-muted">Historias que ya contamos</p>
            <ul className="divide-y divide-fg/15 border-y border-fg/15">
              {stories.map((s) => (
                <li key={s.name} className="py-6">
                  <p className="poster text-[clamp(1.8rem,3.2vw,2.6rem)]">{s.name}</p>
                  {s.detail && <p className="mt-2 text-muted">{s.detail}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Cierre: presupuesto */}
      <BudgetCTA
        area="sport"
        tone="sport"
        kicker="Pide presupuesto"
        title={t("sport.cta")}
        text="Clubes, escuelas, torneos, carreras o marcas deportivas: cuéntanos qué tienes entre manos y te respondemos con una propuesta."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para cubrir un evento deportivo. Deporte: … Fecha: … Lugar: …"
      />
    </main>
  );
}
