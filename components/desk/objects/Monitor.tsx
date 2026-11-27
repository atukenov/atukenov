"use client";

import { Html, RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { CanvasTexture, SRGBColorSpace, type Group, type PointLight } from "three";
import MonitorScreen, { SCREEN_PX } from "../MonitorScreen";
import { deskActions, deskStore, useDesk } from "../store";
import { FONT, NEON, damp, useHotspot } from "./common";

export const SCREEN = { w: 1.54, h: 0.86, center: [0, 0.68, -0.42] as const };

function StickyNote({
  position,
  rotation,
  color,
  lines,
  label,
  onSelect,
}: {
  position: [number, number, number];
  rotation: number;
  color: string;
  lines: string;
  label: string;
  onSelect: () => void;
}) {
  const ref = useRef<Group>(null);
  const hovered = useDesk((s) => s.hovered === label);
  const hot = useHotspot(label, onSelect);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const t = hovered ? rotation + 0.12 : rotation;
    ref.current.rotation.z = damp(ref.current.rotation.z, t, 10, dt);
  });
  return (
    <group ref={ref} position={position} rotation-z={rotation} {...hot}>
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.003]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <Text
        font={FONT}
        fontSize={0.026}
        lineHeight={1.25}
        color="#141414"
        position={[0, 0, 0.003]}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        maxWidth={0.18}
      >
        {lines}
      </Text>
    </group>
  );
}

/**
 * A painted stand-in for the live screen, used when the camera looks at
 * another object (the live DOM screen can't be hidden behind 3D objects).
 */
function useScreenTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const w = 1024;
    const h = Math.round((w * SCREEN.h) / SCREEN.w);
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const g = c.getContext("2d");
    if (!g) return null;
    g.fillStyle = "#05070d";
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "rgba(0,240,255,0.08)";
    for (let x = 0; x < w; x += 30) g.strokeRect(x, 0, 0, h);
    for (let y = 0; y < h; y += 30) g.strokeRect(0, y, w, 0);
    g.fillStyle = "rgba(0,0,0,0.7)";
    g.fillRect(0, 0, w, 32);
    g.font = "bold 16px monospace";
    g.fillStyle = NEON.cyan;
    g.fillText("◆ AMAKENZI-OS", 16, 22);
    // profile window
    g.strokeStyle = NEON.cyan;
    g.lineWidth = 2;
    g.strokeRect(16, 48, 600, h - 110);
    g.fillStyle = "rgba(0,240,255,0.15)";
    g.fillRect(16, 48, 600, 26);
    g.fillStyle = "#1a2030";
    g.fillRect(36, 96, 150, 190);
    g.font = "bold 40px monospace";
    g.fillStyle = NEON.yellow;
    g.fillText("ALMAZ TUKENOV", 206, 140);
    g.font = "20px monospace";
    g.fillStyle = NEON.cyan;
    g.fillText("> Software Engineer", 206, 176);
    g.fillStyle = "rgba(255,255,255,0.55)";
    for (let i = 0; i < 4; i++) g.fillRect(206, 200 + i * 22, 360 - i * 40, 10);
    // terminal window
    g.strokeStyle = NEON.magenta;
    g.strokeRect(632, 48, w - 648, h - 110);
    g.fillStyle = "rgba(255,42,109,0.2)";
    g.fillRect(632, 48, w - 648, 26);
    g.font = "16px monospace";
    g.fillStyle = NEON.yellow;
    g.fillText("amakenzi-os v2.077", 646, 100);
    g.fillStyle = NEON.cyan;
    g.fillText("type 'help'", 646, 124);
    g.fillStyle = NEON.magenta;
    g.fillText("❯ _", 646, 148);
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    return tex;
  }, []);
}

