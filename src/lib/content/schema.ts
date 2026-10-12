// Todo lo que G-creatiON puede editar desde /admin/contenido (modulos/09-cms.md).
// Se edita QUÉ dice el sitio, nunca CÓMO se ve: colores, tipografías, orden de
// secciones y el hero WebGL no están acá a propósito.
//
// Cada campo tiene su texto por defecto (el que el sitio muestra si nunca se
// editó) y una etiqueta en lenguaje llano para la dueña.

export type FieldType = "text" | "textarea" | "lines" | "image";

export type Field = {
  key: string;
  section: string;
  label: string;
  help?: string;
  type: FieldType;
  default: string;
  // Solo imágenes: ancho máximo al comprimir en el navegador.
  maxWidth?: number;
};

const L = (...lines: string[]) => lines.join("\n");

export const SECTIONS = [
  "Portada",
  "Bloque de bodas (portada)",
  "Qué hacemos",
  "Cómo trabajamos",
  "Cifras",
  "Quiénes somos",
  "Filosofía",
  "Galería",
  "Cierre",
  "Página Weddings",
  "Contacto y redes",
] as const;

export const FIELDS: Field[] = [
  // ------------------------------------------------------------ Portada
  {
    key: "home.hero.headline",
    section: "Portada",
    label: "El titular grande de la portada",
    help: "Una línea por renglón. La última sale en naranja.",
    type: "lines",
    default: L("Creamos imágenes", "que hacen que", "las historias", "sigan vivas."),
  },
  {
    key: "home.hero.sub",
    section: "Portada",
    label: "El texto debajo del titular",
    type: "textarea",
    default:
      "Somos Guille y Laly, un estudio creativo y digital de Camprodon. Creamos fotografía, vídeo, webs y contenido para marcas, experiencias, eventos y bodas.",
  },
  {
    key: "home.hero.imageA",
    section: "Portada",
    label: "Foto de fondo de la portada",
    help: "Se ve al cargar. Mejor horizontal y de buena calidad.",
    type: "image",
    maxWidth: 2400,
    default: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2400&auto=format&fit=crop",
  },
  {
    key: "home.hero.imageB",
    section: "Portada",
    label: "Segunda foto de la portada",
    help: "Aparece al mover el ratón sobre la portada (en ordenador).",
    type: "image",
    maxWidth: 2400,
    default: "/images/da-ceremonia-dron.jpg",
  },

  // ------------------------------------------------- Bloque de bodas (portada)
  {
    key: "home.weddings.title",
    section: "Bloque de bodas (portada)",
    label: "Frase grande",
    type: "textarea",
    default: "No queremos que recuerdes solo cómo se veía tu boda.",
  },
  {
    key: "home.weddings.titleAccent",
    section: "Bloque de bodas (portada)",
    label: "Continuación en verde (cursiva)",
    type: "textarea",
    default: "Queremos que puedas volver a sentir cómo se vivió.",
  },
  {
    key: "home.weddings.text",
    section: "Bloque de bodas (portada)",
    label: "Texto debajo",
    type: "textarea",
    default:
      "Fotografía, cine, narrativa y emoción. No entregamos 500 fotos y un vídeo: contamos vuestra historia, para dentro de 5, 15 y 30 años.",
  },
  {
    key: "home.weddings.closing",
    section: "Bloque de bodas (portada)",
    label: "Frase de cierre (cursiva)",
    type: "text",
    default: "Cada boda es diferente. Nuestra forma de contarla también.",
  },
  {
    key: "home.weddings.image",
    section: "Bloque de bodas (portada)",
    label: "Foto de los novios",
    help: "Mejor vertical.",
    type: "image",
    maxWidth: 1400,
    default: "/images/js-novios.jpg",
  },
  {
    key: "home.weddings.imageCaption",
    section: "Bloque de bodas (portada)",
    label: "Pie de foto",
    type: "text",
    default: "Judith & Steven",
  },

  // ---------------------------------------------------------- Qué hacemos
  {
    key: "home.areas.title",
    section: "Qué hacemos",
    label: "Título",
    type: "text",
    default: "Somos un equipo creativo.",
  },
  {
    key: "home.areas.lead",
    section: "Qué hacemos",
    label: "Texto debajo del título",
    type: "textarea",
    default:
      "Guille y Laly trabajamos juntos para convertir ideas, experiencias y momentos en imágenes que cuentan algo.",
  },
  {
    key: "home.areas.disciplines",
    section: "Qué hacemos",
    label: "Lo que hacemos (línea corta)",
    help: "Una palabra o dos por renglón.",
    type: "lines",
    default: L("Contenido audiovisual", "Fotografía", "Web", "Redes"),
  },
  ...(
    [
      {
        id: "marcas",
        name: "Marcas & empresas",
        claim:
          "Creamos contenido audiovisual para empresas que necesitan mostrar lo que hacen, lanzar algo nuevo o construir una comunicación visual sólida.",
        tags: L("Vídeo", "Fotografía", "Reels", "Campañas", "Dron"),
        cases: L(
          "A'BRASA'M — Gastronomía, producto y marca",
          "Benpolit — Automoción y detailing",
          "Riera Racing — Competición"
        ),
      },
      {
        id: "turismo",
        name: "Turismo & hospitality",
        claim: "No solo mostramos un lugar: mostramos lo que se siente al estar allí.",
        tags: L("Alojamientos", "Espacios", "Experiencias", "Dron"),
        cases: L(
          "Els Ocells — Espacios, experiencias y temporada",
          "Hotel Can Barala — Habitaciones, restaurante y ambiente"
        ),
      },
      {
        id: "eventos",
        name: "Eventos & experiencias",
        claim: "No documentamos solo lo que pasó. Contamos cómo se vivió.",
        tags: L("Foto", "Vídeo", "Dron"),
        cases: L(
          "BTT / Isard Atac Bike — Una carrera de montaña contada",
          "BBQ Clandestina / A'BRASA'M — Experiencia gastronómica",
          "La Festa dels Jocs / Esplai — Actividades y eventos"
        ),
      },
    ] as const
  ).flatMap((a): Field[] => [
    { key: `area.${a.id}.claim`, section: "Qué hacemos", label: `${a.name}: frase`, type: "textarea", default: a.claim },
    { key: `area.${a.id}.tags`, section: "Qué hacemos", label: `${a.name}: herramientas`, help: "Una por renglón.", type: "lines", default: a.tags },
    {
      key: `area.${a.id}.cases`,
      section: "Qué hacemos",
      label: `${a.name}: con quién hemos trabajado`,
      help: "Un cliente por renglón, así: Nombre — detalle",
      type: "lines",
      default: a.cases,
    },
  ]),
  {
    key: "home.areas.bigline",
    section: "Qué hacemos",
    label: "Frase gigante",
    help: "Dos renglones. El segundo sale en naranja.",
    type: "lines",
    default: L("No documentamos.", "Hacemos sentir."),
  },

  // ------------------------------------------------------ Cómo trabajamos
  { key: "home.how.title", section: "Cómo trabajamos", label: "Título", type: "text", default: "De la idea a la entrega." },
  {
    key: "home.how.steps",
    section: "Cómo trabajamos",
    label: "Los pasos",
    help: "Un paso por renglón (se numeran solos).",
    type: "lines",
    default: L(
      "Nos cuentas qué quieres conseguir.",
      "Pensamos cómo contarlo.",
      "Producimos.",
      "Editamos.",
      "Te entregamos contenido listo para usar."
    ),
  },
  {
    key: "home.how.closing",
    section: "Cómo trabajamos",
    label: "Frase final",
    help: "Dos renglones: el primero sale en gris.",
    type: "lines",
    default: L("Sin vueltas.", "Sin complicar el proceso."),
  },

  // --------------------------------------------------------------- Cifras
  {
    key: "home.highlights",
    section: "Cifras",
    label: "Las cifras",
    help: "Una por renglón, así: número | explicación",
    type: "lines",
    default: L(
      "350 | fotos editadas en la boda de Dani & Anderson",
      "10 h | de cobertura en Beaucaire, Francia",
      "2 | bodas ya contadas, una de ellas en Francia"
    ),
  },

  // -------------------------------------------------------- Quiénes somos
  { key: "home.about.subtitle", section: "Quiénes somos", label: "Subtítulo gris", type: "text", default: "Dos miradas, un estudio." },
  { key: "home.about.lead", section: "Quiénes somos", label: "Frase grande", type: "text", default: "Somos Guille y Laly." },
  {
    key: "home.about.p1",
    section: "Quiénes somos",
    label: "Primer párrafo",
    type: "textarea",
    default:
      "G-creatiON nació de nuestras ganas de crear, contar historias y trabajar en proyectos que nos permitan hacer algo más que simplemente producir imágenes.",
  },
  {
    key: "home.about.p2",
    section: "Quiénes somos",
    label: "Segundo párrafo",
    type: "textarea",
    default: "Nos gusta involucrarnos en el proyecto, entender qué hay detrás y encontrar la manera de llevarlo a pantalla.",
  },
  {
    key: "home.about.p3",
    section: "Quiénes somos",
    label: "Tercer párrafo",
    type: "textarea",
    default: "Trabajamos desde Camprodon, pero nos movemos allí donde haya una historia que contar.",
  },
  { key: "home.about.photoPair", section: "Quiénes somos", label: "Foto de los dos", type: "image", maxWidth: 1400, default: "/images/guille-y-laly.jpg" },
  { key: "home.about.photoGuille", section: "Quiénes somos", label: "Retrato de Guille", type: "image", maxWidth: 900, default: "/images/guille-camara.jpg" },
  { key: "home.about.photoLaly", section: "Quiénes somos", label: "Retrato de Laly", type: "image", maxWidth: 900, default: "/images/laly-retrato.jpg" },

  // ------------------------------------------------------------ Filosofía
  {
    key: "home.philosophy.frames",
    section: "Filosofía",
    label: "Las frases (una por pantalla)",
    help: "Una frase por renglón.",
    type: "lines",
    default: L(
      "Una marca puede cambiar.",
      "Un evento termina.",
      "Un hotel cambia de temporada.",
      "Una boda dura un día.",
      "Una carrera termina en unas horas.",
      "Una experiencia desaparece."
    ),
  },
  {
    key: "home.philosophy.title",
    section: "Filosofía",
    label: "Frase final",
    help: "La última palabra sale en naranja.",
    type: "text",
    default: "Creamos para que algo quede.",
  },
  {
    key: "home.philosophy.text",
    section: "Filosofía",
    label: "Texto final",
    type: "textarea",
    default: "Porque una buena imagen no solo muestra lo que pasó. Te permite volver.",
  },

  // -------------------------------------------------------------- Galería
  {
    key: "home.gallery.title",
    section: "Galería",
    label: "Título",
    help: "Dos renglones. El segundo sale en naranja.",
    type: "lines",
    default: L("No documentamos lo que pasó.", "Contamos cómo se vivió."),
  },
  ...[
    ["/images/da-ceremonia-dron.jpg", "Dron · Beaucaire", 2000],
    ["/images/js-novia-bn.jpg", "Judith & Steven", 1400],
    ["/images/da-preparativos.jpg", "Preparativos", 1600],
    ["/images/js-arco.jpg", "Celebración", 2400],
  ].flatMap(([src, tag, w], i): Field[] => [
    { key: `home.gallery.${i + 1}.image`, section: "Galería", label: `Foto ${i + 1}`, type: "image", maxWidth: Number(w), default: String(src) },
    { key: `home.gallery.${i + 1}.caption`, section: "Galería", label: `Pie de la foto ${i + 1}`, type: "text", default: String(tag) },
  ]),

  // --------------------------------------------------------------- Cierre
  { key: "home.cta.title", section: "Cierre", label: "Pregunta grande", type: "text", default: "¿Qué tenemos que contar?" },
  {
    key: "home.cta.text",
    section: "Cierre",
    label: "Texto",
    type: "textarea",
    default: "Cuéntanos qué estás preparando, qué quieres mostrar o qué historia quieres conservar.",
  },

  // ------------------------------------------------------- Página Weddings
  {
    key: "bodas.hero.title",
    section: "Página Weddings",
    label: "Titular de la página",
    type: "textarea",
    default: "No queremos que recuerdes solo cómo se veía tu boda.",
  },
  {
    key: "bodas.hero.subtitle",
    section: "Página Weddings",
    label: "Continuación (verde, cursiva)",
    type: "textarea",
    default: "Queremos que puedas volver a sentir cómo se vivió.",
  },
  { key: "bodas.hero.image", section: "Página Weddings", label: "Foto de la portada", type: "image", maxWidth: 1400, default: "/images/js-espejo.jpg" },
  { key: "bodas.hero.caption", section: "Página Weddings", label: "Pie de la foto", type: "text", default: "Judith, minutos antes" },
  {
    key: "bodas.memory",
    section: "Página Weddings",
    label: "Texto de \"Se vuelve memoria\"",
    type: "textarea",
    default:
      "Eso cambia por completo la forma de producirla. No entregamos simplemente 500 fotos y un vídeo: contamos una historia.",
  },
  {
    key: "bodas.moments",
    section: "Página Weddings",
    label: "Lo que conservamos",
    help: "Uno por renglón.",
    type: "lines",
    default: L(
      "Las miradas",
      "Los nervios",
      "Las palabras",
      "Las risas",
      "Los abrazos",
      "La familia",
      "Los amigos",
      "La fiesta",
      "Los pequeños detalles"
    ),
  },
  {
    key: "bodas.style.text",
    section: "Página Weddings",
    label: "Nuestro estilo: texto",
    type: "textarea",
    default:
      "No queremos que todo parezca una sesión de fotos. Queremos que viváis el día. Nosotros estamos ahí para observar, anticipar y contar.",
  },
  {
    key: "bodas.story.judith-steven",
    section: "Página Weddings",
    label: "Judith & Steven: texto",
    type: "textarea",
    default:
      "Pensada para combinar fotografía, vídeo emocional y momentos espontáneos. Trabajamos con varias cámaras para no perder ni lo principal ni lo que pasa alrededor.",
  },
  {
    key: "bodas.story.dani-anderson",
    section: "Página Weddings",
    label: "Dani & Anderson: texto",
    type: "textarea",
    default:
      "Una producción completa de unas diez horas, con desplazamiento desde Camprodon hasta Beaucaire. Del primer botón de la camisa al último baile.",
  },

  // ------------------------------------------------------ Contacto y redes
  { key: "contact.phone", section: "Contacto y redes", label: "Teléfono (como se muestra)", type: "text", default: "+34 646 10 89 16" },
  {
    key: "contact.whatsapp",
    section: "Contacto y redes",
    label: "Número de WhatsApp",
    help: "Solo números, con el 34 delante. Ej: 34646108916",
    type: "text",
    default: "34646108916",
  },
  { key: "contact.email", section: "Contacto y redes", label: "Email", type: "text", default: "guillermo.creation@gmail.com" },
  { key: "contact.instagram", section: "Contacto y redes", label: "Instagram", help: "Con la @ delante.", type: "text", default: "@guille.creation" },
  { key: "contact.base", section: "Contacto y redes", label: "Dónde estáis", type: "text", default: "Camprodon, Girona" },
  {
    key: "contact.area",
    section: "Contacto y redes",
    label: "Zona de trabajo",
    type: "textarea",
    default: "Trabajamos en toda Catalunya y nos desplazamos allí donde el proyecto nos lleve.",
  },
];

export const FIELD_BY_KEY: Record<string, Field> = Object.fromEntries(FIELDS.map((f) => [f.key, f]));
export const DEFAULTS: Record<string, string> = Object.fromEntries(FIELDS.map((f) => [f.key, f.default]));

export type SiteContent = Record<string, string>;
