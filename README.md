![Convert tailwind string into color codes](https://raw.githubusercontent.com/fbhdev/tailwind-string-to-color-code/main/assets/og-image.png)

# tailwind-string-to-color-code

Convert a Tailwind color name (e.g. `blue-500`) to `hex`, `rgba`, or `oklch`.

[npm](https://www.npmjs.com/package/tailwind-string-to-color-code) · palette from **Tailwind CSS v4.3.1**

## Install

```bash
npm i tailwind-string-to-color-code
```

## Usage

```ts
import { tailwindColor } from "tailwind-string-to-color-code";

tailwindColor("blue-500");          // "#2b7fff"        (hex is the default)
tailwindColor("blue-500", "rgba");  // "rgba(43, 127, 255, 1)"
tailwindColor("blue-500", "oklch"); // "oklch(62.3% 0.214 259.815)"

tailwindColor("blurple-500");       // throws: Unknown Tailwind color
```

`colorNames()` returns every supported name.

## Notes

- Source of truth is the **Tailwind CSS v4.3.1** palette (`tailwindcss/colors`), where
  colors are authored in **oklch** — so `oklch` is returned verbatim. `hex`/`rgba` are
  derived from it (sRGB, gamut-clamped). Hex values therefore match Tailwind **v4**, not v3.
- Regenerate the palette after a Tailwind bump: `npm run gen`.
