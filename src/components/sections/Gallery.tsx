"use client";

// Galería con parallax — fotos reales de G-creatiON. Hoy solo hay material de
// bodas (investigacion.md → Fotos), así que la galería es la antesala de
// Weddings; cuando lleguen fotos de marcas/turismo/eventos se suman acá.
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/animation";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/components/content/ContentProvider";

// Fotos y pies editables desde /admin/contenido (home.gallery.N.*); acá solo
// queda el diseño de cada hueco.
const slots = [
  { src: "/images/da-ceremonia-dron.jpg", alt: "Ceremonia al aire libre en Beaucaire, desde el dron", tag: "Dron · Beaucaire", speed: -8, span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { src: "/images/js-novia-bn.jpg", alt: "Novia en blanco y negro con el ramo", tag: "Judith & Steven", speed: 8, span: "md:col-span-5 md:row-span-2 md:flex md:flex-col", ratio: "aspect-[3/4] md:aspect-auto md:flex-1" },
  { src: "/images/da-preparativos.jpg", alt: "Preparativos del novio, blanco y negro", tag: "Preparativos", speed: -5, span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { src: "/images/js-arco.jpg", alt: "Pareja y amigos junto al arco floral", tag: "Celebración", speed: 6, span: "md:col-span-12", ratio: "aspect-[4/3] md:aspect-[21/9]" },
];

export default function Gallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t, lines } = useContent();
  const [title1, title2] = lines("home.gallery.title");
  const items = slots.map((s, i) => ({
    ...s,
    src: t(`home.gallery.${i + 1}.image`),
    tag: t(`home.gallery.${i + 1}.caption`),
    alt: t(`home.gallery.${i + 1}.caption`) || s.alt,
  }));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tweens = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]")).map((el) => {
      const speed = Number(el.dataset.speed);
      return gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section id="galeria" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHeading
        number="04"
        kicker="Fotogramas"
        title={
          <>
            {title1}
            <br />
            <span className="text-accent">{title2}</span>
          </>
        }
      />

      <div ref={rootRef} className="mt-16 grid gap-5 md:mt-24 md:grid-cols-12 md:gap-8">
        {items.map((item, i) => (
          <figure key={i} className={item.span}>
            <div className={`viewfinder relative w-full overflow-hidden ${item.ratio}`}>
              <div data-speed={item.speed} className="absolute inset-x-0 -inset-y-[12%]">
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
              </div>
            </div>
            <figcaption className="slate mt-3 text-muted">{item.tag}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 flex justify-end">
        <Link href="/bodas" className="slate link-quiet text-accent">
          Ver G-creatiON Weddings →
        </Link>
      </div>
    </section>
  );
}
