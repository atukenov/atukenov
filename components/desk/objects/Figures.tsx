"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import type { Group } from "three";
import { deskActions, deskStore } from "../store";
import { FONT, NEON, damp, useHotspot } from "./common";
import { WALL } from "./Walls";

/**
 * Original, stylized "big head" collectible figures. Each one is just a
 * colour palette and a few simple shapes that hint at a character
 * (hair, mask, hat, accessory); no official artwork or logos.
 */
type FigureSpec = {
  name: string;
  skin: string;
  hair?: { color: string; style: "spiky" | "short" | "long" | "swept" };
  eyes?: string;
  outfit: string;
  pants?: string;
  arms?: string;
  front?: "plastron" | "clouds" | "checker" | "vest";
  accent?: string;
  mask?: { type: "bandana"; color: string } | { type: "blindfold" } | { type: "swirl" } | { type: "headband" };
  hat?: "straw" | "tricorn";
  back?: "shell" | "gourd";
  marks?: ("beard" | "scar" | "eyerings" | "forehead" | "earrings")[];
};

const SKIN = "#f2c9a0";
const TURTLE = "#4c9a3c";

export const FIGURES: FigureSpec[] = [
  { name: "Itachi", skin: SKIN, hair: { color: "#151520", style: "long" }, eyes: "#d01020", outfit: "#121218", front: "clouds", mask: { type: "headband" } },
  { name: "Leonardo", skin: TURTLE, outfit: TURTLE, arms: TURTLE, pants: TURTLE, front: "plastron", mask: { type: "bandana", color: "#2f6fe0" }, back: "shell", eyes: "#ffffff" },
  { name: "Raphael", skin: TURTLE, outfit: TURTLE, arms: TURTLE, pants: TURTLE, front: "plastron", mask: { type: "bandana", color: "#d8262c" }, back: "shell", eyes: "#ffffff" },
  { name: "Donatello", skin: TURTLE, outfit: TURTLE, arms: TURTLE, pants: TURTLE, front: "plastron", mask: { type: "bandana", color: "#7b3fc4" }, back: "shell", eyes: "#ffffff" },
  { name: "Michelangelo", skin: TURTLE, outfit: TURTLE, arms: TURTLE, pants: TURTLE, front: "plastron", mask: { type: "bandana", color: "#f08a1c" }, back: "shell", eyes: "#ffffff" },
  { name: "Tanjiro", skin: SKIN, hair: { color: "#3a1210", style: "spiky" }, outfit: "#1f6a4a", accent: "#0e0e12", front: "checker", pants: "#16161e", marks: ["forehead", "earrings"] },
  { name: "Gaara", skin: "#f0d0b0", hair: { color: "#b3221c", style: "short" }, outfit: "#6e2a24", pants: "#4a1c18", accent: "#c8b088", back: "gourd", marks: ["eyerings", "forehead"] },
  { name: "Obito", skin: SKIN, hair: { color: "#14141c", style: "short" }, outfit: "#1c1830", pants: "#14141c", mask: { type: "swirl" } },
  { name: "Gojo", skin: "#f6dcc0", hair: { color: "#f4f6ff", style: "spiky" }, outfit: "#151a30", pants: "#151a30", mask: { type: "blindfold" } },
  { name: "Jack Sparrow", skin: "#d9a77c", hair: { color: "#2a1a10", style: "long" }, outfit: "#5a3a22", accent: "#e8e0cc", front: "vest", pants: "#2a2420", hat: "tricorn", marks: ["beard"] },
  { name: "Luffy", skin: "#f0c090", hair: { color: "#111116", style: "short" }, outfit: "#d82020", accent: "#f0c090", front: "vest", pants: "#2b5fb8", arms: "#f0c090", hat: "straw", marks: ["scar"] },
];

const HEAD = { w: 0.12, h: 0.105, d: 0.1 };
const BODY_Y = 0.07;
const HEAD_Y = 0.17;

