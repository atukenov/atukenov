import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";

interface Props {
  containerStyles: string;
  iconStyles: string;
}

const socials = [
  { icon: <FaGithub />, label: "GitHub", path: "https://github.com/atukenov" },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    path: "https://www.linkedin.com/in/atukenov/",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    path: "https://www.instagram.com/amakenzi_",
  },
  {
    icon: <FaPinterest />,
    label: "Pinterest",
    path: "https://ru.pinterest.com/amakenzi_",
  },
  { icon: <FaTiktok />, label: "TikTok", path: "https://www.tiktok.com/@amakenzi" },
];

const Socials = ({ containerStyles, iconStyles }: Props) => {
  return (
    <div className={containerStyles}>
      {socials.map((item) => {
        return (
          <a
            href={item.path}
            key={item.label}
            className={iconStyles}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
          >
            {item.icon}
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
