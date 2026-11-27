"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  CanvasTexture,
  RepeatWrapping,
  SRGBColorSpace,
  type Mesh,
  type MeshBasicMaterial,
  type Texture,
} from "three";
import { deskStore } from "../store";
import { FONT, NEON } from "./common";
import { DESK } from "./Room";

export const WALL = { back: -1.25, side: 2.4, height: 5 };
export const WINDOW = { x: -1.4, y: 1.25, w: 1.3, h: 0.95 };

/** Seeded random so the painted textures look the same on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { c, g: c.getContext("2d")! };
}

/** Dark metal wall panels with seams, rivets and a little grime. */
function useWallTexture(repeatX: number, repeatY: number) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const { c, g } = canvas(512, 512);
    const r = rng(7);
    g.fillStyle = "#14141f";
    g.fillRect(0, 0, 512, 512);
    // panels
    for (let px = 0; px < 2; px++) {
      for (let py = 0; py < 2; py++) {
        const x = px * 256;
        const y = py * 256;
        const shade = 18 + Math.floor(r() * 8);
        g.fillStyle = `rgb(${shade},${shade},${shade + 12})`;
        g.fillRect(x + 4, y + 4, 248, 248);
        // grime
        for (let i = 0; i < 260; i++) {
          g.fillStyle = `rgba(0,0,0,${r() * 0.12})`;
          g.fillRect(x + r() * 248, y + r() * 248, 2 + r() * 10, 1 + r() * 3);
        }
        // vents on some panels
        if ((px + py) % 2 === 0) {
          g.fillStyle = "rgba(0,0,0,0.35)";
          for (let v = 0; v < 6; v++) g.fillRect(x + 40, y + 180 + v * 9, 70, 4);
        }
        // rivets
        g.fillStyle = "rgba(160,170,200,0.25)";
        [
          [14, 14],
          [238, 14],
          [14, 238],
          [238, 238],
        ].forEach(([rx, ry]) => {
          g.beginPath();
          g.arc(x + rx, y + ry, 3, 0, Math.PI * 2);
          g.fill();
        });
      }
    }
    // seams
    g.fillStyle = "#07070c";
    g.fillRect(0, 254, 512, 4);
    g.fillRect(254, 0, 4, 512);
    const tex = new CanvasTexture(c);
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [repeatX, repeatY]);
}

/** A night skyline painted once: layered towers, lit windows, neon signs. */
function useCityTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 1024;
    const H = 730;
    const { c, g } = canvas(W, H);
    const r = rng(2077);
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#090418");
    sky.addColorStop(0.55, "#3a0c4a");
    sky.addColorStop(0.8, "#b0175a");
    sky.addColorStop(1, "#ff6a3d");
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);
    // haze moon
    const moon = g.createRadialGradient(780, 170, 10, 780, 170, 140);
    moon.addColorStop(0, "rgba(255,220,240,0.9)");
    moon.addColorStop(0.25, "rgba(255,120,190,0.35)");
    moon.addColorStop(1, "rgba(255,120,190,0)");
    g.fillStyle = moon;
    g.fillRect(600, 0, 400, 360);
    // stars
    for (let i = 0; i < 80; i++) {
      g.fillStyle = `rgba(255,255,255,${0.2 + r() * 0.5})`;
      g.fillRect(r() * W, r() * H * 0.4, 1.5, 1.5);
    }

    const neon = [NEON.cyan, NEON.magenta, NEON.yellow, "#7a5cff", "#3dff8a"];
    const layers = [
      { base: "#2a0f3a", min: 160, max: 330, lit: 0.12, w: [40, 90] },
      { base: "#170926", min: 230, max: 480, lit: 0.2, w: [50, 120] },
      { base: "#0a0512", min: 300, max: 620, lit: 0.3, w: [70, 160] },
    ];
    layers.forEach((L, li) => {
      let x = -20;
      while (x < W) {
        const bw = L.w[0] + r() * (L.w[1] - L.w[0]);
        const bh = L.min + r() * (L.max - L.min);
        const top = H - bh;
        g.fillStyle = L.base;
        g.fillRect(x, top, bw, bh);
        // antenna / spire
        if (r() > 0.6) {
          g.fillRect(x + bw / 2 - 2, top - 40 - r() * 60, 4, 60 + r() * 60);
          g.fillStyle = NEON.magenta;
          g.fillRect(x + bw / 2 - 3, top - 45 - r() * 60, 6, 6);
        }
        // lit windows
        for (let wy = top + 10; wy < H - 6; wy += 12) {
          for (let wx = x + 6; wx < x + bw - 8; wx += 10) {
            if (r() < L.lit) {
              g.fillStyle = r() > 0.7 ? "rgba(0,240,255,0.85)" : "rgba(255,214,120,0.8)";
              g.fillRect(wx, wy, 5, 6);
            }
          }
        }
        // neon signs on the nearest layers
        if (li > 0 && r() > 0.55) {
          const col = neon[Math.floor(r() * neon.length)];
          const vertical = r() > 0.5;
          const sw = vertical ? 14 + r() * 8 : 40 + r() * 50;
          const sh = vertical ? 60 + r() * 90 : 14 + r() * 10;
          const sx = x + r() * Math.max(bw - sw, 4);
          const sy = top + 20 + r() * Math.min(bh * 0.5, 200);
          g.shadowColor = col;
          g.shadowBlur = 18;
          g.fillStyle = col;
          g.fillRect(sx, sy, sw, sh);
          g.shadowBlur = 0;
          g.fillStyle = "rgba(0,0,0,0.55)";
          if (vertical) for (let k = sy + 6; k < sy + sh - 6; k += 12) g.fillRect(sx + 3, k, sw - 6, 5);
          else g.fillRect(sx + 4, sy + sh / 2 - 2, sw - 8, 4);
        }
        x += bw + 2 + r() * 10;
      }
    });
    // ground glow + haze
    const glow = g.createLinearGradient(0, H - 120, 0, H);
    glow.addColorStop(0, "rgba(255,42,109,0)");
    glow.addColorStop(1, "rgba(255,42,109,0.45)");
    g.fillStyle = glow;
    g.fillRect(0, H - 120, W, 120);
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    return tex;
  }, []);
}

