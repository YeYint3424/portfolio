"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
  variant?: "standard" | "footer";
}

export default function SectionDivider({
  className = "",
  variant = "standard",
}: SectionDividerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative w-full overflow-hidden py-2 flex items-center justify-center ${className}`}>
      <motion.div
        initial={
          reduceMotion
            ? { scaleX: 1, opacity: 0.5 }
            : { scaleX: 0, opacity: 0 }
        }
        whileInView={{
          scaleX: 1,
          opacity: variant === "footer" ? 0.8 : 0.5,
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: reduceMotion ? 0 : 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={
          variant === "footer"
            ? "ice-divider-footer w-full"
            : "ice-divider w-full"
        }
      />
    </div>
  );
}
