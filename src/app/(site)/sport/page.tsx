import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BudgetCTA from "@/components/sections/BudgetCTA";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "G-creatiON Sport — Fotografía y video deportivo · Pirineo y Catalunya",
  description:
    "Fotografía, video, dron y cobertura en vivo para clubes, torneos y carreras: golf, BTT, patinaje, básquet, fútbol, trail y obstáculos. Pide presupuesto.",
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
// Fútbol (Laly, 2026-11-21): fotos reales de partidos en Camprodon.
const FUTBOL = [
  { src: "/images/sport-futbol-abrazo-grupo.jpg", w: 1280, h: 1184, alt: "Cuatro jugadores se abrazan celebrando un gol" },
  { src: "/images/sport-futbol-dorsal-16.jpg", w: 854, h: 1280, alt: "Jugador con el 16 de espaldas, montañas de otoño detrás" },
  { src: "/images/sport-futbol-cabezazo.jpg", w: 1280, h: 854, alt: "Salto de cabeza en el área durante un partido de noche" },
  { src: "/images/sport-futbol-companeros-bn.jpg", w: 1280, h: 854, alt: "Dos compañeros caminan abrazados, en blanco y negro" },
  { src: "/images/sport-futbol-portero.jpg", w: 1280, h: 680, alt: "El portero despeja el balón de una patada" },
  { src: "/images/sport-futbol-celebracion-salto.jpg", w: 854, h: 1280, alt: "Un jugador salta sobre sus compañeros para celebrar" },
  { src: "/images/sport-futbol-perfil-bn.jpg", w: 1280, h: 854, alt: "Perfil de un jugador concentrado, en blanco y negro" },
  { src: "/images/sport-futbol-abrazo-sonrisa.jpg", w: 1280, h: 854, alt: "Abrazo y sonrisa después de un gol" },
];

// Reparto en escritorio: [foto, proporción]. Las tres columnas suman lo mismo.
const FUTBOL_COLS: [number, string][][] = [
  [[0, "1 / 1"], [1, "2 / 3"]],
  [[2, "5 / 3"], [3, "5 / 3"], [4, "5 / 3"], [6, "5 / 3"]],
  [[5, "2 / 3"], [7, "1 / 1"]],
];

// Concurso comarcal de caballos (Laly, 2026-11-21).
const CABALLOS = [
  { src: "/images/sport-caballos-lazo.jpg", alt: "Un criador hace trotar a su caballo con el lazo en alto ante el público" },
  { src: "/images/sport-caballos-carpa.jpg", alt: "Caballo de montaña bajo la carpa del concurso, con árboles de otoño" },
  { src: "/images/sport-caballos-trote-frente.jpg", alt: "Caballo trotando de frente junto a su guía" },
  { src: "/images/sport-caballos-cabeza.jpg", alt: "Cabeza de un caballo con cabezada de cuero" },
  { src: "/images/sport-caballos-salto.jpg", alt: "Caballo levantando las patas en la pista" },
  { src: "/images/sport-caballos-trote-2.jpg", alt: "Guía con el dorsal 2 corriendo junto a su caballo" },
  { src: "/images/sport-caballos-ojo.jpg", alt: "Primer plano del ojo de un caballo" },
  { src: "/images/sport-caballos-escarapela.jpg", alt: "Una criadora coloca la escarapela a su caballo" },
  { src: "/images/sport-caballos-bn.jpg", alt: "Joven guiando a un caballo tordo, en blanco y negro" },
];
// Escritorio: dos anchas arriba y tres columnas que terminan a la misma altura.
const CABALLOS_COLS: [number, string][][] = [
  [[2, "2 / 3"], [3, "3 / 2"]],
  [[4, "10 / 7"], [5, "10 / 7"], [6, "10 / 7"]],
  [[7, "2 / 3"], [8, "3 / 2"]],
];

