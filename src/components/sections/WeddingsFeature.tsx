// Entrada a G-creatiON Weddings justo debajo del hero (pedido de Laly: "la boda
// más arriba"). Usa `.theme-wed`, así que el bloque ya se ve con la paleta de la
// sub-marca y anticipa lo que hay en /bodas.
"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { weddings } from "@/lib/mock/seed";
import { useContent } from "@/components/content/ContentProvider";

export default function WeddingsFeature() {
  const { t } = useContent();
  return (
    <section className="theme-wed px-5 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <Reveal slow className="md:col-span-5">
          <figure>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={t("home.weddings.image")}
                alt={t("home.weddings.imageCaption") || "Novios"}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-3 font-serif text-lg italic text-muted">
              <span className="h-px w-8 bg-rose" /> {t("home.weddings.imageCaption")}
            </figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal slow>
            <p className="slate mb-6 text-accent">G-creatiON Weddings</p>
          </Reveal>
          <Reveal slow delay={0.1}>
            <h2 className="font-serif text-[clamp(2.3rem,4.8vw,4.4rem)] leading-[1.04]">
              {t("home.weddings.title")}{" "}
              <em className="text-accent">{t("home.weddings.titleAccent")}</em>
            </h2>
          </Reveal>
          <Reveal slow delay={0.2}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              {t("home.weddings.text")}
            </p>
          </Reveal>

          <Reveal slow delay={0.25}>
            <p className="slate mt-12 mb-2 text-accent">Historias que ya contamos</p>
            <ul className="divide-y divide-rose/50 border-y border-rose/50">
              {weddings.map((w) => (
                <li key={w.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span className="font-serif text-2xl">{w.couple}</span>
                  <span className="text-sm text-muted">{w.place}.</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif text-xl italic">{t("home.weddings.closing")}</p>
          </Reveal>

          <Reveal slow delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/bodas"
                className="slate bg-accent px-7 py-4 text-bg transition-opacity duration-500 hover:opacity-90"
              >
                Entrar en Weddings
              </Link>
              <Link href="/contacto?area=bodas" className="slate link-quiet text-fg">
                Cuéntennos su boda →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
