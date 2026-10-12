import type { Metadata } from "next";
import { Anton, Instrument_Sans, Cormorant_Garamond } from "next/font/google";
import { BUSINESS_EMAIL, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_TAGLINE, INSTAGRAM_URL } from "@/lib/mock/seed";
import "./globals.css";

// Par tipográfico de clientes/g-creation/branding.md: Anton (cartel) +
// Instrument Sans (cuerpo). Cormorant Garamond solo para la sub-marca Bodas.
const display = Anton({
  variable: "--next-font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--next-font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--next-font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Oculto a Google hasta que G-creatiON decida abrirlo (modulos/08-go-live.md).
const IS_DEMO = process.env.NEXT_PUBLIC_IS_DEMO === "true";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://g-creation-web.vercel.app";
const DESCRIPTION = `${BUSINESS_TAGLINE} Estudio creativo y digital de Guille y Laly en Camprodon, al pie del Pirineo: contenido audiovisual, fotografía, dron, web y redes para marcas, turismo, eventos, deporte y bodas en toda Catalunya.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BUSINESS_NAME} — Estudio creativo & digital · Camprodon`,
  description: DESCRIPTION,
  // Vista previa al compartir el link (WhatsApp, Instagram, email…).
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} — Estudio creativo & digital`,
    description: BUSINESS_TAGLINE,
    images: [{ url: "/images/da-ceremonia-dron.jpg", alt: "G-creatiON — fotografía y vídeo desde el Pirineo" }],
  },
  twitter: { card: "summary_large_image" },
  robots: IS_DEMO
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${serif.variable} antialiased`}>
      <body className="min-h-svh bg-bg text-fg font-sans">
        <script
          type="application/ld+json"
          // Ficha de negocio para Google (SEO local). Solo datos confirmados.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: BUSINESS_NAME,
              description: DESCRIPTION,
              url: SITE_URL,
              image: `${SITE_URL}/images/da-ceremonia-dron.jpg`,
              telephone: BUSINESS_PHONE,
              email: BUSINESS_EMAIL,
              address: { "@type": "PostalAddress", addressLocality: "Camprodon", addressRegion: "Girona", addressCountry: "ES" },
              areaServed: "Catalunya",
              sameAs: [INSTAGRAM_URL],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
