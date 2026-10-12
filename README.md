# Wedding Invitation, golden palace (template5)

Mobile-first wedding invitation recreated from a nine-screen reference sheet: a Ganesha-and-palace hero, a countdown with a blush watercolour panel, a story timeline, a day schedule, a mosaic gallery with a full gallery page, RSVP form, venue and map, and a thank-you page with the palace watermark.

React 18 · Vite · TypeScript · Tailwind CSS · Motion for React (`motion`) · Lucide icons. No backend required.

> **All names, the date, venue, phone and e-mail are SAMPLE content** (Abhishek & Radhika, Royal Palace, Lahore). Replace them in `src/data/invitation.ts`.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ locally
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). On Vercel the framework preset is **Vite**.

## Pages (in the reference's order)

| # | Id | What it is |
| --- | --- | --- |
| 0 | cover | "Tap to open": petals burst from a gold seal and the cover shrinks into it |
| 1 | `home` | Hero: picture, "Wedding Invitation", names, date frame, venue, glowing diya |
| 2 | `save-the-date` | Countdown (Days / Hours / Secs), date, blush panel with the couple's line |
| 3 | `our-story` | Three-step timeline and the couple's photo |
| 4 | `schedule` | Six events on a vertical timeline |
| 5 | `gallery` | "Our Gallery": feature photo and tiles; **View More Photos** opens the viewer over all ten extra photos |
| 6 | `rsvp` | Name, phone, e-mail, guests, attendance, dietary needs, message |
| 7 | `venue` | Venue photo, date and time, Google Maps button, map card, contact |
| 8 | `thank-you` | Names, thanks, hashtag, social icons, copyright |

Each page fills the screen below the top bar, snaps into place, and animates as it enters (curtain wipes, drawing timelines, popping icons, written-in names, ripples). All motion is switched off for guests who prefer reduced motion.

## Reuse for another couple

Edit **only** `src/data/invitation.ts`:

| Field | What it controls |
| --- | --- |
| `couple` | Names and hashtag. The monogram in the top bar and on the cover seal is made from the first letters |
| `event.start` / `end` / `timezone` | Weekday, date, time range and the countdown are all **calculated** from these |
| `hero`, `saveTheDate`, `story`, `schedule` | Wording, icons and times of each page |
| `gallery.preview` / `gallery.all` | The six tiles shown on the page, and every photo opened by "View More Photos" |
| `rsvp.whatsappNumber` | Where RSVP replies go when no endpoint is set (digits, with country code) |
| `venue` | Name, address, Google Maps search text, photos, phone and e-mail |
| `social`, `cover`, `nav`, `musicSrc` / `musicOnOpen` | Links, cover text, menu, optional music |

`?guest=Aunt%20Sara` on the link adds "Dear Aunt Sara" to the cover.

## Structure

```
src/
├─ App.tsx                   page composition + cover flow
├─ data/invitation.ts        ← all content
├─ types.ts
├─ components/
│  ├─ sections/              TopBar, OpeningCover, Hero, SaveTheDate, Story, Schedule,
│  │                         Gallery (with lightbox), Rsvp, Venue, ThankYou
│  └─ ui/                    ScrollPage, Decor (florals, ornaments, page title), Effects (petals, sparkles,
│                            progress), Lightbox, Icons (monogram, brands), Reveal, MusicPlayer
├─ hooks/useCountdown.ts
├─ lib/                      dates, image (Cloudinary), rsvp (integration point), guest, calendar, scroll
├─ assets/                   photos/ and florals/ (every image the site imports)
└─ styles/index.css
```

## Assets

**Every picture was cut from the low-resolution reference sheet, so they look soft.** Replace them with real files of the same name in `src/assets/photos` (or set a `cloudinaryId`):

| File | Used for | Suggested size |
| --- | --- | --- |
| `hero.webp` | Hero (and the cover's top) | 1000 x 1500 |
| `hero-flowers.webp` | Flower strip along the hero's bottom edge | 1600 x 260 |
| `story.webp` | Our Story photo | 900 x 1320 |
| `gal-main`, `gal-a`…`gal-e` | "Our Gallery" tiles | 1200 on the long edge |
| `g1`…`g10` | "View More Photos" viewer | 1000 on the long edge |
| `venue.webp`, `map.webp` | Venue photo and map card | 1400 x 750 |
| `palace-faint.webp` | Watermark behind the thank-you page | 1600 x 700 |
| `src/assets/florals/fl-*.png` | Painted floral corners and strips (transparent PNG) | as supplied |
| `public/assets/og-image.jpg` | Link preview (WhatsApp, social) | 1200 x 630 |
| `public/assets/favicon.svg` | Browser tab icon | square SVG |

## RSVP: how replies are handled

`src/lib/rsvp.ts` never pretends to save data:

1. `VITE_RSVP_ENDPOINT` set → the reply is POSTed as JSON (Google Apps Script web app, Supabase edge function, your API).
2. Otherwise, with a WhatsApp number → a pre-filled WhatsApp message to the family opens, and the success text says exactly that.
3. Otherwise nothing is sent, and the page says so.

## Notes

- Anchor links (menu and arrows) use their own scroll animation in `src/lib/scroll.ts`. The browser's native smooth scroll gets cancelled part-way on a page this long.
- The hero text and date frame scale with the screen height so the first screen always fits phones from 320 px up.

## Image folders

```
src/assets/
├─ photos/     22 pictures: hero, hero-flowers, story, gal-*, g1…g10, venue, map, palace-faint
└─ florals/    7 painted floral PNGs: fl-tl, fl-tr, fl-bl, fl-br, fl-strip, fl-strip-rsvp, fl-top-left-s2
public/assets/ og-image.jpg (link preview) and favicon.svg
```

Pictures in `src/assets` are imported by the code and fingerprinted by Vite at build time. The two files in `public/assets` are referenced by URL from `index.html`.
