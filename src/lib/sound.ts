"use client";

// Sonidos de G-creatiON (Laly, 2026-11-19): cada universo tiene su "firma"
// sonora. Se generan en el navegador con Web Audio (sin archivos de audio,
// sin derechos de autor) y solo suenan si la persona eligió entrar con
// sonido. La elección se guarda en localStorage.

export type UniverseId = "weddings" | "sport" | "eventos" | "marcas" | "diseno" | "estudio";

const KEY = "gc-sound";
const EVENT = "gc:sound-change";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/** Contexto de audio compartido (lo usa también la música lo-fi). */
export function getAudio() {
  const c = audio();
  return c && master ? { c, out: master } : null;
}

export function isSoundOn() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  if (on) audio();
  window.dispatchEvent(new CustomEvent(EVENT, { detail: on }));
}

export function onSoundChange(cb: (on: boolean) => void) {
  const h = (e: Event) => cb((e as CustomEvent<boolean>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

// ——— piezas básicas ———

function tone(
  freq: number,
  { at = 0, dur = 0.4, type = "sine" as OscillatorType, vol = 0.3, attack = 0.005, slideTo = 0 } = {}
) {
  const c = audio();
  if (!c || !master) return;
  const t = c.currentTime + at;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function noise({
  at = 0,
  dur = 0.3,
  vol = 0.25,
  filter = "bandpass" as BiquadFilterType,
  freq = 1200,
  freqTo = 0,
  q = 1,
  attack = 0.005,
} = {}) {
  const c = audio();
  if (!c || !master) return;
  const t = c.currentTime + at;
  const len = Math.ceil(c.sampleRate * (dur + 0.05));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = filter;
  f.frequency.setValueAtTime(freq, t);
  if (freqTo) f.frequency.exponentialRampToValueAtTime(freqTo, t + dur);
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t);
  src.stop(t + dur + 0.05);
}

// ——— sonidos de la marca ———

/** Clic de obturador de cámara. */
export function shutter(at = 0) {
  noise({ at, dur: 0.05, vol: 0.5, filter: "highpass", freq: 2500 });
  noise({ at: at + 0.07, dur: 0.07, vol: 0.4, filter: "bandpass", freq: 1800, q: 2 });
  tone(90, { at, dur: 0.08, vol: 0.25, type: "square" });
}

/** "Bip" de cuenta atrás de película. */
export function beep(at = 0, freq = 1000) {
  tone(freq, { at, dur: 0.12, vol: 0.18, type: "sine", attack: 0.002 });
}

/** Aire que pasa: para cortinillas. */
export function whoosh(at = 0) {
  noise({ at, dur: 0.55, vol: 0.35, filter: "bandpass", freq: 300, freqTo: 3500, q: 0.8, attack: 0.25 });
}

/** Firma sonora de cada universo. */
export function playUniverse(id: UniverseId, { force = false } = {}) {
  if (!force && !isSoundOn()) return;
  switch (id) {
    case "weddings":
      // Campanitas suaves: acorde que se abre.
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, { at: i * 0.09, dur: 1.6, vol: 0.12, type: "sine", attack: 0.01 })
      );
      tone(1567.98, { at: 0.36, dur: 1.2, vol: 0.05, type: "triangle" });
      break;
    case "sport":
      // Silbato + arranque.
      tone(2600, { dur: 0.1, vol: 0.12, type: "square" });
      tone(2600, { at: 0.13, dur: 0.28, vol: 0.12, type: "square", slideTo: 2900 });
      noise({ at: 0.05, dur: 0.45, vol: 0.3, filter: "bandpass", freq: 600, freqTo: 4000, q: 0.7, attack: 0.15 });
      tone(70, { at: 0.08, dur: 0.25, vol: 0.4, type: "sine", slideTo: 45 });
      break;
    case "eventos":
      // Golpe de bombo + público que sube.
      tone(110, { dur: 0.6, vol: 0.55, type: "sine", slideTo: 40 });
      noise({ at: 0.02, dur: 0.08, vol: 0.3, filter: "highpass", freq: 5000 });
      noise({ at: 0.1, dur: 1.1, vol: 0.18, filter: "bandpass", freq: 900, q: 0.5, attack: 0.5 });
      tone(220, { at: 0.15, dur: 0.9, vol: 0.08, type: "sawtooth", slideTo: 330 });
      break;
    case "marcas":
      // Doble foto.
      shutter(0);
      shutter(0.22);
      break;
    case "diseno":
      // Notas digitales que se ordenan.
      [880, 1174.66, 1318.51, 1760].forEach((f, i) =>
        tone(f, { at: i * 0.065, dur: 0.18, vol: 0.1, type: "triangle", attack: 0.002 })
      );
      break;
    case "estudio":
      // Cinta que arranca + REC.
      tone(60, { dur: 0.5, vol: 0.3, type: "sine", slideTo: 120 });
      beep(0.35, 1400);
      break;
  }
}

/** Para pasar el ratón por encima: una versión muy corta y suave. */
export function hoverTick() {
  if (!isSoundOn()) return;
  tone(1800, { dur: 0.04, vol: 0.04, type: "sine", attack: 0.001 });
}

/** Cuenta atrás de la intro: 3 · 2 · 1 · corte. */
export function introCountdown(step = 0.55) {
  beep(0, 880);
  beep(step, 880);
  beep(step * 2, 880);
  whoosh(step * 3 - 0.25);
  shutter(step * 3 + 0.05);
  tone(55, { at: step * 3 + 0.05, dur: 0.9, vol: 0.45, type: "sine", slideTo: 35 });
}
