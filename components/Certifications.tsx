import { data } from "@/data";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Education
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-10"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            Certifications
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-midnight/80 border border-sky/10 hover:border-sky/35 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-azure to-deep flex items-center justify-center text-lg shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-frost text-sm font-medium leading-snug">{c.name}</p>
                  <p className="text-sky text-xs mt-0.5">{c.org}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
