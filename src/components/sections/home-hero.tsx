"use client";

import { useRef } from "react";
import { MaskedCard } from "@/components/masked/masked-card";
import { useImageWidth, useIsMobile, useMaskPositions, useStaggeredReveal } from "@/components/masked/hooks";
import { profile } from "@/data/resume";

const HERO_IMAGE = "/backgrounds/hero-mesh.svg";

const featureBars = ["Workflow Automation", "Full-Stack Web Development", "Data-Driven Operations"];

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  const { containerRef: revealRef, getAnimStyle } = useStaggeredReveal(4);

  const positions = useMaskPositions(sectionRef, cardsRef);
  const sectionHeight = positions[0]?.sh ?? 0;
  const imageWidth = useImageWidth(HERO_IMAGE, sectionHeight);
  const focalX = isMobile ? 0.7 : 0.8;

  return (
    <section
      id="top"
      ref={(el) => {
        sectionRef.current = el;
        revealRef.current = el;
      }}
      className="flex h-screen w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-24 md:gap-2 md:px-5 md:pb-2 md:pt-24"
    >
      {featureBars.map((label, i) => (
        <MaskedCard
          key={label}
          bgImage={HERO_IMAGE}
          position={positions[i]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[i] = el;
          }}
          className="relative h-14 w-full shrink-0 overflow-hidden rounded-xl md:h-20 md:rounded-2xl"
          style={getAnimStyle(i)}
        >
          <span className="relative z-10 flex h-full items-center justify-center text-center text-lg font-bold text-black md:text-3xl">
            {label}
          </span>
        </MaskedCard>
      ))}

      <MaskedCard
        bgImage={HERO_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        cardRef={(el) => {
          cardsRef.current[3] = el;
        }}
        className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl md:rounded-2xl"
        style={getAnimStyle(3)}
      >
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
      </MaskedCard>
    </section>
  );
}
