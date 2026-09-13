"use client";

import { useEffect, useRef } from "react";

type Ring = { radius: number; opacity: number };

/**
 * Self-contained canvas animation: pulsing concentric rings emanating from
 * an off-center point, evoking a broadcast/RF signal — stands in for a
 * licensed cinematic video background, thematically apt for a wireless
 * security lab case study. Freezes (static rings) on prefers-reduced-motion.
 */
export function SignalPulseBackground({ accent = "255, 90, 80" }: { accent?: string }) {
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
    let frameId = 0;
    let rings: Ring[] = [];
    let tick = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
      rings = prefersReducedMotion
        ? [
            { radius: 80, opacity: 0.3 },
            { radius: 160, opacity: 0.18 },
            { radius: 240, opacity: 0.08 },
          ]
        : [];
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.42;

      if (!prefersReducedMotion) {
        tick++;
        if (tick % 55 === 0) rings.push({ radius: 0, opacity: 0.35 });
        rings = rings.filter((r) => r.opacity > 0.002);
        for (const r of rings) {
          r.radius += 1.6;
          r.opacity *= 0.993;
        }
      }

      for (const r of rings) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, r.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${accent}, ${r.opacity})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
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