function Hair({ spec }: { spec: NonNullable<FigureSpec["hair"]> }) {
  const mat = <meshStandardMaterial color={spec.color} roughness={0.6} />;
  const top = HEAD.h / 2;
  return (
    <group>
      {/* cap over the top and back of the head */}
      <RoundedBox args={[HEAD.w + 0.01, 0.035, HEAD.d + 0.01]} radius={0.012} smoothness={2} position={[0, top - 0.008, -0.002]}>
        {mat}
      </RoundedBox>
      <mesh position={[0, 0.005, -HEAD.d / 2 - 0.004]}>
        <boxGeometry args={[HEAD.w + 0.01, HEAD.h - 0.01, 0.012]} />
        {mat}
      </mesh>
      {spec.style === "spiky" &&
        [-0.04, -0.015, 0.01, 0.035].map((x, i) => (
          <mesh key={x} position={[x, top + 0.025, -0.01 + (i % 2) * 0.02]} rotation-z={-x * 6}>
            <coneGeometry args={[0.02, 0.05, 5]} />
            {mat}
          </mesh>
        ))}
      {spec.style === "short" &&
        [-0.035, 0, 0.035].map((x) => (
          <mesh key={x} position={[x, top - 0.005, HEAD.d / 2 - 0.005]} rotation-x={0.9}>
            <coneGeometry args={[0.018, 0.035, 4]} />
            {mat}
          </mesh>
        ))}
      {spec.style === "long" && (
        <>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * (HEAD.w / 2 + 0.004), -0.01, 0.02]}>
              <boxGeometry args={[0.012, HEAD.h, 0.04]} />
              {mat}
            </mesh>
          ))}
          <mesh position={[0, -0.06, -HEAD.d / 2 - 0.006]}>
            <boxGeometry args={[0.05, 0.08, 0.014]} />
            {mat}
          </mesh>
        </>
      )}
      {spec.style === "swept" && (
        <mesh position={[0, top + 0.01, 0.01]} rotation-x={-0.3}>
          <boxGeometry args={[HEAD.w, 0.03, HEAD.d * 0.8]} />
          {mat}
        </mesh>
      )}
    </group>
  );
}

function Face({ spec }: { spec: FigureSpec }) {
  const z = HEAD.d / 2 + 0.001;
  const eye = spec.eyes ?? "#0b0b10";
  const marks = spec.marks ?? [];
  const hidden = spec.mask?.type === "blindfold" || spec.mask?.type === "swirl";
  return (
    <group>
      {!hidden &&
        [-1, 1].map((s) => (
          <group key={s} position={[s * 0.028, -0.005, z]}>
            {marks.includes("eyerings") && (
              <mesh position={[0, 0, -0.0005]}>
                <circleGeometry args={[0.016, 16]} />
                <meshBasicMaterial color="#1a0c14" />
              </mesh>
            )}
            <mesh>
              <circleGeometry args={[0.011, 16]} />
              <meshBasicMaterial color={eye} />
            </mesh>
            {eye !== "#0b0b10" && (
              <mesh position={[0, 0, 0.0005]}>
                <circleGeometry args={[0.005, 12]} />
                <meshBasicMaterial color="#0b0b10" />
              </mesh>
            )}
          </group>
        ))}
      {marks.includes("beard") && (
        <mesh position={[0, -0.04, z]}>
          <boxGeometry args={[0.03, 0.02, 0.004]} />
          <meshStandardMaterial color="#2a1a10" />
        </mesh>
      )}
      {marks.includes("scar") && (
        <mesh position={[-0.028, -0.024, z + 0.001]}>
          <planeGeometry args={[0.014, 0.003]} />
          <meshBasicMaterial color="#9a2020" />
        </mesh>
      )}
      {marks.includes("forehead") && (
        <mesh position={[-0.02, 0.03, z + 0.001]}>
          <planeGeometry args={[0.012, 0.01]} />
          <meshBasicMaterial color="#b02020" />
        </mesh>
      )}
      {marks.includes("earrings") &&
        [-1, 1].map((s) => (
          <mesh key={s} position={[s * (HEAD.w / 2 + 0.004), -0.045, 0.01]}>
            <boxGeometry args={[0.004, 0.022, 0.012]} />
            <meshStandardMaterial color="#f4f0e6" />
          </mesh>
        ))}
    </group>
  );
}

function Mask({ mask }: { mask: NonNullable<FigureSpec["mask"]> }) {
  const z = HEAD.d / 2;
  if (mask.type === "bandana") {
    return (
      <group>
        <mesh position={[0, -0.003, 0]}>
          <boxGeometry args={[HEAD.w + 0.006, 0.026, HEAD.d + 0.006]} />
          <meshStandardMaterial color={mask.color} roughness={0.6} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.015, -0.02, -z - 0.02]} rotation-z={s * 0.5} rotation-x={0.4}>
            <boxGeometry args={[0.012, 0.045, 0.004]} />
            <meshStandardMaterial color={mask.color} />
          </mesh>
        ))}
      </group>
    );
  }
  if (mask.type === "blindfold") {
    return (
      <mesh position={[0, -0.002, 0]}>
        <boxGeometry args={[HEAD.w + 0.006, 0.03, HEAD.d + 0.006]} />
        <meshStandardMaterial color="#0a0a0e" roughness={0.5} />
      </mesh>
    );
  }
  if (mask.type === "headband") {
    return (
      <group position={[0, 0.03, 0]}>
        <mesh>
          <boxGeometry args={[HEAD.w + 0.006, 0.016, HEAD.d + 0.006]} />
          <meshStandardMaterial color="#1d2440" />
        </mesh>
        <mesh position={[0, 0, z + 0.004]}>
          <boxGeometry args={[0.05, 0.014, 0.004]} />
          <meshStandardMaterial color="#b8c0d0" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>
    );
  }
  // swirl mask: an orange face plate with a spiral around one eye hole
  return (
    <group position={[0, -0.004, z + 0.003]}>
      <mesh>
        <boxGeometry args={[HEAD.w - 0.008, HEAD.h - 0.012, 0.006]} />
        <meshStandardMaterial color="#e8741c" roughness={0.5} />
      </mesh>
      {[0.011, 0.02, 0.029].map((r) => (
        <mesh key={r} position={[0.022, 0.005, 0.0035]}>
          <ringGeometry args={[r, r + 0.003, 20]} />
          <meshBasicMaterial color="#5a2a08" />
        </mesh>
      ))}
      <mesh position={[0.022, 0.005, 0.004]}>
        <circleGeometry args={[0.006, 12]} />
        <meshBasicMaterial color="#0b0b10" />
      </mesh>
    </group>
  );
}

