"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/ui/Wordmark";

const NAV = [
  { href: "/#areas", label: "Qué hacemos" },
  { href: "/#estudio", label: "Quiénes somos" },
  { href: "/bodas", label: "Weddings" },
  { href: "/#donde", label: "Dónde" },
];

// Weddings es un universo aparte: su propio menú, sin marcas ni empresas.
const NAV_WEDDINGS = [
  { href: "/bodas#historias", label: "Historias" },
  { href: "/contacto?area=bodas", label: "Contacto" },
  { href: "/", label: "G-creatiON estudio" },
];

export default function Header() {
  const pathname = usePathname();
  const onWeddings = pathname.startsWith("/bodas");
  const [open, setOpen] = useState(false);
  const nav = onWeddings ? NAV_WEDDINGS : NAV;

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-fg">
      <div className="flex items-center justify-between gap-6 px-5 py-6 md:px-12 lg:px-20">
        <Link href="/" className="text-2xl md:text-[1.7rem]" onClick={() => setOpen(false)}>
          <Wordmark />
          {onWeddings && (
            <span className="ml-2 font-serif text-lg normal-case italic tracking-normal text-muted">weddings</span>
          )}
        </Link>

        <nav className="slate hidden items-center gap-9 text-fg/75 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link-quiet hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={onWeddings ? "/contacto?area=bodas" : "/contacto"}
            className="slate hidden items-center gap-2.5 bg-accent px-5 py-3 text-bg transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            {!onWeddings && <span className="rec bg-bg!" />}
            {onWeddings ? "Contadnos vuestra boda" : "Cuéntanos tu idea"}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
            className="slate border border-fg/25 px-3 py-2.5 lg:hidden"
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-5 flex flex-col border border-fg/15 bg-bg lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="slate border-b border-fg/10 px-5 py-4 last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={onWeddings ? "/contacto?area=bodas" : "/contacto"}
            onClick={() => setOpen(false)}
            className="slate bg-accent px-5 py-4 text-bg"
          >
            {onWeddings ? "Contadnos vuestra boda" : "Cuéntanos tu idea"}
          </Link>
        </nav>
      )}
    </header>
  );
}
