"use client";

import { useRef } from "react";
import Link from "next/link";
import { MaskedCard } from "@/components/masked/masked-card";
import { useImageWidth, useIsMobile, useMaskPositions, useStaggeredReveal } from "@/components/masked/hooks";
import { clientWork, profile, projects } from "@/data/resume";

const SECTION2_IMAGE = "/backgrounds/projects-grid.svg";

// The 4 independent rebuilds, in display order — parallels the dental
// template's fixed 4-item "services" grid, but pulled from real project data
// instead of hard-coded copy.
const gallery = projects
  .filter((p) => p.tag === "Independent Project")
  .map((p, i) => ({
    name: p.name.split(" — ")[0].split(" (")[0],
    num: String(i + 1).padStart(2, "0"),
    active: p.status === "Live",
    href: p.links?.caseStudy,
  }));

// Client work and academic exercises don't fit the 4-item independent-rebuild
// gallery above (different `tag`, no case-study page for either) but
// shouldn't be invisible on the homepage either — surfaced here as small
// badges in the otherwise-empty lower half of the "Shipped Products" card.
const otherWork = [
  ...clientWork.map((c) => ({ name: c.name, note: "Client Work", href: c.links?.demo })),
  ...projects
    .filter((p) => p.tag === "Academic Project")
    .map((p) => ({ name: p.name.split(" (")[0], note: "Academic", href: undefined as string | undefined })),
];

export function HomeProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  const { containerRef: revealRef, getAnimStyle } = useStaggeredReveal(4);

  const positions = useMaskPositions(sectionRef, cardsRef);
  const sectionHeight = positions[0]?.sh ?? 0;
  const imageWidth = useImageWidth(SECTION2_IMAGE, sectionHeight);
  const focalX = isMobile ? 0.65 : 0.8;

  return (
    <section
      id="projects"
      ref={(el) => {
        sectionRef.current = el;
        revealRef.current = el;
      }}
      className="flex min-h-screen w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-20 md:h-screen md:gap-2 md:px-5 md:pb-2 md:pt-24"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-1.5 md:grid-cols-2 md:grid-rows-[1fr_1fr_0.8fr] md:gap-2">
        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[0]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[0] = el;
          }}
          className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={getAnimStyle(0)}
        >
          <h2 className="absolute top-4 left-5 z-10 text-2xl font-bold text-black md:top-6 md:left-7 md:text-3xl">
            Project Gallery
          </h2>
          <p className="absolute bottom-4 left-5 z-10 text-xs font-semibold text-black md:bottom-6 md:left-7 md:text-sm">
            Real systems, shipped end to end
          </p>
        </MaskedCard>

        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[1]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[1] = el;
          }}
          className="relative min-h-[200px] overflow-hidden rounded-xl md:row-span-2 md:min-h-0 md:rounded-2xl"
          style={getAnimStyle(1)}
        >
          <p className="absolute bottom-16 left-5 z-10 text-xs font-semibold leading-4 text-black md:bottom-20 md:left-7 md:text-sm md:leading-5">
            If you&apos;re hiring for automation or full-stack work,
            <br />
            let&apos;s talk about the role.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="absolute bottom-4 right-4 z-10 rounded-full bg-black px-5 py-3 text-base font-bold text-white transition-transform hover:scale-105 md:bottom-6 md:right-6 md:px-8 md:py-5 md:text-xl"
          >
            Get In Touch
          </a>
        </MaskedCard>

        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[2]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[2] = el;
          }}
          className="relative min-h-[230px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
          style={getAnimStyle(2)}
        >
          <h3 className="absolute top-4 left-5 z-10 text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] text-black md:top-6 md:left-7">
            Shipped
            <br />
            Products
          </h3>

          <div className="absolute bottom-4 right-5 z-10 flex flex-col items-end gap-1.5 md:bottom-6 md:right-7 md:gap-2">
            {otherWork.map((item) =>
              item.href ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/15 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-black backdrop-blur-md transition-transform hover:scale-105 md:text-xs"
                >
                  {item.name} · {item.note}
                </a>
              ) : (
                <span
                  key={item.name}
                  className="rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-[11px] font-semibold text-black/70 backdrop-blur-md md:text-xs"
                >
                  {item.name} · {item.note}
                </span>
              )
            )}
          </div>
        </MaskedCard>

        <MaskedCard
          bgImage={SECTION2_IMAGE}
          position={positions[3]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[3] = el;
          }}
          className="relative min-h-[200px] overflow-hidden rounded-xl md:col-span-2 md:min-h-0 md:rounded-2xl"
          style={getAnimStyle(3)}
        >
          <div className="absolute inset-0 z-10 flex flex-wrap gap-1.5 p-2 md:flex-nowrap md:gap-2 md:p-3">
            {gallery.map((svc) => {
              const card = (
                <div
                  className={`flex min-w-[calc(50%-4px)] flex-1 flex-col justify-between rounded-xl p-3 transition-transform hover:scale-[1.02] md:min-w-0 md:rounded-2xl md:p-5 ${
                    svc.active ? "bg-white/90 backdrop-blur-md" : "bg-white/50 backdrop-blur-xl"
                  }`}
                >
                  <h3 className="text-xl font-bold leading-[1.05] whitespace-pre-line text-black md:text-4xl">
                    {svc.name}
                  </h3>
                  <span
                    className={`h-8 w-8 self-end rounded-full border flex items-center justify-center text-xs font-semibold text-black md:h-12 md:w-12 md:text-sm ${
                      svc.active ? "border-black" : "border-black/40"
                    }`}
                  >
                    {svc.num}
                  </span>
                </div>
              );
              return svc.href ? (
                <Link key={svc.name} href={svc.href} className="flex flex-1 min-w-[calc(50%-4px)] md:min-w-0">
                  {card}
                </Link>
              ) : (
                <div key={svc.name} className="flex flex-1 min-w-[calc(50%-4px)] md:min-w-0">
                  {card}
                </div>
              );
            })}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}
