"use client";

// Guille y Laly — la sección más humana de la home: texto en primera persona,
// fotos de los dos y el origen del nombre. Textos y fotos editables desde
// /admin/contenido. Falta una foto de los dos trabajando (sesión pendiente).
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/components/content/ContentProvider";

export default function About() {
  const { t } = useContent();
  const portraits = [
    { src: t("home.about.photoGuille"), alt: "Guille con la cámara", name: "Guille" },
    { src: t("home.about.photoLaly"), alt: "Retrato de Laly", name: "Laly" },
  ];

  return (
    <section id="estudio" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHeading
        number="03"
        kicker="Quiénes somos"
        title={
          <>
            Guille y Laly.
            <br />
            <span className="text-muted">{t("home.about.subtitle")}</span>
          </>
        }
      />

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Reveal>
            <figure>
              <div className="viewfinder relative aspect-[4/5] overflow-hidden">
                <Image
                  src={t("home.about.photoPair")}
                  alt="Guille y Laly, de G-creatiON"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
              <figcaption className="slate mt-3 text-muted">Guille & Laly</figcaption>
            </figure>
          </Reveal>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {portraits.map((p, i) => (
              <Reveal key={p.name} delay={0.06 * (i + 1)}>
                <figure>
                  <div className="group relative aspect-square overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 50vw"
                      className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="slate mt-2 text-muted">{p.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="space-y-8 md:col-span-6 md:col-start-7 md:self-center">
          <Reveal>
            <p className="poster text-[clamp(2.4rem,4.6vw,4rem)]">{t("home.about.lead")}</p>
          </Reveal>
          {t("home.about.roles") && (
            <Reveal delay={0.03}>
              <p className="text-xl leading-relaxed text-accent md:text-2xl">{t("home.about.roles")}</p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <p className="text-xl leading-relaxed md:text-2xl">{t("home.about.p1")}</p>
          </Reveal>
          {["home.about.p2", "home.about.p3"].map((k, i) =>
            t(k) ? (
              <Reveal key={k} delay={0.1 + i * 0.05}>
                <p className="text-lg leading-relaxed text-fg/80">{t(k)}</p>
              </Reveal>
            ) : null
          )}

          <Reveal delay={0.2}>
            <div className="border-l-2 border-accent pl-6">
              <p className="slate text-accent">El nombre</p>
              <p className="mt-3 leading-relaxed text-fg/85">
                La <strong className="text-fg">G</strong> es de Guille. <strong className="text-fg">creatiON</strong>{" "}
                junta creatividad con el <span className="text-accent">ON</span> de encendido: el momento en que algo
                empieza.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
