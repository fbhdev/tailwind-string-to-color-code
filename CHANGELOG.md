# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-08-20

### Changed

- Palette now tracks **Tailwind CSS v4.3.3** (was v4.3.1).
- Achromatic colors return an omitted hue in `oklch` format. `tailwindColor("neutral-500", "oklch")`
  now returns `"oklch(55.6% 0 none)"` instead of `"oklch(55.6% 0 0)"`, matching what Tailwind
  itself emits. Affects `neutral-*`, `zinc-50`, and `mauve-50`. **`hex` and `rgba` output is
  byte-identical to v0.1.1** — only the verbatim `oklch` passthrough changed.

### Fixed

- `tailwindColor()` no longer throws `Bad oklch string` on achromatic colors. Every
  `neutral-*` lookup was broken against Tailwind v4.3.3 because the parser only accepted
  numeric hue channels.

## [0.1.1] - 2026-08-19

### Added

- Initial release: convert a Tailwind color name to `hex`, `rgba`, or `oklch`.
