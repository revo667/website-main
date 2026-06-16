# Plan: Modern Link-in-Bio Layout

## Sections (3 full-screen snap pages)

1. **Home** — logo + name (current content, restyled)
2. **Links** — vertical stack of social/link buttons (GitHub, Twitter/X, Instagram, Email — placeholders you can edit later)
3. **About** — short bio paragraph + tagline

## Layout changes

### `src/routes/index.tsx`

- Container becomes a vertical snap-scroll wrapper: `h-screen overflow-y-scroll snap-y snap-mandatory` with 3 `<section className="h-screen snap-start">` children.
- `RainEffect` stays as a fixed background behind all sections.
- Right-side indicator + active section state shared at the page level.

### Section 1 — Home (centered)

- Move logo + typing text from `top-32` to vertical+horizontal center (`flex items-center justify-center h-full`).
- Bigger text: `text-5xl md:text-7xl`.
- Glow via `text-shadow` using arbitrary Tailwind: `drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]` + a softer second layer for halo.
- Down arrow pinned to bottom of section 1 (`absolute bottom-10`), light stroke, `animate-bounce`, clicking it smooth-scrolls to section 2.

### Section 2 — Links

- Centered column of 4 link buttons, glassy outline style (`border border-white/20 bg-white/5 backdrop-blur`), hover lifts + glow.
- Heading: "Links".

### Section 3 — About

- Centered short bio + small "revo667" mark.
- Heading: "About".

## New component: `src/components/PageIndicator.tsx`

Fixed on right edge (`fixed right-6 top-1/2 -translate-y-1/2 z-20`).

- Renders 3 vertical lines (thin `w-px h-12 bg-white/30`) stacked with gap.
- A single dot (`h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]`) absolutely positioned, its `top` animated via `transition-transform duration-500` based on `activeIndex`.
- Clicking a line scrolls to that section.

## Active-section tracking

In `index.tsx`:

- `useState<number>(0)` for active index.
- `IntersectionObserver` on the 3 section refs, threshold 0.5 → updates active index.
- Pass `activeIndex` + `onSelect(i)` to `PageIndicator`.
- Down arrow click → `sectionRefs[1].current?.scrollIntoView({ behavior: 'smooth' })`.

## Icon

Use `ChevronDown` from `lucide-react` (already available) for the down arrow, `stroke-white/70 w-8 h-8`.

## Files touched

- edit `src/routes/index.tsx` (restructure into 3 snap sections, centering, glow, arrow, observer wiring)
- new `src/components/PageIndicator.tsx`
- new `src/components/LinksSection.tsx` (keeps index.tsx tidy)
- new `src/components/AboutSection.tsx`

No backend, no new deps.
