"use client";

// CTA final — "¿Qué tenemos que contar?" (Laly, 2026-09-23): sirve igual para
// una empresa y para una pareja. Formulario + WhatsApp + email + Instagram.
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/components/content/ContentProvider";

export default function FinalCTA() {
  const { t, contact: C } = useContent();
  const channels = [
    { label: "WhatsApp", href: `https://wa.me/${C.whatsapp}`, external: true },
    { label: "Email", href: `mailto:${C.email}`, external: false },
    { label: C.instagramHandle, href: C.instagramUrl, external: true },
  ];

  return (
    <section className="grain relative overflow-hidden bg-accent px-5 py-24 text-bg md:px-12 md:py-36 lg:px-20">
      <div className="relative z-10">
        <Reveal>
          <p className="slate mb-8 flex items-center gap-3">
            <span className="rec bg-bg!" /> Hablemos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="poster max-w-[12ch] text-[clamp(3rem,10vw,9rem)]">{t("home.cta.title")}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-bg/85">
            {t("home.cta.text")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-6 border-t border-bg/25 pt-8 md:flex-row md:items-center md:justify-between">
            <Link
              href="/contacto"
              className="slate group inline-flex w-fit items-center gap-3 bg-bg px-8 py-5 text-fg transition-transform duration-300 hover:-translate-y-0.5"
            >
              Hablemos
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="slate link-quiet"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
