"use client";

import type { Project } from "@/lib/content/types";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import type { Group } from "three";
import { deskActions, useDesk } from "../store";
import { FONT, damp, plainLabel, useHotspot } from "./common";

const COLORS = ["#e8d800", "#00c8d8", "#ff2a6d", "#8a3dff", "#3dff8a", "#ff9a1f"];
const FW = 0.52;
const FH = 0.34;

function Folder({ project, index }: { project: Project; index: number }) {
  const name = plainLabel(project.category) || `Project ${index + 1}`;
  const ref = useRef<Group>(null);
  const hovered = useDesk((s) => s.hovered === name);
  const selected = useDesk((s) => s.panel?.kind === "project" && s.panel.index === index);
  const open = useCallback(() => deskActions.openProject(index), [index]);
  const hot = useHotspot(name, open);

  // index 0 stands at the front; each one behind sits a step higher
  const z = 0.14 - index * 0.085;
  const baseY = 0.035 + index * 0.045;
  const tabX = index % 2 === 0 ? -0.12 : 0.12;
  const color = COLORS[index % COLORS.length];

  useFrame((_, dt) => {
    if (!ref.current) return;
    const lift = selected ? 0.2 : hovered ? 0.07 : 0;
    ref.current.position.y = damp(ref.current.position.y, baseY + FH / 2 + lift, 9, dt);
    ref.current.rotation.x = damp(ref.current.rotation.x, selected ? 0.18 : -0.06, 9, dt);
  });

  return (
    <group ref={ref} position={[0, baseY + FH / 2, z]} rotation-x={-0.06} {...hot}>
      {/* back cover */}
      <mesh position={[0, 0, -0.006]} castShadow>
        <boxGeometry args={[FW, FH, 0.006]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* paper peeking out */}
      <mesh position={[0.02, 0.012, 0]}>
        <boxGeometry args={[FW - 0.06, FH - 0.01, 0.004]} />
        <meshStandardMaterial color="#e9e9f0" roughness={0.9} />
      </mesh>
      {/* front cover (a bit shorter, like a real folder) */}
      <mesh position={[0, -0.02, 0.006]}>
        <boxGeometry args={[FW, FH - 0.04, 0.006]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* tab */}
      <mesh position={[tabX, FH / 2 + 0.024, -0.006]}>
        <boxGeometry args={[0.25, 0.05, 0.006]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <Text
        font={FONT}
        fontSize={0.026}
        maxWidth={0.24}
        position={[tabX, FH / 2 + 0.024, -0.002]}
        anchorX="center"
        anchorY="middle"
        color="#0a0a10"
      >
        {name}
      </Text>
      {/* number on the front cover */}
      <Text
        font={FONT}
        fontSize={0.05}
        position={[-FW / 2 + 0.05, -FH / 2 + 0.05, 0.0095]}
        anchorX="left"
        anchorY="bottom"
        color="#0a0a10"
      >
        {String(index + 1).padStart(2, "0")}
      </Text>
    </group>
  );
}

export default function Folders({ projects, title }: { projects: Project[]; title: string }) {
  const n = projects.length;
  return (
    <group position={[-1.05, 0, -0.22]} rotation-y={0.3}>
      {/* stepped organizer */}
      {projects.map((_, i) => (
        <mesh key={i} position={[0, 0.0175 + i * 0.0225, 0.14 - i * 0.085]} receiveShadow castShadow>
          <boxGeometry args={[FW + 0.08, 0.035 + i * 0.045, 0.085]} />
          <meshStandardMaterial color="#191924" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (FW / 2 + 0.045), 0.12, 0.14 - ((n - 1) * 0.085) / 2]}>
          <boxGeometry args={[0.01, 0.24, (n - 1) * 0.085 + 0.085]} />
          <meshStandardMaterial color="#22222e" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      <Text
        font={FONT}
        fontSize={0.024}
        letterSpacing={0.3}
        position={[0, 0.0175, 0.14 + 0.0428]}
        anchorX="center"
        anchorY="middle"
        color="#00f0ff"
      >
        {title}
      </Text>
      {projects.map((p, i) => (
        <Folder key={p.num} project={p} index={i} />
      ))}
    </group>
  );
}
