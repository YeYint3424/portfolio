"use client";
import Snow from "@/components/Snow";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import ProjectsArchive from "@/components/ProjectsArchive";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      {/* Fixed canvas snow layer */}
      <Snow />

      {/* Background glow blobs */}
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
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(3,105,161,0.14)",
          filter: "blur(90px)",
          top: "40%",
          left: "30%",
        }}
      />

      {/* Actual content sits above z-index 2 */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />

        <section className="relative px-6 pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
                Work &amp; Experience
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1
                className="font-sans font-extrabold text-white tracking-tight mb-5"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
              >
                The Technology Archive
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-frost/60 text-sm leading-7 max-w-2xl">
                These are the real projects that represent each stage of my
                development journey — scroll through to explore them, in the
                order they happened.
              </p>
            </Reveal>
          </div>
        </section>

        <ProjectsArchive />

        <Footer />
      </div>
    </>
  );
}
