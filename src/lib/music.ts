"use client";

// Música lo-fi cálida de fondo (Laly, 2026-11-21). Se genera en el navegador
// con Web Audio, igual que los efectos: sin archivos y sin derechos de autor.
// Acordes suaves con "cinta" que ondula, bajo, batería blandita con swing,
// alguna nota de melodía suelta y crujido de vinilo. Suena solo con el sonido
// encendido, empieza despacito y baja sola si la pestaña queda en segundo plano.
import { getAudio } from "@/lib/sound";

const BPM = 72;
const BEAT = 60 / BPM;
const STEP = BEAT / 2; // corcheas
const VOLUME = 0.32;

// Fmaj7 · Em7 · Dm7 · Cmaj9 (una vuelta = 4 compases)
const CHORDS = [
  { root: 87.31, notes: [174.61, 220.0, 261.63, 329.63] },
  { root: 82.41, notes: [164.81, 196.0, 246.94, 293.66] },
  { root: 73.42, notes: [146.83, 174.61, 220.0, 261.63] },
  { root: 65.41, notes: [130.81, 196.0, 246.94, 293.66, 329.63] },
];
// Pentatónica de Do para la melodía
const MELODY = [523.25, 587.33, 659.25, 783.99, 880.0, 659.25, 587.33];

let bus: GainNode | null = null;
let wobble: OscillatorNode | null = null;
let wobbleDepth: GainNode | null = null;
let crackle: AudioBufferSourceNode | null = null;
let timer: number | null = null;
let nextTime = 0;
let step = 0;
let playing = false;

function setup() {
  const a = getAudio();
  if (!a) return null;
  const { c, out } = a;
  if (!bus) {
    // Todo pasa por un filtro que quita los agudos: sonido "cálido".
    const warm = c.createBiquadFilter();
    warm.type = "lowpass";
    warm.frequency.value = 3200;
    warm.Q.value = 0.4;
    bus = c.createGain();
    bus.gain.value = 0.0001;
    bus.connect(warm).connect(out);

    // Ondulación de cinta: desafina un poquito los acordes, lento.
    wobble = c.createOscillator();
    wobble.frequency.value = 0.45;
    wobbleDepth = c.createGain();
    wobbleDepth.gain.value = 9; // cents
    wobble.connect(wobbleDepth);
    wobble.start();

    // Crujido de vinilo en bucle.
    const len = c.sampleRate * 4;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * 0.012;
      if (Math.random() < 0.00035) d[i] = (Math.random() * 2 - 1) * 0.6;
    }
    crackle = c.createBufferSource();
    crackle.buffer = buf;
    crackle.loop = true;
    const hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 900;
    const g = c.createGain();
    g.gain.value = 0.5;
    crackle.connect(hp).connect(g).connect(bus);
    crackle.start();
  }
  return c;
}

function pad(c: AudioContext, freq: number, t: number, dur: number) {
  if (!bus) return;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.setValueAtTime(900, t);
  f.frequency.linearRampToValueAtTime(1400, t + dur * 0.4);
  f.frequency.linearRampToValueAtTime(800, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.05, t + 0.12);
  g.gain.exponentialRampToValueAtTime(0.03, t + dur * 0.6);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.25);
  f.connect(g).connect(bus);
  [-6, 6].forEach((det) => {
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.value = freq;
    o.detune.value = det;
    if (wobbleDepth) wobbleDepth.connect(o.detune);
    o.connect(f);
    o.start(t);
    o.stop(t + dur + 0.3);
  });
}

function note(
  c: AudioContext,
  freq: number,
  t: number,
  { dur = 0.4, vol = 0.1, type = "sine" as OscillatorType, slideTo = 0, attack = 0.01 } = {}
) {
  if (!bus) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(bus);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function hiss(c: AudioContext, t: number, { dur = 0.05, vol = 0.05, type = "highpass" as BiquadFilterType, freq = 7000 } = {}) {
  if (!bus) return;
  const len = Math.ceil(c.sampleRate * (dur + 0.02));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource();
  s.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(bus);
  s.start(t);
  s.stop(t + dur + 0.02);
}

// Un paso = una corchea. 8 pasos por compás.
function playStep(c: AudioContext, i: number, t: number) {
  const inBar = i % 8;
  const bar = Math.floor(i / 8) % CHORDS.length;
  const chord = CHORDS[bar];
  // Swing: las corcheas del "y" llegan un pelín tarde.
  const tt = t + (inBar % 2 === 1 ? STEP * 0.18 : 0);

  if (inBar === 0) {
    chord.notes.forEach((f, k) => pad(c, f, t + k * 0.025, BEAT * 4));
  }
  // Bajo
  if (inBar === 0) note(c, chord.root, t, { dur: BEAT * 1.6, vol: 0.16, attack: 0.02 });
  if (inBar === 5) note(c, chord.root * 1.5, tt, { dur: BEAT * 0.8, vol: 0.1, attack: 0.02 });
  // Bombo blandito
  if (inBar === 0 || inBar === 4 || (inBar === 5 && bar % 2 === 1)) {
    note(c, 110, tt, { dur: 0.32, vol: 0.32, slideTo: 42, attack: 0.003 });
  }
  // Caja apagada
  if (inBar === 2 || inBar === 6) {
    hiss(c, t, { dur: 0.16, vol: 0.07, type: "bandpass", freq: 1700 });
    note(c, 190, t, { dur: 0.08, vol: 0.05, type: "triangle", attack: 0.002 });
  }
  // Platillo cerrado, muy suave
  hiss(c, tt, { dur: 0.035, vol: inBar % 2 === 0 ? 0.022 : 0.014 });
  // Melodía: alguna nota suelta, como alguien tocando tranquilo
  if (inBar % 2 === 0 && Math.random() < 0.22) {
    const f = MELODY[Math.floor(Math.random() * MELODY.length)];
    note(c, f, tt, { dur: BEAT * 1.4, vol: 0.045, type: "sine", attack: 0.02 });
    note(c, f * 2, tt, { dur: BEAT * 0.5, vol: 0.008, type: "sine", attack: 0.01 });
  }
}

function tick() {
  const a = getAudio();
  if (!a) return;
  const { c } = a;
  if (nextTime < c.currentTime) nextTime = c.currentTime + 0.05;
  while (nextTime < c.currentTime + 0.5) {
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
  bus.gain.exponentialRampToValueAtTime(VOLUME, t + 4); // entra despacito
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
  bus.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
}

export function isMusicPlaying() {
  return playing;
}
