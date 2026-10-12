import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";
import Wordmark from "@/components/ui/Wordmark";
import { BUSINESS_NAME } from "@/lib/mock/seed";

export const metadata: Metadata = {
  title: `Acceso — ${BUSINESS_NAME}`,
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-5 pt-24">
      <div className="w-full max-w-sm pb-24">
        <p className="text-center text-4xl">
          <Wordmark />
        </p>
        <p className="slate mb-12 mt-3 text-center text-muted">Panel del estudio</p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
