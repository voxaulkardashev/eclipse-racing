// Central place for site-wide details. Replace the bracketed placeholders as the team fills them in.

export const site = {
  name: "Eclipse Racing",
  tagline: "[Team tagline: one short line]",
  competition: "STEM Racing · Professional Class",
  season: "[Season, e.g. 2026–27]",
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
  { href: "/car/", label: "The Car" },
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

export const sponsorTiers = [
  { name: "Title Partner", slots: 1, size: "xl" },
  { name: "Gold", slots: 2, size: "lg" },
  { name: "Silver", slots: 3, size: "md" },
  { name: "Supporters", slots: 6, size: "sm" },
] as const;
