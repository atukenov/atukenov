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
import Image from "next/image";
import Link from "next/link";
import * as SwiperType from "swiper/types";

const projects = [
  {
    num: "01",
    category: "🎟️ Love Airlines",
    title: "fullstack",
    description:
      "A flight ticket, coded for love — with check-in, and confetti on arrival. ✈️💙💻",
    stack: [
      { name: "Next.js 15" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    image: "/assets/work/thumb1.png",
    live: "https://ticket-topaz-two.vercel.app/",
    github: "https://github.com/atukenov/atukenov",
  },
  {
    num: "02",
    category: "💎 DMD Project",
    title: "fullstack",
    description:
      "A smart platform for local businesses in Atyrau — manage bookings, clients, payments (Kaspi), and notifications with ease. Simple, transparent, and sharp like a diamond ✨.",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Telegram API" },
    ],
    image: "/assets/work/thumb2.png",
    live: "https://dmd-project-ten.vercel.app/dashboard", // live site URL here
    github: "https://github.com/atukenov/dmd-project", // GitHub repo URL here
  },
  {
    num: "03",
    category: "Kezdesu 🤝📍",
    title: "fullstack",
    description:
      "A friendly meet-up platform for people in Atyrau to connect, create events, and chat in groups 🧑‍🤝‍🧑✨. Built with clean UI and smooth mobile-first experience 📱.",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "MongoDB" },
    ],
    image: "/assets/work/thumb3.png",
    live: "https://kezdesu-1y4q.vercel.app/", // your production link
    github: "https://github.com/atukenov/kezdesu", // your GitHub repo
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper: SwiperType.Swiper) => {
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex]);
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
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>

              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent-default transition-all duration-500 capitalize">
                {project.category}
              </h2>

              {/* project description */}
              <p className="text-white/60">{project.description}</p>

              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent-default">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>

              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Projects</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github project button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
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
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}

              {/* buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent-default hover:bg-accent-default-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
