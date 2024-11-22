import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";

interface Props {
  containerStyles: string;
  iconStyles: string;
}

const socials = [
  { icon: <FaGithub />, path: "https://github.com/atukenov" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/atukenov/" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/amakenzi_" },
  { icon: <FaPinterest />, path: "https://ru.pinterest.com/amakenzi_" },
  { icon: <FaTiktok />, path: "https://www.tiktok.com/@amakenzi" },
];

const Socials = ({ containerStyles, iconStyles }: Props) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link href={item.path} key={index} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
