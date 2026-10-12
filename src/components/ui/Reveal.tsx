"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animation";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  // Estudio: corte seco (0.6s). Bodas: fundido lento (1.2s) — branding.md.
  slow?: boolean;
};

export default function Reveal({ children, className, delay = 0, y = 28, slow = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: slow ? 1.2 : 0.6,
        delay,
        ease: slow ? "power2.out" : "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, slow]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}
