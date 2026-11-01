"use client";

import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation("common");
  const current = (i18n.language || "en").slice(0, 2);

  return (
    <select
      aria-label="Select language"
      value={current}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={`bg-surface-raised text-neon-cyan font-display tracking-widest text-sm px-2 py-1 border border-neon-cyan/40 outline-none focus:border-accent-default ${className}`}
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
