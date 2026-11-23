---
name: Eclipse Racing
description: The team's race-day programme for the STEM Racing season, printed in black ink and one spot yellow.
colors:
  spot-yellow: "#fad443"
  press-black: "#141414"
  newsprint: "#edede8"
  newsprint-shade: "#e1e1db"
  sheet-white: "#fafaf7"
  ink-grey: "#4a4a45"
  placeholder-grey: "#5c5c57"
  cover-grey: "#a9a9a3"
typography:
  display:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(4.25rem, 13vw, 10rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 6.5vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.88
  title:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  lede:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    fontVariation: "'wdth' 75"
rounded:
  none: "0px"
  roundel: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 9vw, 128px)"
  row: "16px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.press-black}"
    textColor: "{colors.spot-yellow}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#000000"
    textColor: "#ffffff"
  button-primary-disabled:
    backgroundColor: "{colors.placeholder-grey}"
    textColor: "{colors.newsprint}"
  folio-tab:
    backgroundColor: "{colors.spot-yellow}"
    textColor: "{colors.press-black}"
    typography: "{typography.headline}"
    padding: "10px 14px 6px"
  roundel:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.roundel}"
    size: "52px"
  next-round-panel:
    backgroundColor: "{colors.spot-yellow}"
    textColor: "{colors.press-black}"
    padding: "{spacing.panel}"
  advert:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.none}"
    padding: "16px"
  masthead:
    backgroundColor: "{colors.press-black}"
    textColor: "{colors.newsprint}"
    height: "64px"
---

# Design System: Eclipse Racing

## Overview

**Creative North Star: "The Race-Day Programme"**

The site is the booklet you buy at a race meeting, made for the team's own season. A black cover carries the logo, then come numbered pages printed in two colours: black ink on newsprint-grey paper, and the logo's yellow as the single spot ink. Every page has a running head and a page number, and the contents list on the cover and back cover points at those numbers. Programme conventions organise the content: the team is an entry list with race-number roundels, the car is a technical page with keyed parts and a spec table, the season is a timetable, sponsors are adverts in real advert sizes, and the footer is the back cover with the imprint.

Density is that of print: ruled rows, tight condensed headings, generous space between spreads, and yellow used as solid floods, never as tint or glow. Photographs sit on a halftone screen until real ones arrive, each with a programme caption. Motion is press-like and sparse: a yellow page-turn sheet between pages, headings that roll on like ink, lists that print row by row, and a yellow ink-dot cursor.

**Key Characteristics:**
- Two inks and a paper. Black, spot yellow, newsprint grey.
- Condensed display caps for every heading and numeral; a plain grotesque for reading.
- Page numbers, running heads and contents leaders as working navigation.
- Hairline and heavy rules instead of boxes, cards or shadows.
- Square corners everywhere except the race-number roundel.

## Colors

Two-colour offset print: one ink, one spot colour, one paper stock.

