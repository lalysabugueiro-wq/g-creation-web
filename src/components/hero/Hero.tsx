"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroCanvas from "./HeroCanvas";
import { gsap } from "@/lib/animation";
import { useContent } from "@/components/content/ContentProvider";

// Timecode que corre como el de una cámara grabando: el "ON" de la marca.
function Timecode() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1000 / 25);
    return () => clearInterval(id);
  }, []);
  const f = t % 25;
  const s = Math.floor(t / 25) % 60;
  const m = Math.floor(t / 1500) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="tabular-nums">
      00:{pad(m)}:{pad(s)}:{pad(f)}
    </span>
  );
}


const UNIVERSE_LINKS = [
  { href: "/bodas", label: "Weddings" },
  { href: "/sport", label: "Sport" },
  { href: "/eventos", label: "Eventos" },
  { href: "/marcas", label: "Marcas" },
  { href: "/diseno-web", label: "Diseño & Web" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { t, lines } = useContent();
  const LINES = lines("home.hero.headline");
  const heroImageA = t("home.hero.imageA");
  const heroImageB = t("home.hero.imageB");

  useEffect(() => {
    const headline = headlineRef.current;
    const root = rootRef.current;
    if (!headline || !root) return;

    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      gsap.set(headline, { visibility: "visible" });
      // Cortes secos, como un montaje (branding.md → Movimiento).
      tl = gsap.timeline({ delay: 0.2 });
      tl.from(headline.querySelectorAll("[data-hero-line]"), {
        yPercent: 110,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
      });
      tl.from(
        root.querySelectorAll("[data-hero-fade]"),
        { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.07, ease: "power3.out" },
        "-=0.2"
      );
    });

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, []);

  return (
    <section ref={rootRef} className="grain relative h-svh min-h-[680px] overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <Image
          src={heroImageA}
          alt="G-creatiON"
          fill
          priority
          sizes="100vw"
          className="object-cover kenburns"
        />
      </div>

      <HeroCanvas imageA={heroImageA} imageB={heroImageB} className="absolute inset-0" />

      {/* Grading de branding.md: negro al 55% + tinte naranja en los altos */}
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-bg/40" />

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-12 md:pb-14 lg:px-20">
        <p data-hero-fade className="slate mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-fg/80">
          <span className="inline-flex items-center gap-2 text-accent">
            <span className="rec" /> REC
          </span>
          <span>Estudio creativo & digital</span>
          <span className="text-fg/40">/</span>
          <span>Camprodon · Pirineo catalán</span>
        </p>

        <h1
          ref={headlineRef}
          style={{ visibility: "hidden" }}
          className="poster max-w-[14ch] text-fg text-[clamp(2.9rem,8.4vw,7.6rem)]"
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-hero-line className={`block ${i === LINES.length - 1 ? "text-accent" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-9 flex flex-col gap-7 border-t border-fg/15 pt-7 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-md text-[15px] leading-relaxed text-fg/85 md:text-base">
            {t("home.hero.sub")}
          </p>

          <nav data-hero-fade aria-label="Universos" className="flex flex-wrap items-center gap-2">
            {UNIVERSE_LINKS.map((u) => (
              <Link
                key={u.href}
                href={u.href}
                className="slate border border-fg/30 px-4 py-3 text-fg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg"
              >
                {u.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          data-hero-fade
          aria-hidden
          className="slate pointer-events-none absolute right-5 top-28 hidden text-fg/55 md:block md:right-12 lg:right-20"
        >
          <Timecode />
        </div>
      </div>
    </section>
  );
}