/** Thin rain streaks that scroll down the glass. */
function useRainTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const { c, g } = canvas(256, 256);
    const r = rng(42);
    g.clearRect(0, 0, 256, 256);
    g.strokeStyle = "rgba(180,220,255,0.35)";
    g.lineWidth = 1;
    for (let i = 0; i < 90; i++) {
      const x = r() * 256;
      const y = r() * 256;
      const l = 8 + r() * 18;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x - 2, y + l);
      g.stroke();
    }
    const tex = new CanvasTexture(c);
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(3, 2);
    return tex;
  }, []);
}

function CityWindow() {
  const city = useCityTexture();
  const rain = useRainTexture();
  const car = useRef<Mesh>(null);
  const car2 = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (deskStore.get().reducedMotion) return;
    const t = clock.elapsedTime;
    if (rain) rain.offset.y = (t * 0.6) % 1;
    // two "flying cars" crossing the skyline
    if (car.current) car.current.position.x = ((t * 0.12) % 1.6) - 0.8;
    if (car2.current) car2.current.position.x = 0.8 - ((t * 0.07 + 0.5) % 1.6);
  });

  const { x, y, w, h } = WINDOW;
  const frame = <meshStandardMaterial color="#0c0c14" metalness={0.8} roughness={0.35} />;

  return (
    <group position={[x, y, WALL.back + 0.05]}>
      {/* the view, set just in front of the wall plane */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={city as Texture | null} toneMapped={false} />
      </mesh>
      <mesh ref={car} position={[0, 0.18, -0.035]}>
        <planeGeometry args={[0.03, 0.008]} />
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
      </mesh>
      <mesh ref={car2} position={[0, 0.3, -0.035]}>
        <planeGeometry args={[0.02, 0.006]} />
        <meshBasicMaterial color="#ffb347" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={rain as Texture | null} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      {/* glass tint */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#1a2a40" transparent opacity={0.12} metalness={1} roughness={0.05} />
      </mesh>
      {/* frame + mullions */}
      <mesh position={[0, h / 2 + 0.03, 0]}>
        <boxGeometry args={[w + 0.12, 0.06, 0.08]} />
        {frame}
      </mesh>
      <mesh position={[0, -h / 2 - 0.04, 0.03]}>
        <boxGeometry args={[w + 0.2, 0.06, 0.16]} />
        {frame}
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (w / 2 + 0.03), 0, 0]}>
          <boxGeometry args={[0.06, h + 0.12, 0.08]} />
          {frame}
        </mesh>
      ))}
      <mesh position={[w / 6, 0, 0]}>
        <boxGeometry args={[0.03, h, 0.05]} />
        {frame}
      </mesh>
      <mesh position={[0, h / 5, 0]}>
        <boxGeometry args={[w, 0.03, 0.05]} />
        {frame}
      </mesh>
      {/* neon trim under the sill */}
      <mesh position={[0, -h / 2 - 0.075, 0.11]}>
        <boxGeometry args={[w + 0.16, 0.008, 0.008]} />
        <meshBasicMaterial color={NEON.magenta} toneMapped={false} />
      </mesh>
      {/* city light spilling into the room */}
      <pointLight color="#ff4fa0" intensity={2.2} distance={3.2} decay={2} position={[0, 0, 0.6]} />
    </group>
  );
}

