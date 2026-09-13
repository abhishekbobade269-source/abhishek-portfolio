import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          02 — Experience
        </span>
      </Reveal>

      <ol className="mt-10 space-y-12 border-l border-zinc-900/10 pl-8 dark:border-white/10">
        {experience.map((job, i) => (
          <li key={job.org} className="relative">
            <Reveal delay={i * 0.1}>
              <span
                aria-hidden
                className="absolute -left-[2.32rem] top-1.5 h-3 w-3 rounded-full border-2 border-emerald-500 bg-[var(--background)]"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {job.title}
                </h3>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                  {job.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                {job.org}
                {job.location ? ` — ${job.location}` : ""}
              </p>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
