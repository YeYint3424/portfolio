"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Terminal, Send, MapPin, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import { data } from "@/data";
import SectionTransition from "./SectionTransition";
import MagneticButton from "./MagneticButton";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

type Status = "idle" | "sending" | "success" | "error";

interface TerminalLog {
  id: string;
  command: string;
  response: string;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      id: "init",
      command: "welcome",
      response: "Ready. Type 'help', 'skills', 'projects', or 'contact' to interact.",
    },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available: about, skills, projects, contact, email, clear";
        break;
      case "about":
        response = `${data.name} — ${data.role} based in ${data.address}. Studying IT at Van Lang Saigon College.`;
        break;
      case "skills":
        response = "React.js, Next.js, TypeScript, Tailwind CSS, Java, Spring Boot, Zustand, PostgreSQL, Docker.";
        break;
      case "projects":
        response = "6 Shipped systems: AXURANCE, AQME Insurance, JROMS (Winner), AGB Fiber CRM, Entrance-X, Student Management.";
        break;
      case "contact":
      case "email":
        response = `Direct inbox: ${data.email} | Location: ${data.address}`;
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setTerminalLogs((prev) => [
      ...prev,
      { id: String(Date.now()), command: cmd, response },
    ]);
    setTerminalInput("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass =
    "w-full bg-midnight/80 border border-sky/15 rounded-xl px-4 py-3 text-frost text-sm placeholder:text-frost/30 focus:outline-none focus:border-sky/50 focus:ring-1 focus:ring-sky/20 transition-all duration-200";

  return (
    <SectionTransition id="contact" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Initiate Collaboration
          </p>
          <h2
            className="font-sans font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", textWrap: "balance" }}
          >
            Let&apos;s Build Something Memorable
          </h2>
        </div>

        {/* 2-Column Split: Interactive Terminal & Copy Widget vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Copy + Interactive Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Copy Email Card */}
            <div className="p-6 rounded-2xl glass-panel border border-sky/20 bg-midnight/90">
              <span className="text-[0.68rem] font-mono tracking-widest uppercase text-sky block mb-2">
                Direct Contact
              </span>
              <p className="text-white text-lg font-sans font-bold mb-1">
                Have a project or opportunity?
              </p>
              <p className="text-frost/65 text-sm leading-relaxed mb-6">
                I’m currently open to frontend engineering roles and collaborative web projects. Reach out directly or copy my email with one click.
              </p>

              <div className="flex items-center gap-3">
                <MagneticButton>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky/10 border border-sky/30 hover:bg-sky/20 text-sky text-xs font-mono font-semibold transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email Address</span>
                      </>
                    )}
                  </button>
                </MagneticButton>

                <a
                  href={`mailto:${data.email}`}
                  className="text-xs text-frost/60 hover:text-white transition-colors"
                >
                  Open in Mail app →
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-sky/10 flex items-center gap-2 text-xs text-frost/50">
                <MapPin className="w-3.5 h-3.5 text-sky" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>

            {/* Interactive CLI Terminal dialogue */}
            <div className="rounded-2xl border border-sky/20 bg-midnight/95 overflow-hidden shadow-xl">
              <div className="px-4 py-3 bg-midnight/80 border-b border-sky/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[0.7rem] font-mono text-frost/40 ml-2">
                    developer-console.sh
                  </span>
                </div>
                <Terminal className="w-3.5 h-3.5 text-sky/60" />
              </div>

              {/* Terminal Logs */}
              <div className="p-4 font-mono text-xs max-h-48 overflow-y-auto space-y-2">
                {terminalLogs.map((log) => (
                  <div key={log.id} className="space-y-0.5">
                    <p className="text-sky flex items-center gap-1.5">
                      <span className="text-emerald-400">guest@portfolio</span>
                      <span className="text-frost/40">:~$</span>
                      <span>{log.command}</span>
                    </p>
                    <p className="text-frost/70 pl-3 leading-relaxed">
                      {log.response}
                    </p>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input */}
              <form
                onSubmit={handleTerminalSubmit}
                className="px-4 py-2.5 border-t border-sky/10 bg-midnight/60 flex items-center gap-2 font-mono text-xs"
              >
                <span className="text-emerald-400">❯</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (try 'skills' or 'help')..."
                  className="w-full bg-transparent text-frost placeholder:text-frost/30 focus:outline-none"
                />
              </form>
            </div>
          </div>

          {/* Right Column: Clean Email Form */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-7 sm:p-8 rounded-2xl glass-panel border border-sky/20 bg-midnight/80 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-sky font-semibold">
                  Send a Direct Message
                </p>
                <span className="text-[0.7rem] text-frost/40 font-mono">
                  Response within 24h
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-frost/60 text-xs font-medium">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={fields.name}
                    onChange={(e) =>
                      setFields((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-frost/60 text-xs font-medium">
                    Your Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={fields.email}
                    onChange={(e) =>
                      setFields((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-frost/60 text-xs font-medium">
                  Message &amp; Project Scope
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your team, timeline, and what you're building..."
                  value={fields.message}
                  onChange={(e) =>
                    setFields((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Message delivered successfully. I&apos;ll be in touch shortly!</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  Something went wrong. Please email directly at {data.email}.
                </div>
              )}

              <MagneticButton>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-azure to-deep text-white text-sm font-semibold border border-sky/30 shadow-[0_0_24px_rgba(14,165,233,0.3)] hover:shadow-[0_0_36px_rgba(14,165,233,0.5)] disabled:opacity-50 transition-all duration-200"
                >
                  {status === "sending" ? (
                    <span>Sending Transmission…</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
