"use client";

// "Cómo trabajamos" — pasos concretos numerados como un guion. Editable desde
// /admin/contenido.
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/components/content/ContentProvider";

export default function HowWeWork() {
  const { t, lines } = useContent();
  const steps = lines("home.how.steps");
  const [grey, strong] = lines("home.how.closing");

  return (
    <section className="bg-surface px-5 py-24 md:px-12 md:py-32 lg:px-20">
      <SectionHeading number="02" kicker="Cómo trabajamos" title={t("home.how.title")} />

      <ol className="mt-14 grid gap-px bg-fg/15 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step} className="bg-surface py-6 pr-6 lg:px-6 lg:first:pl-0">
            <Reveal delay={i * 0.06}>
              <p className="poster text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-5 text-lg leading-snug">{step}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      {(grey || strong) && (
        <Reveal className="mt-12">
          <p className="poster text-[clamp(1.8rem,3.6vw,3rem)] text-muted">
            {grey} {strong && <span className="text-fg">{strong}</span>}
          </p>
        </Reveal>
      )}
    </section>
  );
}
