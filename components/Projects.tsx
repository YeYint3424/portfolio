import { data } from "@/data";
import Reveal from "./Reveal";
import Link from "next/link";

export default function Projects() {
  const preview = data.projects.slice(-4).reverse();

  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Work &amp; Experience
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-10"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            Projects
          </h2>
        </Reveal>

        <div className="flex flex-col gap-5">
          {preview.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/projects/${p.slug}`}
                className="project-card relative block p-6 rounded-2xl glass-panel overflow-hidden"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-sans font-bold text-white text-base leading-snug">
                    {p.title}
                  </h3>
                  <span className="shrink-0 text-xs text-sky border border-sky/20 bg-sky/10 px-2.5 py-1 rounded-full">
                    {p.period}
                  </span>
                </div>
                <p className="text-frost/60 text-sm leading-6 mb-4">
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="tag-muted px-2 py-0.5 rounded text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-block mt-4 text-sky text-xs border-b border-sky/30">
                  View Project →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-block text-sm text-sky border border-sky/30 rounded px-4 py-2 hover:bg-sky/10 transition-colors duration-200"
            >
              View All Projects →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
