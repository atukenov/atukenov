import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  /** only glitch while hovered */
  hoverOnly?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/** Text with magenta/cyan RGB-split glitch slices (pure CSS). */
const GlitchText = ({ text, className, hoverOnly, as: Tag = "span" }: Props) => (
  <Tag
    data-text={text}
    className={cn("glitch", hoverOnly && "glitch-hover", className)}
  >
    {text}
  </Tag>
);

export default GlitchText;
