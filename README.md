# Four Skies — Weather Landing Page

A responsive landing page covering four weather types — **Sunny**, **Rainy**, **Snowy**, and **Windy & Stormy** — built with plain HTML, CSS, and JavaScript, split into three separate files.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure and content — hero section, nav markup, and the four weather sections |
| `styles.css` | All visual styling, color themes, layout, responsive breakpoints, and CSS-drawn weather icons |
| `script.js` | Nav interactivity — scroll tracking, hover previews, and the scroll progress bar |

## How to run it

No build step or server required.

1. Keep all three files in the same folder.
2. Double-click `index.html` (or open it in your browser via File → Open).
3. Scroll through the page or hover the nav links to see the effects.

If you want to serve it locally instead of opening the file directly (e.g. to avoid any browser file:// restrictions), run this from the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## What it does

### Fixed navigation bar
- Stays pinned to the top of the page on every section (`position: fixed`).
- **On scroll:** transitions from a translucent bar into a solid "instrument panel" background once you scroll past 40px, and a thin progress bar underneath fills up as you move through the four weather sections.
- **On hover:** hovering a nav link instantly previews that weather's accent color (amber for sunny, teal for rainy, ice-blue for snowy, violet for stormy) on the brand dot, the "now viewing" readout, and the progress bar — even before you scroll there.
- **Active state:** as you scroll, the nav automatically detects which weather section is in view and highlights the matching link.

### Weather sections
Each of the four sections (`#sunny`, `#rainy`, `#snowy`, `#stormy`) has its own color gradient, a CSS-only icon (sun, falling raindrop, spinning snowflake, lightning bolt), and a short stat block (sky cover, wind, temperature, etc.).

### Responsive behavior
- Layout switches from a two-column icon/text layout to a single stacked column under 980px.
- The nav's text readout hides and links become horizontally scrollable under 760px.
- Font sizes and icon sizes scale down further under 520px.
- Respects `prefers-reduced-motion` by disabling animations (sun pulse, cloud drift, snowflake spin, raindrop fall) for users who request it.

## Customizing

- **Colors:** all theme colors are defined as CSS custom properties at the top of `styles.css` under `:root` (`--sun`, `--rain`, `--snow`, `--storm`, etc.) — change them there to re-theme the whole page.
- **Copy:** section text and stats live directly in `index.html` inside each `<section class="weather-section">` block.
- **Nav behavior:** scroll/hover logic lives in `script.js` — see the numbered comments (`1.` through `4.`) marking each piece of behavior.
