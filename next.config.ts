import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo afecta a `pnpm dev`: deja abrir la vista previa desde el móvil en la
  // misma WiFi (IP local de este ordenador). No tiene efecto en producción.
  allowedDevOrigins: ["192.168.1.19"],
  images: {
    // El hero SIEMPRE usa Unsplash (necesita mucha resolución para el efecto
    // WebGL — ver modulos/03-sitio-base.md). El resto del starter también
    // apunta acá por defecto solo para que "pnpm dev" renderice algo antes de
    // aplicar marca; el cuerpo y la galería de un cliente real van con SUS
    // fotos en public/images/, bajadas en la investigación.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Fotos subidas desde el editor (Supabase Storage del proyecto de G-creatiON).
      { protocol: "https", hostname: "iopueofydpqeyplgcglf.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
