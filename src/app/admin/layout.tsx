import type { Metadata } from "next";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import SignOutButton from "@/components/admin/SignOutButton";
import Wordmark from "@/components/ui/Wordmark";
import { InquiryStoreProvider } from "@/lib/inquiries";
import { createClient } from "@/lib/supabase/server";
import { BUSINESS_NAME } from "@/lib/mock/seed";

export const metadata: Metadata = {
  title: `Panel — ${BUSINESS_NAME}`,
};

// La sesión la exige src/proxy.ts. Acá además se comprueba que el email esté
// en la tabla `admins` (las reglas RLS lo exigen igual: esto es para mostrar
// un mensaje claro en vez de un panel vacío).
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-bg px-5 text-fg">
        <div className="max-w-sm text-center">
          <p className="text-4xl">
            <Wordmark />
          </p>
          <p className="mt-8 leading-relaxed">
            {user?.email ? (
              <>
                <strong>{user.email}</strong> no tiene permiso para editar este panel.
              </>
            ) : (
              "Tu sesión caducó."
            )}
          </p>
          <div className="mt-8">
            <SignOutButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <InquiryStoreProvider>
      <div className="min-h-svh bg-bg text-fg lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-fg/10 bg-surface lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:border-b-0 lg:border-r">
          <div className="px-6 py-6 lg:py-8">
            <Link href="/admin" className="text-2xl">
              <Wordmark />
            </Link>
            <p className="slate mt-2 text-muted">Panel del estudio</p>
          </div>

          <AdminNav />

          <div className="flex gap-1 px-4 pb-4 lg:mt-auto lg:block lg:pb-8">
            <p className="hidden truncate px-4 pb-2 text-xs text-muted lg:block">{user?.email}</p>
            <Link href="/" target="_blank" className="slate block px-4 py-2.5 text-muted transition-colors hover:bg-fg/5 hover:text-fg">
              Ver mi web →
            </Link>
            <SignOutButton />
          </div>
        </aside>

        <div className="px-5 py-8 md:px-10 md:py-10">{children}</div>
      </div>
    </InquiryStoreProvider>
  );
}
