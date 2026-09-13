"use client";

import { useEffect, useRef } from "react";

type Blip = { angle: number; radius: number; speed: number };

/**
 * Self-contained canvas radar-sweep animation: concentric rings, a rotating
 * sweep beam, and drifting blips — stands in for a licensed video/3D hero
 * background, thematically apt for a drone fleet/telemetry case study.
 * Freezes the sweep on prefers-reduced-motion (rings/blips stay static).
 */
export function RadarSweepBackground({ accent = "255, 200, 87" }: { accent?: string }) {
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
    let sweepAngle = 0;
    let frameId = 0;
    let blips: Blip[] = [];

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);

      blips = Array.from({ length: 10 }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 0.2 + Math.random() * 0.75,
        speed: (Math.random() - 0.5) * 0.004,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Radar sits off-canvas to the right, echoing a HUD corner element
      const cx = width * 0.82;
      const cy = height * 0.42;
      const maxR = Math.min(width, height) * 0.62;

      for (let i = 1; i <= 4; i++) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${accent}, 0.12)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      if (!prefersReducedMotion) sweepAngle += 0.012;

      const gradient = ctx!.createConicGradient(sweepAngle, cx, cy);
      gradient.addColorStop(0, `rgba(${accent}, 0.28)`);
      gradient.addColorStop(0.08, `rgba(${accent}, 0)`);
      gradient.addColorStop(1, `rgba(${accent}, 0)`);
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx!.fillStyle = gradient;
      ctx!.fill();

      for (const b of blips) {
        if (!prefersReducedMotion) b.angle += b.speed;
        const x = cx + Math.cos(b.angle) * b.radius * maxR;
        const y = cy + Math.sin(b.angle) * b.radius * maxR;
        ctx!.beginPath();
        ctx!.arc(x, y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${accent}, 0.7)`;
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

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
