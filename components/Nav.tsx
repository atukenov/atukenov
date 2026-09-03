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
                link.route === pathName &&
                "text-accent-default border-b-2 border-accent-default"
              } capitalize font-medium hover:text-accent-default transition-all`}
            >
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
