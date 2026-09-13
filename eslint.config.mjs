import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Sibling project folders: independent projects with their own tooling
    // (and, for Wifi deauthentication, a Python .venv) — not part of this
    // site's codebase, so this config should never lint into them.
    "Ai Automation Drone/**",
    "IDS(Intrusion Detection system)/**",
    "Wifi deauthentication/**",
    "Inventory Management System/**",
    // Standalone Node CLI script (CommonJS, not part of the app bundle).
    "scripts/**",
  ]),
]);

export default eslintConfig;
