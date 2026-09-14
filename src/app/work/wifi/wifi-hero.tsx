"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SignalPulseBackground } from "@/components/background/signal-pulse-background";
import { GithubIcon } from "@/components/icons/brand-icons";

// Styled after a dark, terminal-mono "network access" product hero (chip +
// big brand word + uppercase mono tagline, bottom-anchored panel) —
// reskinned with the WiFi Security Lab's real README copy. Kept
// deliberately restrained on tone: this is a safety-gated educational tool,
// not something to glamorize, so the legal notice gets equal visual weight
// to the CTAs, matching the source template's own legal-footer convention.

const ACCENT = "255, 90, 80";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function WifiHero() {
  return (
    <main className="relative flex min-h-screen flex-col bg-black">
      <div className="absolute inset-0">
        <SignalPulseBackground accent={ACCENT} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Case Study
        </span>
      </nav>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-auto flex w-full max-w-xl flex-col gap-5 px-6 pb-10 sm:px-10"
      >
        <motion.span
          variants={item}
          className="inline-block w-fit bg-white/[0.07] px-3.5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white"
        >
          [ Security Lab ]
        </motion.span>

        <motion.h1
          variants={item}
          className="text-[clamp(2.6rem,7vw,4.6rem)] font-light uppercase leading-[0.98] tracking-[0.02em] text-white"
        >
          WiFi Security Lab
        </motion.h1>

        <motion.p
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.16em]"
          style={{ color: `rgb(${ACCENT})` }}
        >
          802.11 deauthentication, lab-gated by design
        </motion.p>

        <motion.p variants={item} className="max-w-lg text-sm font-light leading-relaxed text-white/65">
          An educational toolkit for studying deauthentication attacks in a
          controlled lab environment: real scapy-based frame construction
          paired with a real flood detector, with every attack path gated
          behind an explicit, expiring authorization allow-list plus an
          interactive confirmation step.
        </motion.p>

        <motion.div variants={item} className="mt-2 flex flex-wrap gap-3">
          <a
            href="https://landing-iota-black-60.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black transition-colors hover:bg-white/85"
          >
            <ExternalLink size={14} />
            Live 3D Demo
          </a>
          <a
            href="https://github.com/abhishekbobade269-source/wifi-deauth-lab"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white/[0.07] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/[0.14]"
          >
            <GithubIcon width={14} height={14} />
            Code
          </a>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50 outline outline-1 outline-white/20 transition-colors hover:text-white hover:outline-white/40"
          >
            Portfolio
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className="relative z-10 border-t border-white/10 px-6 py-5 text-center sm:px-10"
      >
        <p className="mx-auto max-w-xl font-light text-[11px] leading-relaxed text-white/40">
          Educational / authorized-lab use only. Never run against a network
          or clients you don&apos;t own or hold explicit written authorization
          to test.
        </p>
      </motion.div>
    </main>
  );
}
