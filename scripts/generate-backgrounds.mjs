// Generates the abstract, code-drawn background art used by the homepage's
// masked-card sections (see src/components/masked/). Deliberately not
// photographic — every case-study page in this repo already prefers a
// self-built canvas/SVG animation over licensed or AI stock media, and this
// keeps that same convention for the homepage redesign. Re-run with
// `node scripts/generate-backgrounds.mjs` if the motif ever needs to change;
// output is checked in as static SVG so it works with the masked-card
// technique (which needs a real, measurable image).

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "backgrounds");
mkdirSync(outDir, { recursive: true });

// Small seeded PRNG so re-runs are deterministic.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const INK = "#0a0a0a";
const FAINT = "rgba(10,10,10,0.10)";
const ACCENT = "#10b981"; // emerald-500, echoes the existing favicon/orbit motif

function svgHeader(w, h, id) {
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#ffffff" />
  <rect width="${w}" height="${h}" fill="url(#grain-${id})" opacity="0.4" />
  <defs>
    <pattern id="grain-${id}" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" fill="#ffffff" />
      <circle cx="1" cy="1" r="0.4" fill="rgba(10,10,10,0.03)" />
    </pattern>
    <radialGradient id="blob-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.16" />
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="blobDark-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${INK}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="${INK}" stop-opacity="0" />
    </radialGradient>
  </defs>`;
}

// A handful of large soft gradient blobs spread across the canvas so no
// masked-card "window" ever lands on flat, empty white — every crop keeps
// some tonal variation even between nodes/lines.
function wash(w, h, rnd, id) {
  let body = "";
  const blobCount = 7;
  for (let i = 0; i < blobCount; i++) {
    const cx = (w / blobCount) * i + rnd() * (w / blobCount);
    const cy = h * (0.2 + rnd() * 0.6);
    const r = 260 + rnd() * 260;
    const grad = rnd() > 0.5 ? `blob-${id}` : `blobDark-${id}`;
    body += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#${grad})" />`;
  }
  return body;
}

