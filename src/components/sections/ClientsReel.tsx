"use client";

// "Han confiado en nosotros" (Laly, 2026-11-19): en vez de reseñas (todavía
// no hay comentarios reales de las marcas, y no se inventan), una cinta en
// movimiento con los nombres reales de clientes y marcas. Sale de lo que ya
// está cargado en /admin/contenido (Página Marcas y Página Eventos).
import { useContent } from "@/components/content/ContentProvider";

export default function ClientsReel() {
  const { lines } = useContent();
  const names = Array.from(
    new Set(
      [...lines("eventos.clients"), ...lines("marcas.brands")].map((l) => l.split(/\s+[—–-]\s+/)[0].trim()).filter(Boolean)
    )
  );
  if (names.length === 0) return null;
  const row = [...names, ...names];

  return (
    <section aria-label="Han confiado en nosotros" className="overflow-hidden border-y border-fg/15 py-8 md:py-10">
      <p className="slate mb-6 px-5 text-muted md:px-12 lg:px-20">Han confiado en nosotros</p>
      <div className="marquee" style={{ animationDuration: `${names.length * 5}s` }}>
        {row.map((n, i) => (
          <span key={i} className="poster flex items-center whitespace-nowrap text-[clamp(2rem,5vw,4rem)] text-fg/85">
            {n}
            <span aria-hidden className="mx-8 inline-block h-3 w-3 rounded-full bg-accent md:mx-12" />
          </span>
        ))}
      </div>
    </section>
  );
}
