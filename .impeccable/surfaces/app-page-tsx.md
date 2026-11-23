---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/team/page.tsx","app/car/page.tsx","app/sponsors/page.tsx","app/news/page.tsx","app/contact/page.tsx"]
---

# Surface: Eclipse Racing website (Home and all pages)

Mode: Persuade. Audience: school community and public following the season, mostly on phones; secondary sponsors and judges. Action: follow the season (latest results/news, socials). Proof on hand: logo only; everything else is a marked placeholder. Constraints: Next.js static export on GitHub Pages; team asked for Lenis smooth scroll, a smooth circle cursor reacting to links and images, scroll reveals and page transitions; must not look AI-generated.

## Direction contract

THESIS: The site is Eclipse Racing's race-day programme for the season: a cover, then numbered pages. It refuses the category default of a dark full-bleed car photo, italic speed type and a sponsor strip.

OWN-WORLD: Two-colour offset print. Newsprint-grey paper (#EDEDE8), black ink (#141414), logo yellow (#FAD443) as the only spot ink, used as solid floods (contents band, timetable head, page-turn). Black cover and back cover carry the logo. Big Shoulders Display condensed caps for headlines and numerals; Archivo body with tabular figures. Running head and folio on every page, double print rules, race-number roundels, halftone screen on photo slots, programme advert sizes for sponsors, contact as a printed entry form.

STORY: The visitor learns who the team is and when the next round is, reads the entry list, the car's technical page, the timetable and latest results, sees the sponsors' adverts, then follows on social or gets in touch.

FIRST VIEWPORT: Full-height black cover. Top line: official programme and season. Logo large; ECLIPSE RACING in giant condensed caps; STEM Racing Professional Class; next-round panel (event, date, venue). Contents list with page numbers as working navigation, right on desktop, below on mobile. Primary action: "Latest results" to News, with socials beside it.

FORM: Race-day programme, position 4 of 7 on the ordered list; seed:20d5bbb56545ad11. Signature interaction: a yellow spot-ink page-turn wipe on navigation showing the destination folio and title; a yellow ink-dot cursor that grows over links and labels images "View". Motion grammar: ink-roll reveals (clip-path left to right) on headings, entry-list rows printing in sequence, Lenis scroll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Team positioning, real names, photos, car name, event dates, sponsors and results are not supplied yet.
