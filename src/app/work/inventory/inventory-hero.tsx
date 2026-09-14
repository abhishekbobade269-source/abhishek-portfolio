"use client";

import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";

// Styled after a minimal, elegant enterprise-serif hero (white background,
// black serif headline, muted-gray body copy) — reskinned with the real
// OfficeStock IMS project content. Deliberately the calmest of the four
// case studies: no canvas effects, matching the source template's own
// restraint.

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

export function InventoryHero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <nav className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] text-black/40">
          Case Study
        </span>
      </nav>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-3xl flex-col items-center justify-center px-6 pb-24 text-center sm:px-10">
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={`${serif.className} text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] tracking-tight text-black`}
        >
          Beyond the count,{" "}
          <span className="italic text-black/45">nothing goes missing.</span>
        </motion.h1>

        <motion.p
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 max-w-xl text-base leading-relaxed text-black/55 sm:text-lg"
        >
          A standalone inventory and asset-management system: an immutable
          stock ledger, purchase orders, employee asset check-out, and
          role-based access enforced server-side — built to the same
          standard as the real operational tooling I maintain day to day.
        </motion.p>

        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://office-inventory-management-system-xi.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          <a
            href="https://github.com/abhishekbobade269-source/office-inventory-management-system"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-black/70 outline outline-1 outline-black/15 transition-colors hover:text-black hover:outline-black/30"
          >
            <GithubIcon width={16} height={16} />
            View on GitHub
          </a>
          <Link
            href="/#projects"
            className="rounded-full px-8 py-3.5 text-sm font-medium text-black/70 outline outline-1 outline-black/15 transition-colors hover:text-black hover:outline-black/30"
          >
            Back to Portfolio
          </Link>
        </motion.div>

        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 rounded-2xl bg-black/[0.03] px-6 py-4 text-xs text-black/50"
        >
          <p className="uppercase tracking-widest text-black/35">
            Try it yourself — seeded demo accounts
          </p>
          <p className="mt-2 font-mono text-[13px] text-black/60">
            admin@officestock.dev · manager@officestock.dev ·
            staff@officestock.dev
            <br />
            password: Password123!
          </p>
        </motion.div>

        <motion.p
          custom={0.65}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-xs uppercase tracking-widest text-black/35"
        >
          Next.js · PostgreSQL · Prisma · Role-based access
        </motion.p>
      </div>
    </main>
  );
}
