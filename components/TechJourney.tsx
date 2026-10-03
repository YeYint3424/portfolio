"use client";

import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { data, type JourneyMilestone } from "@/data";
import PhotoPlaceholder from "./PhotoPlaceholder";
import Reveal from "./Reveal";

function projectTitle(slug: string) {
  return data.projects.find((p) => p.slug === slug)?.title ?? slug;
}

export default function TechJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="tech-journey" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            The Story
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            My Tech Journey
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-frost/60 text-sm leading-7 max-w-2xl mb-16">
            This isn&apos;t a list of technologies. It&apos;s how I became a
            developer — one stage at a time.
          </p>
        </Reveal>

        <div ref={containerRef} className="relative">
          <div className="timeline-track absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            className="timeline-progress absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2"
            style={{
              height: "100%",
              scaleY: reduceMotion ? 1 : scrollYProgress,
            }}
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {data.journey.map((milestone, i) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                index={i}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  index,
  reduceMotion,
}: {
  milestone: JourneyMilestone;
  index: number;
  reduceMotion: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <div id={milestone.id} className="relative pl-12 md:pl-0 scroll-mt-28">
      <motion.span
        className="absolute left-4 top-2 w-3 h-3 -translate-x-1/2 rounded-full border md:left-1/2"
        initial={{
          backgroundColor: "rgba(6,24,39,1)",
          borderColor: "rgba(186,230,253,0.3)",
          boxShadow: "0 0 0px rgba(56,189,248,0)",
        }}
        whileInView={{
          backgroundColor: "rgba(56,189,248,1)",
          borderColor: "rgba(56,189,248,1)",
          boxShadow: "0 0 16px rgba(56,189,248,0.75)",
        }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: reduceMotion ? 0 : 0.4 }}
      />

      <motion.div
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 32, filter: "blur(6px)" }
        }
        whileInView={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`glass-panel rounded-2xl p-6 sm:p-8 md:w-[46%] ${
          isEven ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs text-sky border border-sky/20 bg-sky/8 px-2.5 py-1 rounded-full font-medium">
            {milestone.range}
          </span>
          <span className="text-ice/40 text-[0.65rem] tracking-[0.2em] uppercase font-semibold">
            {milestone.kicker}
          </span>
        </div>

        <h3 className="font-sans font-bold text-white text-lg leading-snug mb-1">
          {milestone.title}
        </h3>
        <p className="text-sky/70 text-xs mb-4">{milestone.org}</p>

        <p className="text-frost/65 text-sm leading-7 mb-5">
          {milestone.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {milestone.focus.map((f) => (
            <span key={f} className="tag-muted px-2.5 py-1 rounded text-xs">
              {f}
            </span>
          ))}
        </div>

        {milestone.achievement && (
          <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-lg border border-sky/30 bg-gradient-to-r from-sky/10 to-transparent">
            <Trophy className="w-4 h-4 text-sky shrink-0" strokeWidth={1.6} />
            <span className="text-sky text-xs font-semibold tracking-wide">
              {milestone.achievement}
            </span>
          </div>
        )}

        <PhotoPlaceholder label={milestone.photoLabel} className="mb-5" />

        {milestone.projectSlugs && milestone.projectSlugs.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {milestone.projectSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="inline-flex items-center gap-1 text-xs text-sky border-b border-sky/30 hover:border-sky transition-colors duration-200"
              >
                → {projectTitle(slug)}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
