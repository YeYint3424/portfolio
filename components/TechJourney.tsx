"use client";

import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ArrowUpRight } from "lucide-react";
import { data, type JourneyMilestone } from "@/data";
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
    <section id="tech-journey" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky mb-2">
            <span>Chronology</span>
            <span aria-hidden="true" className="text-frost/30">·</span>
            <span>2022 to Present</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", textWrap: "balance" }}
          >
            My Tech Journey
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-frost/65 text-base leading-relaxed max-w-2xl mb-16">
            This isn&apos;t a static resume list. It is the real narrative of how I developed into an engineer — from core Java programming logic to modern, high-concurrency React &amp; Next.js platforms.
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
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`glass-panel rounded-3xl p-6 sm:p-8 md:w-[46%] ${
          isEven ? "md:mr-auto" : "md:ml-auto"
        } border border-sky/15 hover:border-sky/35 transition-colors`}
      >
        {/* Unboxed Metadata: Date Range & Chapter Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono text-sky mb-2">
          <span>{milestone.range}</span>
          <span aria-hidden="true" className="text-frost/30">·</span>
          <span className="text-frost/50 uppercase tracking-wider text-[0.68rem]">
            {milestone.kicker}
          </span>
        </div>

        <h3 className="font-sans font-bold text-white text-xl leading-snug mb-1">
          {milestone.title}
        </h3>
        <p className="text-sky/80 text-xs font-medium mb-4">{milestone.org}</p>

        <p className="text-frost/70 text-sm leading-relaxed mb-5">
          {milestone.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {milestone.focus.map((f) => (
            <span key={f} className="tag-muted px-2.5 py-1 rounded-md text-xs">
              {f}
            </span>
          ))}
        </div>

        {milestone.achievement && (
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-lg border border-sky/30 bg-sky/10">
            <Trophy className="w-4 h-4 text-sky shrink-0" />
            <span className="text-sky text-xs font-semibold">
              {milestone.achievement}
            </span>
          </div>
        )}

        {/* Real Authenticated Milestone Photo */}
        {milestone.photo && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-sky/20 bg-midnight/80 group">
            <Image
              src={milestone.photo}
              alt={milestone.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {milestone.projectSlugs && milestone.projectSlugs.length > 0 && (
          <div className="pt-4 border-t border-sky/10 flex flex-wrap gap-x-4 gap-y-2">
            {milestone.projectSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="inline-flex items-center gap-1 text-xs text-sky hover:text-white transition-colors"
              >
                <span>{projectTitle(slug)}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
