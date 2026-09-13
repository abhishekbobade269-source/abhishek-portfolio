import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/resume";

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Currently", value: "Operations Executive & Admin, Upstep Academy" },
  { label: "Background", value: "B.E. Computer Science (AI & ML)" },
  { label: "Focus", value: "Automation, internal tooling, operations systems" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">01 — About</span>
      </Reveal>

      <div className="mt-6 grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal delay={0.05}>
          <p className="text-xl leading-relaxed text-zinc-700 sm:text-2xl dark:text-zinc-300">
            {profile.summary}
          </p>
        </Reveal>

        <Reveal delay={0.15} direction="left">
          <dl className="grid grid-cols-1 gap-4 rounded-2xl border border-zinc-900/10 bg-zinc-900/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
