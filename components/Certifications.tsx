"use client";

import { data } from "@/data";
import { GraduationCap, CheckCircle } from "lucide-react";
import SectionTransition from "./SectionTransition";

export default function Certifications() {
  return (
    <SectionTransition id="certifications" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Academic &amp; Professional Verification
          </p>
          <h2
            className="font-sans font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", textWrap: "balance" }}
          >
            Education &amp; Credentials
          </h2>
        </div>

        {/* 2-Column: Formal College Degree + Professional Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formal College Degree Card */}
          <div className="lg:col-span-5 p-7 rounded-2xl glass-panel border border-sky/20 bg-midnight/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-azure to-deep flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[0.68rem] font-mono tracking-widest text-sky uppercase block mb-1">
                Formal Degree Study
              </span>
              <h3 className="text-xl font-sans font-bold text-white mb-1">
                {data.education.major}
              </h3>
              <p className="text-frost/70 text-sm font-medium mb-4">
                {data.education.school}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-sky/90 mb-6">
                <span>{data.education.period}</span>
                <span aria-hidden="true" className="text-frost/30">·</span>
                <span>Active Enrollment</span>
              </div>
            </div>

            <p className="text-xs text-frost/60 leading-relaxed border-t border-sky/10 pt-4">
              Advancing core computer science foundations, algorithms, data structures, and software engineering methodologies alongside real commercial development.
            </p>
          </div>

          {/* Professional Certifications List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.certifications.map((c) => (
              <div
                key={c.name}
                className="p-5 rounded-2xl glass-panel border border-sky/15 hover:border-sky/35 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-sky/10 border border-sky/20 flex items-center justify-center text-base shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-bold text-white leading-snug">
                      {c.name}
                    </h4>
                    <p className="text-xs text-sky/80 mt-0.5">{c.org}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[0.7rem] text-frost/50 pt-3 border-t border-sky/10 font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-sky" />
                  <span>Credential Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
