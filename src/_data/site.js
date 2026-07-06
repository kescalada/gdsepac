// Shared site config (was the consts at the top of tools/content.js).
module.exports = {
  EMAIL: "GDSEPAC2@gmail.com",
  FACEBOOK: "https://www.facebook.com/groups/443095813186453",
  DISTRICT: "https://www.gdrsd.org/page/pupil-services",
  year: new Date().getFullYear(),

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
    { label: "By-Laws", url: "/by-laws/" },
  ],
};
