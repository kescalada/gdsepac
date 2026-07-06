// Old flat ".html" URLs -> new pretty URLs. Emits a redirect stub at each old
// path so existing bookmarks / shared links / search results keep working.
// (index.html is not listed: the home page is still served at /index.html.)
module.exports = [
  { from: "about-us-contact.html", to: "/about-us-contact/" },
  { from: "meetings-events.html", to: "/meetings-events/" },
  { from: "by-laws.html", to: "/by-laws/" },
  { from: "about-disability.html", to: "/about-disability/" },
  { from: "understanding-the-process.html", to: "/understanding-the-process/" },
  { from: "helpful-organizations.html", to: "/helpful-organizations/" },
  { from: "state-and-federal-guidance.html", to: "/state-and-federal-guidance/" },
  { from: "advocacy.html", to: "/advocacy/" },
];
