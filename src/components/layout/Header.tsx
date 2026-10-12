"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/ui/Wordmark";
import { useContent } from "@/components/content/ContentProvider";

const NAV = [
  { href: "/#areas", label: "Qué hacemos" },
  { href: "/#estudio", label: "Quiénes somos" },
  { href: "/bodas", label: "Weddings" },
  { href: "/sport", label: "Sport" },
  { href: "/eventos", label: "Eventos" },
  { href: "/#donde", label: "Dónde" },
];

// Weddings es un universo aparte: su propio menú, sin marcas ni empresas.
const NAV_WEDDINGS = [
  { href: "/bodas#fotogramas", label: "Fotos" },
  { href: "/contacto?area=bodas", label: "Contacto" },
  { href: "/", label: "G-creatiON estudio" },
];

// Eventos, igual.
const NAV_EVENTOS = [
  { href: "/eventos#fotos", label: "Fotos" },
  { href: "/contacto?area=eventos", label: "Contacto" },
  { href: "/", label: "G-creatiON estudio" },
];

// Sport, igual: su propio menú.
const NAV_SPORT = [
  { href: "/sport#historias", label: "Historias" },
  { href: "/contacto?area=sport", label: "Contacto" },
  { href: "/", label: "G-creatiON estudio" },
];

export default function Header() {
  const pathname = usePathname();
  const onWeddings = pathname.startsWith("/bodas");
  const onSport = pathname.startsWith("/sport");
  const onEventos = pathname.startsWith("/eventos");
  // Sin foto de portada, /sport abre sobre naranja: el header pasa a tinta oscura.
  const { t } = useContent();
  const sportOnOrange = onSport && !t("sport.hero.image");
  const [open, setOpen] = useState(false);
  const nav = onWeddings ? NAV_WEDDINGS : onSport ? NAV_SPORT : onEventos ? NAV_EVENTOS : NAV;
  const ctaHref = onWeddings
    ? "/contacto?area=bodas&motivo=presupuesto"
    : onSport
      ? "/contacto?area=sport&motivo=presupuesto"
      : onEventos
        ? "/contacto?area=eventos&motivo=presupuesto"
        : "/contacto";
  const ctaLabel = onWeddings || onSport || onEventos ? "Pedir presupuesto" : "Cuéntanos tu idea";

  return (
    <header className={`absolute inset-x-0 top-0 z-50 ${onWeddings ? "on-photo" : ""} ${sportOnOrange ? "text-bg" : "text-fg"}`}>
      <div className="flex items-center justify-between gap-6 px-5 py-6 md:px-12 lg:px-20">
        <Link href="/" className="text-2xl md:text-[1.7rem]" onClick={() => setOpen(false)}>
          <Wordmark mono={sportOnOrange} />
          {onWeddings && (
            <span className="ml-2 font-serif text-lg normal-case italic tracking-normal text-muted">weddings</span>
          )}
          {onSport && <span className={`poster ml-2 text-lg ${sportOnOrange ? "" : "text-muted"}`}>sport</span>}
          {onEventos && <span className="poster ml-2 text-lg text-muted">eventos</span>}
        </Link>

        <nav className={`slate hidden items-center gap-9 lg:flex ${sportOnOrange ? "text-bg/75" : "text-fg/75"}`}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`link-quiet ${sportOnOrange ? "hover:text-bg" : "hover:text-fg"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={ctaHref}
            className={`slate hidden items-center gap-2.5 px-5 py-3 transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex ${
              sportOnOrange ? "bg-bg text-fg" : "bg-accent text-bg"
            }`}
          >
            {!onWeddings && <span className={`rec ${sportOnOrange ? "" : "bg-bg!"}`} />}
            {ctaLabel}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
            className={`slate border px-3 py-2.5 lg:hidden ${sportOnOrange ? "border-bg/30" : "border-fg/25"}`}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className={`mx-5 flex flex-col border border-fg/15 lg:hidden ${
            onWeddings ? "bg-[#1f2420] text-[#f4f2ee]" : "bg-bg text-fg"
          }`}
        >
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
          <Link href={ctaHref} onClick={() => setOpen(false)} className="slate bg-accent px-5 py-4 text-bg">
            {ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
