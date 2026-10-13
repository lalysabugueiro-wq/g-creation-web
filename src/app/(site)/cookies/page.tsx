import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Política de cookies — G-creatiON", robots: { index: false } };

export default function Cookies() {
  return (
    <LegalPage kicker="Legal" title="Política de cookies" updated="octubre de 2026">
      <section>
        <h2>Esta web no te sigue</h2>
        <p>
          No usamos cookies de publicidad, de analítica ni de redes sociales, y no cargamos mapas ni videos de terceros
          que las instalen. Por eso no te mostramos ningún aviso de cookies al entrar.
        </p>
      </section>
      <section>
        <h2>Cookies técnicas</h2>
        <p>
          Solo el panel privado de G-creatiON (el acceso con usuario y contraseña) usa cookies técnicas para mantener
          la sesión iniciada. Son imprescindibles para que funcione y no se usan para nada más.
        </p>
      </section>
      <section>
        <h2>Enlaces externos</h2>
        <p>
          Si pulsas un enlace a WhatsApp, Instagram o Google Maps, sales de esta web y se aplican las políticas de
          cookies de esos servicios.
        </p>
      </section>
    </LegalPage>
  );
}
