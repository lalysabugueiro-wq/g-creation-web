import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { getSiteContent } from "@/lib/content/get";

export const metadata: Metadata = { title: "Aviso legal — G-creatiON", robots: { index: false } };

// Datos del titular editables desde /admin/contenido → "Textos legales".
export default async function AvisoLegal() {
  const c = await getSiteContent();
  return (
    <LegalPage kicker="Legal" title="Aviso legal" updated="octubre de 2026">
      <section>
        <h2>Titular de la web</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico
          (LSSI-CE), te informamos de que esta web pertenece a:
        </p>
        <ul className="mt-4">
          <li>Titular: {c["legal.owner"]}</li>
          <li>NIF: {c["legal.nif"]}</li>
          <li>Domicilio: {c["legal.address"]}</li>
          <li>
            Email: <a href={`mailto:${c["legal.email"]}`}>{c["legal.email"]}</a>
          </li>
          <li>Nombre comercial: G-creatiON (estudio creativo & digital)</li>
        </ul>
      </section>
      <section>
        <h2>Uso de la web</h2>
        <p>
          Quien visita esta web se compromete a usarla de forma lícita y a no dañar su funcionamiento. La información
          que aparece aquí es orientativa: cada proyecto se concreta en una propuesta personalizada.
        </p>
      </section>
      <section>
        <h2>Propiedad intelectual</h2>
        <p>
          Las fotografías, videos, textos y diseño de esta web son obra de G-creatiON o se usan con permiso de sus
          autores y de las personas que aparecen en ellos. No está permitido copiarlos, reproducirlos ni usarlos sin
          autorización por escrito.
        </p>
      </section>
      <section>
        <h2>Enlaces a otras webs</h2>
        <p>
          Esta web enlaza a servicios de terceros (WhatsApp, Instagram, Google Maps). G-creatiON no se hace responsable
          de sus contenidos ni de sus políticas de privacidad.
        </p>
      </section>
      <section>
        <h2>Legislación aplicable</h2>
        <p>Esta web se rige por la legislación española.</p>
      </section>
    </LegalPage>
  );
}
