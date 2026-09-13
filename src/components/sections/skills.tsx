import { Reveal } from "@/components/motion/reveal";
import { skills } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          04 — Skills
        </span>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              {group.group}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-zinc-900/10 px-3 py-1.5 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
