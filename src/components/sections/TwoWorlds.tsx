// Las puertas de la home (Laly, 2026-09-23 y 2026-10-12): el estudio, y dos
// universos con página propia — Weddings (/bodas, paleta piedra/eucalipto) y
// Sport (/sport, naranja a sangre). Cada uno habla a su público sin mezclarlo.
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Wordmark from "@/components/ui/Wordmark";
import { POSITIONING } from "@/lib/mock/seed";

const STUDIO = ["Marcas", "Empresas", "Turismo", "Eventos", "Experiencias", "Gastronomía", "Web"];
const WEDDINGS = ["Parejas", "Bodas", "Fotografía", "Cine", "Emoción"];
const SPORT = ["Carreras", "Montaña", "Clubes", "Competición", "Esfuerzo"];

export default function TwoWorlds() {
  return (
    <section className="grid md:grid-cols-3">
      <Link href="#areas" className="group block border-t border-fg/15 bg-bg px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <Reveal>
          <p className="slate text-muted">Para</p>
          <p className="mt-6 text-[clamp(2.2rem,3.6vw,3.6rem)]">
            <Wordmark />
          </p>
          <p className="slate mt-4 text-accent">{POSITIONING}</p>
          <p className="mt-6 max-w-sm leading-relaxed text-fg/80">{STUDIO.join(" · ")}</p>
          <p className="slate mt-10 inline-flex items-center gap-3 text-accent">
            Qué hacemos <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </p>
        </Reveal>
      </Link>

      <Link href="/bodas" className="theme-wed group block px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <Reveal slow>
          <p className="slate text-muted">Para</p>
          <p className="mt-6 text-[clamp(2.2rem,3.6vw,3.6rem)] leading-none">
            <Wordmark />{" "}
            <span className="font-serif text-[0.8em] italic text-accent">weddings</span>
          </p>
          <p className="mt-6 max-w-sm font-serif text-xl leading-relaxed">{WEDDINGS.join(" · ")}</p>
          <p className="slate mt-10 inline-flex items-center gap-3 text-accent">
            Entrar en Weddings <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </p>
        </Reveal>
      </Link>

      <Link href="/sport" className="group block bg-accent px-5 py-14 text-bg md:px-10 md:py-20 lg:px-14">
        <Reveal>
          <p className="slate text-bg/60">Para</p>
          <p className="mt-6 text-[clamp(2.2rem,3.6vw,3.6rem)] leading-none">
            <Wordmark mono />{" "}
            <span className="poster text-[0.8em]">sport</span>
          </p>
          <p className="slate mt-4 text-bg/70">Km 0 → Meta</p>
          <p className="mt-6 max-w-sm leading-relaxed text-bg/85">{SPORT.join(" · ")}</p>
          <p className="slate mt-10 inline-flex items-center gap-3">
            Entrar en Sport <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </p>
        </Reveal>
      </Link>
    </section>
  );
}
