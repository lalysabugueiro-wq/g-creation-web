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

// Orden (octubre 2026): primero las tres puertas y qué hace el estudio; el
// bloque de Weddings va después, para que una marca o un hotel vea sus
// servicios antes que la novia. Weddings sigue teniendo su puerta arriba.
export default function Home() {
  return (
    <main>
      <Hero />
      <TwoWorlds />
      <ServicesCredentials />
      <HowWeWork />
      <WeddingsFeature />
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
