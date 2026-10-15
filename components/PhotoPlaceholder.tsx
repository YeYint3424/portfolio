"use client";

import { ImagePlus } from "lucide-react";

interface Props {
  label: string;
  aspect?: string;
  className?: string;
}

export default function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: Props) {
  return (
    <div
      className={`placeholder-frame rounded-2xl ${aspect} flex flex-col items-center justify-center gap-3 px-6 text-center ${className}`}
    >
      <ImagePlus className="placeholder-icon w-7 h-7 text-sky" strokeWidth={1.4} />
      <p className="text-ice/40 text-[0.65rem] font-semibold tracking-[0.15em] uppercase">
        [{label}]
      </p>
      <span className="text-sky/50 text-[0.6rem] tracking-widest uppercase">
        + Add photo
      </span>
    </div>
  );
}
