"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useCallback } from "react";
import { deskActions, useDesk } from "../store";
import { FONT, NEON, useHotspot } from "./common";

export const DESK = { width: 3.4, depth: 1.5, top: 0, floor: -1.45, z: -0.1 };

/** Desk, floor, back wall, neon sign and the room light switch. */
export default function Room({ switchLabel }: { switchLabel: string }) {
  const roomLights = useDesk((s) => s.roomLights);
  const onSwitch = useCallback(() => deskActions.toggleRoomLights(), []);
  const switchHot = useHotspot(switchLabel, onSwitch);

  const legH = DESK.top - DESK.floor - 0.06;
  const legX = DESK.width / 2 - 0.12;
  const legZ = DESK.depth / 2 - 0.12;

  return (
    <group>
      {/* floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, DESK.floor, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#0b0b14" roughness={0.85} />
      </mesh>

      {/* back wall with a faint grid */}
      <mesh position={[0, 1, -1.25]} receiveShadow>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial color="#10101c" roughness={0.95} />
      </mesh>
      <gridHelper
        args={[14, 56, "#1c2c3a", "#141c28"]}
        rotation-x={Math.PI / 2}
        position={[0, 1, -1.24]}
      />

      {/* neon sign */}
      <group position={[1.4, 1.24, -1.2]}>
        <Text
          font={FONT}
          fontSize={0.15}
          letterSpacing={0.08}
          anchorX="center"
          anchorY="middle"
        >
          {"<AMAKENZI />"}
          <meshBasicMaterial color={NEON.yellow} toneMapped={false} />
        </Text>
        <Text
          font={FONT}
          fontSize={0.055}
          letterSpacing={0.4}
          position={[0, -0.15, 0]}
          anchorX="center"
        >
          FULL-STACK // ATYRAU.KZ
          <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
        </Text>
        <pointLight color={NEON.yellow} intensity={1.4} distance={3} decay={2} position={[0, 0, 0.3]} />
      </group>

      {/* desk top */}
      <RoundedBox
        args={[DESK.width, 0.08, DESK.depth]}
        radius={0.02}
        smoothness={2}
        position={[0, DESK.top - 0.04, DESK.z]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="#1a1a24" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      {/* LED strip along the front edge */}
      <mesh position={[0, DESK.top - 0.085, DESK.z + DESK.depth / 2 - 0.01]}>
        <boxGeometry args={[DESK.width - 0.06, 0.012, 0.012]} />
        <meshBasicMaterial color={NEON.magenta} toneMapped={false} />
      </mesh>
      <pointLight
        color={NEON.magenta}
        intensity={2}
        distance={2.6}
        decay={2}
        position={[0, DESK.top - 0.3, DESK.z + DESK.depth / 2 + 0.2]}
      />

      {/* legs */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`${sx}${sz}`}
            position={[sx * legX, DESK.top - 0.08 - legH / 2, DESK.z + sz * legZ]}
            castShadow
          >
            <boxGeometry args={[0.07, legH, 0.07]} />
            <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.4} />
          </mesh>
        ))
      )}

      {/* desk mat */}
      <RoundedBox
        args={[2.0, 0.006, 0.6]}
        radius={0.003}
        smoothness={2}
        position={[0.1, DESK.top + 0.003, 0.2]}
        receiveShadow
      >
        <meshStandardMaterial color="#0c0c13" roughness={0.95} />
      </RoundedBox>
      {/* thin cyan border on the mat */}
      {[
        [0.1, 0.49, 2.0, 0.006],
        [0.1, -0.09, 2.0, 0.006],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, DESK.top + 0.0068, z]}>
          <boxGeometry args={[w, 0.001, d]} />
          <meshBasicMaterial color={NEON.cyan} toneMapped={false} transparent opacity={0.55} />
        </mesh>
      ))}

      {/* room light switch on the wall */}
      <group position={[2.05, 0.55, -1.22]} {...switchHot}>
        <RoundedBox args={[0.16, 0.24, 0.025]} radius={0.01} smoothness={2}>
          <meshStandardMaterial color="#d8d8e0" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, roomLights ? 0.03 : -0.03, 0.02]} rotation-x={roomLights ? -0.3 : 0.3}>
          <boxGeometry args={[0.05, 0.08, 0.03]} />
          <meshStandardMaterial color={roomLights ? "#ffffff" : "#b0b0bc"} />
        </mesh>
        <mesh position={[0, -0.095, 0.014]}>
          <circleGeometry args={[0.008, 12]} />
          <meshBasicMaterial color={roomLights ? NEON.cyan : NEON.magenta} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
