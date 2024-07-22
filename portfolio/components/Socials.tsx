import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaPinterest } from "react-icons/fa";

interface Props {
  containerStyles: string;
  iconStyles: string;
}

const socials = [
  { icon: <FaGithub />, path: "" },
  { icon: <FaLinkedin />, path: "" },
  { icon: <FaInstagram />, path: "" },
  { icon: <FaPinterest />, path: "" },
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
