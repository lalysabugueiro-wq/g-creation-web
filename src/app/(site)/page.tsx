import Hero from "@/components/hero/Hero";
import TwoWorlds from "@/components/sections/TwoWorlds";
import Philosophy from "@/components/sections/Philosophy";
import HowWeWork from "@/components/sections/HowWeWork";
import WeddingsFeature from "@/components/sections/WeddingsFeature";
import ServicesCredentials from "@/components/sections/ServicesCredentials";
import WhyUs from "@/components/sections/WhyUs";
import About from "@/components/sections/About";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import LocationHours from "@/components/sections/LocationHours";
import FinalCTA from "@/components/sections/FinalCTA";

// La sección propia lee del mock store en vivo ("use client") — así editar
// un dato en /admin se ve reflejado acá dentro de la misma sesión, sin
// necesitar props del servidor. El resto del orden es fijo para los 4
// arquetipos (modulos/03-sitio-base.md).
export default function Home() {
  return (
    <main>
      <Hero />
      <TwoWorlds />
      <WeddingsFeature />
      <ServicesCredentials />
      <HowWeWork />
      <WhyUs />
      <About />
      <Philosophy />
      <Reviews />
      <Gallery />
      <LocationHours />
      <FinalCTA />
    </main>
  );
}
