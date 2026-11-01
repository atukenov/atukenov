"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WorkSliderBtns from "@/components/WorkSliderBtns";
import { getContent } from "@/lib/content";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import * as SwiperType from "swiper/types";

const Work = () => {
  const { t, i18n } = useTranslation("common");
  const { projects } = getContent(i18n.language);
  const [index, setIndex] = useState(0);
  const project = projects[index] ?? projects[0];

  const handleSlideChange = (swiper: SwiperType.Swiper) => {
    setIndex(swiper.activeIndex);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline */}
              <div className="font-display text-8xl leading-none font-bold text-transparent text-outline">
                {project.num}
              </div>

              {/* project category */}
              <h2 className="font-display uppercase text-[34px] xl:text-[42px] font-bold leading-none text-accent-default glow-yellow">
                {project.category}
              </h2>

              {/* project description */}
              <p className="text-white/60">{project.description}</p>

              {/* stack */}
              <ul className="flex flex-wrap gap-4">
                {project.stack.map((item, itemIndex) => {
                  return (
                    <li
                      key={itemIndex}
                      className="text-sm uppercase tracking-widest text-neon-cyan bg-neon-cyan/10 px-3 py-1 clip-corner-tr"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>

              {/* border */}
              <div className="h-[2px] bg-gradient-to-r from-neon-magenta via-neon-cyan/40 to-transparent"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[64px] h-[64px] clip-corner bg-surface-raised hover:bg-accent-default flex justify-center items-center group transition-all"
                        aria-label={t("Live project")}
                      >
                        <BsArrowUpRight className="text-neon-cyan text-3xl group-hover:text-primary" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("Live project")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </a>
                {/* github project button */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger
                          className="w-[64px] h-[64px] clip-corner bg-surface-raised hover:bg-accent-default flex justify-center items-center group transition-all"
                          aria-label={t("Github repository")}
                        >
                          <BsGithub className="text-neon-cyan text-3xl group-hover:text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("Github repository")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((item, itemIndex) => {
                return (
                  <SwiperSlide key={itemIndex} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-surface clip-corner">
                      {/* overlay */}
                      <div className="absolute inset-0 z-10 crt-scanlines bg-gradient-to-t from-neon-magenta/20 via-transparent to-neon-cyan/10 pointer-events-none"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover"
                          alt={item.category}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}

              {/* buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent-default hover:bg-neon-cyan hover:shadow-neon-cyan text-primary text-[22px] w-[44px] h-[44px] clip-corner-tr flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
