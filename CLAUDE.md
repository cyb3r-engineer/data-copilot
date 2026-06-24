# Data Co-Pilot

A teacher data co-pilot that turns photos of paper teaching records (assessments,
IEP goal progress, behaviour logs, observations) into structured, reviewable data.
AI extracts; the teacher reviews, corrects, and approves. Human-in-the-loop is a
hard requirement.

**Stack:** Vanilla HTML/CSS/JS frontend (`public/`), Vercel serverless API routes
(`api/parse.js`, `api/queue.js`, `api/update.js`), Supabase (`captures` table),
Gemini API for parsing.

## Design Context

This project has impeccable design context. Before substantial UI work, read:

- **[PRODUCT.md](PRODUCT.md)** — register (`product`), users (busy classroom
  teachers), purpose, brand personality (*capable, quiet, exact*), anti-references,
  and 5 design principles (extraction-is-a-draft, surface-uncertainty,
  fast-path-is-the-photo, partial-wins-count, quiet-by-default).
- **[DESIGN.md](DESIGN.md)** — visual system under the North Star *"The Lab
  Notebook"*: warm paper + ink, meaning-only color (green/amber/red signal status
  only), no-shadow tonal layering, Inter-only typography. Tokens are normative.
