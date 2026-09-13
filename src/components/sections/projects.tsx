"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          03 — Projects
        </span>
        <p className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-500">
          College coursework where I explored systems and security concepts hands-on.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full rounded-2xl border border-zinc-900/10 bg-zinc-900/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                {project.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
