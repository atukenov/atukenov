"use client";

import { getContent } from "@/lib/content";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiBriefcase,
  FiCpu,
  FiFolder,
  FiHeadphones,
  FiLayout,
  FiMonitor,
  FiPhone,
  FiPower,
  FiRotateCcw,
  FiSun,
} from "react-icons/fi";
import { PiLampFill } from "react-icons/pi";
import DeskPanel from "./DeskPanel";
import Scene, { type SceneLabels } from "./Scene";
import { deskActions, deskStore, useDesk } from "./store";

function HoverTag() {
  const hovered = useDesk((s) => s.hovered);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 14}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-50 px-2 py-1 text-[11px] uppercase tracking-[0.2em] bg-primary/90 border border-accent-default/60 text-accent-default transition-opacity duration-150 ${
        hovered ? "opacity-100" : "opacity-0"
      }`}
    >
      {hovered}
    </div>
  );
}

function HudButton({
  onClick,
  label,
  icon,
  active,
  tone = "cyan",
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  tone?: "cyan" | "yellow";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={label}
      className={`group flex items-center gap-2 h-10 px-3 shrink-0 text-[11px] uppercase tracking-[0.15em] border backdrop-blur-sm transition-colors ${
        active
          ? "bg-accent-default text-primary border-accent-default"
          : tone === "yellow"
          ? "bg-primary/70 border-accent-default/50 text-accent-default hover:bg-accent-default hover:text-primary"
          : "bg-primary/70 border-neon-cyan/30 text-neon-cyan hover:border-accent-default hover:text-accent-default"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function Hud({ onClassic }: { onClassic: () => void }) {
  const { t } = useTranslation("common");
  const s = useDesk((st) => st);
  const compact = () => window.innerWidth < 768;

  return (
    <nav
      aria-label={t("desk.controls")}
      className={`pointer-events-auto fixed z-30 left-0 right-0 bottom-3 md:bottom-9 px-4 flex justify-center ${
        s.panel ? "lg:right-[460px]" : ""
      }`}
    >
      <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
        <HudButton tone="yellow" onClick={() => deskActions.openMonitor(compact())} label={t("desk.about")} icon={<FiMonitor />} active={s.focus === "monitor"} />
        <HudButton tone="yellow" onClick={() => deskActions.openProject(0)} label={t("desk.projects")} icon={<FiFolder />} active={s.panel?.kind === "project"} />
        <HudButton tone="yellow" onClick={() => deskActions.openPc("skills")} label={t("desk.skills")} icon={<FiCpu />} active={s.panel?.kind === "pc"} />
        <HudButton tone="yellow" onClick={() => deskActions.openPc("experience")} label={t("Experience")} icon={<FiBriefcase />} />
        <HudButton tone="yellow" onClick={deskActions.openContact} label={t("contact")} icon={<FiPhone />} active={s.panel?.kind === "contact"} />
        <span className="w-px bg-white/15 mx-1 shrink-0" />
        <HudButton onClick={deskActions.togglePower} label={t("desk.power")} icon={<FiPower />} active={s.power !== "off"} />
        <HudButton onClick={deskActions.toggleLamp} label={t("desk.lamp")} icon={<PiLampFill />} active={s.lamp} />
        <HudButton onClick={deskActions.toggleRoomLights} label={t("desk.lights")} icon={<FiSun />} active={s.roomLights} />
        <HudButton onClick={deskActions.toggleMusic} label={t("desk.music")} icon={<FiHeadphones />} active={s.music} />
        <span className="w-px bg-white/15 mx-1 shrink-0" />
        <HudButton onClick={deskActions.reset} label={t("desk.reset")} icon={<FiRotateCcw />} />
        <HudButton onClick={onClassic} label={t("desk.classic")} icon={<FiLayout />} />
      </div>
    </nav>
  );
}

export default function DeskExperience({ onClassic }: { onClassic: () => void }) {
  const { t, i18n } = useTranslation("common");
  const content = getContent(i18n.language);
  const [dpr, setDpr] = useState(1.5);
  const [ready, setReady] = useState(false);
  const interacted = useDesk((s) => s.interacted);
  const power = useDesk((s) => s.power);

  const labels: SceneLabels = useMemo(
    () => ({
      monitor: t("desk.label.monitor"),
      pc: t("desk.label.pc"),
      power: t("desk.label.power"),
      lamp: t("desk.label.lamp"),
      lightSwitch: t("desk.label.switch"),
      projects: t("desk.projects"),
      keyboard: t("desk.label.keyboard"),
      phone: t("desk.label.phone"),
      call: t("desk.callMe"),
      cup: t("desk.label.cup"),
      calendar: t("desk.label.calendar"),
      headphones: t("desk.label.headphones"),
      ball: t("desk.label.ball"),
      freelance: t("desk.label.freelance"),
      freelanceNote: t("desk.note.freelance"),
      hobbies: t("desk.label.hobbies"),
      hobbiesNote: t("desk.note.hobbies"),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => deskStore.set({ reducedMotion: mq.matches });
    apply();
    mq.addEventListener("change", apply);
    // the PC starts itself shortly after the scene appears
    const boot = setTimeout(() => {
      if (deskStore.get().power === "off" && !deskStore.get().interacted) deskActions.togglePower();
    }, 1800);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (deskStore.get().panel) deskActions.closePanel();
        else deskActions.reset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      mq.removeEventListener("change", apply);
      clearTimeout(boot);
      window.removeEventListener("keydown", onKey);
      document.body.style.cursor = "";
      deskStore.set({ panel: null, focus: "overview", hovered: null, music: false });
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <h1 className="sr-only">
        {t("Almaz Tukenov")} — {t("Software Engineer")}
      </h1>
      <p className="sr-only">{t("desk.srIntro")}</p>

      <Canvas
        shadows
        dpr={[1, dpr]}
        camera={{ fov: 40, near: 0.05, far: 40, position: [2, 3.5, 7] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        aria-label={t("desk.canvasLabel")}
        role="img"
        onPointerMissed={() => deskActions.hover(null)}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <Scene content={content} labels={labels} />
      </Canvas>

      {/* boot overlay until the first frame */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-primary transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="hud-label animate-flicker">{t("desk.loading")}</p>
      </div>

      {/* first-visit hint */}
      <div
        aria-hidden
        className={`pointer-events-none fixed z-30 left-1/2 -translate-x-1/2 top-28 xl:top-36 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-neon-cyan bg-primary/60 border border-neon-cyan/25 backdrop-blur-sm transition-opacity duration-700 text-center ${
          interacted || !ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {t("desk.hint")}
        {power === "off" && <span className="block text-neon-magenta mt-1">{t("desk.hintPower")}</span>}
      </div>

      <HoverTag />
      <Hud onClassic={onClassic} />
      <DeskPanel />
    </div>
  );
}
