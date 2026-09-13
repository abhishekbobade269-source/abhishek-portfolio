"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RadarSweepBackground } from "@/components/background/radar-sweep-background";
import styles from "./drone.module.css";

// Styled after a futuristic sci-fi studio hero (large center heading,
// octagonal "cut-corner" buttons, dark video-style background) — reskinned
// with DroneOps AI's real README copy and a self-contained radar-sweep
// canvas instead of a licensed video.

const ACCENT = "255, 200, 87"; // amber/HUD tone

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const stats = [
  { value: "12/12", label: "Build phases complete" },
  { value: "28", label: "Automated unit tests" },
  { value: "0", label: "Real hardware required" },
];

export function DroneHero() {
  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-black p-3 md:p-4">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-black">
        <RadarSweepBackground accent={ACCENT} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

        <nav className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          <motion.div
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>
          </motion.div>
          <motion.span
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.3em] text-white/40"
          >
            Case Study
          </motion.span>
        </nav>

        <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-8 md:px-10 md:pb-10">
          <div className="relative flex flex-1 items-center">
            <motion.div
              custom={0.35}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="w-full text-center"
            >
              <h1
                className="font-normal uppercase leading-[1.1] tracking-[-0.02em] text-white"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
              >
                Command Every Flight.
                <br />
                Automate Every Failsafe.
                <br />
                <span style={{ color: `rgb(${ACCENT})` }}>DroneOps AI</span>
              </h1>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 items-end gap-6 md:grid-cols-3">
            <motion.p
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-[280px] text-sm leading-relaxed text-white/70"
            >
              Security-hardened by default — JWT sessions, RBAC, HMAC-signed
              commands, and a full audit trail behind every flight. Runs live
              with zero real hardware via a built-in flight simulator.
            </motion.p>

            <motion.div
              custom={0.62}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex justify-center"
            >
              <Link
                href="/#projects"
                className={`${styles.cut} group flex w-full max-w-[280px] items-center justify-center gap-2 py-3.5 text-black transition-colors hover:bg-white/90`}
                style={{ backgroundColor: `rgb(${ACCENT})` }}
              >
                <span className="text-sm font-medium">Back to Portfolio</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              custom={0.74}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex justify-center gap-6 md:justify-end"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-right">
                  <div className="text-2xl font-bold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 max-w-[90px] text-[10px] uppercase tracking-wide text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
