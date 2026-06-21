# The Sem — Full Website

"Where Stories Meet Spirits." A premium cocktail lounge and restaurant
website for The Sem, in Ranipool, Gangtok, Sikkim. Built with React,
Vite, Tailwind CSS, and React Router. Backend is Supabase (schema +
setup guide included; not yet connected — see below).

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build       # production build → dist/
npm run preview     # preview the production build locally
```

## What's included

**Public site**
- Home — hero carousel, Our Story (with clickable founder links), Quick
  Actions, Contact section with map + floating socials
- `/menu` — full cocktail & food menu with category filters
- `/craft-your-cocktail` — the 4-step interactive cocktail recommendation
  quiz (mood → spirit → mouthfeel → results), with save-to-favorites
- `/gallery` — masonry guest gallery with lightbox viewer
- `/reviews` — guest review submission + display, Google rating summary
- `/reservation` — reservation form with live restaurant-status banner
- `/contact` — dedicated contact page
- `/founders/som`, `/founders/sang`, `/founders/susma` — founder profile
  pages

**Admin panel** (`/admin`)
- Login screen (placeholder auth — see SUPABASE_SETUP.md to connect real
  Supabase Auth)
- Dashboard with five tabs: Overview (analytics/charts), Reservations
  (status control + table), Gallery (upload/caption/delete UI),
  Reviews (approve/hide/delete/export), Settings (contact info, maps
  link, hero/founder image upload placeholders)

**Backend**
- `supabase/schema.sql` — full schema: 9 tables (reservations, gallery,
  contact_information, restaurant_status, admin_users, menu_items,
  reviews, cocktail_builder_logs, page_visits), Row Level Security
  policies, and triggers
- `SUPABASE_SETUP.md` — step-by-step guide to connect Supabase, Gmail
  SMTP (via Edge Functions), Google Sheets sync, Google Reviews embed,
  and deployment

## Design system

- **Colors**: `ivory` (#FBF5EF) background, `pink` (#F4A6B7) brand,
  `pink-deep` (#C76E84) CTAs/links, `sage` (#9CAE91) accents, `ink`
  (#2B2420) text, `brass` (#CBA66C) for sparing premium details
- **Type**: `font-display` = Fraunces (headings, logo), `font-body` =
  Manrope (body/UI)
- **Signature element**: `CitrusDivider` — a hand-drawn citrus-twist line
  that draws itself in on scroll; the same accent appears as a hover
  underline (`.twist-link`) on nav links and founder names

## Current data sources (mock → live)

Everything renders from local JS files in `src/data/` right now
(`menu.js`, `founders.js`, `gallery.js`, `reviews.js`,
`cocktailOptions.js`) plus a few hardcoded constants
(`CONTACT` in `ContactSection.jsx`, `RESTAURANT_STATUS` in
`Reservation.jsx`). `SUPABASE_SETUP.md` section 5 shows exactly which
Supabase query replaces each one.

## Known placeholders to replace before going live

- Hero slider, gallery, and founder images are stock Unsplash photos —
  swap via the admin panel once Supabase Storage is connected
- Admin login accepts any email/password — wire to Supabase Auth
  (SUPABASE_SETUP.md, section 1)
- Reservation/review form submissions are local-only (no email, no
  Sheets sync) until the Edge Functions in SUPABASE_SETUP.md are deployed
- Google Reviews embed and automated post-visit feedback emails need the
  Google Cloud + Sheets API setup described in SUPABASE_SETUP.md
