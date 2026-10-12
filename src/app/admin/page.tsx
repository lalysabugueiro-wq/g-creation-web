"use client";

// Resumen del panel liviano (modulos/05-panel.md): KPIs simples —semana, mes,
// sin responder— y de qué área llegan las consultas. El "sin responder" es el
// número que más importa: una consulta perdida en WhatsApp es un proyecto que
// no se hizo.
import Link from "next/link";
import { useInquiryStore } from "@/lib/inquiries";
import { areaIdToName, areas } from "@/lib/mock/seed";
import { KpiCard, PageTitle, STATUS_DOT, STATUS_LABEL, dateFmt } from "@/components/admin/ui";

export default function AdminHome() {
  const { inquiries, loading } = useInquiryStore();

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const thisWeek = inquiries.filter((i) => now - new Date(i.createdAt).getTime() <= 7 * day).length;
  const thisMonth = inquiries.filter((i) => now - new Date(i.createdAt).getTime() <= 30 * day).length;
  const unanswered = inquiries.filter((i) => i.status === "nueva");
  const weddings = inquiries.filter((i) => i.reason === areaIdToName.bodas).length;

  const byArea = areas.map((a) => ({ area: a, count: inquiries.filter((i) => i.reason === a.name).length }));
  const max = Math.max(1, ...byArea.map((b) => b.count));

  return (
    <main>
      <PageTitle kicker="Panel" title="Resumen" />
      {loading && <p className="mb-6 text-sm text-muted">Cargando consultas…</p>}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Sin responder" value={String(unanswered.length)} hint="Consultas nuevas" highlight={unanswered.length > 0} />
        <KpiCard label="Esta semana" value={String(thisWeek)} />
        <KpiCard label="Últimos 30 días" value={String(thisMonth)} />
        <KpiCard label="Bodas" value={String(weddings)} hint="Consultas de Weddings" />
      </section>

      <div className="mt-10 grid gap-10 xl:grid-cols-2">
        <section>
          <h2 className="slate mb-4 text-muted">Consultas por área</h2>
          <ul className="space-y-4 border border-fg/15 bg-surface p-5">
            {byArea.map(({ area, count }) => (
              <li key={area.id}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{area.name}</span>
                  <span className="tabular-nums text-muted">{count}</span>
                </div>
                <div className="h-2 bg-fg/10">
                  <div className="h-full bg-accent" style={{ width: `${(count / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="slate text-muted">Por responder</h2>
            <Link href="/admin/consultas" className="slate link-quiet text-accent">
              Ir a la bandeja →
            </Link>
          </div>
          {unanswered.length === 0 ? (
            <p className="border border-fg/15 bg-surface p-6 text-sm text-muted">Todo respondido. Buen trabajo.</p>
          ) : (
            <ul className="border border-fg/15 bg-surface">
              {unanswered.slice(0, 5).map((i) => (
                <li key={i.id} className="border-b border-fg/10 last:border-b-0">
                  <Link href={`/admin/consultas?id=${i.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-fg/5">
                    <span className={`inline-block size-2 shrink-0 rounded-full ${STATUS_DOT[i.status]}`} aria-label={STATUS_LABEL[i.status]} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{i.name}</span>
                      <span className="block truncate text-xs text-muted">
                        {i.reason} · {i.projectFormat}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-muted" suppressHydrationWarning>
                      {dateFmt.format(new Date(i.createdAt))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
