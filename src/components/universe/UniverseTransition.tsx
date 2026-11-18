"use client";

// Cortinilla entre universos (Laly, 2026-11-19): al entrar en un universo la
// pantalla se tapa con su color, aparece su nombre enorme, suena su firma y
// se abre ya dentro del universo. Funciona con o sin sonido.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/animation";
import { playUniverse, whoosh, isSoundOn } from "@/lib/sound";
import { UNIVERSES, type Universe } from "@/lib/universes";

const HOME: Universe = {
  id: "estudio",
  href: "/",
  name: "G-creatiON",
  line: "",
  src: "",
  alt: "",
  bg: "#0b0b0c",
  ink: "#f4f2ee",
};

type Go = (href: string) => void;
const Ctx = createContext<Go | null>(null);

export function useUniverseGo() {
  return useContext(Ctx);
}

function universeFor(href: string): Universe | null {
  const path = href.split(/[?#]/)[0];
  if (path === "/" && !href.includes("#")) return HOME;
  return UNIVERSES.find((u) => path === u.href) ?? null;
}

export function UniverseTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Universe | null>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);

  const go = useCallback<Go>(
    (href) => {
      const u = universeFor(href);
      const target = href.split(/[?#]/)[0];
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!u || busy.current || target === pathname || reduced) {
        if (u) playUniverse(u.id);
        router.push(href);
        return;
      }
      busy.current = true;
      pending.current = target;
      setActive(u);
      if (isSoundOn()) {
        whoosh(0);
        playUniverse(u.id);
      }
      router.prefetch(href);
      // Tapa la pantalla y, cuando está tapada, cambia de página.
      requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return router.push(href);
        gsap.killTweensOf(panel);
        gsap.set(panel, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" });
        gsap
          .timeline()
          .to(panel, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power4.inOut" })
          .from(panel.querySelectorAll("[data-tr]"), { yPercent: 120, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.15")
          .add(() => router.push(href), "+=0.15");
      });
      // Por si la navegación tarda o falla, nunca dejar la pantalla tapada.
      window.setTimeout(() => {
        if (busy.current) reveal();
      }, 4000);
    },
    [pathname, router]
  );

  function reveal() {
    const panel = panelRef.current;
    busy.current = false;
    pending.current = null;
    if (!panel) return setActive(null);
    window.scrollTo(0, 0);
    gsap.to(panel, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.65,
      delay: 0.15,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(panel, { display: "none" });
        setActive(null);
      },
    });
  }

  // Ya estamos en la página nueva: abrir la cortinilla.
  useEffect(() => {
    if (pending.current && pathname === pending.current) reveal();
  }, [pathname]);

  const index = active ? UNIVERSES.findIndex((u) => u.id === active.id) : -1;

  return (
    <Ctx.Provider value={go}>
      {children}
      <div
        ref={panelRef}
        aria-hidden
        className="fixed inset-0 z-[100] hidden flex-col items-start justify-end overflow-hidden px-5 pb-12 md:px-12 md:pb-16 lg:px-20"
        style={{ background: active?.bg, color: active?.ink }}
      >
        {active && (
          <>
            <p className="slate mb-6 overflow-hidden opacity-70">
              <span data-tr className="inline-flex items-center gap-3">
                <span className="rec" style={{ background: "currentColor" }} />
                {index >= 0 ? `Universo ${String(index + 1).padStart(2, "0")} / 05` : "Estudio creativo & digital"}
              </span>
            </p>
            <p className="overflow-hidden">
              <span
                data-tr
                className={`block leading-[0.85] ${
                  active.serif ? "font-serif italic text-[clamp(4rem,15vw,14rem)]" : "poster text-[clamp(4rem,16vw,15rem)]"
                }`}
              >
                {active.name}
              </span>
            </p>
          </>
        )}
      </div>
    </Ctx.Provider>
  );
}
