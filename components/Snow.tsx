"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
  twinkle: number;
  vx: number;
  vy: number;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    let animId: number;
    let mouse = { x: -1000, y: -1000, active: false };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function initParticles() {
      particles = [];
      const count = prefersReducedMotion ? 40 : Math.min(Math.floor(W / 9), 140);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 2.2 + 0.5,
          speed: Math.random() * 0.45 + 0.15,
          drift: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.45 + 0.15,
          twinkle: Math.random() * Math.PI * 2,
          vx: 0,
          vy: 0,
        });
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function onMouseLeave() {
      mouse.active = false;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.twinkle += 0.015;
        const pulse = Math.sin(p.twinkle) * 0.15 + 0.85;

        // Kinetic mouse repulsion
        if (mouse.active && !prefersReducedMotion) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Apply friction
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.drift + p.vx;
        p.y += p.speed + p.vy;

        // Wrap around boundaries
        if (p.y > H + 8) {
          p.y = -8;
          p.x = Math.random() * W;
        }
        if (p.x > W + 8) p.x = -8;
        if (p.x < -8) p.x = W + 8;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(186, 230, 253, ${p.opacity * pulse})`;
        ctx!.shadowColor = "rgba(56, 189, 248, 0.6)";
        ctx!.shadowBlur = p.r * 3;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    }

    function onResize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      initParticles();
    }

    initParticles();
    draw();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
