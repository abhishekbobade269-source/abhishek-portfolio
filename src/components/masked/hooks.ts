"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type CardPosition = { x: number; y: number; sw: number; sh: number };

/**
 * Measures each card's offset relative to its shared section container, plus
 * the section's own width/height. Together with a background image scaled to
 * fill the section, this lets each card render as a "window" into one shared
 * image (see MaskedCard) — re-measured whenever the section resizes.
 */
export function useMaskPositions(
  sectionRef: RefObject<HTMLElement | null>,
  cardsRef: RefObject<(HTMLElement | null)[]>
) {
  const [positions, setPositions] = useState<CardPosition[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const next = cardsRef.current.map((card): CardPosition => {
        if (!card) return { x: 0, y: 0, sw: sectionRect.width, sh: sectionRect.height };
        const cardRect = card.getBoundingClientRect();
        return {
          x: cardRect.left - sectionRect.left,
          y: cardRect.top - sectionRect.top,
          sw: sectionRect.width,
          sh: sectionRect.height,
        };
      });
      setPositions(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef, cardsRef]);

  return positions;
}

/** How wide `src` would render if scaled to fill height `sectionHeight`. */
export function useImageWidth(src: string, sectionHeight: number) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!src || !sectionHeight) return;
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth * (sectionHeight / img.naturalHeight));
    };
    img.src = src;
  }, [src, sectionHeight]);

  return width;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

/** Fade-and-rise reveal for `count` siblings, staggered, firing once. */
export function useStaggeredReveal(count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = (index: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  // count is accepted for API symmetry with the spec (call sites pass however
  // many cards they render); the reveal itself is driven by the container.
  void count;

  return { containerRef, getAnimStyle };
}
