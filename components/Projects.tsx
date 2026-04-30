import { data } from "@/data";
import Reveal from "./Reveal";
import Link from "next/link";

export default function Projects({ page }: { page: string }) {
  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="max-w-4xl mx-auto">
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
          {page === "projects"
            ? data.projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="project-card relative p-6 rounded-2xl bg-midnight/70 border border-sky/10 backdrop-blur-sm overflow-hidden">
                    {/* top glow bar — rendered via CSS ::before */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="font-sans font-bold text-white text-base leading-snug">
                        {p.title}
                      </h3>
                      <span className="shrink-0 text-xs text-sky border border-sky/20 bg-sky/10 px-2.5 py-1 rounded-full">
                        {p.period}
                      </span>
                    </div>
                    <p className="text-frost/60 text-sm leading-6 mb-4">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-xs bg-azure/10 border border-azure/20 text-sky font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-sky text-xs border-b border-sky/30 hover:border-sky transition-colors duration-200"
                      >
                        🔗 View Application →
                      </a>
                    )}
                  </div>
                </Reveal>
              ))
            : data.projects.slice(0, 4).map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="project-card relative p-6 rounded-2xl bg-midnight/70 border border-sky/10 backdrop-blur-sm overflow-hidden">
                    {/* top glow bar — rendered via CSS ::before */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="font-sans font-bold text-white text-base leading-snug">
                        {p.title}
                      </h3>
                      <span className="shrink-0 text-xs text-sky border border-sky/20 bg-sky/10 px-2.5 py-1 rounded-full">
                        {p.period}
                      </span>
                    </div>
                    <p className="text-frost/60 text-sm leading-6 mb-4">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-xs bg-azure/10 border border-azure/20 text-sky font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link && (
                      <Link
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-sky text-xs border-b border-sky/30 hover:border-sky transition-colors duration-200"
                      >
                        🔗 View Application →
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
        </div>
        {page !== "projects" && (
          <Reveal delay={500}>
            <div className="text-center mt-10">
              <a
                href="/projects"
                className="inline-block text-sm text-sky border border-sky/30 rounded px-4 py-2 hover:bg-sky/10 transition-colors duration-200"
              >
                View All Projects →
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
