"use client";

import Image from "next/image";
import { useStaggeredReveal } from "@/components/masked/hooks";
import { education, profile, skills } from "@/data/resume";

const SKILLS_BG = "/backgrounds/skills-portrait.svg";

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

export function HomeSkills() {
  const { containerRef, getAnimStyle } = useStaggeredReveal(4);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="flex min-h-screen w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-20 md:h-[calc(100vh-var(--footer-height,72px))] md:min-h-0 md:gap-2 md:px-5 md:pb-2 md:pt-[88px]"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-2 md:grid-rows-1 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div
            className="flex min-h-[180px] flex-1 flex-col justify-between rounded-xl bg-stone-50 p-5 md:min-h-0 md:rounded-2xl md:p-7"
            style={getAnimStyle(0)}
          >
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] text-black">
              Full-Stack
              <br />
              &amp; Automation
            </h2>
            <p className="text-xs font-semibold text-black md:text-sm">
              Skills across the stack
            </p>
          </div>

          <div
            className="flex min-h-[160px] flex-[1.3] flex-wrap gap-1.5 md:min-h-0 md:gap-2"
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
          className="relative min-h-[350px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={getAnimStyle(3)}
        >
          <Image
            src={SKILLS_BG}
            alt="Abstract network of connected nodes"
            fill
            unoptimized
            className="object-cover"
          />

          <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 md:bottom-5 md:left-5 md:right-5 md:gap-2">
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
              className="flex h-36 flex-1 flex-col justify-between rounded-xl bg-white/20 p-3 backdrop-blur-xl md:h-52 md:rounded-2xl md:p-5"
            >
              <h4 className="text-lg font-bold leading-5 text-white md:text-2xl md:leading-7">
                Operations
                <br />
                Executive at
                <br />
                Upstep Academy
              </h4>
              <span className="flex h-9 w-9 self-end items-center justify-center rounded-full border border-white text-white md:h-12 md:w-12">
                {arrow}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
