"use client";

import { socials } from "@/components/Socials";
import { getContent } from "@/lib/content";
import { profile } from "@/lib/profile";
import { useTranslation } from "react-i18next";
import { FiDownload, FiMail } from "react-icons/fi";

/** "Me + links" block shown on the monitor and in the About panel. */
export default function ProfileCard({ compact = false }: { compact?: boolean }) {
  const { t, i18n } = useTranslation("common");
  const { about } = getContent(i18n.language);
  const years = about.info.find((i) => /^\d+\+/.test(i.fieldValue))?.fieldValue ?? "7+";

  return (
    <div className={compact ? "flex flex-col gap-5" : "flex gap-4 h-full"}>
      <div
        className={
          compact
            ? "relative w-32 h-40 shrink-0 mx-auto"
            : "relative w-[120px] h-[150px] shrink-0"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.portrait}
          alt={profile.name}
          className="w-full h-full object-cover clip-corner-tr cyber-portrait"
        />
        <span className="absolute bottom-1 left-1 bg-primary/80 px-1 text-[9px] tracking-widest text-neon-cyan">
          ID:AMKZ-07
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neon-cyan/80 leading-none">
          {"// " + t("desk.ident")}
        </p>
        <h2
          className={`font-display uppercase font-bold leading-none mt-1 text-accent-default glow-yellow ${
            compact ? "text-3xl" : "text-[28px]"
          }`}
        >
          {t("Almaz Tukenov")}
        </h2>
        <p className="text-neon-cyan text-[13px] leading-tight mt-1">
          <span className="text-neon-magenta">&gt; </span>
          {t("Software Engineer")} · {years}
        </p>
        <p
          className={`text-white/75 border-l-2 border-neon-magenta pl-2 mt-2 leading-snug ${
            compact ? "text-sm" : "text-[11.5px]"
          }`}
        >
          {about.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {socials.slice(0, 3).map((s) => (
            <a
              key={s.label}
              href={s.path}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-7 h-7 flex items-center justify-center bg-surface-raised text-neon-cyan border border-neon-cyan/30 hover:bg-accent-default hover:text-primary transition-colors"
            >
              {s.icon}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="h-7 px-2 flex items-center gap-1 bg-surface-raised text-neon-cyan border border-neon-cyan/30 text-[11px] hover:bg-accent-default hover:text-primary transition-colors"
          >
            <FiMail /> {t("Email")}
          </a>
          <a
            href={profile.cv}
            download="AlmazTukenov-CV.pdf"
            className="h-7 px-2 flex items-center gap-1 bg-accent-default text-primary text-[11px] font-bold hover:bg-accent-hover transition-colors"
          >
            <FiDownload /> CV
          </a>
        </div>
      </div>
    </div>
  );
}
