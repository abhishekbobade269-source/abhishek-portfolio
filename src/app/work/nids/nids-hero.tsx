"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { NetworkGraphBackground } from "@/components/background/network-graph-background";
import { GithubIcon } from "@/components/icons/brand-icons";

// Styled after a dark security-product hero (bottom-left content, vivid
// signal-green accent, uppercase mono labels) — reskinned with the NIDS
// project's real README copy and a self-contained canvas background instead
// of a licensed video/3D embed.

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const ACCENT = "34, 255, 130"; // vivid signal green, close to the portfolio's own emerald accent

export function NidsHero() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <NetworkGraphBackground accent={ACCENT} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Case Study
        </span>
      </nav>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-auto flex max-w-2xl flex-col gap-4 px-6 pb-14 sm:px-10 sm:pb-20"
      >
        <motion.span
          variants={item}
          className="inline-block w-fit bg-white/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white"
        >
          [ Independent Project ]
        </motion.span>

        <motion.h1
          variants={item}
          className="text-[clamp(3rem,9vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white"
        >
          NIDS
        </motion.h1>

        <motion.p
          variants={item}
          className="font-mono text-sm uppercase tracking-[0.14em]"
          style={{ color: `rgb(${ACCENT})` }}
        >
          Hybrid signature + ML anomaly detection
        </motion.p>

        <motion.p
          variants={item}
          className="max-w-xl text-base font-light text-white/70 sm:text-lg"
        >
          A production-shaped network intrusion detection system: live packet
          capture or offline pcap/dataset replay, per-flow feature extraction,
          YAML signature rules alongside an Isolation-Forest anomaly model
          trained only on benign traffic, and a PostgreSQL-backed alert API
          with a live websocket feed and dashboard.
        </motion.p>

        <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://nids-console.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: `rgb(${ACCENT})` }}
          >
            Enter the Console
          </a>
          <a
            href="https://github.com/abhishekbobade269-source/network-intrusion-detection-system"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-white/80 outline outline-1 outline-white/25 transition-colors hover:text-white hover:outline-white/50"
          >
            <GithubIcon width={16} height={16} />
            View on GitHub
          </a>
          <Link
            href="/#projects"
            className="px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-white/80 outline outline-1 outline-white/25 transition-colors hover:text-white hover:outline-white/50"
          >
            Back to Portfolio
          </Link>
        </motion.div>

        <motion.p variants={item} className="mt-2 text-xs font-light text-white/40">
          Built solo, end to end — capture → detection → alerting → dashboard. The live console runs
          in demo mode — a recorded capture replayed against the real detection engine, not a live
          production backend.
        </motion.p>
      </motion.div>
    </main>
  );
}
