// Sección propia del arquetipo `profesional`: áreas + credenciales (proyectos
// reales de investigacion.md). Segunda pasada de copy (Laly, 2026-09-23):
// menos catálogo, más historia — cada área es una frase + una línea corta de
// herramientas + con quién lo hicimos. Eventos se cuenta como un antes /
// durante / después en vez de una lista de tipos. Los textos son editables
// desde /admin/contenido (src/lib/content/schema.ts).
"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { areas, eventStory, formats } from "@/lib/mock/seed";
import { useContent } from "@/components/content/ContentProvider";

// Dos almas: Weddings tiene su propia puerta y su bloque arriba (TwoWorlds,
// WeddingsFeature), así que la lista del estudio no mezcla públicos.
const studioAreas = areas.filter((a) => a.id !== "bodas");

function Dots({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`slate flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {items.map((t, i) => (
        <span key={t} className="flex items-center gap-3">
          {i > 0 && <span className="text-accent">·</span>}
          {t}
        </span>
      ))}
    </p>
  );
}

export default function ServicesCredentials() {
  const { t, lines, pairs } = useContent();
  const big = lines("home.areas.bigline");
  const prod = lines("home.areas.production.title");
  return (
    <section id="areas" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHeading
        number="01"
        kicker="Qué hacemos"
        title={t("home.areas.title")}
        lead={t("home.areas.lead")}
      />
      <Reveal delay={0.1} className="mt-8 md:ml-[25%] md:pl-2">
        <Dots items={lines("home.areas.disciplines")} className="text-fg/80" />
      </Reveal>

      <ol className="mt-16 md:mt-24">
        {studioAreas.map((area, i) => {
          const isWeddings = area.id === "bodas";
          const isSport = area.id === "sport";
          const isEvents = area.id === "eventos";
          return (
            <li key={area.id} className="border-t border-fg/15 last:border-b">
              <Reveal>
                <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                  <p className="slate text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</p>

                  <div className="md:col-span-6">
                    <h3 className="poster text-[clamp(2rem,4.4vw,3.6rem)]">{area.name}</h3>
                    <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg/85">{t(`area.${area.id}.claim`)}</p>
                    <Dots items={lines(`area.${area.id}.tags`)} className="mt-6 text-muted" />

                    {isEvents && (
                      <ol className="mt-8 grid grid-cols-3 border-y border-fg/15">
                        {eventStory.map((s, i) => (
                          <li key={s.label} className={`py-5 ${i > 0 ? "border-l border-fg/15 pl-4" : "pr-4"}`}>
                            <p className="poster text-2xl text-accent md:text-3xl">{s.label}</p>
                            <p className="mt-2 text-sm text-fg/80">{s.detail}</p>
                          </li>
                        ))}
                      </ol>
                    )}

                    {isWeddings && (
                      <Link href="/bodas" className="slate link-quiet mt-8 inline-flex items-center gap-3 text-accent">
                        Entrar en Weddings →
                      </Link>
                    )}
                    {isEvents && (
                      <Link href="/eventos" className="slate link-quiet mt-8 inline-flex items-center gap-3 text-accent">
                        Entrar en Eventos →
                      </Link>
                    )}
                    {isSport && (
                      <Link href="/sport" className="slate link-quiet mt-8 inline-flex items-center gap-3 text-accent">
                        Entrar en G-creatiON Sport →
                      </Link>
                    )}
                  </div>

                  <div className="md:col-span-4 md:col-start-9">
                    <p className="slate mb-4 text-muted">
                      {isWeddings || isSport ? "Historias que ya contamos" : "Hemos trabajado con"}
                    </p>
                    <ul className="space-y-3">
                      {pairs(`area.${area.id}.cases`, /\s+[—–-]\s+/).map(([name, detail]) => (
                        <li key={name}>
                          <p className="font-semibold">{name}</p>
                          {detail && <p className="text-sm text-muted">{detail}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Frase gigante opcional (editable; vacía = no se muestra). */}
      {big.length > 0 && (
        <Reveal className="mt-24 md:mt-32">
          <p className="poster text-center text-[clamp(2.8rem,9vw,8rem)]">
            {big[0]}
            {big[1] && (
              <>
                <br />
                <span className="text-accent">{big[1]}</span>
              </>
            )}
          </p>
        </Reveal>
      )}

      {/* Producimos historias: se cobra por proyecto, no por hora (blueprint §10). */}
      <div className="mt-24 grid gap-8 border-t border-fg/15 pt-10 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="poster text-[clamp(2rem,4.4vw,3.6rem)]">
            {prod[0]} {prod[1] && <span className="text-accent">{prod[1]}</span>}
          </p>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-4 md:col-start-9">
          <p className="leading-relaxed text-muted">{t("home.areas.production.text")}</p>
          <Dots items={formats.map((f) => f.name)} className="mt-6 text-fg/80" />
        </Reveal>
      </div>
    </section>
  );
}
