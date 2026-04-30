"use client";
import Snow from "@/components/Snow";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

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

        <Projects page="projects" />

        <Footer />
      </div>
    </>
  );
}
