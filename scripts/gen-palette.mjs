// Regenerate src/palette.ts from the installed tailwindcss color palette.
// Run: node scripts/gen-palette.mjs  (after `npm i -D tailwindcss`)
import colors from "tailwindcss/colors";
import { writeFileSync } from "node:fs";

// black/white ship as plain hex, not oklch; add them as oklch so the palette stays single-format.
const entries = { white: "oklch(100% 0 0)", black: "oklch(0% 0 0)" };
for (const [family, shades] of Object.entries(colors)) {
  if (typeof shades !== "object" || shades === null) continue; // skip inherit/current/string aliases
  for (const [shade, value] of Object.entries(shades)) {
    if (typeof value === "string" && value.startsWith("oklch")) {
      entries[`${family}-${shade}`] = value;
    }
  }
}

const body = Object.entries(entries)
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  .join("\n");

writeFileSync(
  new URL("../src/palette.ts", import.meta.url),
  `// AUTO-GENERATED from tailwindcss/colors by scripts/gen-palette.mjs. Do not edit.\n` +
    `export const palette: Record<string, string> = {\n${body}\n};\n`
);

console.log(`Wrote ${Object.keys(entries).length} colors to src/palette.ts`);
