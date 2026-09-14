"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import type { CardPosition } from "./hooks";

type MaskedCardProps = {
  bgImage: string;
  position?: CardPosition;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: ReactNode;
  cardRef?: Ref<HTMLDivElement>;
  style?: CSSProperties;
};

/**
 * One "window" into a shared background image. Every MaskedCard in a section
 * points at the same `bgImage`, scaled to fill the section's height; each
 * card offsets that image by its own position so the cards read as cut-outs
 * of one continuous photo rather than independent crops.
 */
export function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX,
  className,
  children,
  cardRef,
  style,
}: MaskedCardProps) {
  const pos = position ?? { x: 0, y: 0, sw: 0, sh: 0 };
  const overflow = imageWidth > pos.sw ? imageWidth - pos.sw : 0;
  const focalOffset = overflow * focalX;

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: `auto ${pos.sh}px`,
        backgroundPosition: `-${pos.x + focalOffset}px -${pos.y}px`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
