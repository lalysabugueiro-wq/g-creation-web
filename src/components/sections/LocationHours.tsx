"use client";

// Ubicación — G-creatiON no tiene local de atención ni horario publicado: se
// muestra la base (Camprodon) y la zona de trabajo. Sin iframe de Google Maps
// (instalaba cookies de terceros sin consentimiento): un "mapa" dibujado con la
// silueta del Pirineo y un enlace que abre Google Maps solo si la persona lo pulsa.
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS_REGION, openingHours } from "@/lib/mock/seed";
import { useContent } from "@/components/content/ContentProvider";

export default function LocationHours() {
  const C = useContent().contact;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.base)}`;

  return (
    <section id="donde" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHeading
        number="03"
        kicker="Dónde"
        title={
          <>
            Base en Camprodon.
            <br />
            <span className="text-muted">Rodamos donde haga falta.</span>
          </>
        }
      />

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
        <Reveal className="space-y-8 md:col-span-4">
          <div>
            <p className="slate mb-2 text-muted">Base</p>
            <p className="text-lg">{C.base}</p>
            <p className="text-muted">{BUSINESS_REGION}</p>
          </div>
          <div>
            <p className="slate mb-2 text-muted">Zona</p>
            <p className="leading-relaxed">{C.area}</p>
          </div>
          {openingHours.length > 0 && (
            <div>
              <p className="slate mb-2 text-muted">Horario</p>
              {openingHours.map((h) => (
                <p key={h.day}>
                  {h.day}: {h.hours}
                </p>
              ))}
            </div>
          )}
          <div className="space-y-1">
            <p className="slate mb-2 text-muted">Contacto</p>
            <a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noreferrer" className="link-quiet block w-fit">
              WhatsApp · {C.phone}
            </a>
            <a href={`mailto:${C.email}`} className="link-quiet block w-fit break-all">
              {C.email}
            </a>
            <a href={C.instagramUrl} target="_blank" rel="noreferrer" className="link-quiet block w-fit text-accent">
              {C.instagramHandle}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="md:col-span-8">
          <a
            href={mapHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${C.base} en Google Maps`}
            className="viewfinder group relative block aspect-[4/3] overflow-hidden bg-surface md:aspect-[16/10]"
          >
            <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              {/* Curvas de nivel / crestas del Pirineo, de lejos a cerca */}
              {[
                "M0 250 L90 190 L160 225 L250 140 L330 200 L420 120 L500 185 L590 130 L680 195 L800 150",
                "M0 300 L110 240 L190 275 L280 205 L370 260 L450 190 L540 250 L630 200 L720 255 L800 220",
                "M0 350 L120 300 L210 330 L300 270 L390 320 L480 265 L570 315 L660 275 L740 320 L800 300",
                "M0 400 L140 360 L240 385 L330 340 L430 375 L520 335 L620 370 L720 345 L800 365",
              ].map((d, i) => (
                <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth={1.2} className="text-fg" opacity={0.12 + i * 0.1} />
              ))}
              <circle cx="400" cy="318" r="28" className="fill-accent opacity-15" />
              <circle cx="400" cy="318" r="7" className="fill-accent" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <p className="poster text-[clamp(2rem,4vw,3.4rem)]">Camprodon</p>
                <p className="slate mt-2 text-muted">42°18′ N · 2°22′ E · Pirineo catalán</p>
              </div>
              <span className="slate inline-flex items-center gap-3 border border-fg/30 px-5 py-3 transition-colors group-hover:border-accent group-hover:text-accent">
                Abrir en Google Maps <span aria-hidden>↗</span>
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
