// Reseñas — sección propia (modulos/03-sitio-base.md). Solo citas TEXTUALES
// reales de investigacion.md. G-creatiON todavía no entregó ninguna: con la
// lista vacía la sección no se renderiza (nunca se completa inventando).
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviews } from "@/lib/mock/seed";

export default function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHeading number="—" kicker="Lo que dicen" title="Palabras de quien estuvo allí." />
      <div className="mt-16 grid gap-px bg-fg/15 md:grid-cols-2">
        {reviews.map((r, i) => (
          <Reveal key={r.quote} delay={i * 0.05} className="bg-bg p-8">
            <blockquote className="text-xl leading-relaxed">“{r.quote}”</blockquote>
            <p className="slate mt-6 text-muted">
              {r.author} · {r.source}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
