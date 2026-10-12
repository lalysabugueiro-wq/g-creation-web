"use client";

// Cifras — solo datos reales (investigacion.md). Editables: "número | texto".
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/components/content/ContentProvider";

export default function WhyUs() {
  const { pairs } = useContent();
  const items = pairs("home.highlights", /\s*\|\s*/);
  if (items.length === 0) return null;

  return (
    <section className="px-5 py-16 md:px-12 md:py-20 lg:px-20">
      <dl className="grid gap-10 border-y border-fg/15 py-12 sm:grid-cols-3 lg:gap-8">
        {items.map(([value, label], i) => (
          <Reveal key={value + label} delay={i * 0.05}>
            <dt className="poster text-[clamp(2.6rem,5vw,4.2rem)] text-accent">{value}</dt>
            <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-fg/80">{label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
