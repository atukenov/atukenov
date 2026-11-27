"use client";

import { getContent } from "@/lib/content";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ProfileCard from "./ProfileCard";
import { deskActions, deskStore, useDesk } from "./store";
import { runCommand, WELCOME, type TermLine } from "./terminal";

/** Pixel size of the monitor's DOM screen (mapped onto the 3D screen). */
export const SCREEN_PX = { w: 770, h: 430 };

const BOOT_LINES = [
  "AMAKENZI BIOS v2.077 // POST ......... OK",
  "CPU: full-stack @ 7+ yrs ............. OK",
  "MEM: React · Node · .NET · Angular ... OK",
  "mounting /projects ................... OK",
  "starting caffeine daemon ............. OK",
  "loading profile.exe",
];

function BootScreen() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(v + 1, BOOT_LINES.length)), 360);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 bg-black p-6 font-primary text-[13px] leading-relaxed text-neon-cyan">
      {BOOT_LINES.slice(0, n).map((l) => (
        <p key={l}>{l}</p>
      ))}
      <span className="inline-block w-2 h-4 bg-neon-cyan animate-blink align-middle" />
    </div>
  );
}

function isTypingTarget(el: Element | null) {
  if (!el || el === document.body) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

function Terminal() {
  const { i18n } = useTranslation("common");
  const [lines, setLines] = useState<TermLine[]>(WELCOME);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const submit = (cmd: string) => {
    const res = runCommand(cmd, getContent(i18n.language));
    setLines((prev) => (res === "clear" ? [] : [...prev, ...res].slice(-60)));
    setValue("");
  };
  const submitRef = useRef(submit);
  submitRef.current = submit;
  const valueRef = useRef(value);
  valueRef.current = value;

  // Typing anywhere on the page (when nothing else has focus) goes to the terminal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (deskStore.get().panel) return;
      const active = document.activeElement;
      const own = active === inputRef.current;
      if (!own && isTypingTarget(active)) return;
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
        deskActions.pressKey();
      }
      if (own) return; // the input handles its own text
      if (e.key === "Enter") {
        submitRef.current(valueRef.current);
      } else if (e.key === "Backspace") {
        setValue((v) => v.slice(0, -1));
      } else if (e.key.length === 1) {
        if (e.key === " ") e.preventDefault();
        setValue((v) => (v + e.key).slice(0, 60));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e6 });
  }, [lines]);

  return (
    <div
      className="flex flex-col h-full bg-black/85 border border-neon-magenta/40 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between px-2 h-5 bg-neon-magenta/20 text-[10px] tracking-widest text-neon-magenta shrink-0">
        <span>TERMINAL — zsh</span>
        <span>● ● ●</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-1 text-[11px] leading-[1.45]">
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              l.kind === "in"
                ? "text-white"
                : l.kind === "err"
                ? "text-neon-magenta"
                : l.kind === "accent"
                ? "text-accent-default"
                : "text-neon-cyan/85"
            }
          >
            {l.kind === "in" && <span className="text-neon-magenta">❯ </span>}
            {l.text}
          </p>
        ))}
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
        >
          <span className="text-neon-magenta text-[11px]">❯&nbsp;</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-white text-[11px] caret-accent-default"
          />
        </form>
      </div>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Atyrau",
        })
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

function Desktop() {
  const { t } = useTranslation("common");
  return (
    <div className="absolute inset-0 flex flex-col bg-[#05070d] bg-cyber-grid text-white font-primary">
      {/* menu bar */}
      <div className="flex items-center justify-between h-6 px-3 bg-black/70 border-b border-neon-cyan/20 text-[10px] tracking-[0.2em] text-neon-cyan/80 shrink-0">
        <span>
          <span className="text-accent-default">◆</span> AMAKENZI-OS
        </span>
        <span className="flex gap-3">
          <span className="text-accent-default">● {t("desk.online")}</span>
          <Clock />
        </span>
      </div>

      <div className="flex-1 flex gap-3 p-3 min-h-0">
        {/* profile window */}
        <div className="flex flex-col w-[455px] border border-neon-cyan/40 bg-surface/90 shadow-neon-cyan">
          <div className="flex items-center justify-between px-2 h-5 bg-neon-cyan/15 text-[10px] tracking-widest text-neon-cyan shrink-0">
            <span>PROFILE.EXE</span>
            <span>_ □ ×</span>
          </div>
          <div className="p-3 flex-1 min-h-0">
            <ProfileCard />
          </div>
        </div>
        {/* terminal */}
        <div className="flex-1 min-w-0">
          <Terminal />
        </div>
      </div>

      {/* taskbar */}
      <div className="flex items-center gap-2 h-8 px-3 bg-black/80 border-t border-neon-cyan/20 text-[11px] shrink-0">
        <button
          type="button"
          onClick={() => deskActions.openProject(0)}
          className="px-2 py-0.5 border border-accent-default/50 text-accent-default hover:bg-accent-default hover:text-primary"
        >
          ▤ {t("desk.projects")}
        </button>
        <button
          type="button"
          onClick={() => deskActions.openPc("skills")}
          className="px-2 py-0.5 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-primary"
        >
          ⌬ {t("desk.skills")}
        </button>
        <button
          type="button"
          onClick={() => deskActions.openContact()}
          className="px-2 py-0.5 border border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta hover:text-white"
        >
          ✆ {t("contact")}
        </button>
        <span className="ml-auto text-[10px] tracking-widest text-white/40">
          {t("desk.typeHint")}
        </span>
      </div>
    </div>
  );
}

/** The DOM that is projected onto the 3D monitor. */
export default function MonitorScreen() {
  const power = useDesk((s) => s.power);
  if (power === "off") return null;
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{ width: SCREEN_PX.w, height: SCREEN_PX.h }}
    >
      {power === "booting" ? <BootScreen /> : <Desktop />}
    </div>
  );
}
