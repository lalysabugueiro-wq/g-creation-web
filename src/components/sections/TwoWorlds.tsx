// "Dos almas" (Laly, 2026-09-23): la home presenta los dos mundos sin mezclar
// públicos. Izquierda, el estudio (paleta negra/naranja); derecha, Weddings
// con su propia paleta (`.theme-wed`), que abre un universo aparte en /bodas.
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Wordmark from "@/components/ui/Wordmark";
import { POSITIONING } from "@/lib/mock/seed";

const STUDIO = ["Marcas", "Empresas", "Turismo", "Eventos", "Experiencias", "Deporte", "Gastronomía"];
const WEDDINGS = ["Parejas", "Bodas", "Fotografía", "Cine", "Emoción"];

export default function TwoWorlds() {
  return (
    <section className="grid md:grid-cols-2">
      <Link href="#areas" className="group block border-t border-fg/15 bg-bg px-5 py-14 md:px-12 md:py-20 lg:px-20">
        <Reveal>
          <p className="slate text-muted">Para</p>
          <p className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)]">
            <Wordmark />
          </p>
          <p className="slate mt-4 text-accent">{POSITIONING}</p>
          <p className="mt-6 max-w-sm leading-relaxed text-fg/80">{STUDIO.join(" · ")}</p>
          <p className="slate mt-10 inline-flex items-center gap-3 text-accent">
            Qué hacemos <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </p>
        </Reveal>
      </Link>

      <Link href="/bodas" className="theme-wed group block px-5 py-14 md:px-12 md:py-20 lg:px-20">
        <Reveal slow>
          <p className="slate text-muted">Para</p>
          <p className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] leading-none">
            <Wordmark />{" "}
            <span className="font-serif text-[0.8em] italic text-accent">weddings</span>
          </p>
          <p className="mt-6 max-w-sm font-serif text-xl leading-relaxed">{WEDDINGS.join(" · ")}</p>
          <p className="slate mt-10 inline-flex items-center gap-3 text-accent">
            Entrar en Weddings <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </p>
        </Reveal>
      </Link>
    </section>
  );
}
