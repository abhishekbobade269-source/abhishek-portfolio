import { Reveal } from "@/components/motion/reveal";
import { additional, certifications, education } from "@/data/resume";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          06 — Education
        </span>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.08}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium text-zinc-900 dark:text-white">{item.degree}</h3>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.school}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">{item.detail}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} direction="left">
          <div className="rounded-2xl border border-zinc-900/10 bg-zinc-900/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">
            <h3 className="font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              Certifications &amp; Activities
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>

            <h3 className="mt-5 font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              Languages
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {additional.languages.join(", ")}
            </p>

            <h3 className="mt-5 font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              Outside Work
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {additional.hobbies.join(", ")} — {additional.achievement}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
