"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Only show once per session
    const hasSeenIntro = sessionStorage.getItem("portfolio_intro_seen");
    if (!hasSeenIntro && !reduceMotion) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("portfolio_intro_seen", "true");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [reduceMotion]);

  const handleSkip = () => {
    setVisible(false);
    sessionStorage.setItem("portfolio_intro_seen", "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight cursor-pointer select-none"
        >
          {/* Subtle celestial radial glow */}
          <div className="absolute w-96 h-96 rounded-full bg-azure/10 filter blur-[120px] pointer-events-none" />

          {/* Staggered typography reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-sky uppercase mb-3"
          >
            <span>Ye Yint Myint Myat</span>
            <span aria-hidden="true" className="text-frost/30">·</span>
            <span>Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-extrabold text-white text-3xl sm:text-5xl tracking-tight text-center px-6"
          >
            <span className="shimmer-text">Frontend Engineer</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-48 h-[1.5px] bg-gradient-to-r from-transparent via-sky to-transparent mt-6"
          />

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="text-[0.65rem] font-mono text-frost/40 tracking-widest uppercase mt-4"
          >
            Click or press any key to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
