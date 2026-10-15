"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "@/data";
import SectionTransition from "./SectionTransition";

const TECH_DETAILS: Record<string, string> = {
  "React.js": "Component lifecycle, custom hooks, virtual DOM optimization, and reactive state management.",
  "Next.js": "App Router, SSR, Server Components, client boundaries, static generation & route handlers.",
  "TypeScript": "Strict type safety, generic interfaces, union types, and robust refactoring guarantees.",
  "Tailwind CSS": "Design tokens, responsive utility engineering, container queries, and custom typography.",
  "Java": "Object-oriented architecture, thread safety, design patterns, and enterprise backend logic.",
  "Spring Boot": "RESTful web services, Spring Data JPA, Hibernate ORM, and enterprise microservices.",
  "Zustand": "Lightweight, un-opinionated global state stores for complex multi-step frontend flows.",
  "Redux Toolkit": "Normalized global slices, thunk middleware, and predictable action dispatches.",
  "PostgreSQL": "Relational schema design, indexes, foreign keys, and query execution planning.",
  "Docker": "Containerized development environments, multistage Dockerfiles, and reproducible builds.",
  "Figma": "High-fidelity UI prototyping, component design systems, and developer handoff execution.",
  "Express.js": "REST API routing, request validation middleware, and Node.js backend integration.",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredTag, setHoveredTag] = useState<string | null>("Next.js");

  const categories = ["All", ...data.skills.map((s) => s.label.replace(/^[^\w\s]+/, "").trim())];

  const filteredSkillGroups = data.skills.filter((group) => {
    if (activeCategory === "All") return true;
    const cleanLabel = group.label.replace(/^[^\w\s]+/, "").trim();
    return cleanLabel.toLowerCase() === activeCategory.toLowerCase();
  });

  const marqueeSkills = [
    "React.js",
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Java",
    "Spring Boot",
    "Zustand",
    "PostgreSQL",
    "Docker",
    "Figma",
    "Responsive UI/UX",
  ];

  return (
    <SectionTransition id="skills" className="relative px-6 py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Capabilities &amp; Stack
            </p>
            <h2
              className="font-sans font-extrabold text-white tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", textWrap: "balance" }}
            >
              The Technical Arsenal
            </h2>
          </div>
          <p className="text-frost/60 text-sm max-w-md">
            Bridging pixel-perfect frontend engineering with solid backend fundamentals honed across real commercial projects.
          </p>
        </div>

        {/* Infinite Kinetic Tech Marquee */}
        <div className="relative w-full overflow-hidden py-4 mb-12 bg-midnight/60 border-y border-sky/15">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-midnight to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-midnight to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="flex items-center gap-8 whitespace-nowrap will-change-transform"
          >
            {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-xs sm:text-sm font-mono tracking-wider text-sky/70 hover:text-white transition-colors cursor-default flex items-center gap-3"
              >
                <span>{tech}</span>
                <span className="text-sky/30">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-midnight/80 border border-sky/15 rounded-xl mb-8 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? "bg-sky/20 text-white border border-sky/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  : "text-frost/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Grid: Left Skills Grid + Right Context Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: Category Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkillGroups.map((group) => (
                <motion.div
                  layout
                  key={group.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl glass-panel border border-sky/15 hover:border-sky/35 transition-colors"
                >
                  <p className="text-xs font-bold tracking-wider uppercase text-sky mb-3">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <button
                        key={tag}
                        onMouseEnter={() => setHoveredTag(tag)}
                        onClick={() => setHoveredTag(tag)}
                        className={`px-2.5 py-1 rounded-md text-xs transition-all duration-150 text-left ${
                          hoveredTag === tag
                            ? "bg-sky text-midnight font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                            : "bg-sky/10 border border-sky/15 text-frost hover:bg-sky/20"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Tech Depth Inspector */}
          <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-sky/20 sticky top-28 bg-midnight/90">
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-sky block mb-2">
              Engineering Context
            </span>
            <h4 className="text-xl font-sans font-extrabold text-white mb-2">
              {hoveredTag || "Next.js"}
            </h4>
            <p className="text-frost/70 text-sm leading-relaxed mb-6">
              {hoveredTag && TECH_DETAILS[hoveredTag]
                ? TECH_DETAILS[hoveredTag]
                : "Active production skill utilized across commercial client delivery, responsive UI architecture, and robust application flows."}
            </p>

            <div className="pt-4 border-t border-sky/10 flex items-center justify-between text-xs text-sky font-mono">
              <span>Status: Active in Production</span>
              <span>✦ Real Application</span>
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
