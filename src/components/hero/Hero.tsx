"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/animation";
import { useContent } from "@/components/content/ContentProvider";
import UniverseLink from "@/components/universe/UniverseLink";
import { whenIntroDone } from "@/components/intro/IntroGate";
import { UNIVERSES } from "@/lib/universes";

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

// Titular (Laly, 2026-11-21): su tamaño depende también del alto de la
// pantalla y deja sitio arriba, para no taparse nunca con el menú.
// Portada viva (Laly, 2026-11-19): los cinco universos pasan uno detrás de
// otro como un tráiler. Al pasar el ratón por un universo, la portada salta a
// él (sin sonido: Laly, 2026-11-21).
const ORDER = ["sport", "weddings", "eventos", "marcas", "diseno"] as const;
const HOLD = 3800;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { t, lines } = useContent();
  const LINES = lines("home.hero.headline");
  const heroImageA = t("home.hero.imageA");
  // La primera foto sigue siendo la que se elige en /admin (portada).
  const frames = ORDER.map((id) => {
    const u = UNIVERSES.find((x) => x.id === id)!;
    return id === "sport" && heroImageA ? { ...u, src: heroImageA } : u;
  });
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);

  const jump = useCallback((i: number) => {
    setIdx(i);
    setSeen((s) => (s.includes(i) ? [...s.filter((x) => x !== i), i] : [...s, i]));
  }, []);

  // Avanza solo, salvo cuando la persona está eligiendo.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => jump((idx + 1) % frames.length), HOLD);
    return () => window.clearTimeout(id);
  }, [idx, paused, jump, frames.length]);

  useEffect(() => {
    const headline = headlineRef.current;
    const root = rootRef.current;
    if (!headline || !root) return;

    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    const start = () => {
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
    };
    // Espera a que se abra la intro de cine (si la hay) y a las fuentes.
    whenIntroDone(() => document.fonts.ready.then(start));

    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, []);

  return (
    <section ref={rootRef} className="grain relative min-h-svh overflow-hidden bg-bg">
      {/* Tráiler de universos: la foto activa entra con un corte en barrido
          sobre la anterior. */}
      <div className="absolute inset-0 isolate">
        {frames.map((f, i) => {
          const layer = seen.indexOf(i);
          const active = i === idx;
          const prev = !active && layer === seen.length - 2;
          if (!active && !prev && !(i === 0 && seen.length === 1)) return null;
          return (
            <div
              key={f.id + (active ? "-on" : "")}
              className={`absolute inset-0 overflow-hidden ${active && seen.length > 1 ? "reel-in" : ""}`}
              style={{ zIndex: active ? 2 : 1 }}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover kenburns ${f.id === "weddings" ? "grayscale" : ""}`}
                style={f.heroPos || f.pos ? { objectPosition: f.heroPos || f.pos } : undefined}
              />
            </div>
          );
        })}
        {/* Precarga silenciosa de las demás fotos */}
        <div className="hidden">
          {frames.slice(1).map((f) => (
            <Image key={f.id} src={f.src} alt="" width={16} height={9} sizes="100vw" />
          ))}
        </div>
      </div>

      {/* Grading de branding.md: negro al 55% + tinte naranja en los altos */}
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-bg/40" />

      <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-10 pt-36 md:px-12 md:pb-14 md:pt-40 lg:px-20">
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
          className="poster max-w-[14ch] text-fg text-[clamp(2.6rem,min(7.2vw,10.5svh),7rem)] md:max-w-[60%]"
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

          <nav
            data-hero-fade
            aria-label="Universos"
            className="flex flex-wrap items-center gap-2"
            onMouseLeave={() => setPaused(false)}
          >
            {frames.map((u, i) => (
              <UniverseLink
                key={u.href}
                href={u.href}
                onMouseEnter={() => {
                  setPaused(true);
                  if (i !== idx) jump(i);
                }}
                onFocus={() => {
                  setPaused(true);
                  jump(i);
                }}
                className={`slate relative overflow-hidden border px-4 py-3 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg ${
                  i === idx ? "border-accent text-fg" : "border-fg/30 text-fg"
                }`}
              >
                {u.name}
                {i === idx && !paused && (
                  <span
                    key={`p-${idx}-${seen.length}`}
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                    style={{ animation: `reel-progress ${HOLD}ms linear both` }}
                  />
                )}
              </UniverseLink>
            ))}
          </nav>
        </div>

        <div
          data-hero-fade
          aria-hidden
          className="pointer-events-none absolute right-5 top-28 flex flex-col items-end gap-3 text-right md:right-12 lg:right-20"
        >
          <span className="slate hidden text-fg/55 md:block">
            <Timecode />
          </span>
          <span className="slate text-fg/70">
            Universo {String(idx + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
          </span>
          <span className="block overflow-hidden">
            <span
              key={frames[idx].id}
              className={`reel-name block text-accent ${
                frames[idx].serif
                  ? "font-serif italic text-[clamp(2.2rem,5vw,4.4rem)] leading-none"
                  : "poster text-[clamp(2.2rem,5vw,4.4rem)]"
              }`}
            >
              {frames[idx].name}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
