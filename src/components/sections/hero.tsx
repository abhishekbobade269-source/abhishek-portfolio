"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/data/resume";
import { OrbitBackground } from "@/components/background/orbit-background";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-65px)] items-center overflow-hidden px-6"
    >
      <OrbitBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-3xl flex-col items-start gap-6 py-24 text-left"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400"
        >
          Open to operations &amp; automation roles
        </motion.span>

        <motion.h1
          variants={item}
          className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400"
        >
          {profile.role}. {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="/resume/Abhishek_Bobade_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Download size={16} />
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900/30 dark:border-white/15 dark:text-zinc-200 dark:hover:border-white/30"
          >
            Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900/10 text-zinc-700 transition-colors hover:border-zinc-900/30 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/30"
          >
            <GithubIcon width={18} height={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900/10 text-zinc-700 transition-colors hover:border-zinc-900/30 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/30"
          >
            <LinkedinIcon width={18} height={18} />
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-zinc-400 sm:block dark:text-zinc-600"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
