"use client";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import BackgroundMusic from "./BackgroundMusic";

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
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
