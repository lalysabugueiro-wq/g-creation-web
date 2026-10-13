"use client";

// Footer: base, contacto y redes (modulos/03-sitio-base.md). Sin horario
// porque G-creatiON no publica uno — no se inventa.
import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/lib/mock/seed";
import { useContent } from "@/components/content/ContentProvider";

export default function Footer() {
  const { t, contact: C } = useContent();
  // El crédito de Unsplash solo mientras la portada siga siendo una foto de stock.
  const heroIsStock = t("home.hero.imageA").includes("unsplash.com");
  return (
    <footer className="border-t border-fg/15 bg-bg text-fg">
      <div className="px-5 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="text-5xl md:text-6xl">
              <Wordmark />
            </Link>
            <p className="slate mt-4 text-accent">Estudio creativo & digital</p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">{BUSINESS_TAGLINE}</p>
          </div>

          <div className="space-y-2 text-sm md:col-span-3">
            <p className="slate mb-4 text-fg">Base</p>
            <p className="text-muted">{C.base}</p>
            <p className="text-muted">{C.area}</p>
          </div>

          <div className="space-y-2 text-sm md:col-span-2">
            <p className="slate mb-4 text-fg">Contacto</p>
            <a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noreferrer" className="link-quiet block w-fit text-muted hover:text-fg">
              {C.phone}
            </a>
            <a href={`mailto:${C.email}`} className="link-quiet block w-fit break-all text-muted hover:text-fg">
              {C.email}
            </a>
          </div>

          <div className="space-y-2 text-sm md:col-span-2">
            <p className="slate mb-4 text-fg">Síguenos</p>
            <a href={C.instagramUrl} target="_blank" rel="noreferrer" className="link-quiet block w-fit text-accent">
              {C.instagramHandle}
            </a>
            <Link href="/bodas" className="link-quiet block w-fit text-muted hover:text-fg">
              G-creatiON Weddings
            </Link>
            <Link href="/sport" className="link-quiet block w-fit text-muted hover:text-fg">
              G-creatiON Sport
            </Link>
            <Link href="/eventos" className="link-quiet block w-fit text-muted hover:text-fg">
              G-creatiON Eventos
            </Link>
            <Link href="/marcas" className="link-quiet block w-fit text-muted hover:text-fg">
              G-creatiON Marcas
            </Link>
            <Link href="/diseno-web" className="link-quiet block w-fit text-muted hover:text-fg">
              G-creatiON Diseño & Web
            </Link>
          </div>
        </div>

        <div className="slate mt-16 flex flex-col gap-2 border-t border-fg/10 pt-6 text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {BUSINESS_NAME} · Guille & Laly</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/aviso-legal" className="link-quiet hover:text-fg">Aviso legal</Link>
            <Link href="/privacidad" className="link-quiet hover:text-fg">Privacidad</Link>
            <Link href="/cookies" className="link-quiet hover:text-fg">Cookies</Link>
          </nav>
          <p>Fotos: G-creatiON{heroIsStock ? " · Imagen de cabecera: Unsplash" : ""}</p>
        </div>
      </div>
    </footer>
  );
}
