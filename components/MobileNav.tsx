"use client";
import { mobileNavLinks } from "@/lib/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { CiMenuFries } from "react-icons/ci";
import LanguageSwitcher from "./LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent-default" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              AMAKENZI<span className="text-accent-default">_</span>
            </h1>
          </Link>
        </div>
        <div className="flex flex-col content-center items-center">
          <nav className="flex flex-col justify-center items-center gap-8">
            {mobileNavLinks.map((link) => {
              return (
                <Link
                  href={link.route}
                  key={link.route}
                  className={`${
                    link.route === pathname &&
                    "text-accent-default border-b-2 border-accent-default"
                  } text-xl capitalize hover:text-accent-default transition-all`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <LanguageSwitcher className="ml-4" />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
