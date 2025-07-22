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

//about data
const about = {
  title: "About me",
  description:
    "Passionate and results-driven Full-Stack Developer with over 5 years of experience in building and optimizing web applications.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Almaz Tukenov",
    },
    {
      fieldName: "Phone",
      fieldValue: "+7(771) 177-0303",
    },
    {
      fieldName: "Experience",
      fieldValue: "7+ Years",
    },
    {
      fieldName: "Socials",
      fieldValue: "amakenzi_",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Kazakh",
    },
    {
      fieldName: "Email",
      fieldValue: "almaz.t97@gmail.com",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Russian",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Working",
    },
    {
      fieldName: "Hobby 1",
      fieldValue: "Soccer ⚽",
    },
    {
      fieldName: "Dreams",
      fieldValue: "Travel 🌍",
    },
    {
      fieldName: "Hobby 2",
      fieldValue: "Tennis 🎾",
    },
    {
      fieldName: "",
      fieldValue: "",
    },
    {
      fieldName: "Hobby 3",
      fieldValue: "Volleyball 🏐",
    },
  ],
};

//experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: "",
  items: [
    {
      company: "Chevron Corp.",
      posittion: "Lead Software Engineer",
      duration: "2022 - Present",
      bullets: [
        "Led a team of software engineers in the development and maintenance of full-stack applications for the oil and gas industry.",
        "Developed robust and scalable solutions, encompassing front-end, back-end, and database components.",
        "Collaborated closely with cross-functional teams, including business analysts and project managers, to gather requirements and define project scopes.",
        "Contributed to the design, development, and testing of full-stack applications within the oil and gas sector, troubleshooting and debugging complex technical issues, ensuring smooth operation",
        "Worked with the operations team to deploy applications to production environments, ensuring smooth operation and timely updates.",
      ],
    },
    {
      company: "NCOC N.V",
      posittion: "Full-Stack .Net/React",
      duration: "2021 - 2022",
      bullets: [
        "Developed and maintained web applications for NCOC, a leading oil and gas company operating in the Atyrau region of Kazakhstan.",
        "Work as a part of an agile development team, taking responsibility for organizing and planning their own work.",
        "Implement, improve, and maintain back-end services/build, improve and maintain responsive front-ends/Develop online tools/features",
        "Designing a modern highly responsive web-based user interface (Ant design, Bootstrap). Building reusable components and front-end libraries for future use.",
        "Translating designs and wire-frames into high-quality code. Collaborate with the Business team to ensure the quality of test cases and the testing process.",
      ],
    },
    {
      company: "Harmony Public Schools",
      posittion: "Full-Stack NodeJS/React",
      duration: "2019 - 2021",
      bullets: [
        "Developed and maintained web applications for Harmony Public School, a leading educational institution committed to providing high-quality education to students.",
        "Utilized React.js to create interactive and responsive user interfaces, ensuring optimal user experience across different devices and browsers. Implemented back-end functionality using NodeJs, creating RESTful APIs to facilitate data retrieval and manipulation.",
        "Integrated third-party APIs and services to extend the functionality of web applications and improve overall user experience.",
        "Participated in code reviews, conducted thorough testing, and resolved bugs to deliver high-quality software.",
        "Designed and optimized databases using SQL and NoSQL technologies, ensuring efficient data storage and retrieval.",
      ],
    },
    {
      company: "NCOC N.V",
      posittion: "Full-Stack Developer",
      duration: "2018 - 2019",
      bullets: [
        "Developed back-end web applications using C# in Visual Studio and designed front-end UI using HTML, JSON, and AJAX. Project: Online Task Scheduler - helps project managers and team members to collaborate effectively with each other. Currently is being used in Eastern Europe Shell subsidy - NCOC.",
        "Automated business operations on web applications using JavaScript in Sublime platform. Projects: (1) Drug testing – randomly selects 3 employees every week to test for alcohol. (2) Employee finder – finds which employee is in which building and room by accessing NCOC Database.",
      ],
    },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description: "",
  items: [
    {
      institution: "North American University",
      degree: "Bachelor, Computer Science",
      duration: "2015-2019",
    },
    {
      institution: "Kazakh-Turkish High School",
      degree: "High Education",
      duration: "2010-2015",
    },
  ],
};

const skills = {
  title: "My Skills",
  description: "",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS3",
    },
    {
      icon: <FaJs />,
      name: "JS",
    },
    {
      icon: <FaReact />,
      name: "ReactJS",
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },
    {
      icon: <FaAngular />,
      name: "angular",
    },
    {
      icon: <SiDotnet />,
      name: ".net",
    },
    {
      icon: <SiCsharp />,
      name: "c#",
    },
    {
      icon: <SiMysql />,
      name: "mysql",
    },
    {
      icon: <SiMongodb />,
      name: "mongodb",
    },
    {
      icon: <SiPython />,
      name: "python",
    },
    {
      icon: <SiGit />,
      name: "git",
    },
    {
      icon: <SiBootstrap />,
      name: "bootstrap",
    },
    {
      icon: <SiAzuredevops />,
      name: "azure",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <SiAdobephotoshop />,
      name: "Photoshop",
    },
    {
      icon: <SiAdobeillustrator />,
      name: "Illustrator",
    },
  ],
};

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

const Resume = () => {
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
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About me</TabsTrigger>
            </TabsList>
            {/* content */}
            <div className="min-h-[70vh] w-full">
              {/* experience */}
              <TabsContent value="experience" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{experience.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {experience.description}
                  </p>
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
                                {/* <span className="w-[6px] h-[6px] rounded-full bg-accent-default"></span> */}
                                <p className="text-accent-default text-xl">
                                  {item.company}
                                </p>
                              </div>
                              <span className="text-accent-default">
                                {item.duration}
                              </span>
                            </div>
                            <h3 className="text-l max-w-[300px] min-h-[60px] text-center lg:text-left">
                              {item.posittion}
                            </h3>
                            {item.bullets &&
                              item.bullets.map((bullet, bulletIndex) => {
                                return (
                                  <div
                                    key={bulletIndex}
                                    className="flex items-start gap-4"
                                  >
                                    {/* <span className="w-[6px] h-[6px] rounded-full bg-accent-default"></span> */}
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
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {education.description}
                  </p>
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
                                {/* <span className="w-[6px] h-[6px] rounded-full bg-accent-defaults"></span> */}
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
                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                      {skills.description}
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                    {skills.skillList.map((skill, index) => {
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
                          <span className="text-white/60">
                            {item.fieldName}
                          </span>
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
