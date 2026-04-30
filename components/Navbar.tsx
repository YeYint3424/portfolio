"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-midnight/70 backdrop-blur-xl border-b border-sky/10"
          : "bg-transparent"
      }`}
    >
      <span className="font-syne font-extrabold text-base tracking-tight bg-gradient-to-r from-white to-sky bg-clip-text text-transparent select-none">
        YYММ
      </span>
      <div className="hidden sm:flex gap-7">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-ice/70 hover:text-sky text-sm font-medium tracking-wide transition-colors duration-200"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
