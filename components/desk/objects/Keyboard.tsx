"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Color, Matrix4, MeshBasicMaterial, type InstancedMesh } from "three";
import { deskActions, deskStore } from "../store";
import { useHotspot } from "./common";

const ROWS = 5;
const COLS = 14;
const K = 0.054;
const GAP = 0.009;
const BASE = { w: COLS * (K + GAP) + 0.03, d: (ROWS + 1) * (K + GAP) + 0.03 };

export default function Keyboard({ label }: { label: string }) {
  const keys = useRef<InstancedMesh>(null);
  const press = useRef(new Float32Array(ROWS * COLS));
  const lastPulse = useRef(0);
  const m = useMemo(() => new Matrix4(), []);
  const glow = useMemo(() => new MeshBasicMaterial({ color: "#000", toneMapped: false }), []);
  const tmp = useMemo(() => new Color(), []);

  const open = useCallback(() => deskActions.openMonitor(window.innerWidth < 768), []);
  const hot = useHotspot(label, open);

  // Each typed character pushes a random key down.
  useEffect(
    () =>
      deskStore.subscribe(() => {
        const { keyPulse } = deskStore.get();
        if (keyPulse !== lastPulse.current) {
          lastPulse.current = keyPulse;
          press.current[Math.floor(Math.random() * ROWS * COLS)] = 1;
        }
      }),
    []
  );

  const place = (i: number, depth: number) => {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    m.makeTranslation(
      -BASE.w / 2 + 0.015 + K / 2 + c * (K + GAP),
      0.042 - depth * 0.012,
      -BASE.d / 2 + 0.015 + K / 2 + r * (K + GAP)
    );
    keys.current!.setMatrixAt(i, m);
  };

  useEffect(() => {
    if (!keys.current) return;
    for (let i = 0; i < ROWS * COLS; i++) place(i, 0);
    keys.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }, dt) => {
    const s = deskStore.get();
    if (keys.current) {
      let dirty = false;
      for (let i = 0; i < press.current.length; i++) {
        if (press.current[i] > 0) {
          press.current[i] = Math.max(0, press.current[i] - dt * 7);
          place(i, press.current[i]);
          dirty = true;
        }
      }
      if (dirty) keys.current.instanceMatrix.needsUpdate = true;
    }
    const lvl = s.power === "on" ? 1 : s.power === "booting" ? 0.4 : 0;
    tmp.setHSL((0.8 + (s.reducedMotion ? 0 : clock.elapsedTime) * 0.08) % 1, 1, 0.5);
    glow.color.setRGB(0.02, 0.02, 0.03).lerp(tmp, lvl);
  });

  return (
    <group position={[-0.05, 0, 0.22]} {...hot}>
      <RoundedBox args={[BASE.w, 0.03, BASE.d]} radius={0.008} smoothness={2} position={[0, 0.017, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#14141d" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* RGB underglow between the keys */}
      <mesh position={[0, 0.0325, 0]} material={glow}>
        <boxGeometry args={[BASE.w - 0.02, 0.002, BASE.d - 0.02]} />
      </mesh>
      <instancedMesh ref={keys} args={[undefined, undefined, ROWS * COLS]} castShadow>
        <boxGeometry args={[K, 0.022, K]} />
        <meshStandardMaterial color="#22222e" roughness={0.55} />
      </instancedMesh>
      {/* space bar row */}
      <mesh position={[0, 0.042, BASE.d / 2 - 0.015 - K / 2]}>
        <boxGeometry args={[K * 6, 0.022, K]} />
        <meshStandardMaterial color="#f3e600" roughness={0.5} />
      </mesh>
      {[-1, 1].map((sd) => (
        <mesh key={sd} position={[sd * (K * 3 + GAP + K * 1.2), 0.042, BASE.d / 2 - 0.015 - K / 2]}>
          <boxGeometry args={[K * 2.2, 0.022, K]} />
          <meshStandardMaterial color="#22222e" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function Mouse() {
  return (
    <group position={[0.74, 0, 0.24]}>
      <mesh position={[0, 0.022, 0]} scale={[0.05, 0.026, 0.08]} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#16161f" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.045, -0.035]}>
        <boxGeometry args={[0.006, 0.006, 0.02]} />
        <meshBasicMaterial color="#00f0ff" toneMapped={false} />
      </mesh>
    </group>
  );
}
