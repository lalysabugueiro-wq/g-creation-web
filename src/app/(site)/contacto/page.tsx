"use client";

// Contacto — arquetipo `profesional`. `?area=bodas` llega desde /bodas y
// preselecciona Weddings en el formulario.
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/booking/ContactForm";
import { useContent } from "@/components/content/ContentProvider";

function FormWithArea() {
  const area = useSearchParams().get("area") ?? undefined;
  return <ContactForm key={area} initialArea={area} />;
}

export default function ContactoPage() {
  const C = useContent().contact;
  return (
    <main className="min-h-svh px-5 pb-28 pt-32 md:px-12 md:pt-44 lg:px-20">
      <div className="grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="slate mb-6 flex items-center gap-3 text-accent">
            <span className="rec" /> Contacto
          </p>
          <h1 className="poster text-[clamp(2.8rem,7vw,6rem)]">
            ¿Qué tenemos
            <br />
            <span className="text-accent">que contar?</span>
          </h1>
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-fg/85">
            Cuéntanos qué estás preparando, qué quieres mostrar o qué historia quieres conservar.
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">{C.area}</p>

          <ul className="mt-10 space-y-3 border-t border-fg/15 pt-8">
            <li>
              <a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noreferrer" className="link-quiet">
                <span className="slate mr-3 text-muted">WhatsApp</span>
                {C.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${C.email}`} className="link-quiet break-all">
                <span className="slate mr-3 text-muted">Email</span>
                {C.email}
              </a>
            </li>
            <li>
              <a href={C.instagramUrl} target="_blank" rel="noreferrer" className="link-quiet text-accent">
                <span className="slate mr-3 text-muted">Instagram</span>
                {C.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Suspense fallback={null}>
            <FormWithArea />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
