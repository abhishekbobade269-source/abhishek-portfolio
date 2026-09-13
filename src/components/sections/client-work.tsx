import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { clientWork } from "@/data/resume";

export function ClientWork() {
  return (
    <section id="client-work" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          04 — Client Work
        </span>
        <p className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-500">
          Freelance web development, delivered and running in production.
        </p>
      </Reveal>

      <div className="mt-8 space-y-6">
        {clientWork.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <article className="rounded-2xl border border-zinc-900/10 bg-zinc-900/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                    {project.status}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">{project.role}</p>
                </div>
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900/30 dark:border-white/15 dark:text-zinc-200 dark:hover:border-white/30"
                  >
                    <ExternalLink size={15} /> Visit storefront
                  </a>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.description}
              </p>

              <ul className="mt-4 space-y-1.5">
                {project.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {point}
                  </li>
                ))}
              </ul>

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
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
