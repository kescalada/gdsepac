const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const MarkdownIt = require("markdown-it");
const container = require("markdown-it-container");

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
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy(".nojekyll");

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

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/gdsepac/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
