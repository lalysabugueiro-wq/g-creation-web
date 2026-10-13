// Los universos de G-creatiON (Laly, 2026-10-12): justo debajo de la portada,
// una puerta con foto por universo para que cada persona vaya directa a lo
// que necesita. Poco texto: nombre + una línea.
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const UNIVERSES = [
  {
    href: "/bodas",
    name: "Weddings",
    line: "Fotografía y cine de boda.",
    src: "/images/boda-beso-frente-bn.jpg",
    alt: "El novio besa la frente de la novia",
    serif: true,
  },
  {
    href: "/sport",
    name: "Sport",
    line: "Golf, bici, patinaje, básquet, fútbol, carreras.",
    src: "/images/sport-patinaje-pareja.jpg",
    alt: "Dos patinadoras haciendo una figura",
    serif: false,
  },
  {
    href: "/eventos",
    name: "Eventos",
    line: "Conciertos, institucionales y eventos públicos.",
    src: "/images/evento-cantante-escenario.jpg",
    alt: "Cantante en el escenario con focos detrás",
    serif: false,
  },
  {
    href: "/marcas",
    name: "Marcas",
    line: "Video, reels, fotografía y redes.",
    src: "/images/guille-camara.jpg",
    alt: "Guille grabando con la cámara",
    serif: false,
  },
  {
    href: "/diseno-web",
    name: "Diseño & Web",
    line: "Páginas web, identidad y piezas gráficas.",
    src: "/images/laly-retrato.jpg",
    alt: "Laly, de G-creatiON",
    serif: false,
  },
];

export default function Universes() {
  return (
    <section id="universos" className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
      <Reveal>
        <p className="slate mb-8 flex items-center gap-3 text-muted">
          <span className="text-accent">↓</span> ¿Qué quieres contar?
        </p>
      </Reveal>
      <ul className="grid gap-3 sm:grid-cols-2 md:gap-5">
        {UNIVERSES.map((u, i) => (
          <li key={u.href} className={i === UNIVERSES.length - 1 && UNIVERSES.length % 2 === 1 ? "sm:col-span-2" : ""}>
            <Reveal delay={(i % 2) * 0.06}>
              <Link href={u.href} className="group block">
                <div
                  className={`viewfinder relative aspect-[4/3] overflow-hidden ${
                    i === UNIVERSES.length - 1 && UNIVERSES.length % 2 === 1 ? "md:aspect-[21/8]" : "md:aspect-[16/11]"
                  }`}
                >
                  <Image
                    src={u.src}
                    alt={u.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[#f4f2ee] md:p-8">
                    <div>
                      <p className="slate mb-2 text-[#f4f2ee]/70">G-creatiON</p>
                      <p
                        className={
                          u.serif
                            ? "font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-none italic"
                            : "poster text-[clamp(2.4rem,5vw,4.2rem)]"
                        }
                      >
                        {u.name}
                      </p>
                      <p className="mt-3 max-w-xs text-sm text-[#f4f2ee]/80 md:text-base">{u.line}</p>
                    </div>
                    <span
                      aria-hidden
                      className="grid h-12 w-12 shrink-0 place-items-center border border-[#f4f2ee]/40 text-xl transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
