"use client";

// Botón de sonido del menú: barras que bailan cuando está encendido.
import { useSyncExternalStore } from "react";
import { isSoundOn, onSoundChange, setSoundOn, beep } from "@/lib/sound";

export default function SoundToggle({ className = "" }: { className?: string }) {
  const on = useSyncExternalStore(
    (cb) => onSoundChange(() => cb()),
    isSoundOn,
    () => false
  );

  return (
    <button
      type="button"
      onClick={() => {
        const next = !on;
        setSoundOn(next);
        if (next) beep(0, 1200);
      }}
      aria-pressed={on}
      aria-label={on ? "Apagar sonido" : "Encender sonido"}
      title={on ? "Apagar sonido" : "Encender sonido"}
      className={`slate inline-flex items-center gap-2 border border-current/25 px-3 py-2.5 transition-colors hover:border-current/60 ${className}`}
    >
      <span aria-hidden className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] bg-current ${on ? "eq-bar" : ""}`}
            style={{ height: on ? undefined : "3px", animationDelay: `${i * 0.13}s` }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{on ? "Sonido" : "Sin sonido"}</span>
    </button>
  );
}
