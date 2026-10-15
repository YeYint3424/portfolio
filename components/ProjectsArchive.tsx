"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Trophy, ArrowUpRight } from "lucide-react";
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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const milestone = milestoneFor(project.journeyId);

  return (
    <div ref={ref} className="relative h-auto md:h-[130vh] px-6">
      <motion.div
        style={reduceMotion ? undefined : { scale, opacity, y, zIndex: 10 + index }}
        className="stack-card relative md:sticky md:top-24 max-w-4xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 mb-10 md:mb-0 border border-sky/20 bg-midnight/90"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <span className="text-sky/25 font-sans font-extrabold text-5xl sm:text-6xl leading-none select-none tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-sky mt-2">
            <span>{project.period}</span>
            {project.team && (
              <>
                <span aria-hidden="true" className="text-frost/30">·</span>
                <span className="text-frost/50">{project.team}</span>
              </>
            )}
          </div>
        </div>

        <h3
          className="font-sans font-extrabold text-white leading-tight mb-2"
          style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)" }}
        >
          {project.title}
        </h3>

        <p className="text-frost/70 text-sm leading-relaxed mb-6 max-w-2xl">
          {project.summary}
        </p>

        {project.achievement && (
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg border border-sky/30 bg-sky/10">
            <Trophy className="w-4 h-4 text-sky" strokeWidth={1.6} />
            <span className="text-sky text-xs font-semibold">
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

        <div className="pt-6 border-t border-sky/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-azure to-deep text-white font-semibold text-sm border border-sky/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Read Complete Case Study</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          {milestone && (
            <Link
              href={`/about#${milestone.id}`}
              className="text-xs text-frost/60 hover:text-sky transition-colors duration-200"
            >
              Milestone: {milestone.title} ({milestone.range}) →
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
