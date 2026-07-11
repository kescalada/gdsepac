const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const MarkdownIt = require("markdown-it");
const container = require("markdown-it-container");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const site = require("./src/_data/site.js");

// Boxed sections that authors mark with `::: box <classes>` fences in Markdown.
// Renders `<section class="<classes>"> … </section>` so the existing CSS matches.
function boxContainer(md) {
  md.use(container, "box", {
    validate: (params) => /^box\b/.test(params.trim()),
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const info = tokens[idx].info.trim().replace(/^box\s*/, "").trim();
        const parts = info.split(/\s+/).filter(Boolean);
        const id = parts.filter((p) => p.startsWith("#")).map((p) => p.slice(1))[0];
        const classes = parts.filter((p) => !p.startsWith("#"));
        const clsAttr = classes.length ? ` class="${classes.join(" ")}"` : "";
        const idAttr = id ? ` id="${id}"` : "";
        return `<section${clsAttr}${idAttr}>\n`;
      }
      return "</section>\n";
    },
  });
}

// Standalone renderer for small Markdown strings (e.g. a page's `intro` field).
const mdInline = new MarkdownIt({ html: true });

module.exports = function (eleventyConfig) {
  // Read `_data/*.yaml` files (events.yaml, people.yaml) as global data.
  // Eleventy parses .js/.json natively but not YAML, so register the parser.
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Rewrite root-relative URLs (/styles.css, /assets/…, /about-us-contact/) to
  // include the pathPrefix. Handles Markdown links too, which can't use filters,
  // and adapts to the PR-preview prefix at build time.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Extend Eleventy's Markdown library with the box-container fences.
  eleventyConfig.amendLibrary("md", (md) => boxContainer(md));

  // Render a Markdown string to HTML (for frontmatter prose like `intro`).
  eleventyConfig.addFilter("md", (str) => (str ? mdInline.render(str) : ""));

  // Encode every character of a string as a numeric HTML entity (`&#NN;`).
  // Used for the contact address (`site.EMAIL`) so it never appears as
  // plaintext in the served HTML, defeating naive email-harvesting scrapers.
  // Browsers decode the entities transparently, so the visible text and the
  // `mailto:` href both still work with no JavaScript. Apply `| safe` at the
  // call site so Nunjucks emits the entities verbatim instead of escaping `&`.
  eleventyConfig.addFilter("obfuscateEmail", (str) =>
    String(str || "")
      .split("")
      .map((ch) => `&#${ch.charCodeAt(0)};`)
      .join("")
  );

  // --- Transform 1: reconstruct boxed sections on directory / by-laws pages ---
  // A layout wraps the page body in <div data-sections="CLASS">…</div>. Here we
  // split that body at each <h2> and wrap each chunk in <section class="CLASS">,
  // reproducing the generator's directoryBody()/article markup from plain Markdown.
  eleventyConfig.addTransform("autoSection", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replace(
      /<div data-sections="([^"]+)">([\s\S]*?)<\/div>/g,
      (m, cls, inner) => {
        const chunks = inner
          .split(/(?=<h2[ >])/)
          .map((s) => s.trim())
          .filter(Boolean);
        return chunks
          .map((chunk) => {
            let body = chunk;
            if (cls.split(/\s+/).includes("resource-group")) {
              body = body.replace(/<ul>/g, '<ul class="link-list">');
            }
            return `<section class="${cls}">${body}</section>`;
          })
          .join("\n");
      }
    );
  });

  // --- Transform 2: external-link handling (the old annotateNewTab, extended) ---
  // Every <a href="http…"> gets target/rel (Markdown links lack them) plus a
  // visually-hidden "(opens in new tab)" note for screen-reader users.
  eleventyConfig.addTransform("externalLinks", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (m, attrs, inner) => {
      const hrefMatch = attrs.match(/\bhref="([^"]*)"/i);
      const href = hrefMatch && hrefMatch[1];
      const isExternal = href && (/^https?:/i.test(href) || /\.pdf(\?|#|$)/i.test(href));
      if (!isExternal) return m;
      let newAttrs = attrs;
      if (!/\btarget=/i.test(attrs)) newAttrs += ' target="_blank"';
      if (!/\brel=/i.test(attrs)) newAttrs += ' rel="noopener"';
      const note = /visually-hidden/.test(inner)
        ? ""
        : '<span class="visually-hidden"> (opens in new tab)</span>';
      return `<a${newAttrs}>${inner}${note}</a>`;
    });
  });

  // --- Transform 3: anchor ids on headings + resource links (search deep-links) ---
  // Adds a slugged, per-page-unique id to every <h2>/<h3> and every resource link
  // (inside .link-list) so search results can link straight to that spot and the
  // browser can highlight it. Runs last, after autoSection wraps the sections and
  // externalLinks adds target/rel + the "(opens in new tab)" note.
  eleventyConfig.addTransform("addAnchors", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    const used = new Set();
    const slug = (text, prefix = "") => {
      const cleaned = String(text)
        .replace(/<span class="visually-hidden">[\s\S]*?<\/span>/gi, "")
        .replace(/<[^>]+>/g, "")
        .toLowerCase()
        .replace(/&[^;]+;/g, " ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const base = prefix + (cleaned || "section");
      let id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      return id;
    };
    // Headings (record any ids that already exist so we don't collide).
    content = content.replace(/<(h[23])\b([^>]*)>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, inner) => {
      const existing = attrs.match(/\bid="([^"]+)"/);
      if (existing) { used.add(existing[1]); return m; }
      return `<${tag}${attrs} id="${slug(inner)}">${inner}</${tag}>`;
    });
    // Resource links inside .link-list.
    content = content.replace(/<ul class="link-list">([\s\S]*?)<\/ul>/gi, (m, inner) => {
      const withIds = inner.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (am, attrs, text) => {
        if (/\bid=/.test(attrs)) return am;
        return `<a${attrs} id="${slug(text, "r-")}">${text}</a>`;
      });
      return `<ul class="link-list">${withIds}</ul>`;
    });
    return content;
  });

  // --- Build the client-side search index from the rendered pages ---
  // Runs after the build; reads each page's final HTML (ids present, URLs already
  // pathPrefix-correct), indexes only the <main> region, and writes
  // _site/search-index.js as `window.SEARCH_INDEX = [...]`.
  eleventyConfig.on("eleventy.after", ({ dir, results }) => {
    const prefix = (process.env.PATH_PREFIX || "/").replace(/\/$/, "");
    const decode = (s) =>
      s
        .replace(/<span class="visually-hidden">[\s\S]*?<\/span>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
        .replace(/&#39;|&rsquo;|&lsquo;|&apos;/g, "'")
        .replace(/\s+/g, " ")
        .trim();

    const records = [];
    for (const r of results) {
      if (!(r.outputPath || "").endsWith(".html")) continue;
      const html = r.content || "";
      if (/http-equiv=["']refresh["']/i.test(html)) continue; // skip redirect stubs
      const mainM = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
      if (!mainM) continue;
      const main = mainM[1];
      const titleM = html.match(/<title>([^<]*)<\/title>/i);
      let pageTitle = titleM ? decode(titleM[1]).replace(/\s*\|\s*GD SEPAC\s*$/i, "").trim() : "";
      if (!pageTitle || pageTitle === "GD SEPAC") pageTitle = "Home";
      const base = prefix + r.url;

      // Headings with ids and their positions.
      const headings = [];
      const hRe = /<(h[23])\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi;
      let hm;
      while ((hm = hRe.exec(main))) {
        headings.push({ id: hm[2], title: decode(hm[3]), start: hm.index, end: hRe.lastIndex });
      }
      // Section records: heading + the text that follows it up to the next heading.
      for (let i = 0; i < headings.length; i++) {
        const h = headings[i];
        const sliceEnd = i + 1 < headings.length ? headings[i + 1].start : main.length;
        const body = decode(main.slice(h.end, sliceEnd));
        records.push({
          title: h.title,
          text: `${h.title} ${body}`.trim().slice(0, 600),
          section: h.title,
          pageTitle,
          href: `${base}#${h.id}`,
        });
      }
      // Link records: each tagged resource link, tied to its nearest heading above.
      const aRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
      let am;
      while ((am = aRe.exec(main))) {
        const idm = am[1].match(/\bid="(r-[^"]+)"/);
        if (!idm) continue;
        const text = decode(am[2]);
        if (!text) continue;
        let section = pageTitle;
        for (let i = headings.length - 1; i >= 0; i--) {
          if (headings[i].start < am.index) { section = headings[i].title; break; }
        }
        records.push({ text, section, pageTitle, href: `${base}#${idm[1]}` });
      }
    }

    // The by-laws are a downloadable PDF with no page of their own; add one
    // record so search still finds them and links straight to the download.
    records.push({
      title: "By-Laws",
      text: "By-Laws bylaws by laws governing document articles officers meetings membership amendments",
      section: "",
      pageTitle: "PDF download",
      href: prefix + site.BYLAWS_PDF,
    });

    fs.writeFileSync(
      path.join(dir.output, "search-index.js"),
      `window.SEARCH_INDEX=${JSON.stringify(records)};\n`
    );
    console.log(`[search] wrote ${records.length} records to ${dir.output}/search-index.js`);
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
