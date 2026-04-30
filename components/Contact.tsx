import { data } from "@/data";
import Reveal from "./Reveal";

const contacts = [
  { icon: "✉️", label: "EMAIL", value: data.email, href: `mailto:${data.email}` },
  { icon: "📱", label: "PHONE", value: data.phone, href: `tel:${data.phone.replace(/\s/g, "")}` },
  { icon: "📍", label: "LOCATION", value: data.address, href: null },
];

export default function Contact() {
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
            className="font-syne font-extrabold text-white tracking-tight mb-10"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            Contact
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contacts.map((c, i) =>
            c.href ? (
              <Reveal key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  className="flex items-center gap-3 p-4 rounded-xl bg-midnight/80 border border-sky/10 hover:border-sky hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky/12 border border-sky/20 flex items-center justify-center text-lg shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-sky text-[0.65rem] font-semibold tracking-widest uppercase">{c.label}</p>
                    <p className="text-frost text-sm font-medium mt-0.5 leading-snug">{c.value}</p>
                  </div>
                </a>
              </Reveal>
            ) : (
              <Reveal key={c.label} delay={i * 80}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-midnight/80 border border-sky/10 hover:border-sky/35 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-sky/12 border border-sky/20 flex items-center justify-center text-lg shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-sky text-[0.65rem] font-semibold tracking-widest uppercase">{c.label}</p>
                    <p className="text-frost text-sm font-medium mt-0.5 leading-snug">{c.value}</p>
                  </div>
                </div>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
