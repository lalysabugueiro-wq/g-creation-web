"use client";

// Editor de contenido (modulos/09-cms.md). Se edita QUÉ dice la web —textos,
// fotos, contacto—, nunca cómo se ve. Cada campo se guarda con su botón (sin
// autoguardado), deja historial para "Deshacer", y al guardar se refresca la
// caché de la web para que el cambio se vea en segundos.
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { FIELDS, SECTIONS, type Field } from "@/lib/content/schema";
import { compressImage, formatKB } from "@/lib/content/image";
import { PageTitle } from "@/components/admin/ui";
import { refreshSite } from "./actions";

const BUCKET = "site-images";

type Stored = Record<string, string>;
type HistoryCount = Record<string, number>;

// Ruta dentro del bucket si la URL es una foto subida por el editor.
function storagePath(url: string | undefined): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i >= 0 ? decodeURIComponent(url.slice(i + marker.length)) : null;
}

export default function ContenidoPage() {
  const supabase = useMemo(() => createClient(), []);
  const [stored, setStored] = useState<Stored>({});
  const [history, setHistory] = useState<HistoryCount>({});
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<string>(SECTIONS[0]);

  const load = useCallback(async () => {
    const [{ data: rows }, { data: hist }, { data: userData }] = await Promise.all([
      supabase.from("site_content").select("key,value"),
      supabase.from("site_content_history").select("key"),
      supabase.auth.getUser(),
    ]);
    setStored(Object.fromEntries((rows ?? []).map((r) => [r.key, r.value])));
    const counts: HistoryCount = {};
    for (const h of hist ?? []) counts[h.key] = (counts[h.key] ?? 0) + 1;
    setHistory(counts);
    setEmail(userData.user?.email ?? "");
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const fields = FIELDS.filter((f) => f.section === section);

  return (
    <main className="max-w-4xl">
      <PageTitle kicker="Panel" title="Editar la web" />
      <p className="mb-8 max-w-2xl leading-relaxed text-fg/80">
        Cambia el texto o la foto y pulsa <strong>Guardar</strong>: se verá en la web en unos segundos. Si te equivocas,
        pulsa <strong>Deshacer</strong>. Los colores, las letras y el diseño no se tocan desde aquí.
      </p>

      <div className="mb-10 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            className={`slate border px-3.5 py-2.5 transition-colors ${
              section === s ? "border-accent bg-accent text-bg" : "border-fg/20 text-muted hover:border-fg/60 hover:text-fg"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted">Cargando…</p>
      ) : (
        <div className="space-y-6">
          {fields.map((f) => (
            <FieldEditor
              key={f.key}
              field={f}
              stored={stored[f.key]}
              historyCount={history[f.key] ?? 0}
              email={email}
              onSaved={load}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function FieldEditor({
  field,
  stored,
  historyCount,
  email,
  onSaved,
}: {
  field: Field;
  stored: string | undefined;
  historyCount: number;
  email: string;
  onSaved: () => Promise<void>;
}) {
  const supabase = useMemo(() => createClient(), []);
  const current = stored ?? field.default;
  const [value, setValue] = useState(current);
  const [status, setStatus] = useState<{ kind: "ok" | "error" | "busy"; text: string } | null>(null);

  // Si se recarga desde fuera (deshacer, otro guardado), sincronizar.
  useEffect(() => setValue(current), [current]);

  const dirty = value !== current;
  const edited = stored !== undefined;

  const finish = async (text: string) => {
    await refreshSite();
    await onSaved();
    setStatus({ kind: "ok", text });
  };

  const save = async (next: string) => {
    setStatus({ kind: "busy", text: "Guardando…" });
    // El valor anterior va al historial (null = era el texto original).
    await supabase.from("site_content_history").insert({ key: field.key, value: stored ?? null, created_by: email });
    const { error } = await supabase
      .from("site_content")
      .upsert({ key: field.key, value: next, updated_at: new Date().toISOString(), updated_by: email });
    if (error) return setStatus({ kind: "error", text: "No se pudo guardar. Prueba otra vez." });
    await finish("Guardado. Ya se ve en la web.");
  };

  const undo = async () => {
    setStatus({ kind: "busy", text: "Deshaciendo…" });
    const { data } = await supabase
      .from("site_content_history")
      .select("id,value")
      .eq("key", field.key)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return setStatus({ kind: "error", text: "No hay cambios anteriores." });
    const { error } =
      data.value === null
        ? await supabase.from("site_content").delete().eq("key", field.key)
        : await supabase
            .from("site_content")
            .upsert({ key: field.key, value: data.value, updated_at: new Date().toISOString(), updated_by: email });
    if (error) return setStatus({ kind: "error", text: "No se pudo deshacer." });
    await supabase.from("site_content_history").delete().eq("id", data.id);
    await finish("Deshecho. Volvió el texto anterior.");
  };

  const resetImage = async () => {
    setStatus({ kind: "busy", text: "Volviendo a la foto original…" });
    const old = storagePath(stored);
    const { error } = await supabase.from("site_content").delete().eq("key", field.key);
    if (error) return setStatus({ kind: "error", text: "No se pudo cambiar." });
    if (old) await supabase.storage.from(BUCKET).remove([old]);
    await finish("Listo. Volvió la foto original.");
  };

  const uploadImage = async (file: File) => {
    try {
      setStatus({ kind: "busy", text: "Reduciendo la foto…" });
      const blob = await compressImage(file, field.maxWidth ?? 1800);
      setStatus({ kind: "busy", text: `Subiendo (${formatKB(file.size)} → ${formatKB(blob.size)})…` });
      const ext = blob.type === "image/webp" ? "webp" : blob.type === "image/png" ? "png" : "jpg";
      const path = `${field.key}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: blob.type });
      if (upErr) return setStatus({ kind: "error", text: "No se pudo subir la foto." });
      const url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

      const old = storagePath(stored);
      const { error } = await supabase
        .from("site_content")
        .upsert({ key: field.key, value: url, updated_at: new Date().toISOString(), updated_by: email });
      if (error) {
        await supabase.storage.from(BUCKET).remove([path]);
        return setStatus({ kind: "error", text: "No se pudo guardar la foto." });
      }
      // Reemplazar, no acumular: la foto anterior se borra.
      if (old) await supabase.storage.from(BUCKET).remove([old]);
      await finish(`Foto cambiada (${formatKB(file.size)} → ${formatKB(blob.size)}). Ya se ve en la web.`);
    } catch {
      setStatus({ kind: "error", text: "No se pudo leer esa foto. Prueba con un JPG o PNG." });
    }
  };

  const input =
    "w-full border border-fg/20 bg-bg px-4 py-3 text-base leading-relaxed text-fg outline-none transition-colors focus:border-accent";

  return (
    <section className="border border-fg/15 bg-surface p-5 md:p-6">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold">{field.label}</h2>
        {edited && <span className="slate text-accent">Editado</span>}
      </div>
      {field.help && <p className="mb-3 text-sm text-muted">{field.help}</p>}

      {field.type === "image" ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg sm:w-56">
            {current ? (
              <Image src={current} alt={field.label} fill sizes="224px" className="object-cover" />
            ) : (
              <p className="slate absolute inset-0 grid place-items-center text-muted">Sin foto</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="slate cursor-pointer bg-accent px-5 py-3 text-bg">
              Cambiar foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(f);
                  e.target.value = "";
                }}
              />
            </label>
            {edited && (
              <button type="button" onClick={resetImage} className="slate border border-fg/30 px-5 py-3">
                Volver a la original
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {field.type === "text" ? (
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className={input} />
          ) : (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={field.type === "lines" ? Math.min(12, Math.max(3, value.split("\n").length + 1)) : 4}
              className={input}
            />
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={!dirty || status?.kind === "busy" || (!value.trim() && field.default !== "")}
              onClick={() => save(value)}
              className="slate bg-accent px-5 py-3 text-bg disabled:opacity-40"
            >
              Guardar
            </button>
            {dirty && (
              <button type="button" onClick={() => setValue(current)} className="slate border border-fg/30 px-5 py-3">
                Descartar
              </button>
            )}
            {!dirty && historyCount > 0 && (
              <button type="button" onClick={undo} className="slate border border-fg/30 px-5 py-3">
                Deshacer
              </button>
            )}
          </div>
        </>
      )}

      {status && (
        <p className={`mt-3 text-sm ${status.kind === "error" ? "text-accent" : status.kind === "ok" ? "text-fg" : "text-muted"}`}>
          {status.kind === "ok" ? "✓ " : ""}
          {status.text}
        </p>
      )}
    </section>
  );
}
