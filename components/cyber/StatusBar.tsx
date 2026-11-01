"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Bottom HUD strip: route, location, live clock, fake net stats. */
const StatusBar = () => {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "Asia/Atyrau",
        })
      );
      setPing(8 + Math.floor(Math.random() * 14));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const route = pathname === "/" ? "HOME" : pathname.slice(1).toUpperCase();

  return (
    <footer className="mt-10 border-t border-neon-cyan/20 bg-primary/80 backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 hud-label text-[10px]">
        <span>
          <span className="text-accent-default">●</span> SYS.ONLINE // NODE:{route}
        </span>
        <span className="hidden md:inline">LOC 47.11N 51.92E // ATYRAU.KZ</span>
        <span className="hidden md:inline">NET {ping}ms</span>
        <span>
          LOCAL <span className="text-accent-default">{time || "--:--:--"}</span>
        </span>
      </div>
    </footer>
  );
};

export default StatusBar;
