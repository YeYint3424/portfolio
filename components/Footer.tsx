"use client";

import { ArrowUp } from "lucide-react";
import { data } from "@/data";
import MagneticButton from "./MagneticButton";

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/YeYint3424",
    icon: <GithubIcon size={16} />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ye.yint.myint.myat.934336",
    icon: <FacebookIcon size={16} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cznn_202/",
    icon: <InstagramIcon size={16} />,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative px-6 pt-12 pb-16 border-t border-sky/15 bg-midnight/90">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Attribution */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-sans font-bold text-white text-sm">
            {data.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-frost/30">
            ·
          </span>
          <span className="text-xs text-frost/50">
            Frontend Engineer based in Ho Chi Minh City
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-frost/30">
            ·
          </span>
          <span className="text-xs text-frost/40">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>

        {/* Right: Social Links & Scroll-to-Top Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {socialLinks.map((item) => (
              <MagneticButton key={item.label} strength={0.4}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-2.5 rounded-xl border border-sky/15 bg-sky/5 text-frost/70 hover:text-white hover:border-sky/40 hover:bg-sky/15 transition-all inline-flex items-center justify-center"
                >
                  {item.icon}
                </a>
              </MagneticButton>
            ))}
          </div>

          <MagneticButton strength={0.4}>
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="p-2.5 rounded-xl border border-sky/20 bg-sky/10 text-sky hover:bg-sky/20 transition-all inline-flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
