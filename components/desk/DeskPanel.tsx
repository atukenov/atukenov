"use client";

import { socials } from "@/components/Socials";
import { getContent } from "@/lib/content";
import { profile } from "@/lib/profile";
import { skillList } from "@/lib/skills";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import ProfileCard from "./ProfileCard";
import { deskActions, useDesk, type PcTab } from "./store";

const PC_TABS: PcTab[] = ["skills", "services", "experience", "education"];

function ProjectView({ index }: { index: number }) {
  const { t, i18n } = useTranslation("common");
  const { projects } = getContent(i18n.language);
  const p = projects[index];
  if (!p) return null;
  const go = (d: number) => deskActions.openProject((index + d + projects.length) % projects.length);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative aspect-[16/10] w-full overflow-hidden clip-corner-tr bg-surface-raised">
        <Image src={p.image} alt={p.category} fill sizes="440px" className="object-cover" />
      </div>
      <div>
        <p className="hud-label">
          {"// " + t("desk.folder")} {p.num} · {p.title}
        </p>
        <h2 id="desk-panel-title" className="h2 text-accent-default glow-yellow mt-1 text-[30px] xl:text-[34px]">
          {p.category}
        </h2>
      </div>
      <p className="text-white/75 text-sm leading-relaxed border-l-2 border-neon-magenta pl-3">{p.description}</p>
      <ul className="flex flex-wrap gap-2" aria-label={t("desk.stack")}>
        {p.stack.map((s) => (
          <li key={s} className="text-xs px-2 py-1 border border-neon-cyan/40 text-neon-cyan">
            {s}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-accent-default text-primary font-bold text-sm hover:bg-accent-hover"
        >
          {t("Live project")} <BsArrowUpRight />
        </a>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-neon-cyan/50 text-neon-cyan text-sm hover:bg-neon-cyan hover:text-primary"
          >
            <BsGithub /> {t("Github repository")}
          </a>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <button type="button" onClick={() => go(-1)} className="flex items-center gap-1 text-sm text-white/70 hover:text-accent-default">
          <FiChevronLeft /> {t("desk.prev")}
        </button>
        <span className="hud-label">
          {index + 1} / {projects.length}
        </span>
        <button type="button" onClick={() => go(1)} className="flex items-center gap-1 text-sm text-white/70 hover:text-accent-default">
          {t("desk.next")} <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

function PcView({ tab }: { tab: PcTab }) {
  const { t, i18n } = useTranslation("common");
  const { services, experience, education } = getContent(i18n.language);
  const labels: Record<PcTab, string> = {
    skills: t("Skills"),
    services: t("services"),
    experience: t("Experience"),
    education: t("Education"),
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="hud-label">{"// " + t("desk.pcTag")}</p>
        <h2 id="desk-panel-title" className="h2 text-accent-default glow-yellow mt-1 text-[30px] xl:text-[34px]">
          {t("desk.pcTitle")}
        </h2>
      </div>
      <div role="tablist" className="grid grid-cols-2 gap-2">
        {PC_TABS.map((k) => (
          <button
            key={k}
            role="tab"
            type="button"
            aria-selected={tab === k}
            onClick={() => deskActions.openPc(k)}
            className={`text-xs uppercase tracking-widest py-2 border transition-colors ${
              tab === k
                ? "bg-accent-default text-primary border-accent-default"
                : "border-neon-cyan/30 text-neon-cyan hover:border-accent-default"
            }`}
          >
            {labels[k]}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "skills" && (
          <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {skillList.map((s) => (
              <li
                key={s.name}
                className="flex flex-col items-center justify-center gap-1 aspect-square bg-surface-raised border border-white/5 hover:border-accent-default group"
              >
                <span className="text-3xl text-white/70 group-hover:text-accent-default transition-colors">{s.icon}</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50">{s.name}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "services" && (
          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.num} className="cyber-panel p-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-outline text-transparent">{s.num}</span>
                  <h3 className="h3 text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{s.description}</p>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 py-3 bg-accent-default text-primary font-bold text-sm hover:bg-accent-hover"
              >
                {t("Let's work together")} <BsArrowUpRight />
              </Link>
            </li>
          </ul>
        )}
        {tab === "experience" && (
          <ol className="flex flex-col gap-3">
            {experience.items.map((e) => (
              <li key={e.company + e.duration} className="cyber-panel p-4">
                <span className="text-accent-default text-sm">{e.duration}</span>
                <h3 className="text-lg font-display uppercase leading-tight mt-1">{e.position}</h3>
                <p className="text-sm text-neon-cyan/80 flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 bg-neon-magenta" /> {e.company}
                </p>
              </li>
            ))}
          </ol>
        )}
        {tab === "education" && (
          <ol className="flex flex-col gap-3">
            {education.items.map((e) => (
              <li key={e.institution} className="cyber-panel p-4">
                <span className="text-accent-default text-sm">{e.duration}</span>
                <h3 className="text-lg font-display uppercase leading-tight mt-1">{e.degree}</h3>
                <p className="text-sm text-neon-cyan/80 mt-1">{e.institution}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function AboutView() {
  const { t, i18n } = useTranslation("common");
  const { about } = getContent(i18n.language);
  return (
    <div className="flex flex-col gap-6">
      <h2 id="desk-panel-title" className="sr-only">
        {t("About me")}
      </h2>
      <ProfileCard compact />
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {about.info
          .filter((i) => i.fieldName && i.fieldName !== "Email" && i.fieldName !== "Phone")
          .map((i) => (
            <div key={i.fieldName}>
              <dt className="text-white/45 text-xs">{i.fieldName}</dt>
              <dd className="text-white">{i.fieldValue}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
}

function ContactView() {
  const { t } = useTranslation("common");
  const rows = [
    { href: `tel:${profile.phone}`, icon: <FaPhoneAlt />, title: t("desk.call"), value: profile.phoneDisplay },
    { href: profile.whatsapp, icon: <FaWhatsapp />, title: "WhatsApp", value: t("desk.message") },
    { href: `mailto:${profile.email}`, icon: <FaEnvelope />, title: t("Email"), value: profile.email },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="hud-label">{"// " + t("desk.incoming")}</p>
        <h2 id="desk-panel-title" className="h2 text-accent-default glow-yellow mt-1 text-[30px] xl:text-[34px]">
          {t("Let's work together")}
        </h2>
      </div>
      <ul className="flex flex-col gap-3">
        {rows.map((r) => (
          <li key={r.title}>
            <a
              href={r.href}
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 bg-surface-raised border border-white/5 hover:border-accent-default group"
            >
              <span className="w-11 h-11 flex items-center justify-center bg-primary text-accent-default text-lg clip-corner-tr group-hover:bg-accent-default group-hover:text-primary">
                {r.icon}
              </span>
              <span>
                <span className="block text-white/50 text-xs">{r.title}</span>
                <span className="block text-white">{r.value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-10 h-10 flex items-center justify-center bg-surface-raised text-neon-cyan hover:bg-accent-default hover:text-primary"
          >
            {s.icon}
          </a>
        ))}
      </div>
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 py-3 border border-accent-default text-accent-default text-sm hover:bg-accent-default hover:text-primary"
      >
        {t("desk.form")} <BsArrowUpRight />
      </Link>
    </div>
  );
}

/** Side drawer (desktop) / bottom sheet (mobile) with the real content. */
export default function DeskPanel() {
  const panel = useDesk((s) => s.panel);
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const kind = panel?.kind;

  useEffect(() => {
    if (kind) ref.current?.focus({ preventScroll: true });
  }, [kind, panel]);

  return (
    <AnimatePresence>
      {panel && (
        <motion.aside
          key="panel"
          ref={ref}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="desk-panel-title"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pointer-events-auto fixed z-40 outline-none bg-primary/90 backdrop-blur-md border-neon-cyan/25
            inset-x-0 bottom-0 max-h-[72vh] border-t
            lg:inset-x-auto lg:right-0 lg:top-0 lg:bottom-0 lg:max-h-none lg:w-[460px] lg:border-t-0 lg:border-l"
        >
          <div className="h-full max-h-[inherit] overflow-y-auto px-6 pt-14 pb-24 lg:pt-40">
            <button
              type="button"
              onClick={deskActions.closePanel}
              aria-label={t("desk.close")}
              className="absolute top-3 right-3 lg:top-36 lg:right-5 w-10 h-10 flex items-center justify-center border border-white/15 text-white/70 hover:text-primary hover:bg-accent-default"
            >
              <FiX />
            </button>
            {panel.kind === "project" && <ProjectView index={panel.index} />}
            {panel.kind === "pc" && <PcView tab={panel.tab ?? "skills"} />}
            {panel.kind === "about" && <AboutView />}
            {panel.kind === "contact" && <ContactView />}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
