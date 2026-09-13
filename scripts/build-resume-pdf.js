// Renders resume/src/resume.html -> resume/Abhishek_Bobade_Resume.pdf using
// Playwright's headless Chromium, then copies it into public/resume/ so the
// site's "Download Resume" button can serve it as a static asset.
//
// Usage: node scripts/build-resume-pdf.js

const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");

async function main() {
  const root = path.resolve(__dirname, "..");
  const srcHtml = path.join(root, "resume", "src", "resume.html");
  const outPdf = path.join(root, "resume", "Abhishek_Bobade_Resume.pdf");
  const publicPdf = path.join(root, "public", "resume", "Abhishek_Bobade_Resume.pdf");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${srcHtml}`);
  await page.pdf({
    path: outPdf,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();

  fs.mkdirSync(path.dirname(publicPdf), { recursive: true });
  fs.copyFileSync(outPdf, publicPdf);

  console.log(`Resume PDF written to:\n  ${outPdf}\n  ${publicPdf}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
