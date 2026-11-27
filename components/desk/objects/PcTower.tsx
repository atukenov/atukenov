"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { Color, MeshBasicMaterial, type Group, type PointLight } from "three";
import { deskActions, deskStore, useDesk } from "../store";
import { FONT, NEON, damp, useHotspot } from "./common";

const W = 0.42;
const H = 0.94;
const D = 0.86;
const OFF = new Color("#15151f");

function Fan({ y, mat, z = D / 2 - 0.05 }: { y: number; mat: MeshBasicMaterial; z?: number }) {
  const blades = useRef<Group>(null);
  useFrame((_, dt) => {
    const s = deskStore.get();
    if (!blades.current || s.reducedMotion) return;
    const speed = s.power === "on" ? 14 : s.power === "booting" ? 6 : 0;
    blades.current.userData.v = damp(blades.current.userData.v ?? 0, speed, 1.5, dt);
    blades.current.rotation.z += blades.current.userData.v * dt;
  });
  return (
    <group position={[0, y, z]}>
      <mesh material={mat}>
        <torusGeometry args={[0.115, 0.012, 8, 32]} />
      </mesh>
      <group ref={blades}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <mesh key={i} rotation-z={(i / 7) * Math.PI * 2} position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 0.035, 0.004]} />
            <meshStandardMaterial color="#1b1b26" transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#222230" />
      </mesh>
    </group>
  );
}

