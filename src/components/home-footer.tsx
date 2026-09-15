"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { profile } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

export function HomeFooter() {
  const footerRef = useRef<HTMLElement>(null);

  // Section 3 (HomeSkills) is a fixed-height `md:h-screen` sibling, so
  // without this it and the footer fight over the same viewport-height
  // budget — see `--footer-height` usage there, which shrinks that section
  // by exactly this much instead of it and the footer overlapping. Measured
  // (not hardcoded) because the footer wraps to more lines on narrow
  // viewports.
  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty("--footer-height", `${el.offsetHeight}px`);
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="flex flex-col items-center justify-between gap-3 px-4 py-6 text-xs font-medium text-black/50 sm:flex-row md:px-6"
    >
      <p className="flex items-center gap-2">
        <Image
          src="/backgrounds/footer-monogram.png"
          alt=""
          width={22}
          height={22}
          unoptimized
          className="h-[22px] w-[22px] opacity-70"
        />
        © {new Date().getFullYear()} {profile.name}. {profile.location}.
      </p>
      <div className="flex items-center gap-4">
        <a href={`mailto:${profile.email}`} className="hover:text-black">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-black">
          <GithubIcon width={14} height={14} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">
          <LinkedinIcon width={14} height={14} />
        </a>
      </div>
    </footer>
  );
}
