# GD SEPAC — Static Site

The [Groton Dunstable SEPAC](https://kescalada.github.io/gdsepac/) website — an Eleventy (11ty)
static site hosted for free on GitHub Pages.

GD SEPAC is the Groton Dunstable Special Education Parent Advisory Council — an all-volunteer
group of parents of exceptional children with unique needs in Groton and Dunstable, MA.

## Pages

Home, About Us & Contact, Meetings & Events, About Disability, Understanding the Process,
Helpful Organizations, State and Federal Guidance, Advocacy, and By-Laws.

The five "directory" pages (About Disability, Understanding the Process, Helpful Organizations,
State and Federal Guidance, Advocacy) are collections of grouped external resource links — over
300 links in total.

The original site's Wix contact **form** is a `mailto:` link to **GDSEPAC2@gmail.com**, since a
static site has no backend to receive form submissions.

## Editing content

All content is Markdown under `src/`. You can edit it right on GitHub (or with Claude) and open
a pull request — every PR gets a live preview link so you can see the rendered page before it
merges.

- **Text** (home, about, meetings, page intros) → the matching file in `src/` (home is
  `src/index.njk`).
- **Resource links** → the `## Heading` + `- [text](url)` lists in that page's `src/*.md`.
- **By-laws** → `src/by-laws.md`.
- **Board members / liaisons** → `src/_data/people.js`.
- **Nav, email, Facebook URL** → `src/_data/site.js`.

## Working locally

```bash
npm install
npm run serve   # http://localhost:8080/gdsepac/
```

`npm run build` produces the static site in `_site/` (generated; not committed).

## Hosting

GitHub Actions builds the site and deploys it to the `gh-pages` branch on every push to `main`;
GitHub Pages serves it from that branch at https://kescalada.github.io/gdsepac/. See
[`CLAUDE.md`](CLAUDE.md) for the full architecture and conventions.
