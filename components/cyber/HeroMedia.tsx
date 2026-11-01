"use client";

import { heroMedia, type HeroView } from "@/lib/media";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModelViewer from "./ModelViewer";

const SLOTS: { view: HeroView; label: string; file: string | null; hint: string }[] = [
  { view: "portrait", label: "IMG", file: heroMedia.portrait, hint: "portrait.png" },
  { view: "video", label: "VID", file: heroMedia.video, hint: "intro.mp4" },
  { view: "model", label: "3D", file: heroMedia.model, hint: "avatar.glb" },
];

const SignalPending = ({ hint }: { hint: string }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center bg-cyber-grid">
    <div className="bg-hazard h-2 w-40 opacity-80" />
    <p className="font-display text-2xl xl:text-3xl text-neon-magenta glow-magenta animate-flicker">
      SIGNAL PENDING
    </p>
    <p className="hud-label">
      drop <span className="text-accent-default">/assets/cyber/{hint}</span>
    </p>
    <p className="hud-label text-white/40">then set the path in lib/media.ts</p>
    <div className="bg-hazard h-2 w-40 opacity-80" />
  </div>
);

const HeroMedia = () => {
  const slots = SLOTS.filter((s) => s.file || heroMedia.showEmptySlots);
  const initial =
    slots.find((s) => s.view === heroMedia.defaultView && s.file)?.view ??
    slots.find((s) => s.file)?.view ??
    slots[0]?.view ??
    "portrait";
  const [view, setView] = useState<HeroView>(initial);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const active = slots.find((s) => s.view === view) ?? slots[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { delay: 2, duration: 0.5, ease: "easeOut" },
      }}
      className="relative w-[300px] xl:w-[480px]"
    >
      {/* frame header */}
      <div className="flex items-center justify-between mb-2">
        <span className="hud-label">
          <span className="inline-block w-2 h-2 mr-2 bg-neon-magenta animate-blink align-middle" />
          REC // ID.AMAKENZI
        </span>
        <span className="hud-label text-accent-default/80">{clock}</span>
      </div>

      {/* viewport */}
      <div className="hud-brackets">
        <div className="relative aspect-[4/5] w-full overflow-hidden clip-corner bg-surface shadow-neon-cyan">
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.view}
              initial={{ opacity: 0, x: 8, filter: "hue-rotate(90deg)" }}
              animate={{ opacity: 1, x: 0, filter: "hue-rotate(0deg)" }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {!active?.file && <SignalPending hint={active?.hint ?? ""} />}

              {active?.view === "portrait" && active.file && (
                <>
                  <div className="absolute inset-0 bg-cyber-grid" />
                  <Image
                    src={active.file}
                    priority
                    quality={100}
                    fill
                    sizes="(min-width: 1200px) 480px, 300px"
                    alt="Almaz Tukenov"
                    className="object-contain object-bottom cyber-portrait"
                  />
                </>
              )}

              {active?.view === "video" && active.file && (
                <video
                  src={active.file}
                  poster={heroMedia.videoPoster ?? undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {active?.view === "model" && active.file && (
                <ModelViewer src={active.file} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* overlays: neon floor glow + scan sweep */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neon-magenta/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neon-cyan/20 to-transparent animate-scan-sweep" />
        </div>
      </div>

      {/* view switcher */}
      {slots.length > 1 && (
        <div className="flex gap-2 mt-4" role="tablist" aria-label="Hero media">
          {slots.map((s) => (
            <button
              key={s.view}
              role="tab"
              aria-selected={s.view === active?.view}
              onClick={() => setView(s.view)}
              className={`flex-1 h-9 clip-corner-tr text-xs font-display tracking-[0.25em] transition-all ${
                s.view === active?.view
                  ? "bg-accent-default text-primary shadow-neon-yellow"
                  : "bg-surface-raised text-neon-cyan hover:text-accent-default"
              }`}
            >
              {s.label}
              {!s.file && <span className="ml-1 text-neon-magenta">·</span>}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HeroMedia;
