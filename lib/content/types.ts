export type Service = {
  num: string;
  title: string;
  description: string;
  href: string;
};

export type Project = {
  num: string;
  category: string;
  /** e.g. "fullstack" — shown as a small label */
  title: string;
  description: string;
  stack: string[];
  image: string;
  live: string;
  /** omit when the repo is private */
  github?: string;
};

export type ExperienceItem = {
  company: string;
  position: string;
  duration: string;
  bullets: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  duration: string;
};

export type AboutInfo = {
  fieldName: string;
  fieldValue: string;
};

export type Content = {
  services: Service[];
  projects: Project[];
  about: {
    title: string;
    description: string;
    info: AboutInfo[];
  };
  experience: {
    title: string;
    description: string;
    items: ExperienceItem[];
  };
  education: {
    title: string;
    description: string;
    items: EducationItem[];
  };
};
