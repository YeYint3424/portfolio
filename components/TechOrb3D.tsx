"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";

interface Node3D {
  label: string;
  x: number;
  y: number;
  z: number;
  color: string;
  category: string;
}

const TECH_NODES = [
  { label: "React.js", color: "#38bdf8", category: "Frontend Core" },
  { label: "Next.js 14", color: "#ffffff", category: "Framework" },
  { label: "TypeScript", color: "#3178c6", category: "Type System" },
  { label: "Tailwind CSS", color: "#38bdf8", category: "Styling" },
  { label: "Java", color: "#f89820", category: "Language" },
  { label: "Spring Boot", color: "#6db33f", category: "Backend" },
  { label: "Zustand", color: "#bae6fd", category: "State Management" },
  { label: "PostgreSQL", color: "#336791", category: "Database" },
  { label: "Docker", color: "#2496ed", category: "DevOps" },
  { label: "Figma", color: "#f24e1e", category: "UI/UX Design" },
  { label: "REST APIs", color: "#0ea5e9", category: "Architecture" },
  { label: "Git", color: "#f05032", category: "Version Control" },
];

export default function TechOrb3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>("Next.js 14");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const radius = Math.min(width, height) * 0.32;
    const count = TECH_NODES.length;

    // Distribute nodes evenly on 3D sphere surface using Fibonacci spiral
    const nodes: (Node3D & { px: number; py: number; scale: number })[] = TECH_NODES.map((tech, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        ...tech,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        px: 0,
        py: 0,
        scale: 1,
      };
    });

    let rotX = 0.003;
    let rotY = 0.005;
    let angleX = 0;
    let angleY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let animId: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !reduceMotion) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        angleY += dx * 0.005;
        angleX += dy * 0.005;
        rotX = dy * 0.0008;
        rotY = dx * 0.0008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    function render() {
      ctx!.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      if (!isDragging && !reduceMotion) {
        angleX += rotX;
        angleY += rotY;
        // Friction decay
        rotX *= 0.98;
        rotY *= 0.98;
        if (Math.abs(rotX) < 0.002) rotX = 0.002;
        if (Math.abs(rotY) < 0.003) rotY = 0.003;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Render 3D connecting grid lines
      ctx!.lineWidth = 0.6;

      // Project & sort nodes by 3D Z depth
      const projected = nodes.map((node) => {
        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        let y1 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Perspective transform
        const perspective = 400 / (400 + z2);
        const px = centerX + x1 * perspective;
        const py = centerY + y1 * perspective;

        return {
          ...node,
          px,
          py,
          z2,
          perspective,
        };
      });

      projected.sort((a, b) => a.z2 - b.z2);

      // Draw faint 3D orbital web lines between adjacent nodes
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.15 * Math.min(p1.perspective, p2.perspective);
            ctx!.beginPath();
            ctx!.moveTo(p1.px, p1.py);
            ctx!.lineTo(p2.px, p2.py);
            ctx!.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx!.stroke();
          }
        }
      }

      // Draw 3D nodes & text labels
      for (const node of projected) {
        const opacity = Math.max(0.2, (node.z2 + radius) / (2 * radius));
        const size = Math.max(3, 4.5 * node.perspective);

        // Halo blur
        ctx!.beginPath();
        ctx!.arc(node.px, node.py, size * 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(56, 189, 248, ${opacity * 0.15})`;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(node.px, node.py, size, 0, Math.PI * 2);
        ctx!.fillStyle = node.color;
        ctx!.shadowColor = node.color;
        ctx!.shadowBlur = size * 3;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        // Label
        const fontSize = Math.max(10, Math.floor(12 * node.perspective));
        ctx!.font = `${fontSize}px var(--font-dm), sans-serif`;
        ctx!.fillStyle = activeNode === node.label ? "#ffffff" : `rgba(224, 242, 254, ${opacity * 0.85})`;
        ctx!.fillText(node.label, node.px + size + 6, node.py + 4);
      }

      animId = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeNode, reduceMotion]);

  return (
    <div className="relative w-full rounded-2xl glass-panel border border-sky/20 bg-midnight/90 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between gap-4 mb-2 z-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky">
          <Compass className="w-4 h-4 text-sky animate-spin-slow" />
          <span>Interactive 3D Tech Cosmos</span>
        </div>
        <span className="text-[0.68rem] font-mono text-frost/40">
          Drag to Rotate 3D
        </span>
      </div>

      {/* 3D Canvas Box */}
      <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Interactive Quick Selector Row */}
      <div className="pt-4 border-t border-sky/10 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        <span className="text-frost/60">
          Selected Node: <strong className="text-sky font-semibold">{activeNode}</strong>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TECH_NODES.slice(0, 4).map((node) => (
            <button
              key={node.label}
              onClick={() => setActiveNode(node.label)}
              className={`px-2.5 py-1 rounded-md text-[0.72rem] font-mono transition-colors ${
                activeNode === node.label
                  ? "bg-sky/20 border border-sky/40 text-white font-semibold"
                  : "bg-sky/5 border border-sky/15 text-frost/60 hover:text-white"
              }`}
            >
              {node.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
