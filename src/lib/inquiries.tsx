"use client";

// Consultas reales en Supabase (tabla `inquiries`, ver supabase/migrations).
// - submitInquiry: lo usa el formulario público (RLS: solo puede insertar).
// - InquiryStoreProvider/useInquiryStore: el panel (RLS: solo admins leen).
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Inquiry, InquiryStatus } from "@/lib/mock/types";

type Row = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  reason: string | null;
  project_format: string | null;
  event_date: string | null;
  location: string | null;
  preferred_contact: Inquiry["preferredContact"] | null;
  status: InquiryStatus;
};

const fromRow = (r: Row): Inquiry => ({
  id: r.id,
  createdAt: r.created_at,
  name: r.name,
  email: r.email,
  phone: r.phone,
  message: r.message,
  reason: r.reason ?? undefined,
  projectFormat: r.project_format ?? undefined,
  eventDate: r.event_date ?? undefined,
  location: r.location ?? undefined,
  preferredContact: r.preferred_contact ?? undefined,
  status: r.status,
});

export type CreateInquiryInput = Omit<Inquiry, "id" | "createdAt" | "status">;

export async function submitInquiry(input: CreateInquiryInput): Promise<{ ok: boolean }> {
  const { error } = await createClient().from("inquiries").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
    reason: input.reason ?? null,
    project_format: input.projectFormat ?? null,
    event_date: input.eventDate || null,
    location: input.location || null,
    preferred_contact: input.preferredContact ?? null,
  });
  return { ok: !error };
}

type InquiryStore = {
  inquiries: Inquiry[];
  loading: boolean;
  error: string | null;
  setInquiryStatus: (id: string, status: InquiryStatus) => Promise<void>;
  reload: () => Promise<void>;
};

const InquiryStoreContext = createContext<InquiryStore | null>(null);

export function InquiryStoreProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data, error } = await createClient()
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) setError("No pudimos cargar las consultas.");
    else {
      setError(null);
      setInquiries((data as Row[]).map(fromRow));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const setInquiryStatus = useCallback(async (id: string, status: InquiryStatus) => {
    setInquiries((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
    const { error } = await createClient().from("inquiries").update({ status }).eq("id", id);
    if (error) setError("No se pudo guardar el cambio de estado.");
  }, []);

  const value = useMemo(
    () => ({ inquiries, loading, error, setInquiryStatus, reload }),
    [inquiries, loading, error, setInquiryStatus, reload]
  );
  return <InquiryStoreContext.Provider value={value}>{children}</InquiryStoreContext.Provider>;
}

export function useInquiryStore(): InquiryStore {
  const ctx = useContext(InquiryStoreContext);
  if (!ctx) throw new Error("useInquiryStore tiene que usarse dentro de <InquiryStoreProvider>.");
  return ctx;
}
