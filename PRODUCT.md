# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the school community and the public (students, parents, teachers, followers) keeping up with Eclipse Racing through its STEM Racing season. They arrive from social posts, school newsletters and word of mouth, mostly on phones, and want to know who the team is, what the car is, and what happened recently.

Secondary: sponsors and prospective sponsors, and STEM Racing judges looking at team identity and enterprise. Later, team members will log in to track progress (accounts are planned, not built).

## Product Purpose

The official website of Eclipse Racing, a UK STEM Racing team in the Professional Class. It introduces the team and its car, records the season as it happens, credits sponsors and gives people a way to get in touch. Success: a visitor leaves knowing who the team is and wanting to follow the season.

## Positioning

Undecided. The team has not yet stated what sets Eclipse apart from other STEM Racing teams; do not invent a claim.

## Operating Context

STEM Racing teams design, analyse (CFD, wind tunnel), manufacture and race miniature cars on a 20 m track, with judging on engineering, portfolio, verbal presentation, pit display and enterprise. The season runs through regional, national and possibly World Finals events.

## Capabilities and Constraints

- Pages: Home, Team, Car, Sponsors, News, Contact.
- Next.js static export deployed to GitHub Pages at /eclipse-racing/ (basePath from the deploy workflow). Planned move to Vercel at eclipseracing.co.uk with login/sign-up for team members.
- Contact form is not connected to a service yet.
- Requested by the team: Lenis smooth scrolling, a custom circle cursor with smooth movement that reacts to links and images, scroll reveals and page transitions.

## Brand Commitments

- Name: Eclipse Racing.
- Logo: yellow (#FAD443) star with four light rays and a crescent, plus a white race car silhouette; lettering removed. Files: `public/logo.svg`, `components/Logo.tsx`, `app/icon.svg`. The logo is the only fixed visual element.
- Must not look AI-generated or template-like.

## Evidence on Hand

- Logo only. No team names, photos, car renders, results, sponsors or news yet: every such item is a placeholder and must stay clearly marked until the team supplies it. Do not fabricate names, results, times, sponsors or quotes.

## Product Principles

1. Show the people and the car; the team is the story.
2. Placeholders are honest: mark what is missing rather than faking it.
3. Motion serves the content and never hides it; reduced-motion users get a calm site.
4. Readable on a phone first, because that is where most visitors arrive.

## Accessibility & Inclusion

Visitors include students, parents and teachers of all ages. Keep text readable and contrast high, honour `prefers-reduced-motion`, keep the custom cursor off on touch devices, and keep the site fully usable with a keyboard.
