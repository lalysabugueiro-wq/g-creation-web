// Piezas compartidas del panel: tarjeta de KPI, etiquetas de estado y fecha.
import type { InquiryStatus } from "@/lib/mock/types";

export const STATUS_LABEL: Record<InquiryStatus, string> = {
  nueva: "Nueva",
  respondida: "Respondida",
  cerrada: "Cerrada",
};

// El estado "nueva" lleva el naranja de marca: es lo que hay que atender.
export const STATUS_DOT: Record<InquiryStatus, string> = {
  nueva: "bg-accent",
  respondida: "bg-fg",
  cerrada: "bg-fg/25",
};

export const dateFmt = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function KpiCard({ label, value, hint, highlight }: { label: string; value: string; hint?: string; highlight?: boolean }) {
  return (
    <div className={`border px-5 py-5 ${highlight ? "border-accent bg-accent/10" : "border-fg/15 bg-surface"}`}>
      <p className="slate text-muted">{label}</p>
      <p className={`poster mt-3 text-[clamp(2rem,3vw,2.8rem)] ${highlight ? "text-accent" : ""}`}>{value}</p>
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function PageTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="mb-8">
      <p className="slate mb-3 text-accent">{kicker}</p>
      <h1 className="poster text-[clamp(2.2rem,4vw,3.4rem)]">{title}</h1>
    </header>
  );
}
