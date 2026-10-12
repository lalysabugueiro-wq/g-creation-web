// Plantilla común de las páginas legales: sobria, legible, sin animaciones.
export default function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="px-5 pb-28 pt-32 md:px-12 md:pt-44 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <p className="slate mb-6 text-accent">{kicker}</p>
        <h1 className="poster text-[clamp(2.6rem,7vw,5rem)]">{title}</h1>
        <p className="slate mt-6 text-muted">Última actualización: {updated}</p>
        <div className="mt-14 space-y-10 leading-relaxed text-fg/85 [&_h2]:font-display [&_h2]:uppercase [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:leading-none [&_h2]:text-fg [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </main>
  );
}
