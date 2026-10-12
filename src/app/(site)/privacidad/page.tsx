import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = { title: "Política de privacidad — G-creatiON", robots: { index: false } };

export default async function Privacidad() {
  const c = await getSiteContent();
  const email = c["legal.email"];
  return (
    <LegalPage kicker="Legal" title="Política de privacidad" updated="octubre de 2026">
      <section>
        <h2>Quién trata tus datos</h2>
        <p>
          {c["legal.owner"]} (NIF {c["legal.nif"]}), con domicilio en {c["legal.address"]}, que trabaja bajo el nombre
          G-creatiON. Puedes escribirnos a <a href={`mailto:${email}`}>{email}</a> para cualquier tema relacionado
          con tus datos.
        </p>
      </section>
      <section>
        <h2>Qué datos recogemos y para qué</h2>
        <p>
          Solo los que nos das en el formulario de contacto (nombre, email, teléfono si lo dejas y lo que nos cuentas
          de tu proyecto), o los que nos mandas por WhatsApp, email o Instagram. Los usamos únicamente para responder a
          tu consulta y, si decides trabajar con nosotros, para preparar la propuesta y el proyecto.
        </p>
        <p className="mt-4">No usamos tus datos para publicidad ni los vendemos a nadie.</p>
      </section>
      <section>
        <h2>Base legal</h2>
        <p>
          Tu consentimiento, que nos das al marcar la casilla del formulario o al escribirnos, y, si llegamos a
          trabajar juntos, la ejecución del contrato o presupuesto.
        </p>
      </section>
      <section>
        <h2>Cuánto tiempo los guardamos</h2>
        <p>
          Mientras dure la conversación sobre tu proyecto y, si trabajamos juntos, el tiempo que exijan las
          obligaciones legales y fiscales. Si no llegamos a trabajar juntos, los borramos como máximo en un año.
        </p>
      </section>
      <section>
        <h2>Quién más puede verlos</h2>
        <p>
          Nadie fuera de G-creatiON, salvo los servicios técnicos que hacen funcionar la web: Vercel (alojamiento) y
          Supabase (base de datos donde se guardan las consultas). Ambos cumplen el Reglamento General de Protección
          de Datos (RGPD).
        </p>
      </section>
      <section>
        <h2>Tus derechos</h2>
        <p>
          Puedes pedirnos en cualquier momento ver, corregir o borrar tus datos, limitar su uso, oponerte a él o
          llevártelos, escribiendo a <a href={`mailto:${email}`}>{email}</a>. Si crees que no los hemos tratado bien,
          puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
        </p>
      </section>
    </LegalPage>
  );
}
