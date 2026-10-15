"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Trophy, ArrowUpRight, Layers, Eye, X, CheckCircle2 } from "lucide-react";
import { data, type Project } from "@/data";
import SectionTransition from "./SectionTransition";

type FilterType = "all" | "production" | "award" | "fullstack";

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = data.projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "production") return p.slug === "axurance-insurance" || p.slug === "aqme-insurance";
    if (filter === "award") return Boolean(p.achievement);
    if (filter === "fullstack") return p.slug === "agb-fiber-crm" || p.slug === "jroms";
    return true;
  });

  return (
    <SectionTransition id="projects" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky mb-2">
              <span>Selected Works</span>
              <span aria-hidden="true" className="text-frost/30">·</span>
              <span>2022 – Present</span>
            </div>
            <h2
              className="font-sans font-extrabold text-white tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", textWrap: "balance" }}
            >
              Engineered for Production &amp; Scale
            </h2>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-midnight/90 border border-sky/15 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: "all", label: "All Works" },
              { id: "production", label: "Production Apps" },
              { id: "award", label: "Award Winner" },
              { id: "fullstack", label: "Full-Stack" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as FilterType)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? "bg-sky/20 text-white border border-sky/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "text-frost/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onQuickView={() => setActiveModalProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Callout to Full Archive */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl glass-panel border border-sky/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-sans font-bold text-white mb-1">
              Looking for the complete chronological catalog?
            </h3>
            <p className="text-frost/60 text-sm">
              Explore all 6 deployed systems with full architectural breakdowns and feature trees.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-sky/30 bg-sky/10 hover:bg-sky/20 text-sky text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>The Technology Archive</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick View Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-midnight/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-sky/20 bg-midnight/95 p-6 sm:p-8 shadow-[0_24px_80px_rgba(3,105,161,0.35)] z-10"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-sky font-mono mb-1">
                    <span>{activeModalProject.period}</span>
                    {activeModalProject.team && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{activeModalProject.team}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-lg text-frost/50 hover:text-white hover:bg-sky/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeModalProject.achievement && (
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-lg border border-sky/30 bg-sky/10">
                  <Trophy className="w-4 h-4 text-sky" />
                  <span className="text-xs font-semibold text-sky">
                    {activeModalProject.achievement}
                  </span>
                </div>
              )}

              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest text-sky/80 font-bold mb-1.5">
                    Overview
                  </p>
                  <p className="text-frost/80 leading-relaxed">
                    {activeModalProject.overview}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-sky/80 font-bold mb-1.5">
                    My Architectural Contribution
                  </p>
                  <p className="text-frost/80 leading-relaxed">
                    {activeModalProject.contribution}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-sky/80 font-bold mb-2">
                    Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs bg-sky/10 border border-sky/20 text-ice"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-sky/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="text-xs text-frost/60 hover:text-white transition-colors"
                >
                  Close Preview
                </button>
                <Link
                  href={`/projects/${activeModalProject.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky/20 hover:bg-sky/30 text-white text-xs font-semibold border border-sky/40 transition-colors"
                >
                  <span>Full Project Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionTransition>
  );
}

function ProjectCard({
  project,
  index,
  onQuickView,
}: {
  project: Project;
  index: number;
  onQuickView: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / width) * 100,
      y: (y / height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="group relative rounded-2xl glass-panel border border-sky/15 p-6 sm:p-7 flex flex-col justify-between hover:border-sky/40 hover:shadow-[0_16px_40px_rgba(14,165,233,0.12)] transition-colors duration-300"
    >
      {/* Specular Radial Glare */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(56,189,248,0.25) 0%, transparent 60%)`,
        }}
      />

      <div>
        {/* Unboxed Metadata: Period & Team */}
        <div className="flex items-center justify-between gap-3 text-xs text-sky font-mono mb-3">
          <span>{project.period}</span>
          {project.team && (
            <span className="text-frost/50 truncate">{project.team}</span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="font-sans font-bold text-white text-lg sm:text-xl leading-snug mb-3 group-hover:text-sky transition-colors">
          {project.title}
        </h3>

        {/* Project Summary */}
        <p className="text-frost/65 text-sm leading-relaxed mb-5">
          {project.summary}
        </p>

        {/* Achievement Callout */}
        {project.achievement && (
          <div className="inline-flex items-center gap-1.5 mb-5 text-xs text-sky font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>{project.achievement}</span>
          </div>
        )}
      </div>

      <div>
        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[0.72rem] bg-sky/5 border border-sky/15 text-ice/80"
            >
              {t}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-2 py-0.5 rounded text-[0.72rem] text-frost/40">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between pt-4 border-t border-sky/10">
          <button
            onClick={onQuickView}
            className="inline-flex items-center gap-1.5 text-xs text-frost/70 hover:text-white transition-colors py-1"
          >
            <Eye className="w-3.5 h-3.5 text-sky" />
            <span>Quick Overview</span>
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs text-sky hover:text-white font-medium group/link transition-colors"
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
