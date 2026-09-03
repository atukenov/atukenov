import { content as en } from "./en";
import { content as ru } from "./ru";
import type { Content } from "./types";

export type { Content } from "./types";

/** Resolve the localized page-content bundle for a given i18n language code. */
export function getContent(lang?: string): Content {
  return (lang || "en").slice(0, 2) === "ru" ? ru : en;
}
