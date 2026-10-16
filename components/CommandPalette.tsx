"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  FolderGit2,
  Compass,
  FileText,
  Copy,
  X,
  Sparkles,
} from "lucide-react";
import { data } from "@/data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    {
      id: "projects",
      name: "View All Projects",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-sky" />,
      action: () => {
        router.push("/projects");
        onClose();
      },
    },
    {
      id: "about",
      name: "About & Tech Journey",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-sky" />,
      action: () => {
        router.push("/about");
        onClose();
      },
    },
    {
      id: "resume",
      name: "Download PDF Resume",
      category: "Actions",
      icon: <FileText className="w-4 h-4 text-sky" />,
      action: () => {
        window.open("/docs/Ye_Yint_Myint_Myat.pdf", "_blank");
        onClose();
      },
    },
    {
      id: "copy-email",
      name: copied ? "Copied to clipboard!" : `Copy Email (${data.email})`,
      category: "Actions",
      icon: copied ? <Sparkles className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky" />,
      action: copyEmail,
    },
    ...data.projects.map((p) => ({
      id: p.slug,
      name: p.title,
      category: "Project Case Studies",
      icon: <Code2 className="w-4 h-4 text-sky" />,
      action: () => {
        router.push(`/projects/${p.slug}`);
        onClose();
      },
    })),
  ];

  const filtered = query.trim() === ""
    ? actions
    : actions.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()),
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-sky/20 bg-midnight/95 shadow-[0_20px_60px_rgba(3,105,161,0.25)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-sky/10">
              <Search className="w-5 h-5 text-sky shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, project, or destination..."
                className="w-full bg-transparent text-sm text-frost placeholder:text-frost/40 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-frost/40 hover:text-white hover:bg-sky/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-sky/5">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-frost/40 text-sm">
                  No matching commands or projects found.
                </div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left hover:bg-sky/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded-md bg-sky/5 border border-sky/10 group-hover:border-sky/30 transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-frost/90 group-hover:text-white truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[0.68rem] text-sky/60 font-mono tracking-wider uppercase ml-2 shrink-0">
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer keyboard hint */}
            <div className="px-4 py-2.5 bg-midnight/60 border-t border-sky/10 flex items-center justify-between text-[0.7rem] text-frost/40 font-mono">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 rounded bg-sky/10 border border-sky/20 text-sky text-[0.65rem]">ESC</kbd> to close</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-sky/10 border border-sky/20 text-sky text-[0.65rem]">↵</kbd> to select</span>
              </div>
              <span className="text-sky/70">Ye Yint Myint Myat · Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
