"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import CommandPalette from "./CommandPalette";

const navLinks = [
  { href: "/#projects", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/about#tech-journey", label: "Journey" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-midnight/80 backdrop-blur-xl border-b border-sky/15 shadow-[0_4px_30px_rgba(3,105,161,0.12)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="text-base sm:text-lg font-sans font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group flex items-center gap-2"
          >
            <span className="shimmer-text">Ye Yint Myint Myat</span>
          </Link>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-frost/70">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/about" && pathname === "/about") ||
                (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive ? "text-white" : "hover:text-sky"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-sky rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + command palette shortcut */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open Command Menu"
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-sky/20 bg-sky/5 hover:bg-sky/10 text-xs text-frost/70 hover:text-sky transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-sky" />
              <span className="font-mono text-[0.68rem] tracking-wider text-sky/80">⌘K</span>
            </button>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-azure to-deep rounded-lg border border-sky/30 shadow-[0_0_20px_rgba(14,165,233,0.25)] hover:shadow-[0_0_30px_rgba(14,165,233,0.45)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-frost/80 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-midnight/95 backdrop-blur-2xl border-b border-sky/15 px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-frost/90 hover:text-sky transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-sky/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setPaletteOpen(true);
                }}
                className="inline-flex items-center gap-2 text-xs text-sky py-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Projects (⌘K)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
