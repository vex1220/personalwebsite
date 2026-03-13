import type { Metadata } from "next";
import { DM_Sans, Fragment_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Ashir Georges — Full-Stack Engineer",
  description:
    "Senior CS student at Florida State University specializing in full-stack engineering, mobile UI/UX, real-time systems, and intelligent automation.",
  keywords: [
    "Ben Georges",
    "Ben Ashir Georges",
    "Full-Stack Engineer",
    "React Native",
    "TypeScript",
    "FSU",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Ben Ashir Georges" }],
  openGraph: {
    title: "Ben Ashir Georges — Full-Stack Engineer",
    description:
      "My name is Ben Ashir Georges. I am a Senior Computer Science student at Florida State University, minoring in Business Analytics. My journey in technology is driven by a relentless curiosity and a desire to build systems that are as aesthetically profound as they are technically rigorous. I view myself as an eternal student of the craft, constantly refining my toolkit in Rust, C++, and Python to stay at the bleeding edge of what's possible. While I am always learning, I have already begun to leave my mark: At NCH Healthcare, I architected intelligent automation engines in Python that are still used today to streamline critical enterprise workflows. I bridge the gap between code and capital — as Lead Financial Analyst, I managed the fiscal strategy to help raise over $5,000 for Tallahassee Memorial Hospital. I am currently seeking opportunities where I can apply my quantitative intelligence and systems-engineering mindset to solve high-stakes problems. I don't just want to build software; I want to engineer the future—one elegant line of code at a time.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fragmentMono.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
