# Skyline Webx — Studio Portfolio

Portfolio site for **Ayla / Skyline Webx** — React + Vite + Tailwind CSS, GSAP ScrollTrigger, Framer Motion and Lenis.
Live: https://skylinewebx.github.io

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Page sequence

| Section | Component | Motion |
| --- | --- | --- |
| Logo intro (~1.25s, once per session) | `Loader.jsx` | logo settles in, panel lifts away |
| Ruled nav + live binary strip, slide-out drawer | `Navbar.jsx` | cells cascade in; drawer slides from the right with a blurred backdrop |
| Hero + studio monitor | `Hero.jsx` | line mask reveal, pop-in chips, pointer-warped grid (`ui/WarpGrid.jsx`), live clock + FPS |
| About · Services mosaic · Process | `Studio.jsx` | mosaic cells flip open on scroll, perspective "corridor" margins |
| Identity | `Identity.jsx` | pinned; organic blob grows with scroll to reveal the panel |
| Work: phone columns → pill → letter wall → index | `Work.jsx`, `ProjectIndex.jsx` | parallax columns, word scrolling inside the pill, pinned wall with project cards flying across |
| AI assistants (all 4 chatbots) | `AIShowcase.jsx` | window reveals, real chat screenshots |
| CTA | `CTA.jsx` | pinned; perspective type rises and flattens |
| Contact | `Contact.jsx` | "GO" disc morphs into a circular form; grid bulges around it |

## Editing content

| What | Where |
| --- | --- |
| Copy, services, process, contact, socials, nav | `src/data/site.js` |
| Websites (title, category, description, technologies, `liveUrl`, `githubUrl`, images) | `src/data/projects.js` |
| AI assistants (summary, features, stats, links, screenshots) | `src/data/assistants.js` |
| Theme palettes (Skyline Blue · Monochrome · Warm · Dark) | `src/index.css` → `[data-theme=…]` tokens; labels in `src/lib/theme.jsx` |
| Fonts (self-hosted, latin) | `public/fonts` + `@font-face` in `src/index.css` |

Project/assistant screenshots live in `src/assets/shots` (`<slug>.webp` 1440×900, `-sm` 720×450, `-m` phone). Replace a file with the same name to update it.

## Themes

The theme button in the nav cycles themes; the drawer has all four as a radio group. Switching uses a full-screen wipe and is saved in `localStorage` (`swx-theme`); an inline script in `index.html` applies it before first paint.

## Contact form

No backend: **Submit** validates and opens the visitor's email app with the inquiry addressed to `info@skylinewebx.com`. Replace `send()` in `src/components/Contact.jsx` to use a form service.

## Motion & accessibility

- Lenis is driven by GSAP's ticker so pins and smooth scroll stay in sync; touch keeps native scrolling.
- `prefers-reduced-motion: reduce` disables the loader, Lenis, pins, wipes and reveals — every section renders as a static layout (the project wall becomes a grid).
- Skip link, visible focus rings, focus-trapped drawer, Esc closes the drawer and contact disc.

## Deploying

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`.

## Brand assets

`scripts/skylinewebx-logo-source.jpg` is the supplied logo; `node scripts/make-brand-assets.cjs` regenerates the resized logo, favicons and `public/og-image.jpg` (resize only).
