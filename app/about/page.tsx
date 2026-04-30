"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import Snow from "@/components/Snow";
import Image from "next/image";
export default function About() {
  return (
    <>
      {/* Fixed canvas snow layer */}
      <Snow />

      {/* Background glow blobs */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(14,165,233,0.1)",
          filter: "blur(100px)",
          top: -100,
          left: -150,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(56,189,248,0.07)",
          filter: "blur(100px)",
          bottom: "10%",
          right: -100,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(3,105,161,0.14)",
          filter: "blur(90px)",
          top: "40%",
          left: "30%",
        }}
      />

      {/* Actual content sits above z-index 2 */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="min-h-screen">
          <Navbar />

          <section id="about" className="relative px-6 py-24">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <p className="text-sky text-xs font-bold tracking-[0.2em] uppercase mb-2">
                  About
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="font-sans font-extrabold text-white tracking-tight mb-5"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
                >
                  Technology Journey
                </h2>
              </Reveal>

              <div className="flex flex-col gap-5">
                <Reveal delay={200}>
                  <p className="text-frost/70 text-sm leading-7">
                    Hello! I’m Ye Yint Myint Myat, a frontend developer based in
                    Yangon, Myanmar. I have a passion for crafting beautiful and
                    functional web applications. With a strong foundation in
                    HTML, CSS, and JavaScript, I specialize in React and Next.js
                    to build responsive and user-friendly interfaces.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <p className="text-frost/70 text-sm leading-7 mb-5">
                    I’m always eager to learn new technologies and improve my
                    skills. When I’m not coding, you can find me exploring the
                    latest trends in web development or working on personal
                    projects to further hone my craft.
                  </p>
                  <div className="ice-divider w-full" />
                </Reveal>

                <Reveal delay={400}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="col-span-1">
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfzFQQ5yP0TCDARWCfdSJNqW5OknwWgFM0A&s"
                        alt="Profile Picture"
                        width={400}
                        height={400}
                        className="rounded-2xl border border-sky/20"
                      />
                    </div>
                    <div className="col-span-1 flex justify-start items-center">
                      <p className="text-frost/70 text-sm leading-7">
                        I’m currently open to new opportunities and
                        collaborations. If you have a project in mind or just
                        want to connect, feel free to reach out!
                      </p>
                    </div>
                  </div>
                  <div className="ice-divider w-full" />
                </Reveal>
                <Reveal delay={400}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 flex justify-start items-center">
                      <p className="text-frost/70 text-sm leading-7">
                        I’m currently open to new opportunities and
                        collaborations. If you have a project in mind or just
                        want to connect, feel free to reach out!
                      </p>
                    </div>
                    <div className="col-span-1">
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfzFQQ5yP0TCDARWCfdSJNqW5OknwWgFM0A&s"
                        alt="Profile Picture"
                        width={400}
                        height={400}
                        className="rounded-2xl border border-sky/20"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
