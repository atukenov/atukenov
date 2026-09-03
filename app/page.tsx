"use client";

import Photo from "@/components/Photo";
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
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{t("Software Engineer")}</span>
            <h1 className="h1">
              {t("Hello I'm")} <br />
              <span className="text-accent-default">{t("Almaz Tukenov")}</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              {t(
                "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies."
              )}
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
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
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent-default rounded-full flex justify-center items-center text-accent-default text-base hover:bg-accent-default hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
