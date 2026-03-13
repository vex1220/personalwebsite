"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

const STATUS_ITEMS: { label: string; node: React.ReactNode }[] = [
  { label: "Status", node: "Open to 2026 roles" },
  { label: "Based in", node: "Tallahassee, FL" },
  {
    label: "Currently",
    node: (
      <>
        Building{" "}
        <a
          href="https://proximachat.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#09f] no-underline hover:opacity-70 transition-opacity"
        >
          Proxima
        </a>
      </>
    ),
  },
  { label: "Education", node: "FSU · CS + Business Analytics" },
];

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-container mx-auto flex flex-col items-center text-center">

        {/* Profile image */}
        <motion.div
          {...fadeUp(0)}
          className="mb-8"
        >
          <div
            className="relative overflow-hidden border-[3px] border-[#f0f0f0]"
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
            }}
          >
            <Image
              src="/ben.jpg"
              alt="Ben Ashir Georges"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

      {/* Status grid */}
        <motion.div
          {...fadeUp(0.3)}
          className="w-full max-w-[680px] grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4"
        >
          {STATUS_ITEMS.map(({ label, node }) => (
            <div key={label} className="card-dashed p-4 text-left">
              <p className="section-label mb-1">{label}</p>
              <p className="text-xs text-black font-medium leading-snug">{node}</p>
            </div>
          ))}
        </motion.div>

        {/* Name */}
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono text-xs text-black uppercase tracking-widest mb-3 font-bold"
        >
          Ben Ashir Smith Georges
        </motion.p>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.15)}
          className="text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-black mb-6 max-w-2xl"
        >
          Full-Stack Engineer &amp; UI/UX Developer.
        </motion.h1>

        {/* Bio */}
        <motion.div
          {...fadeUp(0.2)}
          className="text-base text-[#666] leading-relaxed max-w-[680px] mb-8 space-y-4 text-left"
        >
          <p>
            My name is Ben Ashir Smith Georges. I am a Senior Computer Science student
            at Florida State University, minoring in Business Analytics. My
            journey in technology is driven by a relentless curiosity and a
            desire to build systems that are as aesthetically profound as they
            are technically rigorous.
          </p>
          <p>
            I view myself as an eternal student of the craft, constantly
            refining my toolkit in C++, Java, and Python to stay at the bleeding
            edge of what&apos;s possible. While I am always learning, I have
            already begun to leave my mark:
          </p>
          <p>
            <strong className="text-black font-medium">Engineering Impact:</strong>{" "}
            At NCH Healthcare, I didn&apos;t just support IT; I architected
            intelligent automation engines in Python that are still used today to
            streamline critical enterprise workflows.
          </p>
          <p>
            <strong className="text-black font-medium">Financial Leadership:</strong>{" "}
            I bridge the gap between code and capital. As the Lead Financial
            Analyst for a major fundraising campaign, I managed the fiscal
            strategy to help raise over $5,000 for Tallahassee Memorial Hospital.
          </p>
          <p>
            <strong className="text-black font-medium">Real-World Systems:</strong>{" "}
            From analyzing complex contracts at NWF Health Network to developing
            my own mobile ecosystems, I am obsessed with the intersection of
            operational efficiency and user experience.
          </p>
          <p>
            I am currently seeking opportunities where I can apply my
            quantitative intelligence and systems-engineering mindset to solve
            high-stakes problems. I don&apos;t just want to build software; I
            want to engineer the future—one line of code at a time.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          {...fadeUp(0.25)}
          className="flex flex-wrap justify-center gap-6 text-sm mb-12"
        >
          <Link href="/work" className="link-accent font-medium">
            View Work
          </Link>
          <a
            href="https://github.com/vex1220"
            target="_blank"
            rel="noreferrer"
            className="link-accent font-medium"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/ben-ashir-g-253a74264"
            target="_blank"
            rel="noreferrer"
            className="link-accent font-medium"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:vex0207@hotmail.com" className="link-accent font-medium">
            vex0207@hotmail.com ↗
          </a>
        </motion.div>


      </div>
    </section>
  );
}
