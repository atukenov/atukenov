import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack development, UI/UX design, logo design and mobile development by Almaz Tukenov.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
