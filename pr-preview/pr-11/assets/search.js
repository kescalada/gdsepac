/* GD SEPAC site search — progressive enhancement over a Fuse.js index.
   Loads Fuse + the search index lazily on first interaction. Paths come from
   window.SEARCH_PATHS (rendered in base.njk so the pathPrefix is correct). */
(function () {
  "use strict";

  var input = document.getElementById("site-search-input");
  var resultsBox = document.getElementById("site-search-results");
  var status = document.getElementById("site-search-status");
  var paths = window.SEARCH_PATHS || {};
  if (!input || !resultsBox) {
    highlightFromHash();
    return;
  }

  // Small alias map so common shorthands find oddly-punctuated labels.
  var ALIASES = {
    adhd: "ad(h)d",
    add: "ad(h)d",
    iee: "independent educational evaluation",
    iees: "independent educational evaluations",
    "504": "section 504",
  };

  var fuse = null;
  var loading = null;
  var MAX_RESULTS = 12;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("Failed to load " + src)); };
      document.head.appendChild(s);
    });
  }

  // Load Fuse then the index, then build the Fuse instance. Runs once.
  function ensureEngine() {
    if (loading) return loading;
    loading = loadScript(paths.fuse)
      .then(function () { return loadScript(paths.index); })
      .then(function () {
        var data = window.SEARCH_INDEX || [];
        fuse = new Fuse(data, {
          includeScore: true,
          ignoreLocation: true,
          threshold: 0.4,
          minMatchCharLength: 2,
          keys: [
            { name: "text", weight: 0.7 },
            { name: "title", weight: 1 },
            { name: "section", weight: 0.3 },
            { name: "pageTitle", weight: 0.2 },
          ],
        });
      })
      .catch(function (err) {
        if (window.console) console.error(err);
        loading = null; // allow a retry
        throw err;
      });
    return loading;
  }

  function expandAliases(q) {
    return q.replace(/[a-z0-9()]+/gi, function (word) {
      var key = word.toLowerCase();
      return ALIASES[key] ? ALIASES[key] : word;
    });
  }

  function announce(msg) {
    if (status) status.textContent = msg;
  }

  function closeResults() {
    resultsBox.hidden = true;
    resultsBox.innerHTML = "";
    input.setAttribute("aria-expanded", "false");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(query, hits) {
    if (!hits.length) {
      resultsBox.innerHTML = '<p class="no-results">No matches for &ldquo;' + escapeHtml(query) + "&rdquo;.</p>";
      resultsBox.hidden = false;
      input.setAttribute("aria-expanded", "true");
      announce("No results");
      return;
    }
    var html = "<ul>";
    hits.forEach(function (h) {
      var r = h.item;
      var label = r.title || r.text;
      // Section results: context is just the page. Link results: "section · page".
      var context = r.title
        ? r.pageTitle
        : (r.section && r.section !== r.pageTitle ? r.section + " · " + r.pageTitle : r.pageTitle);
      html +=
        '<li><a href="' + escapeHtml(r.href) + '">' +
        '<span class="result-label">' + escapeHtml(label) + "</span>" +
        '<span class="result-context">' + escapeHtml(context) + "</span>" +
        "</a></li>";
    });
    html += "</ul>";
    resultsBox.innerHTML = html;
    resultsBox.hidden = false;
    input.setAttribute("aria-expanded", "true");
    announce(hits.length + (hits.length === 1 ? " result" : " results"));
  }

  function runSearch() {
    var q = input.value.trim();
    if (q.length < 2) {
      closeResults();
      announce("");
      return;
    }
    ensureEngine()
      .then(function () {
        var hits = fuse.search(expandAliases(q)).slice(0, MAX_RESULTS);
        render(q, hits);
      })
      .catch(function () {
        resultsBox.innerHTML = '<p class="no-results">Search is unavailable right now.</p>';
        resultsBox.hidden = false;
      });
  }

  // Debounce input.
  var timer = null;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(runSearch, 120);
  });

  // Warm the engine as soon as the user focuses the box.
  input.addEventListener("focus", function () { ensureEngine().catch(function () {}); });

  // Keyboard: Down moves into results; Escape clears/closes.
  function resultLinks() {
    return Array.prototype.slice.call(resultsBox.querySelectorAll("a"));
  }
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      var links = resultLinks();
      if (links.length) { e.preventDefault(); links[0].focus(); }
    } else if (e.key === "Escape") {
      if (!resultsBox.hidden) { closeResults(); } else { input.value = ""; }
      announce("");
    }
  });
  resultsBox.addEventListener("keydown", function (e) {
    var links = resultLinks();
    var i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (links[i + 1] || links[0]).focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) input.focus();
      else links[i - 1].focus();
    } else if (e.key === "Escape") {
      closeResults();
      input.focus();
    }
  });

  // Close when focus/click leaves the search area.
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".site-search")) closeResults();
  });

  // Highlight the target element after navigating to a #anchor result.
  function highlightFromHash() {
    var id = decodeURIComponent((location.hash || "").slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add("search-hit");
    setTimeout(function () { el.classList.remove("search-hit"); }, 2400);
  }
  window.addEventListener("hashchange", highlightFromHash);
  highlightFromHash();
})();
