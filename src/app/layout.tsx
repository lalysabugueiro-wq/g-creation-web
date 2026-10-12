import type { Metadata } from "next";
import { Anton, Instrument_Sans, Cormorant_Garamond } from "next/font/google";
import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/lib/mock/seed";
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

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} — Estudio creativo & digital · Camprodon`,
  description: `${BUSINESS_TAGLINE} Estudio creativo y digital de Guille y Laly en Camprodon, al pie del Pirineo: contenido audiovisual, fotografía, web y redes para marcas, turismo, eventos y bodas en toda Catalunya.`,
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
        {children}
      </body>
    </html>
  );
}
