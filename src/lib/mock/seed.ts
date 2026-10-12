// Datos reales de G-creatiON — fuente: clientes/g-creation/investigacion.md
// (blueprint entregado por Laly, 2026-09-23). Regla: nada inventado. Lo que no
// está confirmado (dirección exacta, horarios, reseñas, precios) queda vacío y
// las secciones que lo usan se omiten solas.

export const BUSINESS_NAME = "G-creatiON";
export const BUSINESS_TAGLINE = "Creamos imágenes que hacen que las historias sigan vivas.";
export const INSTAGRAM_HANDLE = "@guille.creation";
export const INSTAGRAM_URL = "https://instagram.com/guille.creation";
export const BUSINESS_WHATSAPP = "34646108916";
export const BUSINESS_PHONE = "+34 646 10 89 16";
export const BUSINESS_EMAIL = "guillermo.creation@gmail.com";

// Solo el pueblo: la dirección exacta no está confirmada — nunca aproximarla.
export const BUSINESS_ADDRESS = "Camprodon, Girona";
export const BUSINESS_REGION = "Al pie del Pirineo catalán";
export const SERVICE_AREA = "Trabajamos en toda Catalunya y nos desplazamos allí donde el proyecto nos lleve.";

// Sin horario publicado: la sección de ubicación lo omite.
export const openingHours: { day: string; hours: string }[] = [];

// Sin reseñas entregadas todavía: la sección Reseñas no se renderiza.
export type Review = { quote: string; author: string; source: string };
export const reviews: Review[] = [];

// "Por qué elegirnos" — solo datos del blueprint.
export const BUSINESS_HIGHLIGHTS = [
  { value: "350", label: "fotos editadas en la boda de Dani & Anderson" },
  { value: "10 h", label: "de cobertura en Beaucaire, Francia" },
  { value: "2", label: "bodas ya contadas, una de ellas en Francia" },
];

// ------------------------------------------------------------ áreas (sección propia)

export type Area = {
  id: string;
  number: string;
  name: string;
  claim: string;
  // Una sola línea corta, no una lista: "podemos producir muchas cosas, pero
  // sabemos contar historias" (feedback de Laly, 2026-09-23).
  tags: string[];
  cases: { name: string; detail: string }[];
};

export const areas: Area[] = [
  {
    id: "bodas",
    number: "01",
    name: "G-creatiON Weddings",
    claim: "Fotografía, cine, narrativa y emoción. Contamos una boda como una historia.",
    tags: ["Fotografía", "Cine", "Reel", "Dron"],
    cases: [
      { name: "Judith & Steven", detail: "Nuestra primera boda" },
      { name: "Dani & Anderson", detail: "Beaucaire, Francia · 10 h de cobertura" },
    ],
  },
  {
    id: "marcas",
    number: "02",
    name: "Marcas & empresas",
    claim:
      "Creamos contenido audiovisual para empresas que necesitan mostrar lo que hacen, lanzar algo nuevo o construir una comunicación visual sólida.",
    tags: ["Vídeo", "Fotografía", "Reels", "Campañas", "Dron"],
    cases: [
      { name: "A'BRASA'M", detail: "Gastronomía, producto y marca" },
      { name: "Benpolit", detail: "Automoción y detailing" },
      { name: "Riera Racing", detail: "Competición" },
    ],
  },
  {
    id: "turismo",
    number: "03",
    name: "Turismo & hospitality",
    claim: "No solo mostramos un lugar: mostramos lo que se siente al estar allí.",
    tags: ["Alojamientos", "Espacios", "Experiencias", "Dron"],
    cases: [
      { name: "Els Ocells", detail: "Espacios, experiencias y temporada" },
      { name: "Hotel Can Barala", detail: "Habitaciones, restaurante y ambiente" },
    ],
  },
  {
    id: "eventos",
    number: "04",
    name: "Eventos & experiencias",
    claim: "No documentamos solo lo que pasó. Contamos cómo se vivió.",
    tags: ["Foto", "Vídeo", "Dron"],
    cases: [
      { name: "BTT / Isard Atac Bike", detail: "Una carrera de montaña contada" },
      { name: "BBQ Clandestina / A'BRASA'M", detail: "Experiencia gastronómica" },
      { name: "La Festa dels Jocs / Esplai", detail: "Actividades y eventos" },
    ],
  },
];

// Eventos: en vez de una lista de tipos, cómo contamos UN evento.
export const eventStory = [
  { label: "Antes", detail: "La preparación." },
  { label: "Durante", detail: "La acción." },
  { label: "Después", detail: "La emoción que queda." },
];

// Posicionamiento (Laly, 2026-09-23): "Estudio creativo & digital".
export const POSITIONING = "Estudio creativo & digital";
export const DISCIPLINES_LINE = ["Contenido audiovisual", "Fotografía", "Web", "Redes"];

