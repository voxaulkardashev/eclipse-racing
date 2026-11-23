// Site-wide content. Bracketed values are placeholders for the team to replace.

export const site = {
  name: "Eclipse Racing",
  competition: "STEM Racing, Professional Class",
  season: "[2026/27]",
  base: "[School, Town]",
  email: "[team email]@eclipseracing.co.uk",
  sponsorEmail: "[sponsors]@eclipseracing.co.uk",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

// The site is laid out like a race-day programme: each page has a page number (folio)
// and a programme section name shown in its running head and in the page-turn transition.
export const pages = [
  { href: "/", label: "Cover", folio: "01", section: "Cover" },
  { href: "/team/", label: "Team", folio: "02", section: "Entry list" },
  { href: "/car/", label: "Car", folio: "03", section: "Technical" },
  { href: "/news/", label: "News", folio: "04", section: "Results and news" },
  { href: "/sponsors/", label: "Sponsors", folio: "05", section: "Our partners" },
  { href: "/contact/", label: "Contact", folio: "06", section: "Get in touch" },
] as const;

export type PageInfo = (typeof pages)[number];

export function pageFor(href: string): PageInfo | undefined {
  const clean = href.endsWith("/") ? href : `${href}/`;
  return pages.find((p) => p.href === clean);
}

// Typical Professional Class roles. Race numbers are just the programme's running order.
export const team = [
  { no: "01", role: "Team Manager" },
  { no: "02", role: "Design Engineer" },
  { no: "03", role: "Manufacturing Engineer" },
  { no: "04", role: "Graphic Designer" },
  { no: "05", role: "Enterprise Manager" },
  { no: "06", role: "Resources Manager" },
];

// STEM Racing seasons run regional, then national, then (if qualified) World Finals.
export const rounds = [
  { round: "1", event: "[Regional final]", venue: "[Venue]", date: "[DD.MM.YYYY]", result: "[Result]" },
  { round: "2", event: "[National final]", venue: "[Venue]", date: "[DD.MM.YYYY]", result: "[Result]" },
  { round: "3", event: "[World Finals, if qualified]", venue: "[Venue]", date: "[DD.MM.YYYY]", result: "[Result]" },
];

export const nextRound = rounds[0];

// Placeholder bulletins until real posts exist.
export const posts = [1, 2, 3, 4, 5, 6].map((n) => ({
  date: "[DD.MM.YYYY]",
  title: `[Headline ${n}]`,
  summary: "[One or two sentences on what happened.]",
}));

// Sponsor advert slots, in programme advert sizes. Empty slots say they are available.
export const adTiers = [
  { level: "Title partner", size: "Full page", slots: 1, span: "full" },
  { level: "Gold", size: "Half page", slots: 2, span: "half" },
  { level: "Silver", size: "Quarter page", slots: 4, span: "quarter" },
  { level: "Supporter", size: "Eighth page", slots: 8, span: "eighth" },
] as const;
