# eclipse-racing

The official GitHub repository and source code for the Eclipse Racing website. Eclipse Racing is a STEM Racing team in the Professional Class.

> **Status: mockup.** Grey halftone plates stand in for photos, and grey *[bracketed text]* marks copy still to be written.

The site is designed as the team's **race-day programme**: a black cover with the logo, numbered pages in black ink on newsprint grey, and the logo yellow as the one spot colour. The full design system is in [`DESIGN.md`](DESIGN.md); product facts are in [`PRODUCT.md`](PRODUCT.md).

**Motion:** a first-visit loading screen (anime.js draws the logo, GSAP flies it into place and wipes the sheet away), Lenis smooth scrolling, a yellow page-turn transition between pages, headings that roll on as you scroll, lists that print row by row, and a custom ink-dot cursor that eases after the pointer and reacts to links and photos. The cursor is an inverting yellow lens that flips the colours under it on every surface, and a yellow line along the bottom of the navbar shows how far down the page you are. The cursor appears whenever a mouse or trackpad is used. All of it plays even on devices set to "reduce motion" (on Windows: Animation effects off); to respect that setting again, set `RESPECT_REDUCED_MOTION` to `true` in `lib/motion.ts`. Scrollbars are hidden.

## Pages

| Route | Contents |
|---|---|
| `/` | Cover (next round, contents), entry list, technical, timetable, results and news, adverts |
| `/team/` | Entry list with race numbers, how we work, pit crew |
| `/car/` | Profile with keyed parts, specification, design notes, gallery |
| `/sponsors/` | Adverts in programme sizes, advertising rates |
| `/news/` | Results table, bulletins |
| `/contact/` | Contact details, message form (not connected yet) |

## Running it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where to edit things

- **Pages and page numbers, team roles, rounds, news posts, advert slots, socials, email**: `lib/site.ts`
- **Page content**: `app/<page>/page.tsx` (the home page is `app/page.tsx`)
- **Colours, fonts, spacing**: the tokens at the top of `app/globals.css`
- **Motion**: `components/motion/` (`Intro`, `SmoothScroll`, `PageTurn`, `Cursor`, `ScrollProgress`, `Reveal`), with the reduce-motion switch in `lib/motion.ts`
- **Logo**: `components/Logo.tsx` (used on the site; recolours via CSS), `public/logo.svg` (standalone file), `app/icon.svg` (browser tab icon)

To replace a placeholder, swap `<Photo caption="…" />` for a real `<img>`, and `<Ph>…</Ph>` for real text. News posts are listed in `lib/site.ts` for now.

## Team sign-in (hidden)

The contact form doubles as a discreet way into the team sign-in page. Filling in all four fields (name, email, about, message) with the team's combination and pressing **Send message** turns the page to it, with the usual yellow page-turn; any other message gets the normal "not connected yet" reply. The sign-in page is front end only until accounts exist.

The sign-in page lives in a folder with a meaningless 16-character name under `app/`. The browser works that name out from the combination, so the address isn't written anywhere in the site's code; opening it directly, without the form, shows "Page missing". Only a SHA-256 fingerprint of the combination is stored (`lib/knock.ts`), never the words. Capitals and extra spaces don't matter.

To change the combination:

```bash
node scripts/knock-hash.mjs "<name>" "<email>" "<about>" "<message>"
```

Paste the printed `KNOCK_HASH` into `lib/knock.ts`, and rename the sign-in page's folder in `app/` to the printed folder name. "About" must be one of the dropdown options. This hides the door; it isn't security. The real protection will be the accounts themselves.

### Demo sign-in and team overview

The sign-in page accepts one demo account (ask the Team Manager for its details). Signing in turns the page to the team overview: next round countdown, a task board you can move tasks along, milestones, news drafts and a sponsor tracker, all example data that isn't saved. Like the sign-in page, the overview lives in a folder whose name is worked out from the account details, so it isn't written anywhere in the site's code, and it shows "Page missing" to anyone who hasn't signed in this browser session. **Sign out** turns back to the cover.

Only a fingerprint of the demo email and password is stored (`lib/demoLogin.ts`). To change them:

```bash
node scripts/login-hash.mjs "<email>" "<password>"
```

Paste the printed `DEMO_LOGIN_HASH` into `lib/demoLogin.ts` and rename the overview's folder in `app/` to the printed folder name. Real accounts will replace all of this.

## Deployment

Each push to `main` builds the site and publishes it to GitHub Pages using `.github/workflows/deploy-pages.yml`. Pull requests into `main` only check that the site builds.

**One-time setup:** in the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The site will then be live at https://voxaulkardashev.github.io/eclipse-racing/.

### Later: Vercel and eclipseracing.co.uk

The site is built with Next.js as a static export (`output: "export"` in `next.config.ts`). To move to Vercel when accounts are added:

1. Import the repo in Vercel. It detects Next.js automatically.
2. Remove `output: "export"` from `next.config.ts` so server features (login, database) work.
3. Add `eclipseracing.co.uk` under the Vercel project's **Settings → Domains** and set the DNS records it shows at your domain registrar.
