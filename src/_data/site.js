// Shared site config (was the consts at the top of tools/content.js).
module.exports = {
  EMAIL: "GDSEPAC2@gmail.com",
  FACEBOOK: "https://www.facebook.com/share/1GSBT5VpRe/?mibextid=wwXIfr",
  DISTRICT: "https://www.gdrsd.org/page/student-services",
  year: new Date().getFullYear(),

  // The by-laws are published as a downloadable PDF (not a page). Defined once
  // here and reused by the About Us download button, the /by-laws/ redirect, and
  // the search-index entry. On each amendment, drop in a new dated file and update
  // this one path.
  BYLAWS_PDF: "/assets/docs/bylaws/gdsepac-bylaws-2026.pdf",

  // Navigation order. `url` is the built (pretty) URL; `| url` adds the path prefix.
  NAV: [
    { label: "Home", url: "/" },
    { label: "About Us & Contact", url: "/about-us-contact/" },
    { label: "Meetings & Events", url: "/meetings-events/" },
    { label: "About Disability", url: "/about-disability/" },
    { label: "Understanding the Process", url: "/understanding-the-process/" },
    { label: "Helpful Organizations", url: "/helpful-organizations/" },
    { label: "State and Federal Guidance", url: "/state-and-federal-guidance/" },
    { label: "Advocacy", url: "/advocacy/" },
  ],
};