function Hat({ type }: { type: NonNullable<FigureSpec["hat"]> }) {
  const top = HEAD.h / 2 + 0.012;
  if (type === "straw") {
    return (
      <group position={[0, top, 0]} rotation-x={-0.12}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.006, 28]} />
          <meshStandardMaterial color="#e8c860" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.052, 0.058, 0.036, 24]} />
          <meshStandardMaterial color="#e8c860" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.0585, 0.0585, 0.012, 24]} />
          <meshStandardMaterial color="#c82020" />
        </mesh>
      </group>
    );
  }
  return (
    <group position={[0, top, 0]}>
      {/* red bandana under the hat */}
      <mesh position={[0, -0.012, 0]}>
        <boxGeometry args={[HEAD.w + 0.008, 0.016, HEAD.d + 0.008]} />
        <meshStandardMaterial color="#b02a24" />
      </mesh>
      <mesh rotation-y={Math.PI / 6}>
        <cylinderGeometry args={[0.085, 0.085, 0.008, 3]} />
        <meshStandardMaterial color="#3a2616" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.022, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 0.04, 16]} />
        <meshStandardMaterial color="#3a2616" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Body({ spec }: { spec: FigureSpec }) {
  const z = 0.0255;
  return (
    <group position={[0, BODY_Y, 0]}>
      <RoundedBox args={[0.075, 0.06, 0.05]} radius={0.01} smoothness={2} position={[0, 0.01, 0]}>
        <meshStandardMaterial color={spec.outfit} roughness={0.6} />
      </RoundedBox>
      {/* legs */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.018, -0.04, 0]}>
          <boxGeometry args={[0.03, 0.04, 0.04]} />
          <meshStandardMaterial color={spec.pants ?? "#1a1a22"} />
        </mesh>
      ))}
      {/* arms */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.047, 0.005, 0]} rotation-z={s * 0.15}>
          <boxGeometry args={[0.02, 0.055, 0.025]} />
          <meshStandardMaterial color={spec.arms ?? spec.outfit} />
        </mesh>
      ))}
      {spec.front === "plastron" && (
        <mesh position={[0, 0.005, z]}>
          <boxGeometry args={[0.05, 0.05, 0.004]} />
          <meshStandardMaterial color="#d8c060" />
        </mesh>
      )}
      {spec.front === "vest" && (
        <mesh position={[0, 0.01, z]}>
          <boxGeometry args={[0.024, 0.058, 0.004]} />
          <meshStandardMaterial color={spec.accent ?? SKIN} />
        </mesh>
      )}
      {spec.front === "checker" &&
        [0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.0225 + (i % 2) * 0.03 + (i > 1 ? 0.015 : 0), i > 1 ? -0.008 : 0.022, z]}>
            <boxGeometry args={[0.015, 0.015, 0.004]} />
            <meshStandardMaterial color={spec.accent ?? "#000"} />
          </mesh>
        ))}
      {spec.front === "clouds" &&
        [
          [-0.018, 0.022],
          [0.02, -0.004],
        ].map(([x, y]) => (
          <group key={x} position={[x, y, z]}>
            <mesh scale={[1, 0.6, 1]}>
              <circleGeometry args={[0.014, 16]} />
              <meshBasicMaterial color="#f4f4f4" />
            </mesh>
            <mesh scale={[1, 0.6, 1]} position={[0, 0, 0.0005]}>
              <circleGeometry args={[0.011, 16]} />
              <meshBasicMaterial color="#c01818" />
            </mesh>
          </group>
        ))}
      {spec.back === "shell" && (
        <mesh position={[0, 0.005, -0.03]} scale={[1, 1.1, 0.45]}>
          <sphereGeometry args={[0.042, 16, 12]} />
          <meshStandardMaterial color="#6a4a22" roughness={0.6} />
        </mesh>
      )}
      {spec.back === "gourd" && (
        <group position={[0.01, 0.02, -0.045]} rotation-z={-0.3}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.032, 16, 12]} />
            <meshStandardMaterial color={spec.accent ?? "#c8b088"} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <sphereGeometry args={[0.022, 16, 12]} />
            <meshStandardMaterial color={spec.accent ?? "#c8b088"} roughness={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Figure({ spec, x }: { spec: FigureSpec; x: number }) {
  const head = useRef<Group>(null);
  const root = useRef<Group>(null);
  const spin = useRef(0);
  const hoverRef = useRef(false);
  const onSelect = useCallback(() => {
    spin.current = 1;
    if (deskStore.get().focus !== "shelf") deskActions.openShelf();
  }, []);
  const hot = useHotspot(spec.name, onSelect);
  const handlers = useMemo(
    () => ({
      ...hot,
      onPointerOver: (e: Parameters<typeof hot.onPointerOver>[0]) => {
        hoverRef.current = true;
        hot.onPointerOver(e);
      },
      onPointerOut: () => {
        hoverRef.current = false;
        hot.onPointerOut();
      },
    }),
    [hot]
  );

  useFrame(({ clock }, dt) => {
    const reduced = deskStore.get().reducedMotion;
    if (head.current) {
      // bobble-head wobble while hovered
      const wob = hoverRef.current && !reduced ? Math.sin(clock.elapsedTime * 14) * 0.18 : 0;
      head.current.rotation.z = damp(head.current.rotation.z, wob, 10, dt);
    }
    if (root.current && spin.current > 0) {
      spin.current = Math.max(0, spin.current - dt * 1.4);
      root.current.rotation.y = (1 - spin.current) * Math.PI * 2;
    }
  });

  return (
    <group ref={root} position={[x, 0, 0]} {...handlers}>
      {/* display base + name plate */}
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[0.055, 0.058, 0.012, 24]} />
        <meshStandardMaterial color="#0e0e16" metalness={0.6} roughness={0.35} />
      </mesh>
      <Text font={FONT} fontSize={0.012} position={[0, 0.006, 0.058]} anchorX="center" anchorY="middle" letterSpacing={0.1}>
        {spec.name.toUpperCase()}
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
      </Text>
      <group position={[0, 0.012, 0]}>
        <Body spec={spec} />
        <group ref={head} position={[0, HEAD_Y - 0.04, 0]}>
          <group position={[0, 0.04, 0]}>
            <RoundedBox args={[HEAD.w, HEAD.h, HEAD.d]} radius={0.022} smoothness={3}>
              <meshStandardMaterial color={spec.skin} roughness={0.55} />
            </RoundedBox>
            {spec.hair && <Hair spec={spec.hair} />}
            <Face spec={spec} />
            {spec.mask && <Mask mask={spec.mask} />}
            {spec.hat && <Hat type={spec.hat} />}
          </group>
        </group>
      </group>
    </group>
  );
}

