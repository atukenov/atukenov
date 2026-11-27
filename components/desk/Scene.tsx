"use client";

import type { Content } from "@/lib/content";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Vector3, type AmbientLight, type DirectionalLight, type HemisphereLight } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { damp, plainLabel } from "./objects/common";
import { CoffeeCup, DeskCalendar, Headphones, Phone, SoccerBall } from "./objects/Extras";
import Folders from "./objects/Folders";
import Keyboard, { Mouse } from "./objects/Keyboard";
import Lamp from "./objects/Lamp";
import Monitor, { SCREEN } from "./objects/Monitor";
import PcTower from "./objects/PcTower";
import Room from "./objects/Room";
import Walls from "./objects/Walls";
import Figures from "./objects/Figures";
import { deskStore, useDesk, type Focus } from "./store";

export type SceneLabels = {
  monitor: string;
  pc: string;
  power: string;
  lamp: string;
  lightSwitch: string;
  projects: string;
  keyboard: string;
  phone: string;
  call: string;
  cup: string;
  calendar: string;
  headphones: string;
  ball: string;
  freelance: string;
  freelanceNote: string;
  hobbies: string;
  hobbiesNote: string;
};

type Shot = { pos: [number, number, number]; target: [number, number, number] };

const SHOTS: Record<Exclude<Focus, "monitor">, Shot> = {
  overview: { pos: [0.3, 1.7, 3.75], target: [0, 0.6, -0.2] },
  folders: { pos: [-0.35, 1.35, 2.1], target: [-1.0, 0.22, -0.2] },
  pc: { pos: [0.25, 1.25, 2.2], target: [1.25, 0.45, -0.3] },
  shelf: { pos: [0.95, 1.3, 0.55], target: [1.15, 1.2, -1.15] },
};

const UP = new Vector3(0, 1, 0);

function CameraRig() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const focus = useDesk((s) => s.focus);
  const panelOpen = useDesk((s) => s.panel !== null);
  const camTick = useDesk((s) => s.camTick);
  const goal = useMemo(() => ({ pos: new Vector3(), target: new Vector3() }), []);
  const animating = useRef(true);
  const first = useRef(true);

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const fovY = (40 * Math.PI) / 180;
    if (focus === "monitor") {
      const [x, y, z] = SCREEN.center;
      // leave room for the header above and the controls below
      const fitH = (SCREEN.h + 0.1) / 2 / Math.tan(fovY / 2) / 0.7;
      const fitW = (SCREEN.w + 0.3) / 2 / (Math.tan(fovY / 2) * aspect);
      goal.target.set(x, y, z);
      goal.target.y -= 0.03;
      goal.pos.set(x, y, z + Math.max(fitH, fitW));
    } else {
      const shot = SHOTS[focus];
      goal.target.set(...shot.target);
      goal.pos.set(...shot.pos);
      // narrow (portrait) screens: back the camera off so the desk still fits
      const mult = focus === "overview" ? Math.min(Math.max(1.45 / aspect, 1), 2.4) : Math.min(Math.max(1.2 / aspect, 1), 1.8);
      goal.pos.sub(goal.target).multiplyScalar(mult).add(goal.target);
      if (focus === "overview" && aspect < 1) {
        // portrait: look a little higher so the desk sits lower on screen
        goal.target.y += 0.35;
        goal.pos.y += 0.35;
      }
    }
    // the info panel covers the right side on wide screens: shift the view
    if (panelOpen && size.width >= 1024 && focus !== "monitor") {
      const fwd = goal.target.clone().sub(goal.pos);
      const right = fwd.clone().cross(UP).normalize();
      const shift = right.multiplyScalar(fwd.length() * 0.22);
      goal.target.add(shift);
      goal.pos.add(shift);
    }
    if (first.current) {
      first.current = false;
      // intro: start further out and higher, then glide in
      camera.position.copy(goal.pos.clone().sub(goal.target).multiplyScalar(1.7).add(goal.target).add(new Vector3(1.2, 1.2, 0)));
      if (deskStore.get().reducedMotion) camera.position.copy(goal.pos);
    }
    animating.current = true;
  }, [focus, panelOpen, camTick, size.width, size.height, goal, camera]);

  useEffect(() => {
    if (!controls) return;
    const stop = () => (animating.current = false);
    controls.addEventListener("start", stop);
    return () => controls.removeEventListener("start", stop);
  }, [controls]);

  useFrame((_, dt) => {
    if (!animating.current || !controls) return;
    const k = deskStore.get().reducedMotion ? 1 : 1 - Math.exp(-3.2 * Math.min(dt, 0.05));
    camera.position.lerp(goal.pos, k);
    controls.target.lerp(goal.target, k);
    controls.update();
    if (camera.position.distanceTo(goal.pos) < 0.003 && controls.target.distanceTo(goal.target) < 0.003) {
      animating.current = false;
    }
  });

  return null;
}

