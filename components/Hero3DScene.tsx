"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

// Lazy-load the React Three Fiber Canvas with SSR disabled for optimal Core Web Vitals
const HeroCanvas3D = dynamic(() => import("./HeroCanvas3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] rounded-3xl border border-sky/20 bg-midnight/80 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full border border-sky/30 bg-sky/10 flex items-center justify-center text-sky animate-pulse mb-3">
        <Sparkles className="w-5 h-5" />
      </div>
      <p className="text-xs font-mono text-sky tracking-wider uppercase">
        Initializing 3D Core...
      </p>
    </div>
  ),
});

export default function Hero3DScene() {
  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl p-2 glass-panel border border-sky/20 shadow-[0_20px_50px_rgba(3,105,161,0.2)] overflow-hidden">
      <HeroCanvas3D />
    </div>
  );
}
