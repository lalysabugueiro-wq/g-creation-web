"use client";

// Música de fondo "ambiente moderno" (Laly, 2026-11-21). Se genera en el
// navegador con Web Audio: sin archivos y sin derechos de autor.
// Colchones de sintetizador amplios que respiran despacio, un bajo profundo,
// un pulso de notas muy suaves con eco y mucha reverberación. Sin batería.
// Suena solo con el sonido encendido, entra despacito y se calla si la
// pestaña queda en segundo plano.
import { getAudio } from "@/lib/sound";

const BPM = 84;
const STEP = 60 / BPM / 2; // corcheas
const BAR_STEPS = 16; // cada acorde dura 2 compases (~5,7 s)
const VOLUME = 0.34;

// Re menor moderno: Dm9 · Bbmaj7 · Fmaj7 · C6/9
const CHORDS = [
  { root: 73.42, notes: [146.83, 220.0, 261.63, 329.63, 349.23] },
  { root: 58.27, notes: [174.61, 220.0, 293.66, 349.23, 440.0] },
  { root: 87.31, notes: [174.61, 261.63, 329.63, 349.23, 440.0] },
  { root: 65.41, notes: [196.0, 261.63, 293.66, 329.63, 440.0] },
];
// Notas del pulso (por encima de cada acorde)
const PULSE = [
  [587.33, 698.46, 880.0, 659.25],
  [587.33, 698.46, 880.0, 698.46],
  [523.25, 659.25, 783.99, 698.46],
  [523.25, 587.33, 783.99, 659.25],
];

let bus: GainNode | null = null;
let fx: GainNode | null = null; // envío a eco + reverb
let timer: number | null = null;
let nextTime = 0;
let step = 0;
let playing = false;

function impulse(c: AudioContext, seconds: number) {
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  return buf;
}

function setup() {
  const a = getAudio();
  if (!a) return null;
  const { c, out } = a;
  if (!bus) {
    bus = c.createGain();
    bus.gain.value = 0.0001;
    const tone = c.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 5000;
    bus.connect(tone).connect(out);

    // Reverb grande (sala amplia) + eco con rebotes.
    fx = c.createGain();
    fx.gain.value = 1;
    const verb = c.createConvolver();
    verb.buffer = impulse(c, 4.5);
    const verbGain = c.createGain();
    verbGain.gain.value = 0.55;
    fx.connect(verb).connect(verbGain).connect(bus);

    const delay = c.createDelay(2);
    delay.delayTime.value = STEP * 3; // eco en tresillo de corchea
    const fb = c.createGain();
    fb.gain.value = 0.42;
    const dTone = c.createBiquadFilter();
    dTone.type = "lowpass";
    dTone.frequency.value = 2200;
    const dGain = c.createGain();
    dGain.gain.value = 0.35;
    fx.connect(delay);
    delay.connect(dTone).connect(fb).connect(delay);
    dTone.connect(dGain).connect(bus);
    dGain.connect(verb);
  }
  return c;
}

/** Colchón: varias sierras desafinadas con filtro que se abre y se cierra. */
function pad(c: AudioContext, freq: number, t: number, dur: number, pan: number) {
  if (!bus || !fx) return;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.Q.value = 0.7;
  f.frequency.setValueAtTime(350, t);
  f.frequency.linearRampToValueAtTime(1500, t + dur * 0.5);
  f.frequency.linearRampToValueAtTime(400, t + dur + 1.5);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.022, t + dur * 0.35); // entra lento
  g.gain.linearRampToValueAtTime(0.016, t + dur);
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 2.2); // se funde con el siguiente
  const p = c.createStereoPanner();
  p.pan.value = pan;
  f.connect(g).connect(p);
  p.connect(bus);
  p.connect(fx);
  [-9, 0, 9].forEach((det) => {
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = freq;
    o.detune.value = det + (Math.random() * 4 - 2);
    o.connect(f);
    o.start(t);
    o.stop(t + dur + 2.4);
  });
}

function sub(c: AudioContext, freq: number, t: number, dur: number) {
  if (!bus) return;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.13, t + 1.2);
  g.gain.linearRampToValueAtTime(0.1, t + dur);
  g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.8);
  o.connect(g).connect(bus);
  o.start(t);
  o.stop(t + dur + 1);
}

/** Nota del pulso: suave, redonda, mandada al eco. */
function pluck(c: AudioContext, freq: number, t: number, vol: number, pan: number) {
  if (!bus || !fx) return;
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.value = freq;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.setValueAtTime(2400, t);
  f.frequency.exponentialRampToValueAtTime(600, t + 0.5);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
  const p = c.createStereoPanner();
  p.pan.value = pan;
  o.connect(f).connect(g).connect(p);
  p.connect(bus);
  p.connect(fx);
  o.start(t);
  o.stop(t + 1);
}

/** Brillo agudo que aparece de vez en cuando, como un destello. */
function shimmer(c: AudioContext, freq: number, t: number) {
  if (!fx) return;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.012, t + 1.5);
  g.gain.linearRampToValueAtTime(0.0001, t + 4);
  o.connect(g).connect(fx);
  o.start(t);
  o.stop(t + 4.1);
}

function playStep(c: AudioContext, i: number, t: number) {
  const inChord = i % BAR_STEPS;
  const ci = Math.floor(i / BAR_STEPS) % CHORDS.length;
  const chord = CHORDS[ci];
  const chordDur = STEP * BAR_STEPS;

  if (inChord === 0) {
    chord.notes.forEach((f, k) => pad(c, f, t + k * 0.06, chordDur, (k / (chord.notes.length - 1)) * 1.2 - 0.6));
    sub(c, chord.root, t, chordDur);
    if (Math.random() < 0.6) shimmer(c, chord.notes[chord.notes.length - 1] * 4, t + chordDur * 0.4);
  }

  // Pulso: entra a partir de la segunda vuelta, en corcheas con algún hueco.
  const round = Math.floor(i / (BAR_STEPS * CHORDS.length));
  if (round >= 1 || i >= BAR_STEPS * 2) {
    const skip = inChord % 4 === 3 && Math.random() < 0.5;
    if (!skip) {
      const seq = PULSE[ci];
      const f = seq[inChord % seq.length];
      const accent = inChord % 4 === 0 ? 0.04 : 0.024;
      pluck(c, f, t, accent, inChord % 2 === 0 ? -0.35 : 0.35);
    }
  }
}

function tick() {
  const a = getAudio();
  if (!a) return;
  const { c } = a;
  if (nextTime < c.currentTime) nextTime = c.currentTime + 0.05;
  while (nextTime < c.currentTime + 0.6) {
    playStep(c, step, nextTime);
    step++;
    nextTime += STEP;
  }
}

export function startMusic({ delay = 0 } = {}) {
  if (playing) return;
  const c = setup();
  if (!c || !bus) return;
  playing = true;
  step = 0;
  nextTime = c.currentTime + delay;
  const t = c.currentTime + delay;
  bus.gain.cancelScheduledValues(c.currentTime);
  bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), c.currentTime);
  bus.gain.setValueAtTime(0.0001, t);
  bus.gain.exponentialRampToValueAtTime(VOLUME, t + 5); // entra despacito
  tick();
  timer = window.setInterval(tick, 120);
}

export function stopMusic() {
  if (!playing) return;
  playing = false;
  if (timer !== null) window.clearInterval(timer);
  timer = null;
  const a = getAudio();
  if (!a || !bus) return;
  const now = a.c.currentTime;
  bus.gain.cancelScheduledValues(now);
  bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), now);
  bus.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
}

export function isMusicPlaying() {
  return playing;
}
