# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static website for the Groton Dunstable SEPAC (Special Education Parent Advisory Council),
built with [Eleventy (11ty)](https://www.11ty.dev/) and hosted on GitHub Pages. Content is
authored in Markdown so non-engineer volunteers can edit and review it via GitHub or Claude.

## Commands

```bash
npm install        # once, to install Eleventy
npm run serve      # local dev server with live reload -> http://localhost:8080/gdsepac/
npm run build      # one-off build into _site/
```

`_site/` is the generated output; it is git-ignored and produced by CI, never committed.

## Where things live (all source is under `src/`)

- **`src/*.md`** — page content in Markdown. The five resource pages
  (`about-disability.md`, `advocacy.md`, etc.) are intro prose plus `## Heading` + link lists.
  `about-us-contact.md` and `meetings-events.md` are prose with a few boxed sections.
  (The by-laws are a downloadable PDF under `assets/docs/bylaws/`, not a page — see below.)
- **`src/index.njk`** — the home page (hero + cards + a quicklink grid generated from the nav).
- **`src/_data/site.js`** — `EMAIL`, `FACEBOOK`, `DISTRICT`, `BYLAWS_PDF`, and `NAV` (nav order + labels).
- **`src/_data/people.js`** — Board of Directors and School Liaisons (edit a name here to update
  the About page — no HTML needed).
- **`src/_data/redirects.js`** — old `*.html` URLs → new pretty URLs (see redirects below);
  `/by-laws/` and `by-laws.html` redirect to the by-laws PDF.
- **`src/_includes/`** — layouts: `base.njk` (header, accessible nav, the site-search bar, footer,
  scripts) and `resource.njk` (directory pages).
- **`.eleventy.js`** — Eleventy config: passthrough copy, the pathPrefix, and three transforms
  (section boxing, external-link handling, and `addAnchors` which slugs heading/resource-link ids),
  plus the `::: box` Markdown fences and an `eleventy.after` hook that builds the search index.
- **`assets/search.js`** + **`assets/vendor/fuse.basic.min.js`** — client-side site search (see below).
- **`styles.css`** — the single hand-written stylesheet (unchanged by the migration).

## Making common changes

- Prose on home / about / meetings, or a directory page's intro → the matching `src/*.md`
  (home is `src/index.njk`).
- Add / edit / remove a resource link or section heading on a directory page → edit the
  `## Heading` + `- [text](url)` lists in that page's `src/*.md`.
- New by-laws version → add the dated PDF under `assets/docs/bylaws/` and update `BYLAWS_PDF` in
  `src/_data/site.js` (one path drives the About Us download button, the `/by-laws/` redirect, and
  the search entry).
- Board members or liaisons → `src/_data/people.js`.
- Nav order / labels, or the contact email / Facebook URL → `src/_data/site.js`.
- New page → add it to `NAV` in `site.js`, create `src/<slug>.md`, and (if linked from an old
  URL) add a redirect in `_data/redirects.js`.

## Conventions

- **Boxed sections.** Markdown has no syntax for a `<div class>` wrapper, so boxed cards are
  marked with a fence: `::: box card` … `:::` (multiple classes and an `#id` are allowed, e.g.
  `::: box card #contact`). The resource (directory) pages instead auto-wrap each `##` section
  into its box via a transform — no fences needed there.
- **External links** are plain Markdown links (`[text](https://…)`). A build transform adds
  `target="_blank" rel="noopener"` and a visually-hidden "(opens in new tab)" note — do **not**
  add these by hand. Internal links use root-relative paths (`/about-us-contact/`); the pathPrefix
  is applied at build time.
- **Keep assets local.** Store images/documents under `assets/` and reference them root-relative
  (`/assets/…`); don't hotlink external URLs for the site's own assets.
- **Preserve the accessibility work:** one `<h1>` per page and no skipped heading levels; the
  mobile nav is an accessible `<button>` (aria-expanded/-controls) with a small inline toggle
  script and a `.js` progressive-enhancement fallback; `prefers-reduced-motion` is honored;
  prose is capped at ~70ch.
- **Site search.** A slim search bar in `base.njk` (shown only when JS is on) searches a Fuse.js
  index built at build time by the `eleventy.after` hook in `.eleventy.js`, from every page's
  rendered `<main>`. Results deep-link to the matching heading or resource link (using the ids that
  the `addAnchors` transform adds) and highlight it on arrival. Fuse is vendored under
  `assets/vendor/` (not a CDN); the generated `_site/search-index.js` is never committed. There's no
  content upkeep — the index is derived from the pages, so it stays in sync automatically.
- **Neutral palette** (black/white/gray) — the GD logo is the only color.
- **Contact is a `mailto:` link**, not a form (static hosting has no backend).

## URLs and redirects

Pages use pretty URLs (`/about-us-contact/`). The old flat `*.html` URLs still work: a redirect
stub is generated at each old path from `_data/redirects.js` (`src/redirects.njk`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Eleventy and
publishes `_site/` to the **`gh-pages`** branch; GitHub Pages serves the site from that branch at
https://kescalada.github.io/gdsepac/. Pull requests get a live preview URL via
`.github/workflows/pr-preview.yml` (published under `pr-preview/pr-N/`), so a non-technical
reviewer can click through the rendered change before it merges.
