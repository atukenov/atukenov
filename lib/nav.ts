export type NavLink = {
  /** i18n key in common.json */
  key: string;
  route: string;
};

export const navLinks: NavLink[] = [
  { key: "home", route: "/" },
  { key: "services", route: "/services" },
  { key: "resume", route: "/resume" },
  { key: "work", route: "/work" },
];

/** Mobile menu also surfaces the Contact route (desktop shows it as a CTA button). */
export const mobileNavLinks: NavLink[] = [
  ...navLinks,
  { key: "contact", route: "/contact" },
];
