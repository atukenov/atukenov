"use client";

import GlitchText from "@/components/cyber/GlitchText";
import HeroMedia from "@/components/cyber/HeroMedia";
import Typewriter from "@/components/cyber/Typewriter";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  const { t } = useTranslation("common");

  return (
    <section className="h-full">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:pt-4 xl:pb-20">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <p className="hud-label mb-3">{"// 01 — ident.scan // status: online"}</p>
            <span className="text-lg xl:text-xl text-neon-cyan glow-cyan">
              <span className="text-neon-magenta">&gt; </span>
              <Typewriter text={t("Software Engineer")} />
            </span>
            <h1 className="h1 mt-3 mb-6">
              {t("Hello I'm")} <br />
              <GlitchText
                text={t("Almaz Tukenov")}
                className="text-accent-default glow-yellow"
              />
            </h1>
            <p className="max-w-[520px] mb-9 text-white/70 border-l-2 border-neon-magenta pl-4 mx-auto xl:mx-0 text-left">
              {t(
                "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies."
              )}
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <a
                  href="/assets/resume/myresume.pdf"
                  download="AlmazTukenov-CV.pdf"
                >
                  <span>{t("Download CV")}</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-4"
                  iconStyles="w-10 h-10 clip-corner-tr bg-surface-raised flex justify-center items-center text-neon-cyan text-base hover:bg-accent-default hover:text-primary hover:shadow-neon-yellow transition-all duration-300"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-4 xl:mb-0">
            <HeroMedia />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
