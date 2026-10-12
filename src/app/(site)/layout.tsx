import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeShell from "@/components/layout/ThemeShell";
import { ContentProvider } from "@/components/content/ContentProvider";
import { getSiteContent } from "@/lib/content/get";

// El contenido editable se lee una vez acá (en el servidor, cacheado con la
// etiqueta "content") y lo usan todas las secciones.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <ContentProvider content={content}>
      <SmoothScroll>
        <ThemeShell>
          <Header />
          {children}
          <Footer />
        </ThemeShell>
      </SmoothScroll>
    </ContentProvider>
  );
}
