import type { Content } from "./types";

export const content: Content = {
  services: [
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
        "Designing intuitive, user-friendly interfaces with a focus on clarity, flow, and emotion 🎨✨. Every element is crafted to enhance the user's experience and engagement.",
      href: "",
    },
    {
      num: "03",
      title: "Logo Design",
      description:
        "Crafting memorable, meaningful logos that visually capture a brand's identity and purpose 🌀✍️. A strong mark that stays in people's minds and fits across digital spaces.",
      href: "",
    },
    {
      num: "04",
      title: "Mobile Development",
      description:
        "Building responsive, fast, and user-focused applications tailored for mobile devices 📱⚡. Ensuring smooth performance, intuitive navigation, and modern design on every screen.",
      href: "",
    },
  ],

  projects: [
    {
      num: "01",
      category: "☕ AltynCup",
      title: "fullstack",
      description:
        "A full-stack café ordering platform ☕ — customers order pickup from their phones while staff track and manage every order live from a desktop console. Real-time SignalR updates, analytics, payments, and full RU/EN/KK support.",
      stack: [".NET 10", "Angular 17", "SignalR", "SQL Server", "Tailwind CSS"],
      image: "/assets/work/altyncup.png",
      live: "https://altyncup.vercel.app",
      // TODO(owner): set the real repo URL, or leave undefined to hide the GitHub button
      github: undefined,
    },
    {
      num: "02",
      category: "🎟️ Love Airlines",
      title: "fullstack",
      description:
        "A flight ticket, coded for love — with check-in, and confetti on arrival. ✈️💙💻",
      stack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
      image: "/assets/work/thumb1.png",
      live: "https://ticket-topaz-two.vercel.app/",
      // TODO(owner): set the real repo URL, or leave undefined to hide the GitHub button
      github: undefined,
    },
    {
      num: "03",
      category: "💎 DMD Project",
      title: "fullstack",
      description:
        "A smart platform for local businesses in Atyrau — manage bookings, clients, payments (Kaspi), and notifications with ease. Simple, transparent, and sharp like a diamond ✨.",
      stack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Telegram API"],
      image: "/assets/work/thumb2.png",
      live: "https://dmd-project-ten.vercel.app/dashboard",
      github: "https://github.com/atukenov/dmd-project",
    },
    {
      num: "04",
      category: "Kezdesu 🤝📍",
      title: "fullstack",
      description:
        "A friendly meet-up platform for people in Atyrau to connect, create events, and chat in groups 🧑‍🤝‍🧑✨. Built with clean UI and smooth mobile-first experience 📱.",
      stack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
      image: "/assets/work/thumb3.png",
      live: "https://kezdesu-1y4q.vercel.app/",
      github: "https://github.com/atukenov/kezdesu",
    },
  ],

  about: {
    title: "About me",
    description:
      "Passionate and results-driven Full-Stack Developer with over 5 years of experience in building and optimizing web applications.",
    info: [
      { fieldName: "Name", fieldValue: "Almaz Tukenov" },
      { fieldName: "Phone", fieldValue: "+7(771) 177-0303" },
      { fieldName: "Experience", fieldValue: "7+ Years" },
      { fieldName: "Socials", fieldValue: "amakenzi_" },
      { fieldName: "Nationality", fieldValue: "Kazakh" },
      { fieldName: "Email", fieldValue: "almaz.t97@gmail.com" },
      { fieldName: "Languages", fieldValue: "English, Russian" },
      { fieldName: "Freelance", fieldValue: "Working" },
      { fieldName: "Hobby 1", fieldValue: "Soccer ⚽" },
      { fieldName: "Dreams", fieldValue: "Travel 🌍" },
      { fieldName: "Hobby 2", fieldValue: "Tennis 🎾" },
      { fieldName: "", fieldValue: "" },
      { fieldName: "Hobby 3", fieldValue: "Volleyball 🏐" },
    ],
  },

  experience: {
    title: "My experience",
    description: "",
    items: [
      {
        company: "Chevron Corp.",
        position: "Lead Software Engineer",
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
        position: "Full-Stack .Net/React",
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
        position: "Full-Stack NodeJS/React",
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
        position: "Full-Stack Developer",
        duration: "2018 - 2019",
        bullets: [
          "Developed back-end web applications using C# in Visual Studio and designed front-end UI using HTML, JSON, and AJAX. Project: Online Task Scheduler - helps project managers and team members to collaborate effectively with each other. Currently is being used in Eastern Europe Shell subsidy - NCOC.",
          "Automated business operations on web applications using JavaScript in Sublime platform. Projects: (1) Drug testing – randomly selects 3 employees every week to test for alcohol. (2) Employee finder – finds which employee is in which building and room by accessing NCOC Database.",
        ],
      },
    ],
  },

  education: {
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
  },
};