/** Two floating shelves on the back wall, lit from underneath. */
export default function Figures() {
  const shelves = [FIGURES.slice(0, 6), FIGURES.slice(6)];
  const X0 = 0.35;
  const W = 1.6;
  const Z = WALL.back + 0.11;
  return (
    <group>
      {shelves.map((figs, row) => {
        const y = 1.03 + row * 0.36;
        const step = W / 6;
        return (
          <group key={row} position={[X0 + W / 2, y, Z]}>
            <RoundedBox args={[W + 0.06, 0.03, 0.2]} radius={0.008} smoothness={2} castShadow receiveShadow>
              <meshStandardMaterial color="#1a1420" metalness={0.3} roughness={0.5} />
            </RoundedBox>
            {/* underglow strip */}
            <mesh position={[0, -0.017, 0.09]}>
              <boxGeometry args={[W, 0.006, 0.006]} />
              <meshBasicMaterial color={row === 0 ? NEON.magenta : NEON.cyan} toneMapped={false} />
            </mesh>
            <pointLight color={row === 0 ? NEON.cyan : NEON.magenta} intensity={0.8} distance={1.3} decay={2} position={[0, 0.3, 0.35]} />
            <group position={[0, 0.015, 0.01]}>
              {figs.map((f, i) => (
                <Figure key={f.name} spec={f} x={-W / 2 + step / 2 + i * step + (row === 1 ? step / 2 : 0)} />
              ))}
            </group>
          </group>
        );
      })}
    </group>
  );
}
