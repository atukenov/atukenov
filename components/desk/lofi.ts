/**
 * A tiny lo-fi loop generated with the Web Audio API, so the site ships no
 * audio files: soft jazzy chords through a low-pass filter, a lazy kick and
 * hi-hat, and a bit of vinyl crackle.
 */

type Ctx = AudioContext;

const BPM = 72;
const BEAT = 60 / BPM;
// Fmaj7 – Em7 – Dm7 – Cmaj7 (MIDI notes)
const CHORDS = [
  [53, 57, 60, 64],
  [52, 55, 59, 62],
  [50, 53, 57, 60],
  [48, 52, 55, 59],
];
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

let ctx: Ctx | null = null;
let master: GainNode | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let crackle: AudioBufferSourceNode | null = null;
let nextBeat = 0;
let beat = 0;

function noiseBuffer(c: Ctx, seconds: number, sparse = false) {
  const buf = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = sparse ? (Math.random() < 0.0008 ? Math.random() * 2 - 1 : 0) : Math.random() * 2 - 1;
  }
  return buf;
}

function chord(c: Ctx, out: AudioNode, notes: number[], t: number, dur: number) {
  notes.forEach((n, i) => {
    const o = c.createOscillator();
    o.type = i === 0 ? "sine" : "triangle";
    o.frequency.value = midi(n);
    o.detune.value = (Math.random() - 0.5) * 12;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.09, t + 0.08 + i * 0.03);
    g.gain.exponentialRampToValueAtTime(0.03, t + dur * 0.7);
    g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  });
  // bass note an octave down
  const b = c.createOscillator();
  b.type = "sine";
  b.frequency.value = midi(notes[0] - 12);
  const bg = c.createGain();
  bg.gain.setValueAtTime(0.16, t);
  bg.gain.exponentialRampToValueAtTime(0.001, t + dur);
  b.connect(bg).connect(out);
  b.start(t);
  b.stop(t + dur);
}

function kick(c: Ctx, out: AudioNode, t: number) {
  const o = c.createOscillator();
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(40, t + 0.18);
  const g = c.createGain();
  g.gain.setValueAtTime(0.55, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.32);
}

function hat(c: Ctx, out: AudioNode, t: number, buf: AudioBuffer) {
  const s = c.createBufferSource();
  s.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 7000;
  const g = c.createGain();
  g.gain.setValueAtTime(0.06, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  s.connect(f).connect(g).connect(out);
  s.start(t);
  s.stop(t + 0.06);
}

export function startLofi() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
  }
  const c = ctx;
  void c.resume();
  if (timer) return;

  master = c.createGain();
  master.gain.setValueAtTime(0, c.currentTime);
  master.gain.linearRampToValueAtTime(0.5, c.currentTime + 1.5);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1400;
  lp.Q.value = 0.4;
  lp.connect(master).connect(c.destination);

  crackle = c.createBufferSource();
  crackle.buffer = noiseBuffer(c, 4, true);
  crackle.loop = true;
  const cg = c.createGain();
  cg.gain.value = 0.25;
  crackle.connect(cg).connect(master);
  crackle.start();

  const hatBuf = noiseBuffer(c, 0.1);
  nextBeat = c.currentTime + 0.1;
  beat = 0;
  const schedule = () => {
    while (nextBeat < c.currentTime + 0.4) {
      const bar = Math.floor(beat / 4);
      const inBar = beat % 4;
      if (inBar === 0) chord(c, lp, CHORDS[bar % CHORDS.length], nextBeat, BEAT * 4);
      if (inBar === 0 || inBar === 2) kick(c, lp, nextBeat);
      hat(c, lp, nextBeat + BEAT / 2, hatBuf);
      if (inBar === 1 || inBar === 3) hat(c, lp, nextBeat, hatBuf);
      nextBeat += BEAT;
      beat += 1;
    }
  };
  schedule();
  timer = setInterval(schedule, 100);
}

export function stopLofi() {
  if (!ctx || !master) return;
  if (timer) clearInterval(timer);
  timer = null;
  const m = master;
  const cr = crackle;
  m.gain.cancelScheduledValues(ctx.currentTime);
  m.gain.setValueAtTime(m.gain.value, ctx.currentTime);
  m.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  setTimeout(() => {
    cr?.stop();
    m.disconnect();
  }, 700);
  master = null;
  crackle = null;
}

/** 0..1 pulse that follows the kick, for the glowing ear cups. */
export function lofiPulse() {
  if (!ctx || !timer) return 0;
  const phase = ((ctx.currentTime - (nextBeat - BEAT)) / BEAT) % 1;
  return Math.max(0, 1 - phase * 3);
}
