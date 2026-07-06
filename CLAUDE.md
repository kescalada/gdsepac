# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, dependency-free website for the Groton Dunstable SEPAC (Special Education Parent Advisory
Council), hosted on GitHub Pages.

## Critical: the root `.html` files are generated — do not hand-edit them

Every `*.html` file in the repo root (`index.html`, `by-laws.html`, the five resource pages, etc.)
is a **build artifact** produced by `node tools/generate.js`. Editing them directly will be
silently overwritten the next time the generator runs. Always edit the source in `tools/` and
regenerate.

Source of truth lives in `tools/`:
- **`tools/content.js`** — hand-authored prose and shared config:
  - `NAV` (nav order), `EMAIL`, `FACEBOOK`, `DISTRICT` constants.
  - `PAGES` — the prose pages (home, about-us-contact, meetings-events) as HTML-body strings.
  - `DIRECTORY` — per-page config for the five "resource directory" pages: an `intro` HTML string
    plus a `skip` list of heading texts to omit from the auto-generated sections.
- **`tools/bylaws.js`** — the full by-laws page body (long; kept separate).
- **`tools/links.json`** — data for the resource directory pages. Each page key maps to an ordered
  array of items: headings `{type:"h",level,text}` and links `{type:"a",text,href}`. The generator
  walks the array and groups each run of links under the preceding heading.
- **`tools/generate.js`** — the generator. Owns the shared layout (header, accessible nav, footer),
  assembles prose pages from `PAGES`, the by-laws page, and directory pages from `links.json` +
  `DIRECTORY`, then writes the root `.html` files. `annotateNewTab()` post-processes every page to
  append a visually-hidden "(opens in new tab)" note to each `target="_blank"` link.
- **`styles.css`** — the single hand-written stylesheet shared by all pages.

## Commands

There is no build tool, package.json, test suite, or linter. Node is used only to run the
generator, and relies solely on built-in modules + global `fetch` (no `npm install`).

```bash
node tools/generate.js          # regenerate all root .html files after editing tools/ sources
python3 -m http.server 8000     # preview locally, then open http://localhost:8000
```

After any source change: run `node tools/generate.js` and commit **both** the source edit and the
regenerated `.html` files (the site is served from the committed HTML).

## Making common changes

- Prose on home / about / meetings, or a directory page's intro → `tools/content.js`
- By-laws text → `tools/bylaws.js`
- Add / edit / remove a resource link or a section heading on a directory page → `tools/links.json`
- New page → add to `NAV` in `content.js`, add a `PAGES` (prose) or `DIRECTORY` (link-list) entry,
  then regenerate.

## Project rules

- **Keep assets local.** Store images and documents under `assets/` and reference them with relative
  paths; don't hotlink external URLs for the site's own assets.
- **External links** use `target="_blank" rel="noopener"`; `annotateNewTab()` adds the screen-reader
  note automatically, so don't add it by hand.
- **Preserve the accessibility work** when editing markup/CSS: one `<h1>` per page and no skipped
  heading levels; the mobile nav is an accessible `<button>` (aria-expanded/-controls) with a small
  inline toggle script and a `.js`-class progressive-enhancement fallback (the full nav shows if JS
  is off); `prefers-reduced-motion` is honored; prose is capped at ~70ch.
- **Neutral palette** (black/white/gray) — the GD logo is intended to be the only color.
- **Contact is a `mailto:` link**, not a form (static hosting has no backend).

## Deployment

Served by GitHub Pages from the `main` branch root (`.nojekyll` present) at
https://kescalada.github.io/gdsepac/. The generated `.html` files must be committed, since the site
is served directly from them.