const DISCIPLINES = [
  { name: "Golf", src: "/images/sport-golf-swing.jpg", alt: "Golfista en pleno swing con el Pirineo detrás" },
  { name: "BTT & bici", src: "/images/sport-btt-sendero.jpg", alt: "Ciclista de BTT bajando por un sendero entre árboles" },
  { name: "Patinaje", src: "/images/sport-patinaje-pareja.jpg", alt: "Dos patinadoras haciendo una figura en el pabellón" },
  { name: "Básquet", src: "/images/sport-basquet.jpg", alt: "Jugador sujetando un balón de básquet" },
  { name: "Fútbol", src: "/images/sport-futbol-chut-luz.jpg", alt: "Jugador golpeando el balón con rayos de luz cruzando el campo" },
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
          <p className="text-muted">¿Tu deporte no está? También lo contamos.</p>
        </Reveal>
      </section>

      {/* Corte a mitad de página: presupuesto */}
      <BudgetCTA
        compact
        area="sport"
        tone="sport"
        kicker="Clubes, torneos y carreras"
        title="¿Tienes una competición a la vista?"
        text="Dinos deporte, fecha y lugar. Te enviamos una propuesta sin compromiso."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para cubrir un evento deportivo. Deporte: … Fecha: … Lugar: …"
      />

      {/* Durante y después, en una línea */}
      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <Reveal>
          <p className="poster max-w-5xl text-[clamp(2rem,5vw,4.4rem)]">
            Stories mientras pasa. <span className="text-accent">Resumen cuando termina.</span>
          </p>
        </Reveal>
      </section>

      {/* Fútbol: en el campo */}
      <section className="px-5 pb-24 md:px-12 md:pb-32 lg:px-20">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="slate mb-4 flex items-center gap-3 text-muted">
                <span className="text-accent">02</span>
                <span className="h-px w-6 bg-fg/25" />
                Fútbol
              </p>
              <p className="poster text-[clamp(2.2rem,5.5vw,4.8rem)]">
                Noventa minutos. <span className="text-accent">Y un abrazo que queda.</span>
              </p>
            </div>
            <p className="max-w-sm text-muted">El gol, la tensión, el esfuerzo y la gente que se queda a animar hasta el final.</p>
          </div>
        </Reveal>
        {/* Móvil: cuadrícula simple. Escritorio: tres columnas que terminan a la misma altura. */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {FUTBOL.map((f) => (
            <div key={f.src} className="viewfinder relative aspect-[4/5] overflow-hidden">
              <Image src={f.src} alt={f.alt} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-5 md:grid">
          {FUTBOL_COLS.map((col, c) => (
            <div key={c} className="flex flex-col gap-5">
              {col.map(([i, aspect]) => {
                const f = FUTBOL[i];
                return (
                  <Reveal key={f.src} delay={c * 0.05}>
                    <div className="viewfinder group relative overflow-hidden" style={{ aspectRatio: aspect }}>
                      <Image
                        src={f.src}
                        alt={f.alt}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Caballos: concurso comarcal (Laly, 2026-11-21) */}
      <section className="px-5 pb-24 md:px-12 md:pb-32 lg:px-20">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="slate mb-4 flex items-center gap-3 text-muted">
                <span className="text-accent">03</span>
                <span className="h-px w-6 bg-fg/25" />
                Concurso comarcal de caballos
              </p>
              <p className="poster text-[clamp(2.2rem,5.5vw,4.8rem)]">
                La fuerza de la montaña. <span className="text-accent">Y un pueblo entero mirando.</span>
              </p>
            </div>
            <p className="max-w-sm text-muted">Criadores, caballos de montaña y una carpa llena: el trote, los nervios de la pista y la escarapela al final.</p>
          </div>
        </Reveal>
        {/* Móvil: cuadrícula simple. Escritorio: tres columnas que terminan a la misma altura. */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {CABALLOS.map((f, i) => (
            <div key={f.src} className={`viewfinder relative overflow-hidden ${i === 0 ? "col-span-2 aspect-[3/2]" : "aspect-[4/5]"}`}>
              <Image src={f.src} alt={f.alt} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mb-5 hidden grid-cols-2 gap-5 md:grid">
          {CABALLOS.slice(0, 2).map((f) => (
            <Reveal key={f.src}>
              <div className="viewfinder group relative aspect-[3/2] overflow-hidden">
                <Image src={f.src} alt={f.alt} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-5 md:grid">
          {CABALLOS_COLS.map((col, c) => (
            <div key={c} className="flex flex-col gap-5">
              {col.map(([i, aspect]) => {
                const f = CABALLOS[i];
                return (
                  <Reveal key={f.src} delay={c * 0.05}>
                    <div className="viewfinder group relative overflow-hidden" style={{ aspectRatio: aspect }}>
                      <Image
                        src={f.src}
                        alt={f.alt}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
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
          <Reveal className="md:col-span-12">
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
        text="Clubes, escuelas, torneos, carreras y marcas deportivas."
        whatsappText="Hola G-creatiON, quiero pedir presupuesto para cubrir un evento deportivo. Deporte: … Fecha: … Lugar: …"
      />
    </main>
  );
}
