import IntroGate from "@/components/intro/IntroGate";
import Hero from "@/components/hero/Hero";
import ClientsReel from "@/components/sections/ClientsReel";
import Universes from "@/components/sections/Universes";
import HowWeWork from "@/components/sections/HowWeWork";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import LocationHours from "@/components/sections/LocationHours";
import FinalCTA from "@/components/sections/FinalCTA";

// Inicio (Laly, 2026-10-12): poco texto. Portada → los universos con foto para
// que cada persona entre en lo que necesita → cómo trabajamos → quiénes somos
// → filosofía → dónde → contacto. Lo detallado vive dentro de cada universo.
export default function Home() {
  return (
    <main>
      <IntroGate />
      <Hero />
      <Universes />
      <ClientsReel />
      <HowWeWork />
      <About />
      <Philosophy />
      <LocationHours />
      <FinalCTA />
    </main>
  );
}
