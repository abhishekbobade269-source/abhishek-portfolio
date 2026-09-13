"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Self-contained animated network-graph backdrop: drifting nodes connected
 * by lines that brighten with proximity — stands in for a licensed 3D/video
 * hero background, thematically apt for a network-security case study.
 * Pure canvas, no external assets. Freezes on prefers-reduced-motion.
 */
export function NetworkGraphBackground({ accent = "34, 255, 130" }: { accent?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frameId = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);

      const count = Math.min(70, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const maxDist = 150;
          if (dist < maxDist) {
            ctx!.strokeStyle = `rgba(${accent}, ${0.18 * (1 - dist / maxDist)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = `rgba(${accent}, 0.8)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      frameId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
