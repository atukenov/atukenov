"use client";
import { Fragment, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const STORAGE_KEY = "lang";
const SUPPORTED = ["en", "ru"];

function resolveInitial(): string {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<string>(() => i18n.language || "en");

  useEffect(() => {
    const apply = (lng: string) => {
      const short = lng.slice(0, 2);
      setLang(short);
      try {
        window.localStorage.setItem(STORAGE_KEY, short);
      } catch {}
      document.documentElement.lang = short;
    };

    i18n.on("languageChanged", apply);

    const initial = resolveInitial();
    if (initial !== i18n.language.slice(0, 2)) {
      i18n.changeLanguage(initial);
    } else {
      // Keep local state / <html lang> in sync even when no change fires.
      apply(i18n.language);
    }

    return () => {
      i18n.off("languageChanged", apply);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {/* Remount the tree on language change so every useTranslation() re-reads. */}
      <Fragment key={lang}>{children}</Fragment>
    </I18nextProvider>
  );
}
