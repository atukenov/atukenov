"use client";

import { getContent } from "@/lib/content";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { i18n } = useTranslation("common");
  const { services } = getContent(i18n.language);

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
          className="grid grid-cols-1 md:grid-cols-2 gap-[30px] xl:gap-[40px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="cyber-panel flex-1 flex flex-col justify-center gap-6 group p-8 transition-all duration-500 hover:shadow-[inset_0_0_0_1px_#f3e600]"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="font-display text-6xl font-bold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  {service.href ? (
                    <Link
                      href={service.href}
                      className="w-[64px] h-[64px] clip-corner bg-neon-cyan group-hover:bg-accent-default group-hover:shadow-neon-yellow transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                      aria-label={service.title}
                    >
                      <BsArrowDownRight className="text-primary text-3xl" />
                    </Link>
                  ) : (
                    <div className="w-[64px] h-[64px] clip-corner bg-neon-cyan group-hover:bg-accent-default group-hover:shadow-neon-yellow transition-all duration-500 flex justify-center items-center">
                      <BsArrowDownRight className="text-primary text-3xl" />
                    </div>
                  )}
                </div>
                {/* title */}
                <h2 className="font-display uppercase text-[32px] xl:text-[38px] font-bold leading-none text-white group-hover:text-accent-default group-hover:glow-yellow transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60 ">{service.description}</p>
                {/* border */}
                <div className="h-[2px] w-full bg-gradient-to-r from-neon-magenta via-neon-cyan/40 to-transparent"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
