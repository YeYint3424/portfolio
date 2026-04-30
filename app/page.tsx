import Snow from "@/components/Snow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
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
        <Hero />

        <div className="ice-divider" />
        <Skills />

        <div className="ice-divider" />
        <Projects />

        <div className="ice-divider" />
        <Certifications />

        <div className="ice-divider" />
        <Contact />

        <footer className="text-center py-8 text-frost/25 text-xs border-t border-sky/8">
          Crafted by{" "}
          <span className="text-sky">Ye Yint Myint Myat</span> · Frontend
          Developer · Yangon, Myanmar · 2025
        </footer>
      </div>
    </>
  );
}
