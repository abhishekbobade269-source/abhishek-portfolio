"use client";

import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setCount(step);
      if (step >= 100) {
        clearInterval(interval);
        window.setTimeout(() => setExiting(true), 200);
        window.setTimeout(onComplete, 200 + 700);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-start bg-white transition-opacity duration-700 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <span className="p-6 text-7xl font-bold leading-none tabular-nums text-black md:p-10 md:text-9xl">
        {count}
      </span>
    </div>
  );
}
