"use client";

import Image from "next/image";
import { useStaggeredReveal } from "@/components/masked/hooks";
import { profile } from "@/data/resume";

const featureBars = ["Workflow Automation", "Full-Stack Web Development", "Data-Driven Operations"];

export function HomeHero() {
  const { containerRef, getAnimStyle } = useStaggeredReveal(4);

  return (
    <section
      id="top"
      ref={containerRef}
      className="flex h-screen w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-24 md:gap-2 md:px-5 md:pb-2 md:pt-24"
    >
      {featureBars.map((label, i) => (
        <div
          key={label}
          className="relative flex h-14 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-50 text-center text-lg font-bold text-black md:h-20 md:rounded-2xl md:text-3xl"
          style={getAnimStyle(i)}
        >
          {label}
        </div>
      ))}

      <div
        className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-white md:rounded-2xl"
        style={getAnimStyle(3)}
      >
        <Image
          src="/backgrounds/about-network.png"
          alt="Network mesh silhouette of shoulders and chest"
          fill
          priority
          unoptimized
          className="object-cover object-[50%_15%]"
        />

        <p className="absolute top-4 left-4 z-10 max-w-[200px] text-xs font-semibold leading-4 text-black md:top-7 md:left-7 md:max-w-[300px] md:text-sm md:leading-5">
          {profile.tagline}
        </p>

        <div className="absolute bottom-5 left-3 z-10 md:bottom-8 md:left-4">
          <span className="mb-1 block text-xs font-semibold text-black md:mb-2 md:text-sm">
            {profile.role} · {profile.location}
          </span>
          <h1 className="text-[clamp(3rem,11vw,11rem)] font-bold leading-[0.79] tracking-tight text-black">
            Abhishek
            <br />
            Bobade
          </h1>
        </div>

        <p className="absolute bottom-6 right-4 z-10 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white md:bottom-10 md:right-8 md:text-sm">
          Open to Work
        </p>
      </div>
    </section>
  );
}
