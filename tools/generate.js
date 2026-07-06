#!/usr/bin/env node
// Static site generator for the GD SEPAC site.
// Reads content.js + bylaws.js + links.json and writes .html files to the repo root.

const fs = require("fs");
const path = require("path");
const { EMAIL, FACEBOOK, NAV, PAGES, DIRECTORY } = require("./content.js");
const bylawsBody = require("./bylaws.js");
const links = require("./links.json");

const ROOT = path.join(__dirname, "..");
const YEAR = new Date().getFullYear();

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Append a visually-hidden "(opens in new tab)" note to every external link
// (any <a target="_blank">) so screen-reader users are warned. Server-rendered
// so it does not depend on JavaScript.
function annotateNewTab(html) {
  return html.replace(/(<a\b[^>]*\btarget="_blank"[^>]*>)([\s\S]*?)(<\/a>)/gi, (m, open, inner, close) => {
    if (/visually-hidden/.test(inner)) return m;
    return open + inner + '<span class="visually-hidden"> (opens in new tab)</span>' + close;
  });
}

function nav(active) {
  const items = NAV.map(([label, file]) => {
    const cur = file === active ? ' aria-current="page"' : "";
    return `        <li><a href="${file}"${cur}>${label}</a></li>`;
  }).join("\n");
  return `    <nav class="nav" aria-label="Main">
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-list" id="primary-nav">
${items}
      </ul>
    </nav>`;
}

function layout({ active, title, hero, body }) {
  const pageTitle = title === "Home" ? "GD SEPAC" : `${title} | GD SEPAC`;
  const heroBlock = hero
    ? `  <section class="hero">
    <div class="hero-inner">
      <img class="hero-logo" src="assets/home-header.webp" alt="Groton Dunstable: Our World, Our Communities, Our Schools — Together We Achieve">
      <div class="hero-titles">
        <h1>Groton Dunstable SEPAC</h1>
        <p class="tagline">IEP and 504 Together</p>
      </div>
    </div>
  </section>`
    : `  <div class="page-head">
    <h1>${esc(title)}</h1>
  </div>`;

  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="Groton Dunstable Special Education Parent Advisory Council — an all-volunteer group of parents of exceptional children in Groton and Dunstable, MA.">
  <link rel="stylesheet" href="styles.css">
  <script>document.documentElement.classList.add('js');</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="brand">
      <a href="index.html" class="brand-link">
        <span class="brand-mark"><img src="assets/home-header.webp" alt="Groton Dunstable SEPAC logo"></span>
        <span class="brand-text"><strong>Groton Dunstable SEPAC</strong></span>
      </a>
    </div>
${nav(active)}
  </header>

${heroBlock}

  <main id="main" class="container">
${body}
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p><a href="mailto:${EMAIL}">${EMAIL}</a> &nbsp;&middot;&nbsp; <a href="${FACEBOOK}" target="_blank" rel="noopener">Facebook</a></p>
      <p class="copyright">&copy;${YEAR} GD SEPAC.</p>
    </div>
  </footer>
  <script>
    (function () {
      var btn = document.querySelector('.nav-toggle');
      var list = document.getElementById('primary-nav');
      if (!btn || !list) return;
      function close() {
        list.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      }
      btn.addEventListener('click', function () {
        var open = list.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      list.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && list.classList.contains('open')) { close(); btn.focus(); }
      });
    })();
  </script>
</body>
</html>
`;
  return annotateNewTab(doc);
}

// Build a directory page body from links.json sections.
function directoryBody(file, cfg) {
  const items = links[file.replace(/\.html$/, "")];
  if (!items) throw new Error("No link data for " + file);
  const skip = new Set(cfg.skip || []);
  let html = `      <section class="intro">\n${cfg.intro.trim()}\n      </section>\n`;

  // Walk items, grouping links under their preceding heading.
  let groups = [];
  let current = null;
  for (const it of items) {
    if (it.type === "h") {
      current = { heading: it.text, links: [] };
      groups.push(current);
    } else if (current) {
      current.links.push(it);
    }
  }
  for (const g of groups) {
    if (skip.has(g.heading) || g.links.length === 0) continue;
    const lis = g.links
      .map(
        (l) =>
          `          <li><a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.text)}</a></li>`
      )
      .join("\n");
    html += `
      <section class="resource-group">
        <h2>${esc(g.heading)}</h2>
        <ul class="link-list">
${lis}
        </ul>
      </section>`;
  }
  return html;
}

function main() {
  const written = [];

  // Prose pages
  for (const [file, cfg] of Object.entries(PAGES)) {
    const out = layout({ active: file, title: cfg.title, hero: cfg.hero, body: cfg.body });
    fs.writeFileSync(path.join(ROOT, file), out);
    written.push(file);
  }

  // By-laws page
  fs.writeFileSync(
    path.join(ROOT, "by-laws.html"),
    layout({ active: "by-laws.html", title: "GD SEPAC By-Laws", body: bylawsBody })
  );
  written.push("by-laws.html");

  // Directory pages
  for (const [file, cfg] of Object.entries(DIRECTORY)) {
    const body = directoryBody(file, cfg);
    fs.writeFileSync(path.join(ROOT, file), layout({ active: file, title: cfg.title, body }));
    written.push(file);
  }

  console.log("Generated " + written.length + " pages:");
  written.forEach((f) => console.log("  " + f));
}

main();
