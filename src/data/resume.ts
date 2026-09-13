// Single source of truth for resume + portfolio content.
// Keep resume/src/resume.html in sync with this file when editing.

export const profile = {
  name: "Abhishek Bobade",
  role: "Operations Executive & Automation Builder",
  tagline: "I turn manual office workflows into automated, Salesforce-connected systems.",
  location: "Thane, Maharashtra, India",
  email: "abhishekbobade269@gmail.com",
  phone: "+91 98925 51614",
  github: "https://github.com/scroder",
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

export type Project = {
  name: string;
  description: string;
  tag: string;
};

export const projects: Project[] = [
  {
    name: "AI-Assisted Surveillance Drone",
    tag: "Academic Project",
    description:
      "Built an autonomous drone prototype combining computer-vision object detection with real-time decision logic, exploring how aerial automation could support traffic monitoring and disaster-response scenarios.",
  },
  {
    name: "Network Intrusion Detection System (IDS)",
    tag: "Academic Project",
    description:
      "Implemented an IDS to monitor live network traffic, flag anomalous patterns, and alert on unauthorized access attempts.",
  },
  {
    name: "WiFi Security Testing (Deauthentication)",
    tag: "Academic Project",
    description:
      "Studied 802.11 deauthentication attacks in a controlled lab environment to understand wireless-network vulnerabilities, as coursework on network security.",
  },
  {
    name: "Android Penetration Testing (Ethical)",
    tag: "Academic Project",
    description:
      "Practiced ethical Android penetration testing using Kali Linux — identifying vulnerabilities and documenting recommended fixes as part of a security-fundamentals course.",
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
