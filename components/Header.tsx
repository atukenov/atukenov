"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { Button } from "./ui/button";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const [lang, setLang] = useState(i18n.language);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            AMAKENZI<span className="text-accent-default">_</span>
          </h1>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>{t("contact")}</Button>
          </Link>
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
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
