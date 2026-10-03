import Reveal from "./Reveal";

const EVOLUTION = [
  { year: "2022", label: "Programming Fundamentals" },
  { year: "2022 – 2023", label: "Java" },
  { year: "2023", label: "Frontend / UI Design" },
  { year: "2023", label: "React" },
  { year: "2024 – Present", label: "Professional Web Development" },
];

export default function TechEvolution() {
  return (
    <section className="relative px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2 text-center">
            Technology Evolution
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-14 text-center"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)" }}
          >
            A system, still compiling
          </h2>
        </Reveal>

        <div className="relative flex flex-col items-center">
          <div className="timeline-track absolute top-2 bottom-2 left-1/2 -translate-x-1/2" />

          {EVOLUTION.map((node, i) => (
            <Reveal key={node.label} delay={i * 100} className="w-full">
              <div className="relative flex flex-col items-center text-center py-5">
                <span className="timeline-dot active relative z-10 w-2.5 h-2.5 mb-3" />
                <span className="text-sky/60 text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-1">
                  {node.year}
                </span>
                <span className="text-frost text-sm sm:text-base font-semibold">
                  {node.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
