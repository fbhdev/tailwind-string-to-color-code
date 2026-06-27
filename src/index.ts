import { palette } from "./palette.js";

export type Format = "hex" | "rgba" | "oklch";
export const colorNames = (): string[] => Object.keys(palette);

/**
 * Convert a Tailwind color name (e.g. "blue-500") to a CSS color string.
 * oklch is returned verbatim from Tailwind's palette; hex/rgba are derived from it.
 * Throws on an unknown name.
 */
export function tailwindColor(name: string, format: Format = "hex"): string {
  const oklch = palette[name];
  if (!oklch) throw new Error(`Unknown Tailwind color: "${name}"`);
  if (format === "oklch") return oklch;

  const [r, g, b] = oklchToRgb(oklch);
  if (format === "rgba") return `rgba(${r}, ${g}, ${b}, 1)`;
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}

// "oklch(62.3% 0.214 259.815)" -> [L(0..1), C, H(deg)]
function parseOklch(s: string): [number, number, number] {
  const m = s.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/i);
  if (!m) throw new Error(`Bad oklch string: ${s}`);
  const L = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  return [L, parseFloat(m[2]), parseFloat(m[3])];
}

// OKLCH -> sRGB (0..255), via Ottosson's OKLab matrices. Clamped to gamut.
function oklchToRgb(s: string): [number, number, number] {
  const [L, C, Hdeg] = parseOklch(s);
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, sc = s_ ** 3;

  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * sc,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * sc,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * sc,
  ];
  return lin.map((x) => {
    const g = x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(g * 255)));
  }) as [number, number, number];
}
