"use client";

// Enciende y apaga la música lo-fi según el botón de sonido. Va dentro del
// menú, así está en todas las páginas.
import { useEffect } from "react";
import { isSoundOn, onSoundChange } from "@/lib/sound";
import { startMusic, stopMusic } from "@/lib/music";

export default function LofiMusic() {
  useEffect(() => {
    // Al encender el sonido, espera a que termine la cuenta atrás de la intro.
    const off = onSoundChange((on) => (on ? startMusic({ delay: 1.8 }) : stopMusic()));

    // Si la persona ya había elegido sonido otra vez, el navegador solo deja
    // sonar después de un toque o clic: arranca con el primero.
    const first = () => {
      if (isSoundOn()) startMusic();
      window.removeEventListener("pointerdown", first);
      window.removeEventListener("keydown", first);
    };
    if (isSoundOn()) {
      window.addEventListener("pointerdown", first);
      window.addEventListener("keydown", first);
    }

    // Pestaña en segundo plano: la música se calla y vuelve al regresar.
    const vis = () => {
      if (document.hidden) stopMusic();
      else if (isSoundOn()) startMusic();
    };
    document.addEventListener("visibilitychange", vis);

    return () => {
      off();
      window.removeEventListener("pointerdown", first);
      window.removeEventListener("keydown", first);
      document.removeEventListener("visibilitychange", vis);
      stopMusic();
    };
  }, []);
  return null;
}