function Door() {
  const led = useRef<MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (led.current) led.current.color.set(Math.sin(clock.elapsedTime * 2) > 0 ? NEON.cyan : "#06464d");
  });
  const H = 2.15;
  const W = 0.95;
  const panel = <meshStandardMaterial color="#3a3a52" metalness={0.45} roughness={0.45} />;
  return (
    <group position={[WALL.side - 0.005, DESK.floor + H / 2, 0.9]} rotation-y={-Math.PI / 2}>
      {/* frame */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[W + 0.16, H + 0.08, 0.04]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* two sliding leaves */}
      {[-1, 1].map((s) => (
        <group key={s} position={[(s * W) / 4, 0, 0.045]}>
          <RoundedBox args={[W / 2 - 0.01, H - 0.04, 0.03]} radius={0.01} smoothness={2}>
            {panel}
          </RoundedBox>
          <mesh position={[0, 0.25, 0.016]}>
            <boxGeometry args={[W / 2 - 0.12, 0.5, 0.004]} />
            <meshStandardMaterial color="#111119" metalness={0.6} roughness={0.5} />
          </mesh>
          {/* hazard stripes at the bottom */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[-0.15 + i * 0.1, -H / 2 + 0.12, 0.017]} rotation-z={0.6}>
              <boxGeometry args={[0.04, 0.2, 0.002]} />
              <meshStandardMaterial color={NEON.yellow} />
            </mesh>
          ))}
        </group>
      ))}
      {/* glowing seam + header light */}
      <mesh position={[0, 0, 0.062]}>
        <boxGeometry args={[0.006, H - 0.06, 0.004]} />
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
      </mesh>
      <mesh position={[0, H / 2 + 0.06, 0.03]}>
        <boxGeometry args={[W + 0.1, 0.02, 0.03]} />
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
      </mesh>
      <Text font={FONT} fontSize={0.05} letterSpacing={0.3} position={[0, H / 2 + 0.14, 0.03]} anchorX="center">
        EXIT // SECTOR 7
        <meshBasicMaterial color={NEON.magenta} toneMapped={false} />
      </Text>
      {/* keypad */}
      <group position={[-W / 2 - 0.22, 0.05, 0.02]}>
        <mesh>
          <boxGeometry args={[0.12, 0.2, 0.03]} />
          <meshStandardMaterial color="#0e0e16" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.06, 0.016]}>
          <planeGeometry args={[0.08, 0.04]} />
          <meshBasicMaterial ref={led} color={NEON.cyan} toneMapped={false} />
        </mesh>
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <mesh key={`${r}${c}`} position={[-0.03 + c * 0.03, 0.0 - r * 0.03, 0.017]}>
              <boxGeometry args={[0.02, 0.02, 0.006]} />
              <meshStandardMaterial color="#2a2a3a" />
            </mesh>
          ))
        )}
      </group>
      <pointLight color={NEON.cyan} intensity={1.2} distance={2} decay={2} position={[0, H / 2, 0.4]} />
    </group>
  );
}

/** Back wall (window + neon sign), side walls and the door. */
export default function Walls() {
  const backTex = useWallTexture(7, 2.5);
  const sideTex = useWallTexture(3, 2.5);
  const midY = DESK.floor + WALL.height / 2;

  return (
    <group>
      <mesh position={[0, midY, WALL.back]} receiveShadow>
        <planeGeometry args={[14, WALL.height]} />
        <meshStandardMaterial map={backTex as Texture | null} color="#c4c8e8" roughness={0.85} metalness={0.2} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * WALL.side, midY, 1.75]} rotation-y={(-s * Math.PI) / 2} receiveShadow>
          <planeGeometry args={[6, WALL.height]} />
          <meshStandardMaterial map={sideTex as Texture | null} color="#c4c8e8" roughness={0.85} metalness={0.2} />
        </mesh>
      ))}
      {/* neon strips: ceiling line and baseboard */}
      <mesh position={[0, 2.6, WALL.back + 0.01]}>
        <boxGeometry args={[WALL.side * 2, 0.012, 0.012]} />
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
      </mesh>
      {/* corner pillars */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (WALL.side - 0.06), midY, WALL.back + 0.06]}>
          <boxGeometry args={[0.12, WALL.height, 0.12]} />
          <meshStandardMaterial color="#0d0d15" metalness={0.8} roughness={0.35} />
        </mesh>
      ))}

      <CityWindow />
      <Door />

      {/* neon sign between the window and the shelves */}
      <group position={[-0.25, 1.42, WALL.back + 0.03]}>
        <Text font={FONT} fontSize={0.1} letterSpacing={0.06} anchorX="center" anchorY="middle">
          {"<AMAKENZI />"}
          <meshBasicMaterial color={NEON.yellow} toneMapped={false} />
        </Text>
        <Text font={FONT} fontSize={0.035} letterSpacing={0.35} position={[0, -0.1, 0]} anchorX="center">
          FULL-STACK // ATYRAU.KZ
          <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
        </Text>
        <pointLight color={NEON.yellow} intensity={0.9} distance={2} decay={2} position={[0, 0, 0.3]} />
      </group>
    </group>
  );
}
