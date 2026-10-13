"use client";

// /bodas es la sub-marca G-creatiON Weddings: pisa los mismos tokens con la
// paleta tenue de branding.md (`.theme-wed` en globals.css). Envolver acá —y
// no dentro de la página— hace que header y footer cambien de piel también.
import { usePathname } from "next/navigation";

export default function ThemeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const weddings = pathname.startsWith("/bodas");
  const live = pathname.startsWith("/eventos");
  const brand = pathname.startsWith("/marcas");
  const design = pathname.startsWith("/diseno-web");
  return (
    <div className={weddings ? "theme-wed" : live ? "theme-live" : brand ? "theme-brand" : design ? "theme-design" : undefined}>{children}</div>
  );
}
