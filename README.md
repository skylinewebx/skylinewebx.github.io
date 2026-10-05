# Skyline Webx — Studio Portfolio

Portfolio site for **Ayla / Skyline Webx** — React + Vite + Tailwind CSS, Framer Motion and Lenis.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Editing content

| What | Where |
| --- | --- |
| Copy, services, process, AI section, contact text | `src/data/site.js` |
| Email, location, social links, nav | `src/data/site.js` → `brand`, `socials`, `nav` |
| Projects (name, category, description, services, tech, image, `liveUrl`, `caseStudyUrl`, layout) | `src/data/projects.js` |
| Colours (CSS variables) | `src/index.css` → `:root` |
| Fonts | `index.html` (Google Fonts link) + `tailwind.config.js` |

**Projects:** `liveUrl` and `caseStudyUrl` are `null` until real links exist — the project panel then shows "Live link coming soon". Set a URL and the "Visit live site" / "Read case study" buttons appear automatically. `layout` is `'left'`, `'right'` or `'full'`.

**Project images:** `src/assets/images/projects/<slug>.webp` (1440×900) and `<slug>-sm.webp` (720×450). They are real screenshots of each build. Replace a file with the same name to update it.

## Brand assets

The Skyline Webx mark lives in `scripts/skylinewebx-logo-source.jpg` (the supplied logo). `node scripts/make-brand-assets.cjs` regenerates the resized logo, favicons and `public/og-image.jpg` from it — sizes only, the mark is never altered.

## Contact form

There is no backend: **Send Inquiry** validates the form and opens the visitor's email app with the inquiry addressed to `info@skylinewebx.com`. To use a form service or API instead, replace the `send()` function in `src/components/Contact.jsx`.

## Motion & accessibility

- Intro logo reveal plays once per session (~1.2s) and is skipped for reduced motion or deep links.
- Lenis smooth scroll is wheel-only (native touch scrolling) and disabled for `prefers-reduced-motion`.
- With reduced motion, all reveals, the cursor lens, the marquee and magnetic buttons are turned off; the layout is fully static.
- Skip link, visible focus rings, focus-trapped mobile menu and project dialog (Esc to close).

## Deploying

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main` (Pages source: **GitHub Actions**). To serve it on `skylinewebx.com`, add `public/CNAME` containing `skylinewebx.com` — note that domain is currently attached to the Maison Ember repo, so remove it there first.
