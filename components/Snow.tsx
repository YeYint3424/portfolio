"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
  twinkle: number;
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
    let flakes: Flake[] = [];
    let animId: number;

    function initFlakes() {
      flakes = [];
      const count = Math.min(Math.floor(W / 7), 180);
      for (let i = 0; i < count; i++) {
        flakes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 2.5 + 0.4,
          speed: Math.random() * 0.55 + 0.15,
          drift: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.55 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const f of flakes) {
        f.twinkle += 0.018;
        const pulse = Math.sin(f.twinkle) * 0.15 + 0.85;
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(186,230,253,${f.opacity * pulse})`;
        ctx!.shadowColor = "rgba(56,189,248,0.9)";
        ctx!.shadowBlur = f.r * 4;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        f.y += f.speed;
        f.x += f.drift;
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
        if (f.x > W + 5) f.x = -5;
        if (f.x < -5) f.x = W + 5;
      }
      animId = requestAnimationFrame(draw);
    }

    function onResize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      initFlakes();
    }

    initFlakes();
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
