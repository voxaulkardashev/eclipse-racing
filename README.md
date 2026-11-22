# eclipse-racing

The official GitHub repository and source code for the Eclipse Racing website. Eclipse Racing is a STEM Racing team in the Professional Class.

> **Status: mockup.** Grey boxes stand in for photos and logos, and grey *[bracketed text]* marks copy still to be written.

The design is deliberately minimal: flat colours, one type family (IBM Plex), hairline dividers, and yellow used only in the logo. Avoid adding gradients, glows, rounded cards, pill badges or marketing-style filler headlines.

## Pages

| Route | Contents |
|---|---|
| `/` | Intro with logo, about, car, team, sponsors, latest news |
| `/team/` | Members by role, how we work, support |
| `/car/` | Render, specification, design process, photos |
| `/sponsors/` | Sponsors by tier, sponsorship levels table, sponsor pack |
| `/news/` | List of posts |
| `/contact/` | Contact details, form (not connected yet) |

## Running it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where to edit things

- **Team roles, sponsor tiers, news posts, socials, email**: `lib/site.ts`
- **Page content**: `app/<page>/page.tsx` (the home page is `app/page.tsx`)
- **Colours, fonts, spacing**: the tokens at the top of `app/globals.css`
- **Logo**: `components/Logo.tsx` (used on the site; recolours via CSS), `public/logo.svg` (standalone file), `app/icon.svg` (browser tab icon)

To replace a placeholder, swap `<ImageBox label="…" />` for a real `<img>`, and `<Ph>…</Ph>` for real text. News posts are listed in `lib/site.ts` for now.

## Deployment

Each push to `main` builds the site and publishes it to GitHub Pages using `.github/workflows/deploy-pages.yml`. Pull requests into `main` only check that the site builds.

**One-time setup:** in the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The site will then be live at https://voxaulkardashev.github.io/eclipse-racing/.

### Later: Vercel and eclipseracing.co.uk

The site is built with Next.js as a static export (`output: "export"` in `next.config.ts`). To move to Vercel when accounts are added:

1. Import the repo in Vercel. It detects Next.js automatically.
2. Remove `output: "export"` from `next.config.ts` so server features (login, database) work.
3. Add `eclipseracing.co.uk` under the Vercel project's **Settings → Domains** and set the DNS records it shows at your domain registrar.
