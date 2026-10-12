"use client";

// Filosofía — una frase por fotograma, con rótulo de claqueta, y el remate en
// la banda blanca invertida. Editable desde /admin/contenido.
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/components/content/ContentProvider";

export default function Philosophy() {
  const { t, lines } = useContent();
  const frames = lines("home.philosophy.frames");
  // La última palabra de la frase final va en naranja.
  const title = t("home.philosophy.title").trim();
  const cut = title.lastIndexOf(" ");
  const [head, last] = cut > 0 ? [title.slice(0, cut), title.slice(cut + 1)] : ["", title];

  return (
    <section aria-label="Filosofía">
      {frames.map((line, i) => (
        <div
          key={line}
          className="grain relative flex min-h-[46svh] flex-col justify-center border-t border-fg/10 px-5 md:min-h-[58svh] md:px-12 lg:px-20"
        >
          <Reveal className="relative z-10">
            <p className="slate mb-6 flex items-center gap-3 text-muted">
              <span className="rec" /> Plano {String(i + 1).padStart(2, "0")}
            </p>
            <p className="poster max-w-[16ch] text-[clamp(2.6rem,8vw,7rem)]">{line}</p>
          </Reveal>
        </div>
      ))}

      <div className="bg-paper px-5 py-24 text-bg md:px-12 md:py-36 lg:px-20">
        <Reveal>
          <p className="poster text-[clamp(3rem,10vw,9rem)]">
            {head} <span className="text-accent">{last}</span>
          </p>
        </Reveal>
        {t("home.philosophy.text") && (
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-bg/80 md:text-2xl">{t("home.philosophy.text")}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
