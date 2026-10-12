"use client";

// /bodas es la sub-marca G-creatiON Weddings: pisa los mismos tokens con la
// paleta tenue de branding.md (`.theme-wed` en globals.css). Envolver acá —y
// no dentro de la página— hace que header y footer cambien de piel también.
import { usePathname } from "next/navigation";

export default function ThemeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const weddings = pathname.startsWith("/bodas");
  return <div className={weddings ? "theme-wed" : undefined}>{children}</div>;
}
