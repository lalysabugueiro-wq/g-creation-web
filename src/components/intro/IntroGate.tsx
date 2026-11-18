"use client";

// Entrada de cine (Laly, 2026-11-19): la web tiene que atrapar desde el
// primer segundo. Pantalla negra con la marca y dos puertas: entrar con
// sonido o sin sonido (los navegadores no dejan sonar nada hasta que la
// persona toca algo, así que esta elección es también la que enciende el
// audio). Después: cuenta atrás de película 3·2·1 con los universos pasando
// detrás, corte, y se abre la portada. Una sola vez por visita.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/animation";
import { introCountdown, setSoundOn } from "@/lib/sound";
import { UNIVERSES } from "@/lib/universes";
import Wordmark from "@/components/ui/Wordmark";

const SEEN = "gc-intro-seen";
const STEP = 0.55;

let pending = false;
const waiters: Array<() => void> = [];

/** La portada espera a que se abra la intro para animar su titular. */
export function whenIntroDone(cb: () => void) {
  if (!pending) cb();
  else waiters.push(cb);
}

function finish() {
  pending = false;
  waiters.splice(0).forEach((cb) => cb());
}

export default function IntroGate() {
  const [show, setShow] = useState(() => {
    if (typeof window !== "undefined") pending = true;
    return true;
  });
  const [phase, setPhase] = useState<"choose" | "count">("choose");
  const [count, setCount] = useState(3);
  const rootRef = useRef<HTMLDivElement>(null);

  // Ya la vio en esta visita (o prefiere sin movimiento): directo a la portada.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) {
      queueMicrotask(() => setShow(false));
      finish();
      return;
    }
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const root = rootRef.current;
    if (root) {
      gsap.from(root.querySelectorAll("[data-in]"), {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }
    return () => {
      html.style.overflow = "";
    };
  }, []);

  function open() {
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {}
    const root = rootRef.current;
    const done = () => {
      document.documentElement.style.overflow = "";
      setShow(false);
      finish();
    };
    if (!root) return done();
    gsap
      .timeline({ onComplete: done })
      .to(root.querySelector("[data-flash]"), { opacity: 1, duration: 0.06 })
      .to(root.querySelector("[data-flash]"), { opacity: 0, duration: 0.25 })
      .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "power4.inOut" }, "-=0.1");
    // La portada empieza a animarse mientras la cortina sube.
    window.setTimeout(finish, 450);
  }

  function enter(withSound: boolean) {
    setSoundOn(withSound);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return open();
    setPhase("count");
    if (withSound) introCountdown(STEP);
    setCount(3);
    window.setTimeout(() => setCount(2), STEP * 1000);
    window.setTimeout(() => setCount(1), STEP * 2000);
    window.setTimeout(open, STEP * 3000);
  }

  if (!show) return null;

  // Una foto de universo detrás de cada número.
  const frame = UNIVERSES[(3 - count) % UNIVERSES.length];

  return (
    <div
      ref={rootRef}
      data-lenis-prevent
      className="grain fixed inset-0 z-[90] flex flex-col overflow-hidden bg-bg text-fg"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      role="dialog"
      aria-label="Entrada a G-creatiON"
    >
      {phase === "count" && (
        <>
          <div key={frame.id} className="absolute inset-0 animate-[intro-cut_0.55s_ease-out]">
            <Image src={frame.src} alt="" fill sizes="100vw" className="object-cover opacity-45" priority />
            <div className="absolute inset-0 bg-bg/40" />
          </div>
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
            <div className="relative grid h-[min(62vw,22rem)] w-[min(62vw,22rem)] place-items-center">
              <div className="leader absolute inset-0 rounded-full" />
              <div className="absolute inset-[6%] rounded-full border border-fg/40" />
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-fg/30" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-fg/30" />
              <span key={count} className="poster relative text-[min(38vw,13rem)] leading-none animate-[intro-num_0.55s_ease-out]">
                {count}
              </span>
            </div>
            <p className="slate mt-8 text-fg/80">
              Universo {String(4 - count).padStart(2, "0")} · {frame.name}
            </p>
          </div>
        </>
      )}

      {phase === "choose" && (
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p data-in className="slate mb-8 flex items-center gap-3 text-accent">
            <span className="rec" /> REC · Camprodon · Pirineo
          </p>
          <p data-in className="text-[clamp(3.4rem,13vw,10rem)] leading-none">
            <Wordmark />
          </p>
          <p data-in className="mt-6 max-w-md text-lg text-fg/80 md:text-xl">
            Cinco universos. Una forma de mirar.
          </p>
          <div data-in className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => enter(true)}
              className="slate group inline-flex items-center gap-3 bg-accent px-8 py-5 text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span aria-hidden className="flex h-3 items-end gap-[2px]">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="eq-bar w-[2px] bg-current" style={{ animationDelay: `${i * 0.13}s` }} />
                ))}
              </span>
              Entrar con sonido
            </button>
            <button
              type="button"
              onClick={() => enter(false)}
              className="slate border border-fg/30 px-8 py-5 text-fg/80 transition-colors hover:border-fg hover:text-fg"
            >
              Entrar sin sonido
            </button>
          </div>
          <p data-in className="slate mt-10 text-fg/40">
            Recomendado con sonido 🎧
          </p>
        </div>
      )}

      <div data-flash className="pointer-events-none absolute inset-0 z-20 bg-paper opacity-0" />
    </div>
  );
}