// --- 1. Hero mesh: orbit rings + node clusters, density rising left→right ---
function heroMesh() {
  const w = 2600;
  const h = 1500;
  const rnd = mulberry32(42);
  let body = svgHeader(w, h, "hero");
  body += wash(w, h, rnd, "hero");

  // Three big orbit-ring clusters echoing OrbitBackground, spaced across the
  // canvas width so each masked-card "window" reveals a different one.
  const clusters = [
    { cx: w * 0.14, cy: h * 0.62, rings: [90, 150, 210] },
    { cx: w * 0.52, cy: h * 0.32, rings: [110, 190, 270, 350] },
    { cx: w * 0.86, cy: h * 0.68, rings: [70, 130] },
  ];

  for (const c of clusters) {
    for (const r of c.rings) {
      body += `<circle cx="${c.cx}" cy="${c.cy}" r="${r}" fill="none" stroke="${FAINT}" stroke-width="1.5" />`;
      const nodeCount = 3 + Math.floor(rnd() * 3);
      for (let i = 0; i < nodeCount; i++) {
        const angle = (Math.PI * 2 * i) / nodeCount + rnd();
        const nx = c.cx + Math.cos(angle) * r;
        const ny = c.cy + Math.sin(angle) * r;
        body += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="4.5" fill="${ACCENT}" opacity="0.75" />`;
      }
    }
    body += `<circle cx="${c.cx}" cy="${c.cy}" r="5" fill="${INK}" />`;
  }

  // Faint connective lines drifting across the canvas.
  for (let i = 0; i < 14; i++) {
    const y1 = rnd() * h;
    const y2 = y1 + (rnd() - 0.5) * 260;
    body += `<line x1="0" y1="${y1.toFixed(1)}" x2="${w}" y2="${y2.toFixed(1)}" stroke="${FAINT}" stroke-width="1" />`;
  }

  // Scattered small dots for texture.
  for (let i = 0; i < 260; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + rnd() * 1.8).toFixed(1)}" fill="${INK}" opacity="${(0.08 + rnd() * 0.14).toFixed(2)}" />`;
  }

  body += `</svg>`;
  return { name: "hero-mesh.svg", body };
}

// --- 2. Projects grid: circuit/network-graph motif ---
function projectsGrid() {
  const w = 2600;
  const h = 1500;
  const rnd = mulberry32(7);
  let body = svgHeader(w, h, "projects");
  body += wash(w, h, rnd, "projects");

  const cols = 13;
  const rows = 8;
  const cellW = w / cols;
  const cellH = h / rows;
  const nodes = [];

  for (let cx = 0; cx <= cols; cx++) {
    for (let cy = 0; cy <= rows; cy++) {
      if (rnd() > 0.8) continue;
      const x = cx * cellW + (rnd() - 0.5) * 20;
      const y = cy * cellH + (rnd() - 0.5) * 20;
      nodes.push({ x, y, cx, cy });
    }
  }

  // Orthogonal "trace" segments between nearby nodes (circuit-board feel).
  for (const n of nodes) {
    const right = nodes.find((m) => m.cx === n.cx + 1 && m.cy === n.cy);
    const down = nodes.find((m) => m.cx === n.cx && m.cy === n.cy + 1);
    if (right && rnd() > 0.15) {
      body += `<path d="M${n.x.toFixed(1)} ${n.y.toFixed(1)} L${right.x.toFixed(1)} ${n.y.toFixed(1)} L${right.x.toFixed(1)} ${right.y.toFixed(1)}" fill="none" stroke="${FAINT}" stroke-width="1.5" />`;
    }
    if (down && rnd() > 0.15) {
      body += `<path d="M${n.x.toFixed(1)} ${n.y.toFixed(1)} L${n.x.toFixed(1)} ${down.y.toFixed(1)} L${down.x.toFixed(1)} ${down.y.toFixed(1)}" fill="none" stroke="${FAINT}" stroke-width="1.5" />`;
    }
  }

  for (const n of nodes) {
    const isAccent = rnd() > 0.7;
    body += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${isAccent ? 5 : 3}" fill="${isAccent ? ACCENT : INK}" opacity="${isAccent ? 0.8 : 0.35}" />`;
  }

  body += `</svg>`;
  return { name: "projects-grid.svg", body };
}

// --- 3. Skills portrait: tall abstract orbit composition ---
function skillsPortrait() {
  const w = 1300;
  const h = 1700;
  const rnd = mulberry32(99);
  let body = svgHeader(w, h, "skills");
  body += wash(w, h, rnd, "skills");

  const cx = w * 0.5;
  const cy = h * 0.42;
  const rings = [140, 230, 320, 420, 530];
  for (const r of rings) {
    body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${FAINT}" stroke-width="1.5" />`;
  }
  for (let i = 0; i < 22; i++) {
    const r = rings[i % rings.length];
    const angle = rnd() * Math.PI * 2;
    const nx = cx + Math.cos(angle) * r;
    const ny = cy + Math.sin(angle) * r;
    const isAccent = rnd() > 0.55;
    body += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="${isAccent ? 6 : 3.5}" fill="${isAccent ? ACCENT : INK}" opacity="${isAccent ? 0.85 : 0.3}" />`;
  }
  body += `<circle cx="${cx}" cy="${cy}" r="7" fill="${INK}" />`;

  // Vertical drift lines toward the bottom, where the overlay cards sit.
  for (let i = 0; i < 10; i++) {
    const x1 = rnd() * w;
    const x2 = x1 + (rnd() - 0.5) * 200;
    body += `<line x1="${x1.toFixed(1)}" y1="${h * 0.55}" x2="${x2.toFixed(1)}" y2="${h}" stroke="${FAINT}" stroke-width="1" />`;
  }

  body += `</svg>`;
  return { name: "skills-portrait.svg", body };
}

for (const gen of [heroMesh, projectsGrid, skillsPortrait]) {
  const { name, body } = gen();
  writeFileSync(path.join(outDir, name), body, "utf8");
  console.log("wrote", name);
}