export default function PcTower({ label, powerLabel }: { label: string; powerLabel: string }) {
  const power = useDesk((s) => s.power);
  const powerHovered = useDesk((s) => s.hovered === powerLabel);

  const open = useCallback(() => deskActions.openPc("skills"), []);
  const hot = useHotspot(label, open);
  const togglePower = useCallback(() => deskActions.togglePower(), []);
  const powerHot = useHotspot(powerLabel, togglePower);

  // One material per RGB zone, recoloured every frame.
  const mats = useMemo(
    () => ({
      fan: new MeshBasicMaterial({ color: OFF, toneMapped: false }),
      strip: new MeshBasicMaterial({ color: OFF, toneMapped: false }),
      ram: new MeshBasicMaterial({ color: OFF, toneMapped: false }),
      button: new MeshBasicMaterial({ color: OFF, toneMapped: false }),
    }),
    []
  );
  const inner = useRef<PointLight>(null);
  const tmp = useMemo(() => new Color(), []);

  useFrame(({ clock }, dt) => {
    const s = deskStore.get();
    const t = s.reducedMotion ? 0 : clock.elapsedTime;
    const lvl = s.power === "on" ? 1 : s.power === "booting" ? 0.5 + 0.5 * Math.sin(t * 12) : 0;
    tmp.setHSL((0.5 + t * 0.05) % 1, 1, 0.55);
    mats.fan.color.copy(OFF).lerp(tmp, lvl);
    tmp.setHSL((0.92 + t * 0.05) % 1, 1, 0.55);
    mats.strip.color.copy(OFF).lerp(tmp, lvl);
    mats.ram.color.copy(OFF).lerp(tmp.set(NEON.yellow), lvl);
    mats.button.color.set(s.power === "off" ? NEON.magenta : NEON.cyan);
    if (inner.current) inner.current.intensity = damp(inner.current.intensity, lvl * 1.4, 4, dt);
  });

  const panel = <meshStandardMaterial color="#12121b" metalness={0.6} roughness={0.35} />;

  return (
    <group position={[1.3, H / 2 + 0.005, -0.32]} rotation-y={0.45}>
      <group {...hot}>
        {/* solid panels: right side, back, top, bottom */}
        <mesh position={[W / 2 - 0.006, 0, 0]} castShadow>
          <boxGeometry args={[0.012, H, D]} />
          {panel}
        </mesh>
        <mesh position={[0, 0, -D / 2 + 0.006]}>
          <boxGeometry args={[W, H, 0.012]} />
          {panel}
        </mesh>
        <RoundedBox args={[W, 0.03, D]} radius={0.01} smoothness={2} position={[0, H / 2 - 0.015, 0]} castShadow>
          {panel}
        </RoundedBox>
        <RoundedBox args={[W, 0.04, D]} radius={0.01} smoothness={2} position={[0, -H / 2 + 0.02, 0]}>
          {panel}
        </RoundedBox>
        {/* glass: left side + front */}
        <mesh position={[-W / 2 + 0.004, 0, 0]}>
          <boxGeometry args={[0.008, H - 0.06, D - 0.02]} />
          <meshStandardMaterial color="#1a2a3a" transparent opacity={0.18} metalness={0.9} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0, D / 2 - 0.004]}>
          <boxGeometry args={[W - 0.02, H - 0.06, 0.008]} />
          <meshStandardMaterial color="#1a2a3a" transparent opacity={0.15} metalness={0.9} roughness={0.05} />
        </mesh>

        {/* internals */}
        <mesh position={[W / 2 - 0.03, 0.02, -0.04]}>
          <boxGeometry args={[0.02, H - 0.16, D - 0.2]} />
          <meshStandardMaterial color="#0a0a10" roughness={0.8} />
        </mesh>
        {/* CPU cooler, facing the glass */}
        <group position={[W / 2 - 0.1, 0.18, -0.1]} rotation-y={-Math.PI / 2}>
          <Fan y={0} z={0} mat={mats.fan} />
        </group>
        {/* RAM sticks */}
        {[0, 1, 2, 3].map((i) => (
          <group key={i} position={[W / 2 - 0.07, 0.2, 0.08 + i * 0.03]}>
            <mesh>
              <boxGeometry args={[0.06, 0.2, 0.012]} />
              <meshStandardMaterial color="#111118" />
            </mesh>
            <mesh position={[0, 0.105, 0]} material={mats.ram}>
              <boxGeometry args={[0.06, 0.012, 0.013]} />
            </mesh>
          </group>
        ))}
        {/* GPU */}
        <group position={[0, -0.12, -0.02]}>
          <RoundedBox args={[0.3, 0.07, 0.6]} radius={0.01} smoothness={2}>
            <meshStandardMaterial color="#1c1c28" metalness={0.6} roughness={0.3} />
          </RoundedBox>
          <mesh position={[-0.151, 0, 0]} material={mats.strip}>
            <boxGeometry args={[0.004, 0.012, 0.56]} />
          </mesh>
          <Text font={FONT} fontSize={0.03} position={[-0.152, 0.018, 0]} rotation-y={-Math.PI / 2} color="#8a8aa0">
            RTX // FULLSTACK
          </Text>
        </group>
        {/* PSU shroud */}
        <mesh position={[0, -H / 2 + 0.1, 0]}>
          <boxGeometry args={[W - 0.03, 0.12, D - 0.03]} />
          <meshStandardMaterial color="#0f0f17" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[-W / 2 + 0.02, -H / 2 + 0.1, 0]}>
          <boxGeometry args={[0.004, 0.02, D - 0.1]} />
          <meshBasicMaterial color={NEON.magenta} toneMapped={false} />
        </mesh>
        {/* front fans */}
        <Fan y={0.26} mat={mats.fan} />
        <Fan y={0.01} mat={mats.fan} />
        <Fan y={-0.24} mat={mats.fan} />
        {/* front edge light strip */}
        <mesh position={[-W / 2 + 0.01, 0, D / 2 - 0.006]} material={mats.strip}>
          <boxGeometry args={[0.008, H - 0.1, 0.008]} />
        </mesh>
        <pointLight ref={inner} color={NEON.cyan} intensity={0} distance={1.2} decay={2} position={[-0.25, 0, 0.1]} />
      </group>

      {/* power button on the top, near the front */}
      <group position={[-0.08, H / 2 + 0.002, D / 2 - 0.09]} {...powerHot}>
        <mesh position={[0, powerHovered ? 0.004 : 0.008, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.016, 24]} />
          <meshStandardMaterial color="#202030" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.0005, 0]} material={mats.button}>
          <cylinderGeometry args={[0.04, 0.04, 0.004, 24]} />
        </mesh>
        <mesh position={[0, 0.017, 0]} rotation-x={-Math.PI / 2} material={mats.button}>
          <ringGeometry args={[0.012, 0.016, 20, 1, 0.5, Math.PI * 2 - 1]} />
        </mesh>
        <mesh position={[0, 0.017, -0.007]} rotation-x={-Math.PI / 2} material={mats.button}>
          <planeGeometry args={[0.004, 0.014]} />
        </mesh>
      </group>
      {power === "off" && (
        <Text
          font={FONT}
          fontSize={0.028}
          letterSpacing={0.15}
          position={[-0.08, H / 2 + 0.002, D / 2 - 0.02]}
          rotation-x={-Math.PI / 2}
          anchorX="center"
        >
          PRESS
          <meshBasicMaterial color={NEON.magenta} toneMapped={false} />
        </Text>
      )}
    </group>
  );
}
