# Starter — sitio base de The Web Studio

Este NO es un cliente. Es el motor reusable que `herramientas/crear-sitio.mjs`
clona por cada cliente nuevo (ver `modulos/03-sitio-base.md`).

- Hero WebGL, GSAP, Lenis, Tailwind v4: fijos, no se tocan por cliente.
- `src/lib/mock/`: el "backend" de la etapa demo — datos en memoria del
  navegador, sin Supabase. Ver `docs/supabase.md`.
- Todo lo que dice "reemplazar" o "EXAMPLE CONTENT" en el código sale de
  `branding.md`/`investigacion.md` del cliente, aplicado por
  `modulos/03-sitio-base.md` y `modulos/04-accion.md`.

`pnpm install && pnpm dev` levanta esto tal cual, con datos de ejemplo — es la
forma de verificar que el motor en sí funciona antes de aplicarle marca a un
cliente.
