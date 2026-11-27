"use client";

import type { ExperienceItem } from "@/lib/content/types";
import { Billboard, RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MeshBasicMaterial, type Group, type Mesh } from "three";
import { lofiPulse, startLofi, stopLofi } from "../lofi";
import { deskActions, deskStore, useDesk } from "../store";
import { FONT, NEON, damp, useHotspot } from "./common";

/* ---------------------------------------------------------------- phone */

export function Phone({ label, callText }: { label: string; callText: string }) {
  const hovered = useDesk((s) => s.hovered === label);
  const open = useCallback(() => deskActions.openContact(), []);
  const hot = useHotspot(label, open);
  const ring = useRef<Mesh>(null);
  const body = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (ring.current) {
      const p = (t * 0.9) % 1;
      ring.current.scale.setScalar(0.6 + p * 0.9);
      (ring.current.material as MeshBasicMaterial).opacity = (1 - p) * 0.8;
    }
    if (body.current) {
      // buzz now and then (or while hovered)
      const buzz = hovered || (!deskStore.get().reducedMotion && t % 6 < 0.6);
      body.current.rotation.y = buzz ? Math.sin(t * 60) * 0.03 - 0.35 : damp(body.current.rotation.y, -0.35, 8, dt);
    }
  });

  return (
    <group ref={body} position={[-0.74, 0, 0.4]} rotation-y={-0.35} {...hot}>
      <RoundedBox args={[0.1, 0.012, 0.2]} radius={0.005} smoothness={2} position={[0, 0.006, 0]} castShadow>
        <meshStandardMaterial color="#0d0d14" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.0125, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.088, 0.186]} />
        <meshBasicMaterial color="#071018" toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={[0, 0.013, -0.02]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.022, 0.026, 32]} />
        <meshBasicMaterial color={NEON.cyan} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.0132, -0.02]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.016, 24]} />
        <meshBasicMaterial color="#3dff8a" toneMapped={false} />
      </mesh>
      <Text font={FONT} fontSize={0.011} position={[0, 0.0135, 0.04]} rotation-x={-Math.PI / 2} anchorX="center" letterSpacing={0.1}>
        {callText}
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </Text>
      <Text font={FONT} fontSize={0.008} position={[0, 0.0135, 0.06]} rotation-x={-Math.PI / 2} anchorX="center">
        +7 771 177 0303
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
      </Text>
    </group>
  );
}

/* ---------------------------------------------------------- coffee cup */

function Steam({ offset }: { offset: number }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = ((clock.elapsedTime * 0.35 + offset) % 1 + 1) % 1;
    ref.current.position.set(Math.sin(p * 7 + offset * 9) * 0.015, 0.13 + p * 0.22, 0);
    ref.current.scale.setScalar(0.008 + p * 0.022);
    (ref.current.material as MeshBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.1;
  });
  return (
    <Billboard>
      <mesh ref={ref}>
        <circleGeometry args={[1, 16]} />
        <meshBasicMaterial color="#ffffff" transparent depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

export function CoffeeCup({ label, projectIndex }: { label: string; projectIndex: number }) {
  const open = useCallback(() => {
    if (projectIndex >= 0) deskActions.openProject(projectIndex);
  }, [projectIndex]);
  const hot = useHotspot(label, open);
  const reduced = useDesk((s) => s.reducedMotion);

  return (
    <group position={[1.02, 0, 0.36]} {...hot}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.058, 0.05, 0.12, 28]} />
        <meshStandardMaterial color="#111118" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.118, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.052, 24]} />
        <meshStandardMaterial color="#3b2212" roughness={0.2} />
      </mesh>
      <mesh position={[0.065, 0.06, 0]} rotation-z={Math.PI / 2}>
        <torusGeometry args={[0.03, 0.009, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#111118" roughness={0.4} />
      </mesh>
      {/* gold band + logo */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.0545, 0.053, 0.012, 28, 1, true]} />
        <meshStandardMaterial color="#d6a930" metalness={0.9} roughness={0.25} />
      </mesh>
      <Text font={FONT} fontSize={0.016} position={[0, 0.07, 0.057]} anchorX="center" letterSpacing={0.1}>
        ALTYN
        <meshStandardMaterial color="#d6a930" metalness={0.9} roughness={0.25} />
      </Text>
      {!reduced && [0, 0.2, 0.4, 0.6, 0.8].map((o) => <Steam key={o} offset={o} />)}
    </group>
  );
}

