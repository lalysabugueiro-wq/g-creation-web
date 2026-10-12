"use client";

// Ubicación — G-creatiON no tiene local de atención ni horario publicado: se
// muestra la base (Camprodon) y la zona de trabajo. El mapa se centra en el
// pueblo, sin aproximar una dirección que no está confirmada.
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS_REGION, openingHours } from "@/lib/mock/seed";
import { useContent } from "@/components/content/ContentProvider";

export default function LocationHours() {
  const C = useContent().contact;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(C.base)}&z=11&output=embed`;

  return (
    <section id="donde" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHeading
        number="05"
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
          <div className="viewfinder relative aspect-[4/3] overflow-hidden bg-surface md:aspect-[16/10]">
            <iframe
              title={`Mapa de ${C.base}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.9]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
