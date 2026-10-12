"use client";

// Panel de `profesional` (modulos/05-panel.md + 09-cms.md): resumen, editor, bandeja de
// consultas y CRM liviano. Sin agenda ni facturación.
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/contenido", label: "Editar la web" },
  { href: "/admin/consultas", label: "Bandeja" },
  { href: "/admin/contactos", label: "Contactos" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:pb-0">
      {ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`slate whitespace-nowrap px-4 py-3 transition-colors ${
              active ? "bg-accent text-bg" : "text-muted hover:bg-fg/5 hover:text-fg"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