/* ------------------------------------------------------- desk calendar */

export function DeskCalendar({ label, items }: { label: string; items: ExperienceItem[] }) {
  const page = useDesk((s) => s.calendarPage);
  const [shown, setShown] = useState(page);
  const flip = useRef<Group>(null);
  const progress = useRef(1);
  const flipNext = useCallback(() => deskActions.flipCalendar(items.length), [items.length]);
  const hot = useHotspot(label, flipNext);

  useEffect(() => {
    if (page !== shown) progress.current = 0;
  }, [page, shown]);

  useFrame((_, dt) => {
    if (!flip.current) return;
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + dt * 2.5);
      if (progress.current >= 0.5 && shown !== page) setShown(page);
    }
    // page swings up and over the top, then the new one swings back down
    const p = progress.current;
    flip.current.rotation.x = p < 1 ? -Math.sin(p * Math.PI) * 2.2 : 0;
  });

  const item = items[shown % Math.max(items.length, 1)];
  if (!item) return null;
  const W = 0.3;
  const H = 0.2;

  return (
    <group position={[-0.56, 0, -0.17]} rotation-y={0.18} {...hot}>
      {/* tent stand */}
      {/* leans back from the top edge, so it never crosses the front page */}
      <mesh position={[0, H / 2 - 0.005, -Math.sin(0.35) * (H / 2)]} rotation-x={0.35}>
        <boxGeometry args={[W, H, 0.006]} />
        <meshStandardMaterial color="#17171f" />
      </mesh>
      {/* rings */}
      {[-0.09, -0.03, 0.03, 0.09].map((x) => (
        <mesh key={x} position={[x, H - 0.005, -0.005]} rotation-y={Math.PI / 2}>
          <torusGeometry args={[0.012, 0.003, 6, 12]} />
          <meshStandardMaterial color="#9a9ab0" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <group position={[0, H - 0.005, 0]} rotation-x={-0.35}>
        <group ref={flip}>
          <group position={[0, -H / 2, 0]}>
            <mesh>
              <boxGeometry args={[W - 0.01, H - 0.01, 0.004]} />
              <meshStandardMaterial color="#efeff4" roughness={0.9} />
            </mesh>
            <mesh position={[0, H / 2 - 0.035, 0.0025]}>
              <planeGeometry args={[W - 0.01, 0.05]} />
              <meshBasicMaterial color={NEON.magenta} toneMapped={false} />
            </mesh>
            <Text font={FONT} fontSize={0.024} position={[0, H / 2 - 0.035, 0.003]} anchorX="center" anchorY="middle" color="#ffffff">
              {item.duration}
            </Text>
            <Text
              font={FONT}
              fontSize={0.026}
              maxWidth={W - 0.04}
              textAlign="center"
              position={[0, -0.005, 0.003]}
              anchorX="center"
              anchorY="middle"
              color="#0a0a10"
            >
              {item.company}
            </Text>
            <Text
              font={FONT}
              fontSize={0.014}
              maxWidth={W - 0.04}
              textAlign="center"
              position={[0, -0.05, 0.003]}
              anchorX="center"
              anchorY="middle"
              color="#55556a"
            >
              {item.position}
            </Text>
            <Text font={FONT} fontSize={0.011} position={[0, -H / 2 + 0.018, 0.003]} anchorX="center" color="#4a4a60">
              {`${(shown % items.length) + 1}/${items.length}  click to flip`}
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ---------------------------------------------------------- headphones */

export function Headphones({ label }: { label: string }) {
  const music = useDesk((s) => s.music);
  const toggle = useCallback(() => deskActions.toggleMusic(), []);
  const hot = useHotspot(label, toggle);
  const glow = useMemo(() => new MeshBasicMaterial({ color: "#2a2a36", toneMapped: false }), []);
  const group = useRef<Group>(null);

  useEffect(() => {
    if (music) startLofi();
    else stopLofi();
  }, [music]);
  useEffect(() => () => stopLofi(), []);

  useFrame(({ clock }, dt) => {
    const on = deskStore.get().music;
    const p = on ? lofiPulse() : 0;
    glow.color.set(on ? NEON.cyan : "#2a2a36").multiplyScalar(on ? 0.5 + p * 0.8 : 1);
    if (group.current) {
      const bob = on && !deskStore.get().reducedMotion ? Math.sin(clock.elapsedTime * 7.5) * 0.004 + p * 0.006 : 0;
      group.current.position.y = damp(group.current.position.y, bob, 20, dt);
    }
  });

  return (
    <group position={[0.6, 0, -0.1]} rotation-y={-0.5} {...hot}>
      <group ref={group}>
        {/* headband lying on the desk */}
        <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
          <torusGeometry args={[0.1, 0.014, 8, 28, Math.PI]} />
          <meshStandardMaterial color="#17171f" roughness={0.5} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.1, 0.03, 0.0]}>
            <mesh rotation-z={Math.PI / 2}>
              <cylinderGeometry args={[0.048, 0.048, 0.04, 24]} />
              <meshStandardMaterial color="#1c1c26" metalness={0.5} roughness={0.35} />
            </mesh>
            <mesh position={[s * 0.021, 0, 0]} rotation-y={(s * Math.PI) / 2} material={glow}>
              <ringGeometry args={[0.028, 0.036, 24]} />
            </mesh>
          </group>
        ))}
      </group>
      {music && (
        <Text font={FONT} fontSize={0.03} position={[0, 0.14, 0]} anchorX="center" letterSpacing={0.1}>
          LO-FI
          <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
        </Text>
      )}
    </group>
  );
}

