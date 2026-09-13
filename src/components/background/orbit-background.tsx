"use client";

import { motion, useReducedMotion } from "framer-motion";

type Ring = {
  size: number;
  duration: number;
  reverse?: boolean;
  nodeCount: number;
};

const rings: Ring[] = [
  { size: 320, duration: 40, nodeCount: 3 },
  { size: 480, duration: 60, reverse: true, nodeCount: 4 },
  { size: 660, duration: 90, nodeCount: 5 },
];

/**
 * Decorative animated background for the hero section: concentric orbit
 * rings with nodes, evoking automated/connected workflows (this person's
 * actual domain) rather than a generic particle effect. Purely
 * presentational — aria-hidden, and rotation is disabled when the visitor
 * prefers reduced motion.
 */
export function OrbitBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-[120px] dark:bg-emerald-400/10" />
      <div className="absolute h-[320px] w-[320px] translate-x-24 translate-y-16 rounded-full bg-cyan-500/10 blur-[100px]" />

      {rings.map((ring) => (
        <motion.div
          key={ring.size}
          className="absolute rounded-full border border-zinc-900/10 dark:border-white/10"
          style={{ width: ring.size, height: ring.size }}
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: ring.reverse ? -360 : 360 }
          }
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: ring.nodeCount }).map((_, nodeIndex) => {
            const angle = (360 / ring.nodeCount) * nodeIndex;
            return (
              <span
                key={nodeIndex}
                className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/70 dark:bg-emerald-300/70"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${ring.size / 2}px) rotate(-${angle}deg)`,
                }}
              />
            );
          })}
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />
    </div>
  );
}
