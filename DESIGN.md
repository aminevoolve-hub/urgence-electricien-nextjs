---
name: Électricien Commercial SC
description: Commercial and industrial electrical contractor marketing site for Montréal
colors:
  navy-deep: "#050b1a"
  navy-primary: "#0a1433"
  navy-panel: "#0f1f4d"
  navy-line: "#d6e6fa"
  amber-signal: "#e8790a"
  amber-bright: "#f59320"
  neutral-ink: "#0a1020"
typography:
  display:
    fontFamily: "Jura, Outfit, sans-serif"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Outfit, Arial, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "8px"
  lg: "24px"
  full: "9999px"
spacing:
  section-y: "5rem"
  section-y-lg: "6.25rem"
components:
  button-primary:
    backgroundColor: "{colors.amber-signal}"
    textColor: "{colors.navy-deep}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.amber-bright}"
---

# Design System: Électricien Commercial SC

## Overview

**Creative North Star: "The Live Panel"** (third revision)

Third full rebuild of this site's visual layer, keeping the same product content and the same logo-derived palette (vivid electric blue + saturated orange) across every revision, per explicit user instruction. Content, routes, and colors are the fixed points; composition and component language have been rebuilt from scratch each time the user asked for something unmistakably different. This revision: a centered, glow-blob hero (not a split-screen with an illustration), a transparent header that solidifies to glass on scroll, an asymmetric bento grid for services (not uniform cards), a testimonial grid (not a marquee), a light footer (not a dark one), and generous `rounded-3xl` corners everywhere instead of the previous angular cut-corner or tight-radius systems.

**Key Characteristics:**
- Vivid electric blue (`#0a1433`/`#050b1a`) as the dominant dark field color, saturated orange (`#e8790a`) as the sole signal accent, both drawn from the S/C bolt logo
- Jura (bold) for every heading; humanist Outfit for body/UI text
- Full-pill buttons; generous `rounded-3xl` cards and panels; no angular/cut-corner shapes
- Glassmorphism (`backdrop-filter` blur) on floating/overlay elements only: the header, hero badges, back-to-top button, chatbot panel
- The hero headline animates letter-by-letter on each rotation; a back-to-top button appears past 600px of scroll, tracked via Motion's `useScroll`, never a raw scroll listener

## Colors

### Primary
- **Navy Enclosure** (`#0a1433`): dominant dark field for the hero, services section, page headers.
- **Amber Signal** (`#e8790a` / bright `#f59320`): the single accent, used for primary CTAs and active/highlight states only.

### Neutral
- **Deep Navy** (`#050b1a`), **Panel Navy** (`#0f1f4d`), **Hairline Navy** (`#d6e6fa`), **Ink** (`#0a1020`), White.

### Named Rules
**The One Signal Rule.** Orange never fills a background region larger than a button, badge, or the one deliberately-colored bento tile in the services grid.

## Typography

**Display Font:** Jura, bold (700), with Outfit fallback.
**Body Font:** Outfit, full variable weight (100-900) via `next/font/google`.

### Named Rules
**The Single-Face Discipline Rule.** Only Jura (headings, bold) and Outfit (everything else) exist on the site.

## Layout

`max-w-6xl` content width across every page. The homepage hero is a centered composition (not split), secondary-page headers are centered dark bands. Header is `position: fixed` and transparent over the homepage hero, solidifying to `.glass-light` past 40px of scroll or on any non-home page; `main` carries `pt-20` to compensate, with the homepage hero using `-mt-20` to bleed under it.

## Elevation & Depth

Resting content is flat with hairline borders or solid color fields, never a shadow. Floating overlays (header, mega-menu, chatbot, back-to-top, hero badges) use glassmorphism instead of a shadow or a solid fill.

## Shapes

One consistent, generous corner language: `rounded-full` for every button, `rounded-3xl` for every card/panel/image frame. No angular or tight-radius shapes anywhere (the previous cut-corner system was tried and retired).

## Components

### Buttons
- **Primary:** full pill, amber background, navy-950 text.
- **Secondary/Ghost:** full pill, transparent or glass, reserved for the phone-call action.

### Cards / Panels
- `rounded-3xl`, white or navy-950 background depending on section, hairline border on light cards.

### Signature Component: Hero
Centered composition: eyebrow badge (glass), letter-by-letter animated headline (Jura bold), subtext, two pill CTAs, all over a dark navy field with two large blurred color blobs (blue and amber) for atmosphere. No illustration, no split-screen photo panel.

### Signature Component: ServicesGrid (bento)
Four services in an asymmetric bento: the first service gets a 2x2 amber-filled tile, the other three get standard dark tiles. Replaces the earlier uniform 2-column card grid.

### Signature Component: Header
Fixed, transparent over the homepage hero, animates to a glass-light solid bar past 40px of scroll (tracked via `useScroll`/`useMotionValueEvent`) or by default on every non-home route.

## Do's and Don'ts

### Do:
- **Do** keep amber/orange as the only accent color; keep the logo-derived electric blue as the dominant dark field.
- **Do** use Jura bold for headings and Outfit for everything else.
- **Do** keep every shape either full-pill (buttons) or `rounded-3xl` (everything else); never introduce a third radius or an angular cut.
- **Do** confine glassmorphism to floating/overlay elements; keep resting content flat.

### Don't:
- **Don't** use an em dash or en dash anywhere in visible copy.
- **Don't** drive scroll-based state with a raw `window.addEventListener("scroll")`.
- **Don't** render a stock/placeholder photo as if it were real company or project photography; use the service icon + "Photo à venir" fallback instead.