export default function Monitor({
  label,
  notes,
}: {
  label: string;
  notes: { freelance: string; freelanceLabel: string; hobbies: string; hobbiesLabel: string };
}) {
  const power = useDesk((s) => s.power);
  const focus = useDesk((s) => s.focus);
  const on = power !== "off";
  const glow = useRef<PointLight>(null);

  const open = useCallback(() => deskActions.openMonitor(window.innerWidth < 768), []);
  const hot = useHotspot(label, open);
  const onContact = useCallback(() => deskActions.openContact(), []);
  const onHobby = useCallback(() => deskActions.kickBall(), []);

  useFrame((_, dt) => {
    if (glow.current) {
      const target = deskStore.get().power === "on" ? 1.6 : deskStore.get().power === "booting" ? 0.6 : 0;
      glow.current.intensity = damp(glow.current.intensity, target, 4, dt);
    }
  });

  const [cx, cy, cz] = SCREEN.center;
  const liveScreen = focus === "overview" || focus === "monitor";
  const screenshot = useScreenTexture();

  return (
    <group>
      {/* stand */}
      <RoundedBox args={[0.5, 0.025, 0.3]} radius={0.01} smoothness={2} position={[0, 0.013, cz - 0.05]} castShadow>
        <meshStandardMaterial color="#1c1c26" metalness={0.7} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.3, cz - 0.1]} castShadow>
        <boxGeometry args={[0.07, 0.56, 0.04]} />
        <meshStandardMaterial color="#1c1c26" metalness={0.7} roughness={0.35} />
      </mesh>

      <group position={[cx, cy, cz]} rotation-x={-0.04}>
        {/* bezel / body */}
        <group {...hot}>
          <RoundedBox args={[SCREEN.w + 0.08, SCREEN.h + 0.08, 0.05]} radius={0.015} smoothness={3} castShadow>
            <meshStandardMaterial color="#0e0e15" metalness={0.5} roughness={0.4} />
          </RoundedBox>
          {/* screen glass */}
          <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[SCREEN.w, SCREEN.h]} />
            {power === "on" && !liveScreen ? (
              <meshBasicMaterial map={screenshot} toneMapped={false} />
            ) : (
              <meshStandardMaterial
                color={on ? "#04060c" : "#020203"}
                roughness={0.15}
                metalness={0.6}
                emissive={on ? NEON.cyan : "#000"}
                emissiveIntensity={on ? 0.04 : 0}
              />
            )}
          </mesh>
        </group>
        {/* power LED */}
        <mesh position={[SCREEN.w / 2 - 0.02, -SCREEN.h / 2 - 0.025, 0.026]}>
          <circleGeometry args={[0.006, 10]} />
          <meshBasicMaterial color={on ? NEON.cyan : "#331018"} toneMapped={false} />
        </mesh>
        {/* brand on the chin */}
        <Text font={FONT} fontSize={0.018} letterSpacing={0.3} position={[0, -SCREEN.h / 2 - 0.022, 0.026]} color="#5a5a70">
          AMKZ
        </Text>

        {/* The DOM screen always draws on top of the 3D scene, so it is only
            mounted when nothing can stand in front of it. */}
        {on && liveScreen && (
          <Html
            transform
            distanceFactor={(SCREEN.w / SCREEN_PX.w) * 400}
            position={[0, 0, 0.028]}
            zIndexRange={[20, 0]}
            pointerEvents={focus === "monitor" ? "auto" : "none"}
            wrapperClass="desk-screen"
          >
            <MonitorScreen />
          </Html>
        )}

        {/* sticky notes on the bezel */}
        <StickyNote
          position={[-SCREEN.w / 2 - 0.1, SCREEN.h / 2 - 0.08, 0.03]}
          rotation={0.12}
          color="#f3e600"
          lines={notes.freelance}
          label={notes.freelanceLabel}
          onSelect={onContact}
        />
        <StickyNote
          position={[SCREEN.w / 2 + 0.1, -SCREEN.h / 2 + 0.14, 0.03]}
          rotation={-0.1}
          color="#ff7aa2"
          lines={notes.hobbies}
          label={notes.hobbiesLabel}
          onSelect={onHobby}
        />

        <pointLight ref={glow} color={NEON.cyan} intensity={0} distance={2.2} decay={2} position={[0, 0, 0.45]} />
      </group>
    </group>
  );
}
