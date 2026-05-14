"use client";

import { sendGTMEvent } from "@/lib/gtm";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackNavClick = (label: string, href: string) => {
    sendGTMEvent({
      event: "navbar_click",
      link_name: label,
      link_url: href,
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-midnight/70 backdrop-blur-xl border-b border-sky/10"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        onClick={() =>
          sendGTMEvent({
            event: "logo_click",
          })
        }
        className="font-sans font-extrabold text-base tracking-tight bg-gradient-to-r from-white to-sky bg-clip-text text-transparent select-none"
      >
        YYММ
      </Link>

      <div className="flex gap-7">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => trackNavClick(l.label, l.href)}
            className="text-ice/70 hover:text-sky text-sm font-medium tracking-wide transition-colors duration-200"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
