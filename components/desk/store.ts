"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny global store for the 3D desk. It is shared by the three.js scene
 * (inside <Canvas>) and the DOM overlay (HUD + info panel), so it lives
 * outside React context.
 */

/** Where the camera is looking. */
export type Focus = "overview" | "monitor" | "folders" | "pc";

/** What the side panel shows (null = closed). */
export type Panel =
  | { kind: "about" }
  | { kind: "project"; index: number }
  | { kind: "pc"; tab?: PcTab }
  | { kind: "contact" }
  | null;

export type PcTab = "skills" | "services" | "experience" | "education";

export type PcPower = "off" | "booting" | "on";

export type DeskState = {
  focus: Focus;
  panel: Panel;
  power: PcPower;
  lamp: boolean;
  roomLights: boolean;
  /** what the pointer is over, for the floating label */
  hovered: string | null;
  /** true once the user has dragged or clicked anything (hides the hint) */
  interacted: boolean;
  reducedMotion: boolean;
  /** lo-fi ambient sound from the headphones */
  music: boolean;
  /** bumps on every key typed into the terminal (drives the 3D keyboard) */
  keyPulse: number;
  /** which experience entry the desk calendar shows */
  calendarPage: number;
  /** bumps when the soccer ball is kicked */
  ballKick: number;
};

const initial: DeskState = {
  focus: "overview",
  panel: null,
  power: "off",
  lamp: true,
  roomLights: false,
  hovered: null,
  interacted: false,
  reducedMotion: false,
  music: false,
  keyPulse: 0,
  calendarPage: 0,
  ballKick: 0,
};

let state: DeskState = initial;
const listeners = new Set<() => void>();

export const deskStore = {
  get: () => state,
  set(patch: Partial<DeskState> | ((s: DeskState) => Partial<DeskState>)) {
    const next = typeof patch === "function" ? patch(state) : patch;
    state = { ...state, ...next };
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export function useDesk<T>(selector: (s: DeskState) => T): T {
  return useSyncExternalStore(
    deskStore.subscribe,
    () => selector(state),
    () => selector(initial)
  );
}

let bootTimer: ReturnType<typeof setTimeout> | undefined;

export const deskActions = {
  togglePower() {
    clearTimeout(bootTimer);
    if (state.power === "off") {
      deskStore.set({ power: "booting", interacted: true });
      bootTimer = setTimeout(
        () => deskStore.set({ power: "on" }),
        state.reducedMotion ? 300 : 2600
      );
    } else {
      deskStore.set({ power: "off", interacted: true });
    }
  },
  /** Make sure the PC is running (used when the visitor goes to the monitor). */
  ensureOn() {
    if (state.power === "off") deskActions.togglePower();
  },
  toggleLamp() {
    deskStore.set((s) => ({ lamp: !s.lamp, interacted: true }));
  },
  toggleRoomLights() {
    deskStore.set((s) => ({ roomLights: !s.roomLights, interacted: true }));
  },
  openMonitor(compact: boolean) {
    deskActions.ensureOn();
    // On small screens the monitor is too small to read, so the same
    // content opens in the panel instead.
    deskStore.set({
      focus: "monitor",
      panel: compact ? { kind: "about" } : null,
      interacted: true,
    });
  },
  openProject(index: number) {
    deskStore.set({ focus: "folders", panel: { kind: "project", index }, interacted: true });
  },
  openPc(tab: PcTab = "skills") {
    deskStore.set({ focus: "pc", panel: { kind: "pc", tab }, interacted: true });
  },
  closePanel() {
    deskStore.set({ panel: null });
  },
  reset() {
    deskStore.set({ focus: "overview", panel: null, interacted: true });
  },
  openContact() {
    deskStore.set({ focus: "overview", panel: { kind: "contact" }, interacted: true });
  },
  toggleMusic() {
    deskStore.set((s) => ({ music: !s.music, interacted: true }));
  },
  flipCalendar(total: number) {
    deskStore.set((s) => ({
      calendarPage: (s.calendarPage + 1) % Math.max(total, 1),
      interacted: true,
    }));
  },
  kickBall() {
    deskStore.set((s) => ({ ballKick: s.ballKick + 1, interacted: true }));
  },
  pressKey() {
    deskStore.set((s) => ({ keyPulse: s.keyPulse + 1 }));
  },
  hover(name: string | null) {
    if (state.hovered !== name) deskStore.set({ hovered: name });
  },
};
