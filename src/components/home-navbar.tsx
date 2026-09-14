"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function HomeNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 px-4 py-2 backdrop-blur-md md:px-6 md:py-3">
        <a href="#top" className="flex flex-col">
          <span className="text-xl font-extrabold uppercase leading-none tracking-tight md:text-2xl">
            Abhishek
          </span>
          <span className="-mt-1.5 text-xl font-extrabold uppercase leading-none tracking-tight md:-mt-2 md:text-2xl">
            Bobade
          </span>
          <span className="mt-1.5 text-[8px] font-medium leading-none md:mt-2 md:text-[9px]">
            operations &amp; automation
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <span className="text-sm font-semibold text-black">Open to Work</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Menu
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? "translate-y-0 rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? "translate-y-0 -rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </header>

      <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col justify-center gap-1 px-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-bold text-black transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-neutral-500"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(2rem)",
                  transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                }}
              >
                {link.label}
              </a>
            ))}

            <div
              className="mt-8 border-t border-neutral-200 pt-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(2rem)",
                transitionDelay: open ? "450ms" : "0ms",
              }}
            >
              <p className="mb-4 text-sm font-semibold text-black">
                Operations Executive, Upstep Academy
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="block w-full rounded-full bg-black px-6 py-4 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-neutral-800"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