### Primary
- **Spot Yellow** (#fad443): the logo's yellow, printed as solid floods only. The next-round panel, the timetable band, page-number tabs, the title-partner advert, the page-turn sheet, link hover highlights, text selection, and the cursor. On black it also marks active nav and folio numbers.

### Neutral
- **Press Black** (#141414): all text and rules on paper; the ground of the cover, masthead and back cover.
- **Newsprint** (#edede8): the page ground. Neutral grey, deliberately not cream.
- **Newsprint Shade** (#e1e1db): the halftone plate behind photo slots and the scrollbar track.
- **Sheet White** (#fafaf7): a brighter stock for adverts, the message form and roundel fills, so they read as inserted sheets.
- **Ink Grey** (#4a4a45): secondary text and photo captions on paper.
- **Placeholder Grey** (#5c5c57): bracketed placeholder copy, italic, at 6:1 on newsprint.
- **Cover Grey** (#a9a9a3): secondary text, idle nav and imprint on black.

### Named Rules
**The Two Inks Rule.** Only black and yellow ink exist. No third hue, no tints of yellow as backgrounds, no gradients between them.

**The Flood Rule.** Yellow is printed as a solid area that owns a region (a panel, a band, a tab, a sheet). It is never a glow, an outline accent on paper, or a coloured word inside a black heading.

**The Logo On Black Rule.** The logo's car is white, so the mark only appears on press-black grounds: masthead, cover, back cover.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow fallback)
**Body Font:** Archivo, variable width (with system-ui fallback)

**Character:** Big Shoulders is condensed signage lettering with strong numerals, set in uppercase at weight 800 for headings, folios, roundels and names. Archivo does the reading at normal width, and its condensed width (75%) at weight 600 does labels, table heads, running heads and nav without resorting to tracked capitals.

### Hierarchy
- **Display** (800, clamp(4.25rem, 13vw, 10rem), 0.82): the cover title only.
- **Page title** (800, clamp(3.75rem, 11vw, 8.5rem), 0.88): one per inner page, beside the yellow page-number tab.
- **Headline** (800, clamp(2.75rem, 6.5vw, 5rem), 0.88): spread headings sitting on a 5px rule.
- **Title** (800, 1.625–2.25rem, 0.95–1): entry names, bulletin headlines, advert lines, note headings.
- **Lede** (400, clamp(1.1875rem, 1.6vw, 1.375rem), 1.45): page introductions, max 40em.
- **Body** (400, 1.0625rem, 1.55): reading text, max about 38em; tabular figures throughout.
- **Label** (600, 0.9375rem, width 75%): table heads, running heads, nav, dates, form labels. Sentence case.

### Named Rules
**The No Tracked Caps Rule.** Small labels use Archivo's condensed width, not letter-spaced capitals or monospace.

**The Tabular Figures Rule.** All numerals are tabular, so dates, times and results line up in columns.

## Layout

A 1320px container with a fluid gutter (clamp(16px, 4vw, 48px)) and a 12-column grid with 24–48px gaps; columns collapse to one below 860px. Spreads are separated by clamp(64px, 9vw, 128px). Each inner page opens with a running head (programme name left, section name right) over a 1px rule, then the page title with its number tab, then a double rule (5px over 1.5px). Within spreads, content sits in ruled rows (16–28px vertical padding, 1px hairline at 22% black) rather than boxes. Full-bleed regions are reserved for the cover, the yellow timetable band and the back cover, and each sits flush against its neighbours. The masthead is a 64px sticky black band; below 820px its nav folds into a full-height black contents panel.

## Elevation & Depth

None. The system is flat like a printed page: no shadows, no blur, no glass. Hierarchy comes from ink weight, rule weight, the yellow floods and the change of stock (newsprint vs sheet white vs black cover).

### Named Rules
**The Flat Press Rule.** Nothing floats. Depth is a heavier rule or a different stock, never a shadow.

## Shapes

Square corners throughout (0px): panels, adverts, buttons, inputs, photo plates, tabs. The one round form is the race-number roundel, a full circle with a 2px black ring (3px at large size) on sheet white. Lines carry structure: 1px hairlines between rows, 2px under table heads, 5px under spread headings, a double rule under page titles, dotted leaders in contents lists, and 1.5px keylines around adverts and the form.

## Components

### Buttons
- **Shape:** square (0px), 48px tall.
- **Primary:** press-black block with spot-yellow label, Archivo 700 at 85% width, 22px side padding.
- **Hover / Focus:** turns pure black with white text; focus is a 2px black outline offset 3px (yellow on black grounds).
- **Disabled:** placeholder-grey block with newsprint text.

### Navigation
- **Masthead:** sticky press-black band; logo left; links in Archivo 600 at 75% width, each prefixed by its yellow page number. Idle links cover-grey, hover and current newsprint, current page underlined by a 3px yellow bar.
- **Mobile:** a "Contents" text button opens a full-height black panel listing every page in display caps with dotted leaders and page numbers.

### Contents list
Label, dotted leader, page number in display figures. Used on the cover, in the mobile panel and on the back cover. Hovered or current numbers turn yellow.

### Page-number tab
A spot-yellow block holding the page number in display figures, aligned to the baseline of the page title.

### Race-number roundel
Circle in sheet white with a black ring and display numerals. Marks running order in the entry list, keyed car parts and the design-note sequence.

### Ledger tables and rows
Full-width, left-aligned, label-weight heads over a 2px rule, hairline rows, display numerals for round numbers. Used for the timetable, results, spec sheet, advertising rates, contact details and pit crew.

### Photo slot
A newsprint-shade plate with a 5px halftone dot screen at 30% black, captioned "Photo: [what it shows]" in ink grey. On black grounds the screen inverts.

### Adverts
An 8-column advert grid in programme sizes: full page (yellow flood), half, quarter and eighth (sheet white with a black keyline). Empty slots say "This space is available" with their size and level.

### Inputs / Fields
- **Style:** printed-form fields: transparent with a 1.5px black underline, labels to the left in condensed Archivo; the message box is ruled with 28px writing lines.
- **Focus:** the field fills with 35% spot yellow, like a highlighter.

### Motion
- **Page turn:** on internal navigation a spot-yellow sheet wipes in from the right (520ms, cubic-bezier(0.16, 1, 0.3, 1)) showing the destination's page number and section, the route changes beneath it, and it leaves to the left (460ms).
- **Ink roll:** spread and page headings reveal left to right with a clip-path (800ms) when scrolled into view.
- **Row print:** lists and table bodies fade up 12px row by row, 70ms apart, capped at 8 rows.
- **Cursor:** a spot-yellow dot trailing the pointer (eased at 0.2 per frame), multiplied onto paper. It opens into a highlighter disc over links, becomes a black disc with a label (such as "View") over marked images, and draws as a yellow ring on black. Shown whenever a mouse or trackpad is present, touchscreen laptops included.
- **Scroll:** Lenis smooth scrolling.
- **Reduced motion:** no page turn and no reveals; everything is visible immediately. The cursor stays but follows the pointer instantly. Lenis is currently forced on for everyone at the team's request (`FORCE_SMOOTH_SCROLL` in the smooth-scroll component); set it to false to respect the setting again.

## Do's and Don'ts

### Do:
- **Do** print yellow as solid floods that own a region: a panel, band, tab or sheet.
- **Do** give every new page a running head, a page-number tab and an entry in the `pages` list so the contents and page-turn know it.
- **Do** set headings, names and numerals in Big Shoulders Display 800 uppercase, and labels in Archivo at 75% width.
- **Do** use ruled rows and ledger tables for lists of facts.
- **Do** keep placeholders bracketed and italic in placeholder grey until the team supplies the real content.
- **Do** keep content visible without JavaScript; reveals may hide content only under the `motion-ok` flag.

### Don't:
- **Don't** add shadows, blur, glass, gradients or rounded cards.
- **Don't** introduce a third colour or tint yellow into pale backgrounds.
- **Don't** put the logo on newsprint or yellow; its white car disappears.
- **Don't** add small labels above headings, letter-spaced capitals or monospace labels.
- **Don't** invent names, results, times, sponsors or quotes; mark the gap instead.
