---
name: Data Co-Pilot
description: A teacher data co-pilot that turns photos of paper records into structured, reviewable data.
colors:
  paper: "#f5f2ee"
  surface: "#faf8f5"
  surface-sunk: "#f0ede8"
  border: "#e8e3dc"
  border-hover: "#ccc6be"
  border-strong: "#aaa49d"
  ink: "#1a1a1a"
  muted: "#888077"
  hint: "#b8b0a5"
  success: "#2d7a4f"
  success-bg: "#f3faf5"
  success-border: "#bfe0cc"
  warn: "#a06b1a"
  warn-bg: "#fdf9f1"
  warn-border: "#e4d3b8"
  danger: "#c0392b"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "99px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "#333333"
    textColor: "{colors.surface}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  stat-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "7px 10px"
---

# Design System: Data Co-Pilot

## 1. Overview

**Creative North Star: "The Lab Notebook"**

This is the interface equivalent of a careful professional's working record: a
warm paper surface, ink-black text, and color used only where it carries meaning.
It reads as something you write *in*, not something that performs *at* you. The
personality from PRODUCT.md — **capable, quiet, exact** — shows up as restraint:
generous whitespace, hairline dividers instead of boxes, and a single near-black
"ink" that does almost all the typographic work. The AI is infrastructure here,
never a spectacle.

Density is low on the capture surface (the fast path is a photo) and rises on the
review surface, where the teacher is calm and wants to see students, scores, and
flags at a glance. Layering is tonal, not shadowed: the body is the warmest paper,
raised surfaces are a half-step lighter, and structure comes from borders and
spacing rather than drop shadows.

It explicitly rejects three things, straight from PRODUCT.md: **childish edu-app**
energy (no mascots, no primary-color blocks, no gamified badges), **AI-hype
aesthetics** (no purple gradients, no glassmorphism, no sparkle iconography), and
**clinical enterprise SaaS** (no dense cold grids, no navy-and-gray admin chrome).

**Key Characteristics:**
- Warm paper body, ink-black text, color reserved for meaning
- Tonal layering and hairline dividers; near-zero shadow
- One typeface (Inter) carrying the whole hierarchy through weight and size
- Pill-shaped controls; a single solid ink primary, no gradients
- Low-density capture, higher-density review

## 2. Colors

A warm-neutral paper palette with a single ink near-black, plus three semantic
signal colors (green/amber/red) that appear only to mean something.

