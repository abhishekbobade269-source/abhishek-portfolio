// Single source of truth for resume + portfolio content.
// Keep resume/src/resume.html in sync with this file when editing.

export const profile = {
  name: "Abhishek Bobade",
  role: "Operations Executive & Automation Builder",
  tagline: "I turn manual office workflows into automated, Salesforce-connected systems.",
  location: "Thane, Maharashtra, India",
  email: "abhishekbobade269@gmail.com",
  phone: "+91 98925 51614",
  github: "https://github.com/abhishekbobade269-source",
  linkedin: "https://www.linkedin.com/in/abhishek-bobade-09b3432b8/",
  summary:
    "Operations Executive with hands-on experience across office administration, resource management, and workflow automation. I build the internal tools — Google Apps Script systems, a Salesforce-integrated operations portal, PostgreSQL-backed tracking — that keep day-to-day operations running, and bring a CSE (AI & ML) background to how I approach process problems.",
} as const;

export type Experience = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    title: "Operations Executive & Admin",
    org: "Upstep Education Pvt. Ltd. (Upstep Academy)",
    location: "Andheri, Mumbai",
    period: "Dec 2025 — Present",
    bullets: [
      "Manage day-to-day office operations, administrative activities, and resource coordination.",
      "Own office resources, inventory, assets, and employee-related operational data end-to-end.",
      "Design and maintain live resource-management systems using Google Sheets scripting (Apps Script) combined with AI-assisted automation.",
      "Build and maintain an internal operations web portal, integrated with Salesforce, for employee and inventory data management.",
      "Use PostgreSQL as the backend data store for operational reporting and tracking.",
      "Automate recurring workflows and reports to cut manual effort and reduce data-entry errors.",
      "Maintain structured operational records and stock-tracking systems; collaborate across teams to streamline digital processes.",
    ],
  },
  {
    title: "Digital Marketing Associate",
    org: "Diginavigators",
    location: "",
    period: "Mar 2024 — Jun 2024",
    bullets: [
      "Supported SEO, social media marketing, and web-services delivery for multiple client accounts.",
      "Coordinated projects across clients, sharpening communication, analytical, and operational-management skills.",
    ],
  },
];

export type ProjectStatus = "In Development" | "Academic Exercise" | "Live";

export type Project = {
  name: string;
  tag: string;
  status: ProjectStatus;
  stack: string[];
  description: string;
  links?: { repo?: string; demo?: string; caseStudy?: string };
};

// These four started as college coursework and are being rebuilt, one at a
// time, into fully engineered reference projects — real auth/RBAC, tests,
// CI, Docker, docs. Status is kept honest: nothing here is oversold as
// finished before it is. Links appear only once something is actually
// public (repo pushed / demo deployed).
export const projects: Project[] = [
  {
    name: "Inventory & Asset Management System",
    tag: "Independent Project",
    status: "In Development",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
    description:
      "A standalone inventory/asset-tracking system — ledgered stock movements, low-stock alerts, supplier records, and role-based access — modeled on the real operations tooling I build day-to-day at Upstep Academy.",
  },
  {
    name: "DroneOps AI — Surveillance Drone Platform",
    tag: "Independent Project",
    status: "In Development",
    stack: ["Next.js", "TypeScript", "MAVLink", "WebSocket"],
    description:
      "Started as a college autonomous-drone prototype (computer-vision object detection + real-time decision logic for traffic monitoring and disaster response); being rebuilt as a fleet command-and-telemetry platform with a built-in flight simulator and a real MAVLink adapter behind one connectivity abstraction.",
    links: { caseStudy: "/work/drone" },
  },
  {
    name: "Network Intrusion Detection System (IDS)",
    tag: "Independent Project",
    status: "In Development",
    stack: ["Python", "Packet Capture", "Detection Rules", "ML"],
    description:
      "Started as coursework on monitoring live network traffic for anomalies; being rebuilt as a modular NIDS with a rules engine, an ML-based anomaly detector, and an alerting API/dashboard bridge.",
    links: {
      repo: "https://github.com/abhishekbobade269-source/network-intrusion-detection-system",
      caseStudy: "/work/nids",
    },
  },
  {
    name: "WiFi Security Lab (802.11 Deauthentication)",
    tag: "Independent Project",
    status: "Live",
    stack: ["Python", "Scapy", "pytest", "Next.js"],
    description:
      "A hard-gated 802.11 deauthentication tool and its defensive counterpart (flood detector), built for a controlled lab environment only — every attack path runs through an explicit, expiring authorization allow-list plus an interactive confirmation step. Furthest along of these rebuilds: safety design, tests, docs, and CI are already in place, plus a hardware-free interactive demo (the real detection algorithm ported to the browser) for anyone without lab equipment.",
    links: {
      repo: "https://github.com/abhishekbobade269-source/wifi-deauth-lab",
      demo: "https://web-topaz-one-55.vercel.app",
      caseStudy: "/work/wifi",
    },
  },
  {
    name: "Android Penetration Testing (Ethical)",
    tag: "Academic Project",
    status: "Academic Exercise",
    stack: ["Kali Linux", "Android"],
    description:
      "Practiced ethical Android penetration testing using Kali Linux — identifying vulnerabilities and documenting recommended fixes as part of a security-fundamentals course.",
  },
];

export type ClientProject = {
  name: string;
  role: string;
  status: ProjectStatus;
  stack: string[];
  description: string;
  highlights: string[];
  links?: { repo?: string; demo?: string };
};

export const clientWork: ClientProject[] = [
  {
    name: "The Bling Haven",
    role: "Freelance Full-Stack Developer",
    status: "Live",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Vercel", "Render"],
    description:
      "An enterprise-style jewelry e-commerce platform I built and maintain as a freelance engagement: a public storefront, an internal admin portal, and a backing API, deployed and running in production.",
    highlights: [
      "Storefront + CMS-managed content: navigation, hero banners, promotions, category pages",
      "Admin portal with RBAC-filtered navigation, real Prisma-backed analytics dashboard, and audit-relevant activity across catalog, orders, and customers",
      "Session-based auth via an HttpOnly-cookie BFF proxy, plus 2FA support",
      "Error monitoring (Sentry) across the API and admin app, keep-alive health checks for uptime",
    ],
    links: { demo: "https://theblinghaven-web.vercel.app" },
  },
];

export type SkillGroup = {
  group: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    group: "Automation & Scripting",
    items: ["Google Apps Script", "AI-assisted workflow automation", "Process optimization"],
  },
  {
    group: "Web Development",
    items: ["Frontend development", "Web application development", "PostgreSQL"],
  },
  {
    group: "Operations",
    items: ["Inventory & asset management", "Resource coordination", "Data management"],
  },
  {
    group: "Platforms",
    items: ["Salesforce (working knowledge)"],
  },
  {
    group: "Analytical",
    items: ["Python", "SQL", "Research & analytics", "Team coordination"],
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Engineering — CSE (AI & ML)",
    school: "SMT. Indira Gandhi College of Engineering, Navi Mumbai",
    period: "Jun 2021 — May 2025",
    detail: "77% • Deep Learning and Data Science coursework",
  },
  {
    degree: "HSC (XII) — PCM",
    school: "Arunodaya Public School (CBSE)",
    period: "2021",
    detail: "82%",
  },
];

export const certifications = ["Ignite Management Community", "GDSC Core Team"];

export const additional = {
  languages: ["English", "Hindi", "Marathi"],
  hobbies: ["Hiking", "Powerlifting", "Mountain Biking"],
  achievement: "District-Level — Powerlifting",
};