// "No vendemos horas de cámara. Vendemos producción."
export const formats = [
  { name: "Proyectos", detail: "Una producción concreta." },
  { name: "Campañas", detail: "Contenido para un lanzamiento o una temporada." },
  { name: "Coberturas", detail: "Eventos y experiencias." },
  { name: "Contenido recurrente", detail: "Producción periódica para empresas y redes." },
  { name: "Bodas", detail: "Experiencias audiovisuales completas." },
];

export const gear = [
  "Cámaras profesionales",
  "Distintas focales",
  "Audio profesional",
  "Micrófonos inalámbricos",
  "Dron",
  "Iluminación cuando el proyecto lo pide",
  "Smartphone como recurso complementario",
];

// --------------------------------------------------------------------- bodas

export const weddingMoments = [
  "Las miradas",
  "Los nervios",
  "Las palabras",
  "Las risas",
  "Los abrazos",
  "La familia",
  "Los amigos",
  "La fiesta",
  "Los pequeños detalles",
];

export const weddings = [
  {
    id: "judith-steven",
    couple: "Judith & Steven",
    place: "Nuestra primera boda",
    summary:
      "Pensada para combinar fotografía, vídeo emocional y momentos espontáneos. Trabajamos con varias cámaras para no perder ni lo principal ni lo que pasa alrededor.",
    moments: ["Preparativos", "Ceremonia", "Celebración", "Pareja", "Familia", "Fiesta"],
    deliverables: ["Fotografía", "Vídeo emocional", "Momentos espontáneos"],
    images: [
      { src: "/images/js-espejo.jpg", alt: "La novia se mira al espejo antes de la ceremonia" },
      { src: "/images/js-arco.jpg", alt: "Judith y Steven con sus amigos junto al arco floral" },
      { src: "/images/js-entrada.jpg", alt: "Entrada a la ceremonia" },
      { src: "/images/js-novia-bn.jpg", alt: "La novia en blanco y negro con el ramo" },
      { src: "/images/js-damas.jpg", alt: "Las damas de honor con sus ramos" },
    ],
  },
  {
    id: "dani-anderson",
    couple: "Dani & Anderson",
    place: "Beaucaire, Francia · 10 h de cobertura",
    summary:
      "Una producción completa de unas diez horas, con desplazamiento desde Camprodon hasta Beaucaire. Del primer botón de la camisa al último baile.",
    moments: [
      "Preparativos",
      "Ceremonia civil",
      "Ceremonia",
      "Aperitivo",
      "Sesión de pareja",
      "Cena",
      "Discursos",
      "Baile",
      "Fiesta",
    ],
    deliverables: [
      "350 fotografías editadas",
      "Vídeo cinematográfico de 4–6 min",
      "Reel vertical",
      "Dron",
      "Impresiones instantáneas durante el evento",
    ],
    images: [
      { src: "/images/da-ceremonia-dron.jpg", alt: "Ceremonia al aire libre de Dani y Anderson vista desde el dron" },
      { src: "/images/da-ceremonia-civil.jpg", alt: "Dani y Anderson en la ceremonia civil" },
      { src: "/images/da-novia-velo.jpg", alt: "La novia con el velo y el ramo de rosas" },
      { src: "/images/da-preparativos.jpg", alt: "Preparativos del novio en blanco y negro" },
      { src: "/images/da-novio-perfume.jpg", alt: "El novio con el perfume, en blanco y negro" },
      { src: "/images/da-novio-padrinos.jpg", alt: "El novio con sus padrinos" },
    ],
  }

];

// Detalles (anillos, zapatos, vestido…) para la tira del álbum en /bodas.
export const weddingDetails = [
  { src: "/images/js-detalle-3.jpg", alt: "Los anillos sobre la tela" },
  { src: "/images/js-detalle-5.jpg", alt: "Zapatos, ramo y vestido de novia" },
  { src: "/images/js-detalle-4.jpg", alt: "La novia sonríe frente al espejo" },
  { src: "/images/js-detalle-7.jpg", alt: "El reloj en la muñeca del novio, en blanco y negro" },
  { src: "/images/js-detalle-6.jpg", alt: "Zapatos y vestido en blanco y negro" },
  { src: "/images/js-detalle-8.jpg", alt: "El novio con gafas de sol, en blanco y negro" },
];

// ------------------------------------------------------------- formulario

// Motivo de consulta = área. `bodas` se preselecciona desde /bodas.
// Weddings va primero en `areas` (pedido de Laly: la boda más arriba).
export const professionalAreas = areas.map((a) => a.name);
export const areaIdToName = Object.fromEntries(areas.map((a) => [a.id, a.name])) as Record<string, string>;

// Credenciales verificadas: los proyectos reales nombrados en el blueprint.
export type Credential = { label: string; verified: boolean };
export const credentials: Credential[] = areas.flatMap((a) =>
  a.cases.map((c) => ({ label: c.name, verified: true }))
);
