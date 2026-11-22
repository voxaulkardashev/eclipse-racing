// Central place for site-wide details. Replace the bracketed placeholders as the team fills them in.

export const site = {
  name: "Eclipse Racing",
  competition: "STEM Racing, Professional Class",
  season: "[Season, e.g. 2026/27]",
  domain: "eclipseracing.co.uk",
  email: "[team email]@eclipseracing.co.uk",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/team/", label: "Team" },
  { href: "/car/", label: "Car" },
  { href: "/sponsors/", label: "Sponsors" },
  { href: "/news/", label: "News" },
  { href: "/contact/", label: "Contact" },
];

// Typical Professional Class roles. Swap in real names, photos and bios.
export const team = [
  { role: "Team Manager" },
  { role: "Design Engineer" },
  { role: "Manufacturing Engineer" },
  { role: "Graphic Designer" },
  { role: "Enterprise Manager" },
  { role: "Resources Manager" },
];

// Sponsor logo slots on the Sponsors page, largest tier first.
export const sponsorTiers = [
  { name: "Title partner", slots: 1 },
  { name: "Gold", slots: 2 },
  { name: "Silver", slots: 3 },
  { name: "Supporters", slots: 6 },
] as const;

// Placeholder news posts until real ones exist.
export const posts = [1, 2, 3, 4, 5, 6].map((n) => ({
  date: "[DD.MM.YYYY]",
  title: `[Post title ${n}]`,
  summary: "[One-sentence summary of the post]",
}));
