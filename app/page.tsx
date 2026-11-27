"use client";

import ClassicHome from "@/components/ClassicHome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBox } from "react-icons/fi";

// three.js is heavy: load the desk only in the browser, only when it is used.
const DeskExperience = dynamic(() => import("@/components/desk/DeskExperience"), {
  ssr: false,
});

const PREF_KEY = "desk-view";
type Mode = "pending" | "desk" | "classic";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function readPref() {
  try {
    return localStorage.getItem(PREF_KEY);
  } catch {
    return null;
  }
}

function writePref(v: "desk" | "classic") {
  try {
    localStorage.setItem(PREF_KEY, v);
  } catch {
    /* private mode etc. */
  }
}

const Home = () => {
  const { t } = useTranslation("common");
  const [mode, setMode] = useState<Mode>("pending");
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const gl = hasWebGL();
    setWebgl(gl);
    setMode(gl && readPref() !== "classic" ? "desk" : "classic");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("desk-mode", mode === "desk");
    return () => document.documentElement.classList.remove("desk-mode");
  }, [mode]);

  if (mode === "desk") {
    return (
      <DeskExperience
        onClassic={() => {
          writePref("classic");
          setMode("classic");
        }}
      />
    );
  }

  if (mode === "pending") return <div className="min-h-[70vh]" />;

  return (
    <>
      {webgl && (
        <div className="container mx-auto mb-6 flex justify-center xl:justify-end">
          <button
            type="button"
            onClick={() => {
              writePref("desk");
              setMode("desk");
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] border border-neon-cyan/40 text-neon-cyan hover:bg-accent-default hover:text-primary hover:border-accent-default"
          >
            <FiBox /> {t("desk.open3d")}
          </button>
        </div>
      )}
      <ClassicHome />
    </>
  );
};

export default Home;
