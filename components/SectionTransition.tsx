"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  viewportAmount?: number;
  as?: "section" | "div" | "article";
}

export default function SectionTransition({
  children,
  id,
  className = "",
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 36,
  viewportAmount = 0.15,
  as = "section",
}: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();

  const getInitialOffset = () => {
    if (reduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const initialOffset = getInitialOffset();

  const Component = as === "section" ? motion.section : as === "article" ? motion.article : motion.div;

  return (
    <Component
      id={id}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: initialOffset.x,
              y: initialOffset.y,
              filter: "blur(6px)",
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{ once: true, amount: viewportAmount }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
