"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await createClient().auth.signOut();
        router.push("/login");
        router.refresh();
      }}
      className="slate block w-full px-4 py-2.5 text-left text-muted transition-colors hover:bg-fg/5 hover:text-fg"
    >
      Cerrar sesión
    </button>
  );
}
