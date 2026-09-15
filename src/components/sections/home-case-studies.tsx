"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { clientWork, projects } from "@/data/resume";

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

// Feature bullets below are reformatted directly from each project's own
// `description` in resume.ts — no new capabilities are claimed here, just
// broken into a scannable list.
const featuresByName: Record<string, string[]> = {
  "The Bling Haven": [
    "Storefront + CMS-managed content: navigation, hero banners, promotions, category pages",
    "Admin portal with RBAC-filtered navigation and a real Prisma-backed analytics dashboard",
    "Session-based auth via an HttpOnly-cookie BFF proxy, plus 2FA support",
    "Error monitoring (Sentry) across the API and admin app, keep-alive health checks",
  ],
  "Inventory & Asset Management System": [
    "Ledgered stock movements with a full audit trail",
    "Low-stock alerts and supplier records",
    "Role-based access control",
    "Modeled on real day-to-day operations tooling",
  ],
  "DroneOps AI": [
    "Fleet command-and-telemetry console",
    "Built-in flight simulator — runs live with zero real hardware",
    "Real MAVLink v2/UDP connectivity adapter",
    "Started as a computer-vision object-detection prototype for traffic/disaster response",
  ],
  "Network Intrusion Detection System": [
    "YAML-based signature rules engine",
    "Isolation-Forest ML anomaly detector",
    "PostgreSQL-backed alerting API",
    "Live dashboard with a websocket feed",
  ],
  "WiFi Security Lab": [
    "Hard-gated attack module behind an expiring authorization allow-list",
    "Real-time flood detector — the defensive counterpart",
    "Tests, docs, and CI already in place",
    "Hardware-free interactive browser demo of the real detection algorithm",
  ],
};

const thumbs: Record<string, string> = {
  "The Bling Haven": "/projects/bling-haven-thumb.jpg",
  "Inventory & Asset Management System": "/projects/inventory-thumb.jpg",
  "DroneOps AI": "/projects/drone-thumb.jpg",
  "Network Intrusion Detection System": "/projects/nids-thumb.jpg",
  "WiFi Security Lab": "/projects/wifi-thumb.jpg",
};

type Showcase = {
  name: string;
  eyebrow: string;
  status: string;
  description: string;
  stack: string[];
  demo?: string;
  repo?: string;
  caseStudy?: string;
};

const showcase: Showcase[] = [
  {
    name: "The Bling Haven",
    eyebrow: "Client Work · E-commerce",
    status: "Live",
    description: clientWork[0].description,
    stack: clientWork[0].stack,
    demo: clientWork[0].links?.demo,
  },
  {
    name: "Inventory & Asset Management System",
    eyebrow: "Independent Project",
    status: "Live",
    description: projects[0].description,
    stack: projects[0].stack,
    demo: projects[0].links?.demo,
    repo: projects[0].links?.repo,
    caseStudy: projects[0].links?.caseStudy,
  },
  {
    name: "DroneOps AI",
    eyebrow: "Independent Project",
    status: "Live",
    description: projects[1].description,
    stack: projects[1].stack,
    demo: projects[1].links?.demo,
    caseStudy: projects[1].links?.caseStudy,
  },
  {
    name: "Network Intrusion Detection System",
    eyebrow: "Independent Project",
    status: "Live",
    description: projects[2].description,
    stack: projects[2].stack,
    demo: projects[2].links?.demo,
    repo: projects[2].links?.repo,
    caseStudy: projects[2].links?.caseStudy,
  },
  {
    name: "WiFi Security Lab",
    eyebrow: "Independent Project",
    status: "Live",
    description: projects[3].description,
    stack: projects[3].stack,
    demo: projects[3].links?.demo,
    repo: projects[3].links?.repo,
    caseStudy: projects[3].links?.caseStudy,
  },
];

export function HomeCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="w-full bg-white px-3 py-20 md:px-6 md:py-36">
      <div ref={containerRef} className="relative mx-auto flex max-w-7xl flex-col gap-24 md:gap-48">
        {/* Scroll-linked "data flow" rail — fills as you scroll, plus a
            continuously traveling pulse for an ambient signal effect. */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
          <div className="absolute inset-0 bg-black/10" />
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-[#34d399]"
            style={{ scaleY: scrollYProgress }}
          />
          <motion.div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#34d399]"
            style={{ boxShadow: "0 0 18px 5px rgba(52,211,153,0.6)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {showcase.map((item, i) => {
          const imageRight = i % 2 === 0;
          const features = featuresByName[item.name] ?? [];
          const thumb = thumbs[item.name];

          return (
            <div
              key={item.name}
              className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20"
            >
              <span className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#34d399] bg-white md:block" />

              <motion.div
                initial={{ opacity: 0, x: imageRight ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative aspect-[16/9] overflow-hidden rounded-2xl border border-black/10 ${
                  imageRight ? "md:order-2" : "md:order-1"
                }`}
              >
                {thumb && (
                  <Image
                    src={thumb}
                    alt={`${item.name} homepage`}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                )}
                <span className="absolute top-5 left-5 z-10 flex items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                  {item.status}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: imageRight ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={imageRight ? "md:order-1" : "md:order-2"}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/40 md:text-sm">
                  {String(i + 1).padStart(2, "0")} — {item.eyebrow}
                </p>
                <h3 className="mb-5 text-4xl font-bold leading-[1.02] text-black md:text-6xl">{item.name}</h3>
                <p className="mb-7 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
                  {item.description}
                </p>

                {features.length > 0 && (
                  <ul className="mb-8 flex flex-col gap-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-black/70 md:text-base">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#34d399]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mb-8 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/15 bg-stone-50 px-3.5 py-1.5 text-xs font-semibold text-black md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {item.demo && (
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105 md:text-base"
                    >
                      View Live Demo {arrow}
                    </a>
                  )}
                  {item.caseStudy && (
                    <Link
                      href={item.caseStudy}
                      className="inline-flex items-center gap-2 rounded-full border border-black/20 px-7 py-3.5 text-sm font-bold text-black transition-colors hover:border-black md:text-base"
                    >
                      Case Study {arrow}
                    </Link>
                  )}
                  {item.repo && (
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-black/50 transition-colors hover:text-black md:text-base"
                    >
                      View Source {arrow}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
