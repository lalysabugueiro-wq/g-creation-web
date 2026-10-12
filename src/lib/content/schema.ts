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
  "Página Sport",
  "Página Eventos",
  "Página Marcas",
  "Textos legales",
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
      "Somos Guille y Laly, un estudio creativo y digital en Camprodon. Elige tu universo:",
  },
  {
    key: "home.hero.imageA",
    section: "Portada",
    label: "Foto de fondo de la portada",
    help: "Se ve al cargar. Mejor horizontal y de buena calidad.",
    type: "image",
    maxWidth: 2400,
    default: "/images/sport-btt-grupo-montana.jpg",
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
    default: "No queremos que recordéis solo cómo se veía vuestra boda.",
  },
  {
    key: "home.weddings.titleAccent",
    section: "Bloque de bodas (portada)",
    label: "Continuación en verde (cursiva)",
    type: "textarea",
    default: "Queremos que podáis volver a sentir cómo se vivió.",
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
    default: L("Contenido audiovisual", "Fotografía", "Dron", "Web", "Redes"),
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
          "Benpolit — Automoción y detailing"
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
        claim:
          "Conciertos, actos institucionales, eventos públicos y fiestas: el ambiente, la gente y lo que se queda cuando todo termina.",
        tags: L("Foto", "Vídeo", "Stories", "Dron"),
        cases: L(
          "Fira de la Galeta — Un evento local, en directo y después",
          "BBQ Clandestina / A'BRASA'M — Experiencia gastronómica",
          "La Festa dels Jocs / Esplai — Actividades y eventos"
        ),
      },
      {
        id: "sport",
        name: "G-creatiON Sport",
        claim: "Contamos la preparación, el esfuerzo, la montaña y la llegada. Lo que se siente cuando todo termina.",
        tags: L("Foto", "Vídeo", "Dron", "Cobertura en directo"),
        cases: L("BTT / Isard Atac Bike — Una carrera de montaña, de la salida a la meta", "Riera Racing — Competición"),
      },
      {
        id: "web",
        name: "Web & presencia digital",
        claim:
          "Laly diseña y desarrolla webs que presentan tu negocio con la misma mirada que tus imágenes: claras, rápidas y pensadas para que quien llega entienda qué haces y cómo escribirte. Así lo que producimos no se queda en un reel: tiene un lugar donde vivir.",
        tags: L("Diseño web", "Desarrollo", "Presencia digital", "Redes"),
        cases: L("G-creatiON — Esta web también es nuestra"),
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
    label: "Frase gigante (opcional)",
    help: "Dos renglones. El segundo sale en naranja. Déjalo vacío para no mostrarla.",
    type: "lines",
    default: "",
  },
  {
    key: "home.areas.production.title",
    section: "Qué hacemos",
    label: "Bloque «cómo cobramos»: titular",
    help: "Dos renglones. El segundo sale en naranja.",
    type: "lines",
    default: L("No vendemos horas.", "Producimos historias."),
  },
  {
    key: "home.areas.production.text",
    section: "Qué hacemos",
    label: "Bloque «cómo cobramos»: texto",
    type: "textarea",
    default:
      "La pregunta no es cuántas horas vamos a grabar, sino qué necesitas contar. A partir de ahí pensamos la idea, la producción y las piezas que vas a usar, y te proponemos una inversión por proyecto: no por hora de cámara.",
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
    help: "Opcional. Una por renglón, así: número | explicación. Vacío = la sección no se muestra.",
    type: "lines",
    default: "",
  },

  // -------------------------------------------------------- Quiénes somos
  { key: "home.about.subtitle", section: "Quiénes somos", label: "Subtítulo gris", type: "text", default: "Dos miradas, un estudio." },
  { key: "home.about.lead", section: "Quiénes somos", label: "Frase grande", type: "text", default: "Somos Guille y Laly." },
  {
    key: "home.about.roles",
    section: "Quiénes somos",
    label: "Qué hace cada uno",
    type: "textarea",
    default: "Guille pone la mirada detrás de la cámara. Laly diseña el lugar digital donde todo eso vive.",
  },
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
    default: "No queremos que recordéis solo cómo se veía vuestra boda.",
  },
  {
    key: "bodas.hero.subtitle",
    section: "Página Weddings",
    label: "Continuación (cursiva)",
    type: "textarea",
    default: "Queremos que podáis volver a sentir cómo se vivió.",
  },
  { key: "bodas.hero.image", section: "Página Weddings", label: "Foto de la portada", type: "image", maxWidth: 1400, default: "/images/js-espejo.jpg" },
  { key: "bodas.hero.caption", section: "Página Weddings", label: "Pie de la foto", type: "text", default: "Judith, minutos antes" },
  {
    key: "bodas.memory",
    section: "Página Weddings",
    label: "Texto de \"Se vuelve memoria\"",
    type: "textarea",
    default:
      "Eso cambia por completo la forma de producirla. No se trata de cuántas fotos entregamos, sino de que dentro de muchos años podáis volver a ese día.",
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
      "Una producción completa, con desplazamiento desde Camprodon hasta Beaucaire. Del primer botón de la camisa al último baile.",
  },

  {
    key: "bodas.behind",
    section: "Página Weddings",
    label: "«Lo que no se ve»: texto",
    type: "textarea",
    default:
      "Llegamos con lo necesario para no perder nada: varias cámaras para estar en dos sitios a la vez, sonido real para que volváis a oír vuestros votos, dron cuando el lugar lo merece y luz cuando la noche la pide. El equipo está al servicio de la historia, no al revés.",
  },

  // ---------------------------------------------------------- Página Sport
  {
    key: "sport.hero.title",
    section: "Página Sport",
    label: "Titular de la página",
    help: "Una línea por renglón. La última sale en naranja.",
    type: "lines",
    default: L("El esfuerzo", "también merece", "ser contado."),
  },
  {
    key: "sport.hero.sub",
    section: "Página Sport",
    label: "Texto debajo del titular",
    type: "textarea",
    default:
      "Golf, bici, patinaje, básquet, fútbol, carreras.",
  },
  {
    key: "sport.hero.image",
    section: "Página Sport",
    label: "Foto de portada",
    help: "Mejor horizontal, con acción o dron. Si la quitas, la portada se ve en naranja solo con tipografía.",
    type: "image",
    maxWidth: 2400,
    default: "/images/sport-celebracion-equipo.jpg",
  },
  {
    key: "sport.statement",
    section: "Página Sport",
    label: "Frase grande",
    help: "Dos renglones. El segundo sale en naranja.",
    type: "lines",
    default: L("Un partido, una carrera, una exhibición.", "Lo que se vivió dura mucho más."),
  },
  {
    key: "sport.moments",
    section: "Página Sport",
    label: "Lo que contamos",
    help: "Uno por renglón.",
    type: "lines",
    default: L(
      "La preparación",
      "Los nervios antes de empezar",
      "El gesto técnico",
      "El esfuerzo",
      "El equipo",
      "La caída y la vuelta",
      "La llegada",
      "La gente que anima"
    ),
  },
  {
    key: "sport.how",
    section: "Página Sport",
    label: "Cómo lo contamos",
    type: "textarea",
    default:
      "Buscamos el instante que define el deporte: el swing, el salto, el balón que sale del pie, el abrazo en meta. Y cuando hay recorrido, el dron no está para hacer paisajes bonitos: está para mostrar la escala y lo pequeño que se ve un corredor frente a la montaña.",
  },
  {
    key: "sport.live",
    section: "Página Sport",
    label: "Durante y después",
    type: "textarea",
    default:
      "Mantenemos viva la competición mientras ocurre, con stories, reels y fotos para participantes, clubes y patrocinadores, y la cerramos con un resumen que se queda.",
  },
  {
    key: "sport.for",
    section: "Página Sport",
    label: "Para quién",
    help: "Uno por renglón.",
    type: "lines",
    default: L(
      "Clubes y escuelas deportivas",
      "Torneos y competiciones",
      "Carreras de montaña, BTT y trail",
      "Marcas y patrocinadores",
      "Deportistas"
    ),
  },
  {
    key: "sport.stories",
    section: "Página Sport",
    label: "Historias",
    help: "Una por renglón, así: Nombre — detalle",
    type: "lines",
    default: L(
      "FEC Camprodon — Patinaje, fútbol y básquet",
      "Isard Atac Bike — Una carrera de montaña, de la salida a la meta",
      "Riera Racing — Competición"
    ),
  },
  ...[
    "/images/sport-btt-grupo-montana.jpg",
    "/images/sport-patinaje-trio.jpg",
    "/images/sport-golf-buggies.jpg",
    "/images/sport-ebike.jpg",
    "/images/sport-bici-pueblo.jpg",
  ].map(
    (src, i): Field => ({
      key: `sport.gallery.${i + 1}`,
      section: "Página Sport",
      label: `Foto de la galería ${i + 1}`,
      help: "Las fotos vacías no se muestran.",
      type: "image",
      maxWidth: 1800,
      default: src,
    })
  ),
  { key: "sport.cta", section: "Página Sport", label: "Pregunta final", type: "text", default: "¿Qué partido, carrera o torneo tenemos que contar?" },

  // -------------------------------------------------------- Página Eventos
  {
    key: "eventos.hero.title",
    section: "Página Eventos",
    label: "Titular",
    help: "Una línea por renglón. La última sale en naranja.",
    type: "lines",
    default: L("Pasa una vez.", "Lo contamos", "para siempre."),
  },
  {
    key: "eventos.hero.sub",
    section: "Página Eventos",
    label: "Texto debajo del titular",
    type: "text",
    default: "Conciertos, actos institucionales y eventos públicos.",
  },
  {
    key: "eventos.clients",
    section: "Página Eventos",
    label: "Han confiado en nosotros",
    help: "Uno por renglón, así: Nombre — detalle",
    type: "lines",
    default: L("Microclima — Conciertos", "Ajuntament de Camprodon — Actos institucionales"),
  },
  {
    key: "eventos.types",
    section: "Página Eventos",
    label: "Tipos de evento",
    help: "Uno por renglón, así: Nombre | frase corta",
    type: "lines",
    default: L(
      "Conciertos y festivales | El directo, la luz y el público.",
      "Institucionales | Actos, presentaciones y aniversarios.",
      "Eventos públicos y políticos | Mítines, ruedas de prensa y campañas.",
      "Fiestas y ferias | El pueblo, la gente y lo que se queda."
    ),
  },

  // --------------------------------------------------------- Página Marcas
  {
    key: "marcas.hero.title",
    section: "Página Marcas",
    label: "Titular",
    help: "Una línea por renglón. La última sale en naranja.",
    type: "lines",
    default: L("Que tu marca", "se vea.", "Y se recuerde."),
  },
  {
    key: "marcas.hero.sub",
    section: "Página Marcas",
    label: "Texto debajo del titular",
    type: "text",
    default: "Vídeo, reels, fotografía, webs y redes para marcas y negocios.",
  },
  {
    key: "marcas.brands",
    section: "Página Marcas",
    label: "Marcas con las que trabajamos",
    help: "Una por renglón, así: Nombre — qué hicimos",
    type: "lines",
    default: L(
      "A'BRASA'M — Gastronomía, fuego y oficio",
      "Els Ocells — Espacios y experiencias",
      "Bastiments Aventura — Aventura y actividades",
      "Visit Camprodon — Turismo",
      "La Tienda de Juli — Diseño y fidelización",
      "Benpolit — Automoción y detailing"
    ),
  },

  // ------------------------------------------------------- Textos legales
  {
    key: "legal.owner",
    section: "Textos legales",
    label: "Titular de la web (nombre y apellidos o empresa)",
    help: "Obligatorio para el aviso legal.",
    type: "text",
    default: "[Nombre del titular]",
  },
  { key: "legal.nif", section: "Textos legales", label: "NIF / DNI", type: "text", default: "[NIF]" },
  { key: "legal.address", section: "Textos legales", label: "Dirección fiscal", type: "text", default: "[Dirección], Camprodon (Girona)" },
  {
    key: "legal.email",
    section: "Textos legales",
    label: "Email para temas legales y de privacidad",
    type: "text",
    default: "guillermo.creation@gmail.com",
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