function Lights() {
  const ambient = useRef<AmbientLight>(null);
  const hemi = useRef<HemisphereLight>(null);
  const sun = useRef<DirectionalLight>(null);
  useFrame((_, dt) => {
    const on = deskStore.get().roomLights;
    if (ambient.current) ambient.current.intensity = damp(ambient.current.intensity, on ? 1.0 : 0.16, 6, dt);
    if (hemi.current) hemi.current.intensity = damp(hemi.current.intensity, on ? 1.3 : 0.12, 6, dt);
    if (sun.current) sun.current.intensity = damp(sun.current.intensity, on ? 2.6 : 0, 6, dt);
  });
  return (
    <>
      <ambientLight ref={ambient} intensity={0.16} color="#8fa0ff" />
      <hemisphereLight ref={hemi} args={["#c8d4ff", "#1a0a14", 0.12]} />
      <directionalLight ref={sun} position={[1.5, 4, 2.5]} intensity={0} color="#fff4e6" />
      {/* cool rim from the left so silhouettes read in the dark */}
      <pointLight position={[-3, 1.6, 1]} color="#5a3dff" intensity={3} distance={6} decay={2} />
    </>
  );
}

export default function Scene({ content, labels }: { content: Content; labels: SceneLabels }) {
  const altynIndex = content.projects.findIndex((p) => /altyn/i.test(p.category));

  return (
    <>
      <color attach="background" args={["#07070d"]} />
      <fog attach="fog" args={["#07070d", 7, 16]} />
      <Lights />
      <CameraRig />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.7}
        minDistance={0.6}
        maxDistance={9}
        minPolarAngle={0.25}
        maxPolarAngle={1.45}
        minAzimuthAngle={-1.1}
        maxAzimuthAngle={1.1}
      />

      <Room switchLabel={labels.lightSwitch} />
      <Walls />
      <Figures />
      <Monitor
        label={labels.monitor}
        notes={{
          freelance: labels.freelanceNote,
          freelanceLabel: labels.freelance,
          hobbies: labels.hobbiesNote,
          hobbiesLabel: labels.hobbies,
        }}
      />
      <Folders projects={content.projects} title={plainLabel(labels.projects).toUpperCase()} />
      <PcTower label={labels.pc} powerLabel={labels.power} />
      <Lamp label={labels.lamp} />
      <Keyboard label={labels.keyboard} />
      <Mouse />

      <Phone label={labels.phone} callText={labels.call} />
      <CoffeeCup label={labels.cup} projectIndex={altynIndex} />
      <DeskCalendar label={labels.calendar} items={content.experience.items} />
      <Headphones label={labels.headphones} />
      <SoccerBall label={labels.ball} />

      <ContactShadows position={[0, 0.002, -0.1]} scale={[3.4, 1.5]} opacity={0.55} blur={2.2} far={1} frames={1} resolution={512} />
    </>
  );
}
