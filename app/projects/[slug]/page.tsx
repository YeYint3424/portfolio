import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Snow from "@/components/Snow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { data, type Project, type ProjectFeatureGroup } from "@/data";
import { Trophy } from "lucide-react";

function getProject(slug: string) {
  return data.projects.find((p) => p.slug === slug);
}

function isGroupedFeatures(
  features: NonNullable<Project["features"]>,
): features is ProjectFeatureGroup[] {
  return typeof features[0] === "object";
}

export function generateStaticParams() {
  return data.projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ye Yint Myint Myat`,
    description: project.summary,
  };
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = data.projects.findIndex((p) => p.slug === project.slug);
  const total = data.projects.length;
  const prev = data.projects[(index - 1 + total) % total];
  const next = data.projects[(index + 1) % total];
  const milestone = data.journey.find((m) => m.id === project.journeyId);

  return (
    <>
      <Snow />

      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(14,165,233,0.1)",
          filter: "blur(100px)",
          top: -100,
          left: -150,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(56,189,248,0.07)",
          filter: "blur(100px)",
          bottom: "10%",
          right: -100,
        }}
      />

      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />

        <article className="relative px-6 pt-32 pb-24">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <Link
                href="/projects"
                className="inline-block text-xs text-sky/70 hover:text-sky mb-8 transition-colors duration-200"
              >
                ← Back to Projects
              </Link>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs text-sky border border-sky/20 bg-sky/10 px-2.5 py-1 rounded-full">
                  {project.period}
                </span>
                {project.team && (
                  <span className="text-xs text-ice/50">{project.team}</span>
                )}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1
                className="font-sans font-extrabold text-white tracking-tight mb-8"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
              >
                {project.title}
              </h1>
            </Reveal>

            {project.achievement && (
              <Reveal delay={200}>
                <div className="inline-flex items-center gap-2 mb-8 px-3 py-2.5 rounded-lg border border-sky/30 bg-gradient-to-r from-sky/10 to-transparent">
                  <Trophy className="w-4 h-4 text-sky shrink-0" strokeWidth={1.6} />
                  <span className="text-sky text-xs font-semibold tracking-wide">
                    {project.achievement}
                  </span>
                </div>
              </Reveal>
            )}

            <Section title="Overview" delay={250}>
              <p className="text-frost/70 text-sm leading-7">{project.overview}</p>
            </Section>

            <Section title="My Contribution" delay={300}>
              <p className="text-frost/70 text-sm leading-7">
                {project.contribution}
              </p>
            </Section>

            <Section title="Technologies" delay={350}>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span key={t} className="tag-muted px-2.5 py-1 rounded text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            {project.features && (
              <Section title="Features" delay={400}>
                {isGroupedFeatures(project.features) ? (
                  <div className="flex flex-col gap-5">
                    {project.features.map((group) => (
                      <div key={group.group}>
                        <p className="text-sky text-xs font-semibold tracking-widest uppercase mb-2">
                          {group.group}
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="text-frost/65 text-sm leading-6 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-sky/40"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="flex flex-col gap-1.5">
                    {(project.features as string[]).map((item) => (
                      <li
                        key={item}
                        className="text-frost/65 text-sm leading-6 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-sky/40"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </Section>
            )}

            {milestone && (
              <Section title="Development Journey" delay={450}>
                <Link
                  href={`/about#${milestone.id}`}
                  className="inline-flex flex-col gap-1 glass-panel rounded-xl px-5 py-4 hover:border-sky/30 transition-colors duration-200"
                >
                  <span className="text-sky/60 text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
                    {milestone.range}
                  </span>
                  <span className="text-frost text-sm font-semibold">
                    {milestone.title} — {milestone.org}
                  </span>
                  <span className="text-sky text-xs mt-1">
                    View on Tech Journey →
                  </span>
                </Link>
              </Section>
            )}

            <Section title="Screenshots" delay={500}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PhotoPlaceholder
                  label={`PROJECT SCREENSHOT — ${project.title.toUpperCase()}`}
                />
                <PhotoPlaceholder
                  label={`PROJECT SCREENSHOT — ${project.title.toUpperCase()}`}
                />
              </div>
            </Section>

            <Reveal delay={550}>
              <div className="ice-divider w-full mt-4 mb-10" />
            </Reveal>

            <Reveal delay={600}>
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={`/projects/${prev.slug}`}
                  className="text-xs text-ice/50 hover:text-sky transition-colors duration-200"
                >
                  ← {prev.title}
                </Link>
                <Link
                  href={`/projects/${next.slug}`}
                  className="text-xs text-ice/50 hover:text-sky transition-colors duration-200 text-right"
                >
                  {next.title} →
                </Link>
              </div>
            </Reveal>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}

function Section({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className="mb-10">
      <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-3">
        {title}
      </p>
      {children}
    </Reveal>
  );
}
