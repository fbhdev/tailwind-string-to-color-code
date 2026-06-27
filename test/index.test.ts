import { describe, it, expect } from "vitest";
import { tailwindColor, colorNames } from "../src/index.js";

describe("tailwindColor", () => {
  it("returns Tailwind's exact oklch verbatim", () => {
    expect(tailwindColor("blue-500", "oklch")).toBe("oklch(62.3% 0.214 259.815)");
  });

  it("derives hex from oklch (cross-checked against culori)", () => {
    expect(tailwindColor("blue-500", "hex")).toBe("#2b7fff");
    expect(tailwindColor("red-500")).toBe("#fb2c36"); // default format = hex
    expect(tailwindColor("white", "hex")).toBe("#ffffff");
    expect(tailwindColor("black", "hex")).toBe("#000000");
  });

  it("derives rgba", () => {
    expect(tailwindColor("blue-500", "rgba")).toBe("rgba(43, 127, 255, 1)");
  });

  it("throws on unknown names", () => {
    expect(() => tailwindColor("blurple-500")).toThrow(/Unknown Tailwind color/);
  });

  it("exposes the full name list", () => {
    expect(colorNames()).toContain("blue-500");
    expect(colorNames().length).toBeGreaterThan(200);
  });
});
