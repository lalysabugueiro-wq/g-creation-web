"use client";

// Reparte el contenido editable (texto por defecto + lo editado en /admin) a
// todas las secciones. El layout del sitio lo lee en el servidor y lo pasa acá.
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULTS, type SiteContent } from "@/lib/content/schema";

const ContentContext = createContext<SiteContent>(DEFAULTS);

export function ContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const content = useContext(ContentContext);
  return useMemo(() => {
    const t = (key: string) => content[key] ?? DEFAULTS[key] ?? "";
    const lines = (key: string) =>
      t(key)
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    // "Nombre — detalle" / "valor | texto"
    const pairs = (key: string, sep: RegExp) =>
      lines(key).map((l) => {
        const [a, ...rest] = l.split(sep);
        return [a.trim(), rest.join(" ").trim()] as const;
      });
    const instagram = t("contact.instagram").replace(/^@/, "");
    return {
      t,
      lines,
      pairs,
      contact: {
        phone: t("contact.phone"),
        whatsapp: t("contact.whatsapp").replace(/\D/g, ""),
        email: t("contact.email"),
        instagramHandle: `@${instagram}`,
        instagramUrl: `https://instagram.com/${instagram}`,
        base: t("contact.base"),
        area: t("contact.area"),
      },
    };
  }, [content]);
}
