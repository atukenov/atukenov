import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Experience, education and skills of Almaz Tukenov — Full-Stack Software Engineer.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
