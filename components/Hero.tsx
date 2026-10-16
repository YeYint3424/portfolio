"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import profile from "@/assets/imgs/yeyint-light.jpg";
import { data } from "@/data";
import MagneticButton from "./MagneticButton";
import SectionTransition from "./SectionTransition";

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / width) * 100,
      y: (y / height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const kpis = [
    { label: "Production Experience", val: "02+ Yrs" },
    { label: "Shipped Systems", val: "06 Projects" },
    { label: "OJT Project Winner", val: "100% Team" },
    { label: "Current Institution", val: "Van Lang Saigon" },
  ];

  return (
    <SectionTransition
      id="hero"
      direction="none"
      className="relative min-h-[92vh] flex flex-col justify-center max-w-6xl mx-auto pt-28 pb-16"
    >
      {/* 2-Column Desktop Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
        {/* Left Column: Typography & Intent */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Unboxed Metadata Kicker */}
          <div className="flex items-center gap-2 text-xs font-medium text-sky/90 tracking-wide uppercase mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky" />
              <span>Ho Chi Minh City, Vietnam</span>
            </span>
            <span aria-hidden="true" className="text-frost/30">·</span>
            <span>Available for Opportunities</span>
          </div>

          {/* Display Headline */}
          <h1
            className="font-sans font-extrabold text-white tracking-tight leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", textWrap: "balance" }}
          >
            Crafting Fluid, High-Performance Web Applications.
          </h1>

          {/* Lead Narrative Body */}
          <p className="text-frost/70 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            I’m <strong className="text-white font-semibold">{data.name}</strong>, a Frontend Engineer specializing in{" "}
            <span className="text-sky font-medium">React, Next.js, and TypeScript</span>. From mobile-first production insurance platforms (AXURANCE & AQME) to multi-role enterprise systems, I bridge modern UI design with resilient architecture.
          </p>

          {/* Action Row with Magnetic Physics */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-azure to-deep text-white font-semibold text-sm border border-sky/30 shadow-[0_0_32px_rgba(14,165,233,0.3)] hover:shadow-[0_0_48px_rgba(14,165,233,0.5)] transition-all duration-200"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="w-4 h-4 text-sky" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/docs/Ye_Yint_Myint_Myat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-sky/20 bg-midnight/80 hover:bg-sky/10 text-frost text-sm font-semibold hover:border-sky/40 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-sky" />
                <span>Download CV</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-frost/70 hover:text-white text-sm font-medium transition-colors"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: 3D Perspective Tilt Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-72 sm:w-80 h-[380px] rounded-3xl p-3 glass-panel border border-sky/20 shadow-[0_20px_50px_rgba(3,105,161,0.2)] group cursor-pointer"
          >
            {/* Dynamic Glare Overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(56,189,248,0.35) 0%, transparent 65%)`,
              }}
            />

            {/* Inner Portrait Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-midnight/90 border border-sky/10">
              <Image
                src={profile}
                alt="Ye Yint Myint Myat - Frontend Developer"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Contrast Scrim for Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />

              {/* Bottom Card Identity Details */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-10">
                <span className="text-[0.7rem] uppercase tracking-widest text-sky font-semibold">
                  Frontend Engineer
                </span>
                <p className="text-white font-sans font-bold text-lg leading-tight">
                  {data.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-frost/60 mt-0.5">
                  <span>Van Lang Saigon IT</span>
                  <span aria-hidden="true">·</span>
                  <span>D3-SG Outsourcing</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width 4-Column KPI strip below the split */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-midnight/60 border border-sky/10 backdrop-blur-md">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex flex-col gap-1">
            <span className="text-xl sm:text-2xl font-sans font-extrabold text-white tracking-tight tabular-nums">
              {kpi.val}
            </span>
            <span className="text-xs text-frost/50 font-medium">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>
    </SectionTransition>
  );
}
