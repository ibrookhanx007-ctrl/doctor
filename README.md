# Northgate Family Dental

A portfolio demo site for a fictional 4-chair general and cosmetic dental
practice in Asheville, NC. Built with Astro + Tailwind, deployed as a
static site on Netlify with one small serverless function for live
appointment availability.

## Stack

- **Astro** (static output) + **Tailwind CSS**
- **Cal.com embed** for all booking (inline on `/book`, popup everywhere else)
- **Netlify Functions** for the "next available" strip, with a graceful
  fallback when no live calendar is connected
- Self-hosted **Fraunces** (serif, headings) and **Public Sans** (body) via
  Fontsource — no external font requests at runtime
- Photography from Unsplash (see **Image credits** below)

## Running locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-checks then builds to dist/
npm run preview   # serve the production build locally
```

## Before this goes live: Cal.com setup

This build points at a **placeholder Cal.com account** (`northgate-dental`)
so the booking UI is fully wired up and functional in shape, but it isn't
a real, bookable calendar yet. To launch for real:

1. Create a Cal.com account for the practice and set the username in
   `src/data/site.ts` (`CAL_USERNAME`).
2. Create four event types with these exact slugs and durations (the
   slugs must match or update `EVENT_TYPES` in `src/data/site.ts`):

   | Event | Slug | Duration |
   |---|---|---|
   | New Patient Exam | `new-patient-exam` | 60 min |
   | Cleaning | `cleaning` | 45 min |
   | Emergency Visit | `emergency` | 30 min |
   | Consultation | `consultation` | 30 min |

3. Set the practice's real business hours and buffer times inside Cal.com
   itself — the site's own `BUSINESS_HOURS` (see below) is only used for
   the availability-strip fallback, not for actual scheduling limits.

Every booking button on every page already points at this config, so
once the real account and event types exist, booking goes live with no
further code changes.

## Live "next available" strip

The green strip under the homepage hero calls a Netlify Function at
`/api/availability` (`netlify/functions/availability.js`).

- **Without configuration**, it computes the next 3 slots from the
  practice's published hours (`BUSINESS_HOURS` in that file), so the
  strip always shows something honest and correctly time-zoned, even
  before a real calendar is connected.
- **Once you set two environment variables** in the Netlify dashboard
  (Site settings → Environment variables):
  - `CAL_API_KEY` — a Cal.com API key
  - `CAL_EVENT_TYPE_ID` — the numeric event type ID for the New Patient
    Exam event

  the function automatically switches to real, live slots pulled from
  Cal.com's API. No code changes needed — it detects the env vars at
  request time.

If the fetch fails for any reason (rate limit, bad key), it silently
falls back to the computed slots rather than showing an error.

## Contact form

The contact page uses a native **Netlify Forms** submission (`name="contact"`
with `data-netlify="true"`) — no JavaScript or third-party form service
required. Submissions show up in the Netlify dashboard under Forms once
deployed. A honeypot field (`company`) is included for basic spam
filtering.

## Deploying to Netlify

1. Push this repo to GitHub/GitLab and "Import" it in Netlify, or run
   `netlify deploy` from the CLI.
2. Build command: `npm run build` — output directory: `dist` (already set
   in `netlify.toml`).
3. Add the two Cal.com env vars above if/when you want live availability.
4. Netlify will pick up `netlify/functions/availability.js` automatically.

## Content that needs a final human pass

Everything here is written to be publish-ready copy, not lorem ipsum, but
a few things are explicitly placeholders for a real practice to swap in:

- **Address, phone, email** — `src/data/site.ts`. The address is a
  plausible but invented Asheville street address; replace it and the
  Google Maps embed URL will need the real one regenerated (it's a plain
  `maps.google.com/maps?q=...&output=embed` URL, no API key required).
- **Staff names and Dr. Marsh's bio** — `src/data/staff.ts`. Fictional,
  for demo purposes.
- **Reviews** — `src/data/reviews.ts`. Written for this demo; a real
  launch should use actual patient reviews (and check state advertising
  rules on displaying testimonials).
- **Insurance carriers, membership plan pricing** — `src/pages/new-patients.astro`.
  Placeholder examples; confirm with the real practice.

## Image credits

Photos are free-to-use under the [Unsplash License](https://unsplash.com/license)
(no attribution required, credited here as good practice). Swap them for
real photos of the actual practice and dentist before using this for
anything but a demo.

- Treatment room (home hero) — Kari Bjorn Photography
- Dentist portrait (converted to black & white for this site) — Ocho Artex Media

## Known limitation of this sandboxed build environment

This project was built in a network-restricted sandbox that cannot reach
`app.cal.com` or run Netlify Functions locally. Both features are coded
against Cal.com's and Netlify's documented, stable APIs and degrade
gracefully (see above), but they could only be smoke-tested against
static fallbacks here — verify the live Cal.com popups/inline embed and
the `/api/availability` function once deployed to Netlify with a real
Cal.com account connected.

## Lighthouse (mobile, measured in this environment)

Performance 100 · Accessibility 100 · Best Practices 96 · SEO 100, on
every page. The Best Practices score is capped only by the two network
calls described above failing in this sandbox (Cal.com blocked, and the
availability function not running under plain `astro preview`) — both
resolve once deployed to Netlify with a real Cal.com account.
