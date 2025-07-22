"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const links = [
  {
    name: "home",
    route: "/",
  },
  {
    name: "services",
    route: "/services",
  },
  {
    name: "resume",
    route: "/resume",
  },
  {
    name: "work",
    route: "/work",
  },
];

const Nav = () => {
  const pathName = usePathname();
  const { t, i18n } = useTranslation("common");

  return (
    <div className="flex items-center">
      <nav className="flex gap-8 items-center">
        {links.map((link, index) => {
          return (
            <Link
              href={link.route}
              key={index}
              className={`${
                link.route === pathName &&
                "text-accent-default border-b-2 border-accent-default"
              } capitalize font-medium hover:text-accent-default transition-all`}
            >
              {t(link.name)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
