"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Fullstack Development",
    description:
      "End-to-end web development covering both frontend interfaces and backend logic 🔄. From user interaction to database integration — everything built seamlessly.",
    href: "",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "Designing intuitive, user-friendly interfaces with a focus on clarity, flow, and emotion 🎨✨. Every element is crafted to enhance the user’s experience and engagement.",
    href: "",
  },
  {
    num: "03",
    title: "Logo Design",
    description:
      "Crafting memorable, meaningful logos that visually capture a brand’s identity and purpose 🌀✍️. A strong mark that stays in people’s minds and fits across digital spaces.",
    href: "",
  },
  {
    num: "04",
    title: "Mobile Development",
    description:
      "Building responsive, fast, and user-focused applications tailored for mobile devices 📱⚡. Ensuring smooth performance, intuitive navigation, and modern design on every screen.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent-default transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent-default transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60 ">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
