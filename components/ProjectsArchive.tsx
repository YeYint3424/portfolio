"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Trophy } from "lucide-react";
import { data, type Project } from "@/data";

function milestoneFor(journeyId: string) {
  return data.journey.find((m) => m.id === journeyId);
}

export default function ProjectsArchive() {
  return (
    <div className="relative">
      {data.projects.map((project, i) => (
        <StackSection key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}

function StackSection({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const milestone = milestoneFor(project.journeyId);

  return (
    <div ref={ref} className="relative h-auto md:h-[140vh] px-6">
      <motion.div
        style={reduceMotion ? undefined : { scale, opacity, y, zIndex: 10 + index }}
        className="stack-card relative md:sticky md:top-24 max-w-4xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 mb-10 md:mb-0"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <span className="text-sky/25 font-sans font-extrabold text-5xl sm:text-6xl leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="shrink-0 text-xs text-sky border border-sky/20 bg-sky/10 px-2.5 py-1 rounded-full mt-2">
            {project.period}
          </span>
        </div>

        <h3
          className="font-sans font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}
        >
          {project.title}
        </h3>
        {project.team && <p className="text-sky/70 text-xs mb-4">{project.team}</p>}

        <p className="text-frost/65 text-sm leading-7 mb-6 max-w-2xl">
          {project.summary}
        </p>

        {project.achievement && (
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-lg border border-sky/30 bg-gradient-to-r from-sky/10 to-transparent">
            <Trophy className="w-4 h-4 text-sky" strokeWidth={1.6} />
            <span className="text-sky text-xs font-semibold tracking-wide">
              {project.achievement}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.stack.map((t) => (
            <span key={t} className="tag-muted px-2.5 py-1 rounded text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-br from-azure to-deep text-white font-semibold text-sm border border-sky/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            View Project →
          </Link>
          {milestone && (
            <Link
              href={`/about#${milestone.id}`}
              className="text-xs text-ice/50 border-b border-ice/20 hover:text-sky hover:border-sky transition-colors duration-200"
            >
              Part of: {milestone.title} · {milestone.range}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
