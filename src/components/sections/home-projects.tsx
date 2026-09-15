"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { clientWork, projects } from "@/data/resume";

const liveCount = [...projects, ...clientWork].filter((p) => p.status === "Live").length;
const totalCount = projects.length + clientWork.length;
const livePercent = Math.round((liveCount / totalCount) * 100);

const stats = [
  { value: totalCount, pad: 2, suffix: "", label: "Projects shipped" },
  { value: livePercent, pad: 0, suffix: "%", label: "Live & reachable" },
  { value: clientWork.length, pad: 0, suffix: "", label: "Paying client" },
];

function Counter({ value, pad, suffix }: { value: number; pad: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {String(display).padStart(pad, "0")}
      {suffix}
    </span>
  );
}

export function HomeProjects() {
  return (
    <section
      id="projects"
      className="relative flex w-full flex-col justify-center overflow-hidden px-3 pt-28 pb-10 md:min-h-[600px] md:px-6 md:pt-40 md:pb-16"
    >
      <video
        className="absolute inset-y-0 right-0 hidden w-3/4 object-cover object-[62%_40%] md:block"
        autoPlay
        muted
        loop
        playsInline
        poster="/backgrounds/hero-orb.png"
      >
        <source src="/backgrounds/hero-orb-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10 md:from-white md:via-white/60 md:to-white/5" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/40 md:text-sm">
          Selected Work
        </p>
        <h2 className="max-w-3xl text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] text-black">
          Project Gallery
        </h2>
        <p className="mt-5 max-w-xl text-base text-black/60 md:text-lg">
          Real systems, shipped end to end — from a production e-commerce platform to security research tooling.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 md:mt-14">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold tracking-tight text-black md:text-5xl">
                <Counter value={stat.value} pad={stat.pad} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-black/40 md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
