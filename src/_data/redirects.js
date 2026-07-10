// Old flat ".html" URLs -> new pretty URLs. Emits a redirect stub at each old
// path so existing bookmarks / shared links / search results keep working.
// (index.html is not listed: the home page is still served at /index.html.)
const { BYLAWS_PDF } = require("./site.js");

module.exports = [
  { from: "about-us-contact.html", to: "/about-us-contact/" },
  { from: "meetings-events.html", to: "/meetings-events/" },
  { from: "about-disability.html", to: "/about-disability/" },
  { from: "understanding-the-process.html", to: "/understanding-the-process/" },
  { from: "helpful-organizations.html", to: "/helpful-organizations/" },
  { from: "state-and-federal-guidance.html", to: "/state-and-federal-guidance/" },
  { from: "advocacy.html", to: "/advocacy/" },
  // The by-laws page became a PDF download; point both old URLs at the file.
  { from: "by-laws.html", to: BYLAWS_PDF },
  { from: "by-laws/", to: BYLAWS_PDF },
];
