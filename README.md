# GD SEPAC — Static Site

A static, dependency-free copy of the [Groton Dunstable SEPAC](https://www.gdsepac.com/)
website (originally built on Wix), rebuilt as plain HTML/CSS so it can be hosted for free on
GitHub Pages.

GD SEPAC is the Groton Dunstable Special Education Parent Advisory Council — an all-volunteer
group of parents of exceptional children with unique needs in Groton and Dunstable, MA.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About Us & Contact | `about-us-contact.html` |
| Meetings & Events | `meetings-events.html` |
| About Disability | `about-disability.html` |
| Understanding the Process | `understanding-the-process.html` |
| Helpful Organizations | `helpful-organizations.html` |
| State and Federal Guidance | `state-and-federal-guidance.html` |
| Advocacy | `advocacy.html` |
| By-Laws | `by-laws.html` |

The five "directory" pages (About Disability, Understanding the Process, Helpful Organizations,
State and Federal Guidance, Advocacy) are collections of grouped external resource links — over
300 links in total.

The original site's Wix contact **form** has been replaced with a `mailto:` link to
**GDSEPAC2@gmail.com**, since a static site has no backend to receive form submissions.

## Viewing locally

It's just static files — open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How it's built

The HTML pages are generated from source content by a small Node script (no build step is
required to *serve* the site — the generated `.html` files are committed and self-contained).

```
tools/
  content.js    # hand-authored prose (home, about, meetings, intros)
  bylaws.js     # full by-laws text
  links.json    # resource links + section headings extracted from the original pages
  generate.js   # assembles everything into the root .html files
```

To regenerate after editing content:

```bash
node tools/generate.js
```

Shared styling lives in `styles.css`. The header/footer template lives in `tools/generate.js`.

## Hosting on GitHub Pages

1. Push this repo to GitHub (public repo for free Pages hosting).
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. The site goes live at `https://<username>.github.io/<repo>/`.

`.nojekyll` is included so GitHub Pages serves the files as-is.

## Editing content

- **Text** (home, about, meetings, page intros): edit `tools/content.js`.
- **By-laws**: edit `tools/bylaws.js`.
- **Resource links**: edit `tools/links.json` (each page is an ordered list of `{type:"h"...}`
  headings and `{type:"a", text, href}` links).
- Run `node tools/generate.js` and commit the regenerated `.html` files.
