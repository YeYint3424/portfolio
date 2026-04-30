import { data } from "@/data";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Technical Arsenal
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-sans font-extrabold text-white tracking-tight mb-10"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
            Skills &amp; Technologies
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 80}>
              <div className="h-full p-5 rounded-xl bg-midnight/80 border border-sky/10 backdrop-blur-sm hover:border-sky/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(56,189,248,0.07)] transition-all duration-300">
                <p className="text-sky text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs bg-sky/8 border border-sky/15 text-ice hover:bg-sky/20 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
