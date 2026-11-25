// Site-wide content. Bracketed values are placeholders for the team to replace.

export const site = {
  name: "Eclipse Racing",
  competition: "STEM Racing, Professional Class",
  season: "[2026/27]",
  base: "Boroughmuir High School, Edinburgh",
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

// The team. Race numbers are just the programme's running order.
export const team = [
  { no: "01", name: "Andrej Nikolic", role: "Team Leader and Enterprise Manager" },
  { no: "02", name: "Dannier Sabir", role: "Head Engineer" },
  { no: "03", name: "Liam Lai", role: "Marketing Head" },
  { no: "04", name: "Sathvik Burle", role: "Graphics Designer and Engineer" },
  { no: "05", name: "Nathan Hsu", role: "Graphics Head" },
];

export const teamIntro =
  "We are a group of 5 S4 students in the Eclipse STEM Racing team based in Boroughmuir High School, Edinburgh. Having won the Sponsorship and Marketing Award in the Scottish Regional Finals in Linlithgow, we seek to make a comeback next year.";

export const car = { name: "Corona", tagline: "The halo of light around the dark" };

// The season's rounds. Bracketed values are placeholders still to be confirmed.
export const rounds = [
  { round: "1", event: "Scottish Regional Finals", venue: "[TBC]", date: "[TBC]", result: "[TBC]" },
  { round: "2", event: "—", venue: "—", date: "—", result: "—" },
  { round: "3", event: "—", venue: "—", date: "—", result: "—" },
];

// The cover's yellow panel.
export const nextRound = {
  heading: "We'll be back next year!",
  event: "TBC",
  date: "TBC",
  location: "TBC",
};

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
