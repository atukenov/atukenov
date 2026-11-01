"use client";

import { navLinks } from "@/lib/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const pathName = usePathname();
  const { t } = useTranslation("common");

  return (
    <div className="flex items-center">
      <nav className="flex gap-8 items-center">
        {navLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.route}
              className={`${
                link.route === pathName
                  ? "text-accent-default glow-yellow"
                  : "text-white/80"
              } font-display uppercase tracking-[0.2em] text-sm hover:text-neon-cyan transition-all`}
            >
              <span className="text-neon-magenta/80 mr-1">
                {link.route === pathName ? "▸" : "/"}
              </span>
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
