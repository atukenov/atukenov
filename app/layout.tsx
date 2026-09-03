import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "./I18nProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

const SITE_URL = "https://atukenov.kz";
const TITLE = "Almaz Tukenov — Full-Stack Software Engineer";
const DESCRIPTION =
  "Full-Stack Software Engineer based in Atyrau, Kazakhstan. Building full-stack products with React, Node.js, .NET and Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Almaz Tukenov",
  },
  description: DESCRIPTION,
  keywords: [
    "Almaz Tukenov",
    "Full-Stack Developer",
    "Software Engineer",
    "Atyrau",
    "Kazakhstan",
    "React",
    "Next.js",
    "Node.js",
    ".NET",
  ],
  authors: [{ name: "Almaz Tukenov", url: SITE_URL }],
  creator: "Almaz Tukenov",
  alternates: {
    canonical: "/",
    languages: { en: "/", ru: "/" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Almaz Tukenov",
    title: TITLE,
    description:
      "React · Node.js · .NET · Next.js — building full-stack products end to end.",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "React · Node.js · .NET · Next.js — full-stack engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.variable}>
        <I18nProvider>
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
        </I18nProvider>
      </body>
    </html>
  );
}
