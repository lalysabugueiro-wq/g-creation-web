import type { UniverseId } from "@/lib/sound";

// Los universos de G-creatiON en un solo lugar: portada, menú, tarjetas y
// cortinillas leen de acá. Colores: solo los de branding (negro, naranja,
// blanco) + la sub-paleta Weddings y la noche de Eventos que ya usa la web.
export type Universe = {
  id: UniverseId;
  href: string;
  name: string;
  line: string;
  src: string;
  alt: string;
  /** Fondo de la cortinilla */
  bg: string;
  /** Texto de la cortinilla */
  ink: string;
  serif?: boolean;
  /** Encuadre de la foto (object-position), p. ej. para retratos verticales */
  pos?: string;
  /** Encuadre en la portada (pantalla completa) */
  heroPos?: string;
};

export const UNIVERSES: Universe[] = [
  {
    id: "weddings",
    href: "/bodas",
    name: "Weddings",
    line: "Fotografía y cine de boda.",
    src: "/images/boda-beso-frente-bn.jpg",
    alt: "El novio besa la frente de la novia",
    bg: "#56684f",
    ink: "#edeee9",
    serif: true,
  },
  {
    id: "sport",
    href: "/sport",
    name: "Sport",
    line: "Golf, bici, patinaje, básquet, fútbol, carreras.",
    src: "/images/sport-btt-grupo-montana.jpg",
    alt: "Grupo de ciclistas de montaña en el Pirineo",
    bg: "#ff5a1f",
    ink: "#0b0b0c",
  },
  {
    id: "eventos",
    href: "/eventos",
    name: "Eventos",
    line: "Conciertos, institucionales y eventos públicos.",
    src: "/images/evento-cantante-escenario.jpg",
    alt: "Cantante en el escenario con focos detrás",
    bg: "#15131f",
    ink: "#f4f2ee",
  },
  {
    id: "marcas",
    href: "/marcas",
    name: "Marcas",
    line: "Video, reels, fotografía y redes.",
    src: "/images/guille-camara.jpg",
    alt: "Guille grabando con la cámara",
    bg: "#f4f2ee",
    ink: "#0b0b0c",
  },
  {
    id: "diseno",
    href: "/diseno-web",
    name: "Diseño & Web",
    line: "Páginas web, identidad y piezas gráficas.",
    src: "/images/laly-americana.jpg",
    alt: "Laly, de G-creatiON",
    pos: "50% 22%",
    heroPos: "50% 8%",
    bg: "#0e0f10",
    ink: "#ff5a1f",
  },
];

export function universeForPath(path: string): Universe | undefined {
  return UNIVERSES.find((u) => path === u.href || path.startsWith(u.href + "/"));
}
