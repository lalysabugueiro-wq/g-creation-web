import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { gear, weddingDetails, weddings } from "@/lib/mock/seed";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "G-creatiON Weddings — Fotografía y cine de boda · Catalunya",
  description:
    "Contamos una boda como una historia: fotografía, cinematografía, narrativa y emoción. Desde Camprodon a toda Catalunya y más allá.",
};

// Sub-marca Weddings (branding.md): paleta piedra + eucalipto, Cormorant
// Garamond, ritmo lento, fundidos de 1.2s. Todo el contenido sale de
// investigacion.md — bodas reales, entregables reales, fotos reales.
const STYLE = ["Natural", "Emocional", "Cinematográfico", "Espontáneo"];

export default async function BodasPage() {
  // Textos editables desde /admin/contenido (sección "Página Weddings").
  const content = await getSiteContent();
  const t = (k: string) => content[k] ?? "";
  const moments = t("bodas.moments").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return (
    <main>
      {/* Portada */}
      <section className="relative min-h-svh px-5 pb-16 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 md:pb-10">
            <Reveal slow>
              <p className="slate mb-8 text-accent">G-creatiON Weddings</p>
            </Reveal>
            <Reveal slow delay={0.1}>
              <h1 className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] font-normal">
                {t("bodas.hero.title")}
              </h1>
            </Reveal>
            <Reveal slow delay={0.25}>
              <p className="mt-6 font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-tight italic text-accent">
                {t("bodas.hero.subtitle")}
              </p>
            </Reveal>
            <Reveal slow delay={0.35}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contacto?area=bodas"
                  className="slate bg-accent px-7 py-4 text-bg transition-opacity duration-500 hover:opacity-90"
                >
                  Contadnos vuestra boda
                </Link>
                <a href="#historias" className="slate link-quiet text-muted">
                  Ver historias reales
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal slow delay={0.15} className="md:col-span-5 md:col-start-8">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={t("bodas.hero.image")}
                  alt="La novia se mira al espejo antes de la ceremonia"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[62%_center]"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-3 font-serif text-lg italic text-muted">
                <span className="h-px w-8 bg-rose" /> {t("bodas.hero.caption")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Memoria */}
      <section className="bg-surface px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal slow>
            <p className="font-serif text-[clamp(1.8rem,3.6vw,3rem)] leading-snug">
              Una boda tiene algo único: su contenido no se consume solo hoy.{" "}
              <em className="text-accent">Se vuelve memoria.</em>
            </p>
          </Reveal>
          <Reveal slow delay={0.15}>
            <div className="mt-14 grid grid-cols-3 border-y border-rose/60">
              {["5", "15", "30"].map((y) => (
                <div key={y} className="border-r border-rose/60 py-8 last:border-r-0">
                  <p className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-none">{y}</p>
                  <p className="slate mt-3 text-muted">años después</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal slow delay={0.2}>
            <p className="mx-auto mt-10 max-w-xl leading-relaxed text-muted">
              {t("bodas.memory")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lo que conservamos */}
      <section className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <Reveal slow className="md:col-span-5">
            <p className="slate mb-6 text-accent">Lo que conservamos</p>
            <ul className="font-serif text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.25]">
              {moments.map((m, i) => (
                <li key={m} className={i % 2 ? "italic text-muted" : ""}>
                  {m}.
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-sm leading-relaxed text-muted">
              Y todas esas cosas que ese día pasan demasiado rápido.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 md:col-span-7 md:gap-4">
            {weddingDetails.map((d, i) => (
              <Reveal key={d.src} slow delay={i * 0.06} className={i % 3 === 1 ? "mt-10" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={d.src} alt={d.alt} fill sizes="(min-width: 768px) 28vw, 50vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estilo */}
      <section className="bg-paper px-5 py-24 text-bg md:px-12 md:py-32 lg:px-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal slow className="md:col-span-6">
            <p className="slate mb-6 text-bg/60">Nuestro estilo</p>
            <p className="font-serif text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.08]">
              {STYLE.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < STYLE.length - 1 && <span className="text-rose"> + </span>}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal slow delay={0.15} className="space-y-6 text-lg leading-relaxed text-bg/80 md:col-span-5 md:col-start-8">
            <p>
              Momentos reales, composición visual, narrativa cinematográfica, sonido real, emociones y fiesta.
            </p>
            <p>
              {t("bodas.style.text")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Historias reales */}
      <section id="historias" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
        <Reveal slow>
          <p className="slate mb-4 text-accent">Historias reales</p>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-none">Dos historias que ya contamos</h2>
          <p className="mt-6 font-serif text-2xl italic text-muted">Cada boda es diferente. Nuestra forma de contarla también.</p>
        </Reveal>

        <div className="mt-20 space-y-32">
          {weddings.map((w, wi) => (
            <article key={w.id} className="grid gap-10 md:grid-cols-12 md:gap-8">
              <div className={`md:col-span-4 ${wi % 2 ? "md:order-2 md:col-start-9" : ""}`}>
                <Reveal slow className="md:sticky md:top-28">
                  <p className="slate text-muted">{w.place}</p>
                  <h3 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{w.couple}</h3>
                  <p className="mt-6 leading-relaxed text-muted">{t(`bodas.story.${w.id}`) || w.summary}</p>

                  <p className="slate mt-8 mb-3 text-accent">Momentos</p>
                  <p className="font-serif text-lg italic leading-relaxed">{w.moments.join(" · ")}</p>

                  <p className="slate mt-8 mb-3 text-accent">Entregamos</p>
                  <ul className="space-y-1.5 border-l border-rose pl-4 text-sm">
                    {w.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div className={`grid grid-cols-2 gap-3 md:col-span-8 md:gap-4 ${wi % 2 ? "md:order-1" : ""}`}>
                {w.images.map((img, i) => {
                  // La primera va a lo ancho; si el resto queda impar, la última también.
                  const wide = i === 0 || (i === w.images.length - 1 && (w.images.length - 1) % 2 === 1);
                  return (
                  <Reveal key={img.src} slow delay={i * 0.05} className={wide ? "col-span-2" : ""}>
                    <div className={`relative overflow-hidden ${wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={wide ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 50vw"}
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cómo lo hacemos */}
      <section className="bg-surface px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal slow className="md:col-span-6">
            <p className="slate mb-6 text-accent">Cómo lo hacemos</p>
            <p className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1]">
              Fotografía <span className="text-rose">+</span> cinematografía <span className="text-rose">+</span>{" "}
              narrativa <span className="text-rose">+</span> emoción.
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              No somos alguien que aparece, dispara ocho horas y entrega archivos. Entendemos vuestra historia y la
              contamos con el equipo que haga falta.
            </p>
          </Reveal>
          <Reveal slow delay={0.1} className="md:col-span-5 md:col-start-8">
            <p className="slate mb-4 text-muted">Con qué trabajamos</p>
            <ul className="divide-y divide-rose/50 border-y border-rose/50">
              {gear.map((g) => (
                <li key={g} className="py-3 font-serif text-xl">
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-28 text-center md:px-12 md:py-40 lg:px-20">
        <Reveal slow>
          <p className="slate mb-6 text-accent">¿Os casáis?</p>
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.05]">
            Contadnos vuestra historia. <em className="text-accent">Nosotros la guardamos.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted">
            Trabajamos en toda Catalunya y nos desplazamos allí donde nos lleve vuestra boda — como a Beaucaire.
          </p>
          <Link
            href="/contacto?area=bodas"
            className="slate mt-10 inline-flex bg-accent px-8 py-4 text-bg transition-opacity duration-500 hover:opacity-90"
          >
            Contadnos vuestra boda
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
