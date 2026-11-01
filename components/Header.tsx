"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import GlitchText from "./cyber/GlitchText";
import { Button } from "./ui/button";

const Header = () => {
  const { t } = useTranslation("common");

  return (
    <header className="relative py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="group flex items-baseline gap-1" aria-label="Home">
          <GlitchText
            text="AMAKENZI"
            hoverOnly
            className="font-display text-3xl xl:text-4xl font-bold tracking-wider"
          />
          <span className="font-display text-3xl xl:text-4xl text-accent-default glow-yellow animate-blink">
            _
          </span>
          <span className="hidden xl:inline hud-label ml-2 self-center">v2.077</span>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>{t("contact")}</Button>
          </Link>
          <LanguageSwitcher className="ml-4" />
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
