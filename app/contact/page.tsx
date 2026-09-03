"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

const SERVICE_OPTIONS = [
  { value: "fullstack", key: "Full-Stack Development" },
  { value: "logoDesign", key: "Logo Design" },
  { value: "uiux", key: "UI/UX Design" },
  { value: "mobile", key: "Mobile Development" },
];

// Type for the form data
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Contact = () => {
  const { t } = useTranslation("common");

  const info = [
    { icon: <FaPhoneAlt />, title: t("Phone"), description: "+7 (771) 177-0303" },
    { icon: <FaEnvelope />, title: t("Email"), description: "almaz.t97@gmail.com" },
    { icon: <FaMapMarkerAlt />, title: t("Address"), description: t("Atyrau, KZ") },
  ];

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Handle changes in input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in select field
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const serviceLabel = SERVICE_OPTIONS.find(
      (o) => o.value === formData.service
    );
    const service = serviceLabel ? t(serviceLabel.key) : formData.service;
    const whatsappURL = `https://wa.me/77711770303?text=${encodeURIComponent(
      `*Name:* ${formData.firstname} ${formData.lastname}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Service:* ${service}\n*Message:* ${formData.message}`
    )}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
            >
              <h3 className="text-4xl text-accent-default">
                {t("Let's work together")}
              </h3>
              <p className="text-white/60">
                {t(
                  "I'm excited to collaborate on innovative projects and bring your ideas to life. Whether you need a robust web application or a dynamic digital solution, let's create something amazing together. Get in touch to discuss how we can work together."
                )}
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstname"
                  placeholder={t("Firstname")}
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder={t("Lastname")}
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder={t("Email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder={t("Phone Number")}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* select */}
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("Select a service")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("Select a service")}</SelectLabel>
                    {SERVICE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(option.key)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                className="h-[200px]"
                placeholder={t("Type your message here.")}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {/* btn */}
              <Button size="md" className="max-w-40" type="submit">
                {t("Send message")}
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent-default rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