### Primary
- **Ink** (#1a1a1a): The workhorse. Body text, headings, primary buttons, active
  filter chips. Near-black rather than pure black so it sits gently on warm paper.

### Neutral
- **Paper** (#f5f2ee): The body background. The warmest surface; everything sits on it.
- **Surface** (#faf8f5): Raised elements — the header bar, stat cards, inputs. A
  half-step lighter than paper to read as lifted without a shadow.
- **Surface Sunk** (#f0ede8): Avatars and inset chips; reads as recessed.
- **Border** (#e8e3dc): Hairline dividers, card outlines, row separators.
- **Border Hover** (#ccc6be): A firmer step for control borders on hover (filter chips).
- **Border Strong** (#aaa49d): Focus borders on inputs and the firmest divider step.
- **Muted** (#888077): Secondary text — labels, timestamps, nav at rest.
- **Hint** (#b8b0a5): Decorative/tertiary only (placeholder arrows, empty-state
  text). Never load-bearing body copy.

### Tertiary (semantic signals)
- **Success** (#2d7a4f) on **Success BG** (#f3faf5) / **Success Border** (#bfe0cc):
  "Ready" status, approved state, a resolved flag.
- **Warn** (#a06b1a) on **Warn BG** (#fdf9f1) / **Warn Border** (#e4d3b8):
  "Needs review" status, unresolved flag cards.
- **Danger** (#c0392b): Errors only. Never used decoratively.

### Named Rules
**The Meaning-Only Color Rule.** Paper and ink carry the interface. Green, amber,
and red appear *only* to signal status, a flag, or an error — never for emphasis,
decoration, or "visual interest". If a color isn't telling the teacher something,
it's wrong.

**The Ink-First Rule.** When in doubt, it's ink on paper. Reach for a tint only
when the element has a semantic state to express.

## 3. Typography

**Display / Body / Label Font:** Inter (with system-ui, sans-serif fallback)

**Character:** One humanist-geometric sans doing everything, differentiated by
weight (400/500/600) and size rather than by mixing families. This is deliberate:
a single confident voice, no decorative pairing, nothing to "style". Negative
letter-spacing on large sizes keeps headings tight and intentional.

### Hierarchy
- **Display** (600, 32px, line-height 1, -0.03em): Big dashboard stat numbers only.
- **Headline** (600, 22px, line-height 1.2, -0.02em): Page titles, greeting.
- **Title** (600, 15px, -0.01em): Product wordmark, section headings.
- **Body** (400/500, 13–14px, line-height 1.6): Row summaries, student names,
  detail values, resolved-flag messages. Cap prose at 65–75ch.
- **Label** (600, 10–11px, +0.08em, UPPERCASE): Section labels ("DETAILS",
  "STUDENTS", "NEEDS YOUR INPUT") and the small doc-type tag.

### Named Rules
**The One-Family Rule.** Inter only. Hierarchy comes from weight and size, never
from introducing a second typeface. No serif "for elegance", no mono "for data".

## 4. Elevation

Flat by intent. The system uses **tonal layering**, not shadows: paper → surface →
surface-sunk creates depth through warmth, and borders/spacing create structure.
There is no `box-shadow` vocabulary, and that is the design, not an omission.

### Named Rules
**The No-Shadow Rule.** Surfaces are distinguished by tone and a 1px border, never
by a drop shadow. If something needs to feel "lifted", lighten it toward surface;
don't float it. A shadow on this paper would read as a 2014 app card.

## 5. Components

### Buttons
- **Shape:** Fully pill (99px radius).
- **Primary:** Solid ink (#1a1a1a) background, surface-white text, 8px 16px padding.
  Used for the single most important action in context (Upload, Approve, Add).
- **Hover:** Background lifts to #333; 0.15s transition. No transform, no glow.
- **Ghost:** Transparent background, muted text, 1px border; hover firms the border
  and darkens text to ink. Used for secondary actions (Mark ready, Edit).

### Chips (filter pills)
- **Style:** Pill, transparent with a 1px border, muted text at rest.
- **State:** Active = solid ink background, surface-white text. Exactly one active
  at a time; the fill is the selection signal.

### Cards / Containers
- **Stat cards:** Surface background, 1px border, 12px radius, 20px padding. Used
  sparingly on the dashboard for at-a-glance counts.
- **Capture rows (signature):** NOT cards. A vertical list separated by 1px
  top-borders, expanding in place on click. This is the core review pattern and is
  deliberately border-divided rather than boxed — see The No-Shadow Rule.
- **Internal padding:** 16–20px.

### Inputs / Fields
- **Style:** Surface background, 1px border, 6–8px radius, 13px ink text.
- **Focus:** Border shifts to a firmer warm-gray (#aaa49d). No glow ring.
- **Date fields:** Native date picker is used wherever a flag asks for a date or
  year — the input *type* matches the question being asked.

### Flag Card (signature)
- A warn-tinted card (#fdf9f1 / #e4d3b8 border) holding the AI's question plus an
  inline input and an Add button. On resolution it flips to a success-tinted state
  (#f3faf5 / #bfe0cc border) and collapses the input into a confirmation message
  with an Edit affordance. This is the human-in-the-loop made visible: uncertainty
  is an actionable card, never a buried warning.

### Navigation
- Text links in the top bar, muted at rest, ink + 500 weight when active. No
  underlines, no buttons, no pills around nav items. The primary Upload action sits
  at the far right as the one solid control in the header.

## 6. Do's and Don'ts

### Do:
- **Do** keep ink-on-paper as the default; introduce green/amber/red only to signal
  status, a flag, or an error.
- **Do** use tonal layering (paper → surface → surface-sunk) and 1px borders for
  structure.
- **Do** keep body text at ink or muted with ≥4.5:1 contrast; if a gray is close to
  failing, push it toward ink. Never set body copy in hint (#b8b0a5).
- **Do** match the input type to the question — a date picker for a missing date,
  text for free-form notes.
- **Do** present every AI extraction as a draft the teacher confirms or corrects.

### Don't:
- **Don't** use purple gradients, glassmorphism, or sparkle/"magic" AI iconography.
  The AI is infrastructure, not a selling point.
- **Don't** introduce childish edu-app cues: cartoon mascots, bright primary-color
  blocks, gamified badges, streaks, or confetti.
- **Don't** drift into clinical enterprise SaaS: dense cold data grids, navy-and-gray
  admin chrome.
- **Don't** add drop shadows. Surfaces are flat; depth is tonal (The No-Shadow Rule).
- **Don't** introduce a second typeface. Inter carries everything (The One-Family Rule).
- **Don't** use a `border-left`/`border-right` colored stripe as an accent on cards
  or rows. Use full borders or a background tint.
