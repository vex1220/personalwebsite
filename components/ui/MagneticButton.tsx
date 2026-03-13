"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "outline";
  strength?: number;
  target?: string;
}

export default function MagneticButton({
  children,
  className,
  href,
  variant = "primary",
  strength = 0.3,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded cursor-pointer select-none transition-all duration-200",
        variant === "primary"
          ? "bg-[#00d4ff] text-[#08080f] font-semibold hover:bg-[#00bbdf] shadow-[0_0_24px_rgba(0,212,255,0.3)]"
          : "border border-[#1e1e35] text-[#94a3b8] hover:border-[#00d4ff]/40 hover:text-[#e8eaf6] hover:bg-[#00d4ff]/5",
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer noopener" : undefined}
      >
        {inner}
      </a>
    );
  }

  return inner;
}
