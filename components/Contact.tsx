"use client";

import Reveal from "./Reveal";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
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
    "w-full bg-midnight/60 border border-sky/10 rounded-xl px-4 py-3 text-frost text-sm placeholder:text-frost/30 focus:outline-none focus:border-sky/50 focus:ring-1 focus:ring-sky/20 transition-all duration-200";

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Let&apos;s Connect
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-10"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            Contact
          </h2>
        </Reveal>

        {/* Email form */}
        <Reveal delay={200}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-midnight/80 border border-sky/10 p-6 sm:p-8 flex flex-col gap-4"
          >
            <p className="text-sky text-[0.65rem] font-semibold tracking-widest uppercase mb-1">
              Send a Message
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-frost/50 text-xs font-medium tracking-wide">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={fields.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-frost/50 text-xs font-medium tracking-wide">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={fields.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-frost/50 text-xs font-medium tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                value={fields.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <p className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                <span>✅</span> Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                <span>❌</span> Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 self-start flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-sky text-white text-sm font-bold tracking-wide hover:bg-sky/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {status === "sending" ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                <>Send Message </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
