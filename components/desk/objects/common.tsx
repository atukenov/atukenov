"use client";

import type { ThreeEvent } from "@react-three/fiber";
import { useMemo } from "react";
import { configureTextBuilder } from "troika-three-text";
import { deskActions } from "../store";

// 3D text uses self-hosted JetBrains Mono: the Latin file is passed as each
// label's `font`, and the Cyrillic file is the builder's default so Russian
// labels render without troika fetching fallback fonts from a CDN.
configureTextBuilder({ defaultFontURL: "/fonts/jetbrains-mono-cyrillic-700.woff" });

export const NEON = {
  yellow: "#f3e600",
  cyan: "#00f0ff",
  magenta: "#ff2a6d",
  violet: "#7a00ff",
};

export const FONT = "/fonts/jetbrains-mono-700.woff";

/**
 * Pointer handlers for a clickable object: floating label on hover,
 * pointer cursor, and a click that ignores drags (so rotating the
 * desk never opens anything by accident).
 */
export function useHotspot(label: string, onSelect: () => void) {
  return useMemo(
    () => ({
      onPointerOver: (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        deskActions.hover(label);
        document.body.style.cursor = "pointer";
      },
      onPointerOut: () => {
        deskActions.hover(null);
        document.body.style.cursor = "";
      },
      onClick: (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (e.delta > 6) return;
        onSelect();
      },
    }),
    [label, onSelect]
  );
}

const EMOJI = new RegExp("[\\p{Extended_Pictographic}\\u200d\\ufe0f]", "gu");

/** Strip emoji so the 3D text font (Latin only) can render a label. */
export function plainLabel(text: string) {
  return text
    .replace(EMOJI, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Smooth exponential approach that is frame-rate independent. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
