import { data } from "@/data";
import Image from "next/image";
import profile from "@/assets/imgs/yeyintmyintmyat-business-profile.png";
import Link from "next/link";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <Reveal>
      <section
        id="about"
        className="max-w-6xl min-h-screen flex justify-evenly items-center w-full mx-auto"
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row justify-evenly items-center gap-12">
          {/* Avatar */}
          <div className="flex-shrink-0 relative w-60 h-60 float-anim">
            <div className="avatar-glow" />
            <div className="absolute inset-[1px] rounded-full bg-midnight flex items-center justify-center text-5xl">
              <Image
                src={profile}
                alt="Avatar"
                width={240}
                height={240}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col items-start">
            {/* Available badge */}
            <div className="hero-anim-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky/30 bg-sky/8 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky dot-pulse" />
              <span className="text-sky text-xs tracking-widest font-semibold uppercase">
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              className="hero-anim-2 font-sans font-extrabold leading-none tracking-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}
            >
              <span className="shimmer-text">{data.name}</span>
              <span
                className="block mt-2 font-sans font-semibold text-ice/40 tracking-normal"
                style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}
              >
                {data.role}
              </span>
            </h1>

            {/* Desc */}
            <p className="hero-anim-3 text-frost/60 text-base leading-7 max-w-xl mb-8">
              {data.objective}
            </p>

            {/* CTAs */}
            <div className="hero-anim-4 flex gap-3 flex-wrap">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-br from-azure to-deep text-white font-semibold text-sm border border-sky/30 shadow-[0_0_28px_rgba(14,165,233,0.22)] hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 transition-all duration-200"
              >
                ✦ View Projects
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-ice/20 text-ice font-semibold text-sm hover:border-sky hover:bg-sky/6 transition-all duration-200"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
