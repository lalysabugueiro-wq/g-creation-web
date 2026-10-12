import Reveal from "./Reveal";

type SectionHeadingProps = {
  number: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
};

// Cabecera de capítulo tipo guion: número + rótulo a la izquierda, titular de
// cartel a la derecha, separado por un filete (branding.md → Layout).
export default function SectionHeading({ number, kicker, title, lead, className = "" }: SectionHeadingProps) {
  return (
    <div className={`grid gap-6 border-t border-fg/15 pt-6 md:grid-cols-12 md:gap-8 ${className}`}>
      <Reveal className="md:col-span-3">
        <p className="slate flex items-center gap-3 text-muted">
          <span className="text-accent">{number}</span>
          <span className="h-px w-6 bg-fg/25" />
          {kicker}
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 className="poster text-[clamp(2.4rem,6vw,5rem)]">{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
