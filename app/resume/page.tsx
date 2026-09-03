"use client";

import {
  FaAngular,
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAzuredevops,
  SiBootstrap,
  SiCsharp,
  SiDotnet,
  SiGit,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiTailwindcss,
} from "react-icons/si";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getContent } from "@/lib/content";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Technology names are proper nouns — not localized.
const skillList = [
  { icon: <FaHtml5 />, name: "html 5" },
  { icon: <FaCss3 />, name: "CSS3" },
  { icon: <FaJs />, name: "JS" },
  { icon: <FaReact />, name: "ReactJS" },
  { icon: <SiNextdotjs />, name: "next.js" },
  { icon: <SiTailwindcss />, name: "tailwind" },
  { icon: <FaNodeJs />, name: "node.js" },
  { icon: <FaAngular />, name: "angular" },
  { icon: <SiDotnet />, name: ".net" },
  { icon: <SiCsharp />, name: "c#" },
  { icon: <SiMysql />, name: "mysql" },
  { icon: <SiMongodb />, name: "mongodb" },
  { icon: <SiPython />, name: "python" },
  { icon: <SiGit />, name: "git" },
  { icon: <SiBootstrap />, name: "bootstrap" },
  { icon: <SiAzuredevops />, name: "azure" },
  { icon: <FaFigma />, name: "figma" },
  { icon: <SiAdobephotoshop />, name: "Photoshop" },
  { icon: <SiAdobeillustrator />, name: "Illustrator" },
];

const Resume = () => {
  const { t, i18n } = useTranslation("common");
  const { about, experience, education } = getContent(i18n.language);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs
            defaultValue="experience"
            className="flex flex-col xl:flex-row gap-[60px]"
          >
            <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
              <TabsTrigger value="experience">{t("Experience")}</TabsTrigger>
              <TabsTrigger value="education">{t("Education")}</TabsTrigger>
              <TabsTrigger value="skills">{t("Skills")}</TabsTrigger>
              <TabsTrigger value="about">{t("About me")}</TabsTrigger>
            </TabsList>
            {/* content */}
            <div className="min-h-[70vh] w-full">
              {/* experience */}
              <TabsContent value="experience" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{experience.title}</h3>
                  {experience.description && (
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                      {experience.description}
                    </p>
                  )}
                  <ScrollArea className="h-[700px] pb-8">
                    <ul className="grid grid-cols-1 lg:grid-cols-1 gap-[30px]">
                      {experience.items.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="bg-[#232329] min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <p className="text-accent-default text-xl">
                                  {item.company}
                                </p>
                              </div>
                              <span className="text-accent-default">
                                {item.duration}
                              </span>
                            </div>
                            <h3 className="text-l max-w-[300px] min-h-[60px] text-center lg:text-left">
                              {item.position}
                            </h3>
                            {item.bullets &&
                              item.bullets.map((bullet, bulletIndex) => {
                                return (
                                  <div
                                    key={bulletIndex}
                                    className="flex items-start gap-4"
                                  >
                                    <p className="text-white/60 text-[12px]">
                                      • {bullet}
                                    </p>
                                  </div>
                                );
                              })}
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>
              {/* education */}
              <TabsContent value="education" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{education.title}</h3>
                  {education.description && (
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                      {education.description}
                    </p>
                  )}
                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-1 gap-[30px]">
                      {education.items.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="bg-[#232329] max-h-[150px]  md:py-6 md:px-10 py-4 px-4 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                          >
                            <div className="flex items-start justify-between w-full">
                              <div className="flex items-center  gap-3">
                                <p className="text-white text-xl text-left">
                                  {item.institution}
                                </p>
                              </div>
                              <span className="text-accent-default min-w-[100px] text-right">
                                {item.duration}
                              </span>
                            </div>
                            <h3 className="text-white/60 max-w-[260px] max-h-[60px] text-center lg:text-left">
                              {item.degree}
                            </h3>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>
              {/* skills */}
              <TabsContent value="skills" className="w-full h-full">
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-[30px] text-center xl:text-left">
                    <h3 className="text-4xl font-bold">{t("My Skills")}</h3>
                  </div>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                    {skillList.map((skill, index) => {
                      return (
                        <li key={index}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                <div className="flex flex-col items-center gap-2">
                                  <div className="text-6xl group-hover:text-accent-default transition-all duration-300">
                                    {skill.icon}
                                  </div>
                                  <div>
                                    <p className="capitalize">{skill.name}</p>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="capitalize">{skill.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
              {/* about */}
              <TabsContent
                value="about"
                className="w-full text-center xl:text-left"
              >
                <div className="flex flex-col gap-[30px]">
                  <h3 className="text-4xl font-bold">{about.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {about.description}
                  </p>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                    {about.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-center xl:justify-start gap-4"
                        >
                          <span className="text-white/60">{item.fieldName}</span>
                          <span className="text-xl">{item.fieldValue}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
