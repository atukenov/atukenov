"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
  {
    name: "contact",
    route: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation("common");
  const [lang, setLang] = useState(i18n.language);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent-default" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              AMAKENZI<span className="text-accent-default">.</span>
            </h1>
          </Link>
        </div>
        <div className="flex flex-col content-center items-center">
          <nav className="flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => {
              return (
                <Link
                  href={link.route}
                  key={index}
                  className={`${
                    link.route === pathname &&
                    "text-accent-default border-b-2 border-accent-default"
                  } text-xl capitalize hover:text-accent-default transition-all`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="ml-4">
              <select
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 text-white px-2 py-1 rounded"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
              </select>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
