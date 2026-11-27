"use client";

import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Object3D, Quaternion, Vector3, type SpotLight } from "three";
import { deskActions, deskStore, useDesk } from "../store";
import { damp, useHotspot } from "./common";

const UP = new Vector3(0, 1, 0);

/** A cylinder from point a to point b. */
function Segment({ a, b, r }: { a: [number, number, number]; b: [number, number, number]; r: number }) {
  const { pos, quat, len } = useMemo(() => {
    const va = new Vector3(...a);
    const vb = new Vector3(...b);
    const dir = vb.clone().sub(va);
    return {
      pos: va.clone().add(vb).multiplyScalar(0.5),
      quat: new Quaternion().setFromUnitVectors(UP, dir.clone().normalize()),
      len: dir.length(),
    };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={quat} castShadow>
      <cylinderGeometry args={[r, r, len, 12]} />
      <meshStandardMaterial color="#1e1e2a" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

const J1: [number, number, number] = [0, 0.06, 0];
const J2: [number, number, number] = [0, 0.66, 0.08];
const J3: [number, number, number] = [0, 0.88, 0.5];

export default function Lamp({ label }: { label: string }) {
  const on = useDesk((s) => s.lamp);
  const toggle = useCallback(() => deskActions.toggleLamp(), []);
  const hot = useHotspot(label, toggle);
  const spot = useRef<SpotLight>(null);
  const target = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (spot.current) spot.current.target = target;
  }, [target]);

  useFrame((_, dt) => {
    if (!spot.current) return;
    spot.current.intensity = damp(spot.current.intensity, deskStore.get().lamp ? 9 : 0, 12, dt);
  });

  return (
    <group position={[-1.58, 0, -0.5]} rotation-y={1.15} {...hot}>
      {/* base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.04, 28]} />
        <meshStandardMaterial color="#16161f" metalness={0.7} roughness={0.35} />
      </mesh>
      <Segment a={J1} b={J2} r={0.014} />
      <Segment a={J2} b={J3} r={0.012} />
      {[J1, J2, J3].map((j, i) => (
        <mesh key={i} position={j}>
          <sphereGeometry args={[0.024, 14, 10]} />
          <meshStandardMaterial color="#f3e600" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* head: a cone pointing down and slightly forward */}
      <group position={J3} rotation-x={0.45}>
        <mesh position={[0, -0.06, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.12, 0.14, 24, 1, true]} />
          <meshStandardMaterial color="#1e1e2a" metalness={0.8} roughness={0.3} side={2} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.045, 16, 12]} />
          <meshBasicMaterial color={on ? "#fff6c8" : "#3a3a44"} toneMapped={!on} />
        </mesh>
        <spotLight
          ref={spot}
          position={[0, -0.1, 0]}
          angle={0.75}
          penumbra={0.6}
          distance={3.2}
          decay={1.6}
          intensity={9}
          color="#ffe9b0"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
        />
      </group>
      <primitive object={target} position={[0, 0, 1.05]} />
    </group>
  );
}
