"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useStaggeredReveal } from "@/components/masked/hooks";
import { additional, education, profile, skills } from "@/data/resume";

const ABOUT_BG = "/backgrounds/about-network.png";

const arrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
    <path
      d="M1 7h12m0 0L8 2m5 5L8 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// One-line, honest explanations per skill group — not a re-list of the
// chips already shown on the left, just what each one actually means.
const SKILL_NOTES: Record<string, string> = {
  "Automation & Scripting": "Scripts + AI-assisted workflows that cut manual busywork",
  "Web Development": "Full-stack builds, frontend through PostgreSQL",
  Operations: "Inventory, resourcing, and day-to-day data management",
  Platforms: "Salesforce integration for operational tooling",
  Analytical: "Python & SQL-driven research behind every process fix",
};

const HOBBY_NOTES: Record<string, string> = {
  Hiking: "Weekend trail resets",
  Powerlifting: "District-level competitor",
  "Mountain Biking": "Off-road, off-schedule",
};

type FlowRow = { title: string; note: string };

// A simple top-to-bottom rail (same visual language as the case-studies
// scroll line) instead of the earlier radial hub-and-branch diagram — that
// version crowded 6 labels together with crossing lines and, worse, on one
// render dropped 2 of the 6 labels off-screen entirely. A vertical list is
// impossible to overlap by construction and every item gets a real,
// individually-readable explanation.
function SkillsFlow({ rows }: { rows: FlowRow[] }) {
  return (
    <div className="relative flex flex-col gap-5 md:gap-7">
      <div className="absolute top-1 bottom-1 left-[6px] w-0.5 bg-black/10" />
      <motion.div
        className="absolute top-1 left-[6px] h-full w-0.5 origin-top bg-[#34d399]"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute left-[6px] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#34d399]"
        style={{ boxShadow: "0 0 14px 4px rgba(52,211,153,0.55)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {rows.map((row, i) => (
        <motion.div
          key={row.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
          className="relative pl-8"
        >
          <span className="absolute top-1.5 left-[6px] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#34d399] bg-white" />
          <h4 className="text-lg font-bold text-black md:text-2xl">{row.title}</h4>
          <p className="mt-1 text-sm leading-snug text-black/55 md:text-base">{row.note}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function HomeSkills() {
  const { containerRef, getAnimStyle } = useStaggeredReveal(4);

  const skillRows: FlowRow[] = skills.map((group) => ({
    title: group.group,
    note: SKILL_NOTES[group.group] ?? group.items.join(", "),
  }));
  const hobbyRows: FlowRow[] = additional.hobbies.map((hobby) => ({
    title: hobby,
    note: HOBBY_NOTES[hobby] ?? "",
  }));

  return (
    <section
      id="skills"
      ref={containerRef}
      className="flex min-h-screen w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-20 md:h-[calc(100vh-var(--footer-height,72px))] md:min-h-0 md:gap-2 md:px-5 md:pb-2 md:pt-[88px]"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-[1fr_1.6fr] md:grid-rows-1 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div
            className="flex min-h-[220px] flex-1 flex-wrap gap-1.5 md:min-h-0 md:gap-2"
            style={getAnimStyle(1)}
          >
            {skills.map((group, i) => (
              <div
                key={group.group}
                className={`min-w-[calc(50%-3px)] flex-1 rounded-xl p-3 md:min-w-0 md:rounded-2xl md:p-2.5 ${
                  i % 2 === 0 ? "bg-stone-50" : "bg-zinc-200"
                }`}
              >
                <h3 className="text-sm font-bold text-black md:text-base">{group.group}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5 md:mt-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/15 bg-white px-2.5 py-1 text-[10px] font-semibold text-black md:text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex min-h-[160px] flex-[0.8] items-end justify-between rounded-xl bg-zinc-200 p-5 md:min-h-0 md:rounded-2xl md:p-7"
            style={getAnimStyle(2)}
          >
            <div>
              <p className="mb-2 text-xs font-semibold text-black md:mb-3 md:text-sm">
                Get in Touch
              </p>
              <h3 className="text-xl font-bold leading-6 text-black md:text-3xl md:leading-8">
                Let&apos;s build
                <br />
                something
                <br />
                worth shipping
              </h3>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-white px-5 py-3 text-base font-bold text-black transition-transform hover:scale-105 md:px-8 md:py-5 md:text-xl"
            >
              Email Me
            </a>
          </div>
        </div>

        <div
          className="relative flex min-h-[500px] flex-col overflow-hidden rounded-xl bg-gradient-to-br from-stone-50 to-white p-5 md:min-h-0 md:rounded-2xl md:p-9"
          style={getAnimStyle(3)}
        >
          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
            <div>
              <h3 className="mb-6 text-3xl font-bold leading-none text-black md:mb-9 md:text-5xl">Skills</h3>
              <SkillsFlow rows={skillRows} />
            </div>
            <div>
              <h3 className="mb-6 text-3xl font-bold leading-none text-black md:mb-9 md:text-5xl">
                Beyond the
                <br />
                Stack
              </h3>
              <SkillsFlow rows={hobbyRows} />
              <p className="mt-5 pl-8 text-sm text-black/40 md:text-base">🏆 {additional.achievement}</p>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex gap-1.5 md:mt-8 md:gap-2">
            <a
              href="/resume/Abhishek_Bobade_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex h-36 flex-1 flex-col justify-between rounded-xl bg-white p-3 md:h-52 md:rounded-2xl md:p-5"
            >
              <h4 className="text-lg font-bold leading-5 text-black md:text-2xl md:leading-7">
                {education[0].degree.replace("Bachelor of Engineering — ", "")}
                <br />
                {education[0].period.split(" — ")[1]}
              </h4>
              <span className="flex h-9 w-9 self-end items-center justify-center rounded-full border border-black md:h-12 md:w-12">
                {arrow}
              </span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="relative flex h-36 flex-1 flex-col justify-between overflow-hidden rounded-xl p-3 md:h-52 md:rounded-2xl md:p-5"
            >
              <Image
                src={ABOUT_BG}
                alt="Network mesh silhouette of shoulders and chest"
                fill
                unoptimized
                className="object-cover object-[50%_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/40" />

              <h4 className="relative z-10 text-lg font-bold leading-5 text-white md:text-2xl md:leading-7">
                Operations
                <br />
                Executive at
                <br />
                Upstep Academy
              </h4>
              <span className="relative z-10 flex h-9 w-9 self-end items-center justify-center rounded-full border border-white text-white md:h-12 md:w-12">
                {arrow}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
