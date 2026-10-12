"use client";

// CRM liviano (modulos/05-panel.md): las personas que consultaron, agrupadas
// por email, con su historial de consultas.
import Link from "next/link";
import { useMemo } from "react";
import { useInquiryStore } from "@/lib/inquiries";
import { PageTitle, STATUS_DOT, STATUS_LABEL, dateFmt } from "@/components/admin/ui";

export default function ContactosPage() {
  const { inquiries } = useInquiryStore();

  const people = useMemo(() => {
    const map = new Map<string, typeof inquiries>();
    for (const i of inquiries) {
      const key = (i.email || i.phone).toLowerCase();
      map.set(key, [...(map.get(key) ?? []), i]);
    }
    return [...map.values()]
      .map((list) => list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
      .sort((a, b) => b[0].createdAt.localeCompare(a[0].createdAt));
  }, [inquiries]);

  return (
    <main>
      <PageTitle kicker="Contactos" title={`${people.length} personas`} />

      <ul className="grid gap-3 xl:grid-cols-2">
        {people.map((list) => {
          const p = list[0];
          const areas = [...new Set(list.map((i) => i.reason).filter(Boolean))];
          return (
            <li key={p.email + p.phone} className="border border-fg/15 bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="mt-0.5 break-all text-xs text-muted">
                    {p.email} · {p.phone}
                  </p>
                </div>
                <p className="slate text-accent">
                  {list.length} {list.length === 1 ? "consulta" : "consultas"}
                </p>
              </div>
              <p className="mt-3 text-xs text-muted">{areas.join(" · ")}</p>
              <ul className="mt-4 space-y-1 border-t border-fg/10 pt-3">
                {list.map((i) => (
                  <li key={i.id}>
                    <Link href={`/admin/consultas?id=${i.id}`} className="flex items-center gap-3 py-1 text-sm hover:text-accent">
                      <span className={`inline-block size-1.5 rounded-full ${STATUS_DOT[i.status]}`} aria-label={STATUS_LABEL[i.status]} />
                      <span className="truncate">{i.message}</span>
                      <span className="ml-auto shrink-0 text-xs text-muted" suppressHydrationWarning>
                        {dateFmt.format(new Date(i.createdAt))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