/* --------------------------------------------------------- soccer ball */

const R = 0.07;
const HOME: [number, number] = [-1.42, 0.42];

export function SoccerBall({ label }: { label: string }) {
  const ref = useRef<Group>(null);
  const v = useRef({ x: 0, y: 0, z: 0 });
  const kicks = useRef(0);
  const kick = useCallback(() => deskActions.kickBall(), []);
  const hot = useHotspot(label, kick);

  useFrame((_, rawDt) => {
    const g = ref.current;
    if (!g) return;
    const dt = Math.min(rawDt, 0.05);
    const s = deskStore.get();
    if (s.ballKick !== kicks.current) {
      kicks.current = s.ballKick;
      v.current.y = 2.3;
      v.current.x = (Math.random() - 0.3) * 0.5;
      v.current.z = (Math.random() - 0.5) * 0.4;
    }
    const vel = v.current;
    vel.y -= 9.8 * dt;
    g.position.y += vel.y * dt;
    g.position.x += vel.x * dt;
    g.position.z += vel.z * dt;
    if (g.position.y <= R) {
      g.position.y = R;
      vel.y = Math.abs(vel.y) > 0.4 ? -vel.y * 0.55 : 0;
      vel.x *= 0.8;
      vel.z *= 0.8;
    }
    // roll home slowly once settled, and stay on the desk
    if (vel.y === 0) {
      g.position.x = damp(g.position.x, HOME[0], 1.2, dt);
      g.position.z = damp(g.position.z, HOME[1], 1.2, dt);
    }
    g.position.x = Math.min(Math.max(g.position.x, -1.6), -0.6);
    g.position.z = Math.min(Math.max(g.position.z, 0.2), 0.58);
    g.rotation.x += (vel.z / R) * dt;
    g.rotation.z -= (vel.x / R) * dt;
  });

  return (
    <group ref={ref} position={[HOME[0], R, HOME[1]]} {...hot}>
      <mesh castShadow>
        <sphereGeometry args={[R * 0.97, 24, 16]} />
        <meshStandardMaterial color="#f4f4f8" roughness={0.5} />
      </mesh>
      {/* black patches: icosahedron corners poking through the sphere */}
      <mesh>
        <icosahedronGeometry args={[R * 1.1, 0]} />
        <meshStandardMaterial color="#121218" roughness={0.5} flatShading />
      </mesh>
    </group>
  );
}
