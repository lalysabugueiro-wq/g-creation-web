"use client";

// Bandeja de consultas — panel liviano `profesional` (modulos/05-panel.md):
// estado (nueva / respondida / cerrada), filtros por estado y área, búsqueda,
// y la ficha completa del brief con respuesta directa por WhatsApp o email.
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInquiryStore } from "@/lib/inquiries";
import { areas } from "@/lib/mock/seed";
import type { InquiryStatus } from "@/lib/mock/types";
import { PageTitle, STATUS_DOT, STATUS_LABEL, dateFmt } from "@/components/admin/ui";

const CONTACT_LABEL = { mail: "Email", telefono: "Teléfono", whatsapp: "WhatsApp" } as const;

function pill(active: boolean) {
  return `slate border px-3.5 py-2 transition-colors ${
    active ? "border-accent bg-accent text-bg" : "border-fg/20 text-muted hover:border-fg/60 hover:text-fg"
  }`;
}

function ConsultasContent() {
  const store = useInquiryStore();
  const router = useRouter();
  const selectedId = useSearchParams().get("id");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "">("");
  const [areaFilter, setAreaFilter] = useState("");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return store.inquiries.filter(
      (i) =>
        (!statusFilter || i.status === statusFilter) &&
        (!areaFilter || i.reason === areaFilter) &&
        (!needle ||
          [i.name, i.email, i.phone, i.message, i.location].some((v) => v?.toLowerCase().includes(needle)))
    );
  }, [store.inquiries, statusFilter, areaFilter, q]);

  const selected = selectedId ? store.inquiries.find((i) => i.id === selectedId) : null;

  return (
    <main>
      <PageTitle kicker="Consultas" title="Bandeja" />

      {selected && (
        <section className="mb-10 border border-fg/15 bg-surface p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="slate text-accent">
                {selected.reason} · {selected.projectFormat}
              </p>
              <h2 className="poster mt-2 text-4xl">{selected.name}</h2>
              <p className="mt-2 text-sm text-muted" suppressHydrationWarning>
                Recibida el {dateFmt.format(new Date(selected.createdAt))}
              </p>
            </div>
            <button onClick={() => router.push("/admin/consultas")} className="slate text-muted underline underline-offset-4">
              Cerrar
            </button>
          </div>

          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="slate text-muted">Cuándo</dt>
              <dd className="mt-1">{selected.eventDate || "—"}</dd>
            </div>
            <div>
              <dt className="slate text-muted">Dónde</dt>
              <dd className="mt-1">{selected.location || "—"}</dd>
            </div>
            <div>
              <dt className="slate text-muted">Contacto</dt>
              <dd className="mt-1 break-all">
                {selected.phone} · {selected.email}
              </dd>
            </div>
            <div>
              <dt className="slate text-muted">Prefiere</dt>
              <dd className="mt-1">{selected.preferredContact ? CONTACT_LABEL[selected.preferredContact] : "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="slate text-muted">La idea</dt>
              <dd className="mt-1 whitespace-pre-line text-base leading-relaxed">{selected.message}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-fg/10 pt-6">
            <a
              href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${selected.name.split(" ")[0]}, somos G-creatiON. `)}`}
              target="_blank"
              rel="noreferrer"
              className="slate bg-accent px-4 py-2.5 text-bg"
            >
              Responder por WhatsApp
            </a>
            <a href={`mailto:${selected.email}?subject=${encodeURIComponent("Tu proyecto con G-creatiON")}`} className="slate border border-fg/30 px-4 py-2.5">
              Responder por email
            </a>
            <span className="mx-2 hidden h-6 w-px bg-fg/15 sm:block" />
            {(Object.keys(STATUS_LABEL) as InquiryStatus[]).map((s) => (
              <button key={s} onClick={() => store.setInquiryStatus(selected.id, s)} className={pill(selected.status === s)}>
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="mb-6 flex flex-col gap-4">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, email, lugar…"
          className="w-full max-w-md border-b border-fg/25 bg-transparent py-2.5 outline-none placeholder:text-muted/70 focus:border-accent"
        />
        <div className="flex flex-wrap gap-2">
          {(["", "nueva", "respondida", "cerrada"] as const).map((s) => (
            <button key={s || "todas"} onClick={() => setStatusFilter(s)} className={pill(statusFilter === s)}>
              {s ? STATUS_LABEL[s] : "Todas"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["", ...areas.map((a) => a.name)].map((a) => (
            <button key={a || "todas-areas"} onClick={() => setAreaFilter(a)} className={pill(areaFilter === a)}>
              {a || "Todas las áreas"}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="border border-fg/15 bg-surface p-8 text-sm text-muted">Nada con esos filtros.</p>
      ) : (
        <ul className="border-t border-fg/10">
          {list.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-fg/10 py-4">
              <span className="slate flex w-28 items-center gap-2 text-muted">
                <span className={`inline-block size-2 rounded-full ${STATUS_DOT[i.status]}`} />
                {STATUS_LABEL[i.status]}
              </span>
              <span className="min-w-48 flex-1">
                <span className="block font-semibold leading-tight">{i.name}</span>
                <span className="mt-0.5 block text-xs text-muted" suppressHydrationWarning>
                  {i.reason} · {i.projectFormat}
                  {i.location ? ` · ${i.location}` : ""} · {dateFmt.format(new Date(i.createdAt))}
                </span>
              </span>
              <button
                onClick={() => router.push(`/admin/consultas?id=${i.id}`)}
                className="slate border border-fg/20 px-4 py-2 transition-colors hover:border-accent hover:text-accent"
              >
                Ver
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default function ConsultasPage() {
  return (
    <Suspense fallback={null}>
      <ConsultasContent />
    </Suspense>
  );
}
