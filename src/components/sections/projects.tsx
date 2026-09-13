"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { projects, type ProjectStatus } from "@/data/resume";
import { GithubIcon } from "@/components/icons/brand-icons";

const statusStyles: Record<ProjectStatus, string> = {
  "In Development":
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Academic Exercise":
    "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          03 — Projects
        </span>
        <p className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-500">
          Independent builds — several started as college coursework and are actively being
          rebuilt to a professional engineering standard. Status is kept honest as they progress.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-full flex-col rounded-2xl border border-zinc-900/10 bg-zinc-900/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  {project.tag}
                </span>
                <span
                  className={`inline-block rounded-full px-2.5 py-1 font-mono text-[11px] ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                {project.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-zinc-900/5 px-2 py-0.5 text-xs text-zinc-600 dark:bg-white/5 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.links && (project.links.repo || project.links.demo) && (
                <div className="mt-4 flex gap-3 text-sm">
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                    >
                      <GithubIcon width={14} height={14} /> Code
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
