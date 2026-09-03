import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects built by Almaz Tukenov.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
