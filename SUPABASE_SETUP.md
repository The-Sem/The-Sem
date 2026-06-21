# The Sem — Backend Setup Guide

This covers everything needed to connect the frontend to a real backend:
Supabase (database + auth + storage), email notifications, and Google
Sheets sync. The frontend currently runs on mock/local data — this guide
gets it talking to live services.

---

## 1. Supabase Project Setup

1. Create a project at [supabase.com](https://supabase.com) (free tier is
   enough to start).
2. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` from
   this project → Run. This creates all 9 tables, RLS policies, and
   triggers in one go.
3. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key
4. In your frontend project, create a `.env` file:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Install the client and create `src/lib/supabase.js`:

   ```bash
   npm install @supabase/supabase-js
   ```

   ```js
   // src/lib/supabase.js
   import { createClient } from '@supabase/supabase-js'

   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )
   ```

### Admin Auth

The current `AdminLogin.jsx` is a placeholder (accepts any credentials).
Replace it with real Supabase Auth:

1. In Supabase: **Authentication → Users → Add user** — create the admin
   account (e.g. `thesem63@gmail.com` + a strong password).
2. Run this SQL once to register that user as an admin (replace the UUID
   with the user's actual ID from the Users table):

   ```sql
   insert into admin_users (id, full_name, role)
   values ('paste-user-uuid-here', 'The Sem Admin', 'admin');
   ```

3. In `AdminLogin.jsx`, replace the placeholder submit handler with:

   ```js
   const { error } = await supabase.auth.signInWithPassword({ email, password })
   if (error) setError(error.message)
   else navigate('/admin/dashboard')
   ```

4. In `RequireAdmin.jsx`, replace the `sessionStorage` check with a real
   session check via `supabase.auth.getSession()`.

### Storage (for gallery + hero + founder images)

1. Go to **Storage** → create three public buckets: `gallery`,
   `hero-images`, `founder-images`.
2. Set bucket policies to allow public `SELECT` and admin-only
   `INSERT`/`UPDATE`/`DELETE` (mirrors the RLS pattern in `schema.sql`).
3. Upload via the Settings/Gallery admin tabs using
   `supabase.storage.from('gallery').upload(path, file)`, then store the
   returned public URL in the corresponding table row.

---

## 2. Wiring the Reservation Form

Replace the `handleSubmit` TODO in `src/pages/Reservation.jsx`:

```js
const handleSubmit = async (e) => {
  e.preventDefault()

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      full_name: form.fullName,
      phone: form.phone,
      email: form.email,
      guests: Number(form.guests),
      reservation_date: form.date,
      reservation_time: form.time,
      special_requests: form.requests,
    })
    .select()
    .single()

  if (error) {
    // show an error state
    return
  }

  // Trigger the Edge Function that handles email + Sheets sync (see below)
  await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-reservation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reservation: data }),
  })

  setSubmitted(true)
}
```

---

## 3. Email Notifications (Gmail SMTP via Supabase Edge Function)

Supabase Edge Functions run on Deno and can call out to an SMTP relay.
Gmail SMTP needs an **App Password** (not your normal Gmail password):

1. On the `thesem63@gmail.com` Google account, enable 2-Step Verification,
   then generate an **App Password** under
   Google Account → Security → App Passwords.
2. Install the Supabase CLI and create a function:

   ```bash
   supabase functions new handle-reservation
   ```

3. `supabase/functions/handle-reservation/index.ts`:

   ```ts
   import { serve } from 'https://deno.land/std/http/server.ts'
   import nodemailer from 'npm:nodemailer'

   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'thesem63@gmail.com',
       pass: Deno.env.get('GMAIL_APP_PASSWORD'),
     },
   })

   serve(async (req) => {
     const { reservation } = await req.json()

     // 1. Email the guest
     await transporter.sendMail({
       from: '"The Sem" <thesem63@gmail.com>',
       to: reservation.email,
       subject: 'Your table at The Sem is confirmed',
       html: `<p>Hi ${reservation.full_name},</p>
              <p>Your table for ${reservation.guests} on
              ${reservation.reservation_date} at ${reservation.reservation_time}
              is booked. We can't wait to see you.</p>`,
     })

     // 2. Notify the admin
     await transporter.sendMail({
       from: '"The Sem Website" <thesem63@gmail.com>',
       to: 'thesem63@gmail.com',
       subject: `New reservation: ${reservation.full_name}`,
       html: `<p>${reservation.full_name} (${reservation.phone}) booked
              ${reservation.guests} guests on ${reservation.reservation_date}
              at ${reservation.reservation_time}.</p>
              <p>Notes: ${reservation.special_requests || '—'}</p>`,
     })

     // 3. Append to Google Sheet (see section 4)
     await appendToGoogleSheet(reservation)

     return new Response(JSON.stringify({ ok: true }), {
       headers: { 'Content-Type': 'application/json' },
     })
   })
   ```

4. Set the secret and deploy:

   ```bash
   supabase secrets set GMAIL_APP_PASSWORD=your-16-char-app-password
   supabase functions deploy handle-reservation
   ```

Use the same pattern for a second function, `handle-review`, that fires
when a review is submitted, and a scheduled function (`pg_cron` +
Edge Function) for the **automated post-visit feedback email** — query
`reservations` where `reservation_date < now()` and
`feedback_email_sent = false`, send the "We'd love to hear about your
experience" email, then set the flag to `true`.

---

## 4. Google Sheets Sync

The cleanest path is a Google Service Account + the Sheets API, called
from the same Edge Function.

1. In [Google Cloud Console](https://console.cloud.google.com), create a
   project → enable the **Google Sheets API**.
2. Create a **Service Account**, generate a JSON key.
3. Create a Google Sheet (owned by `thesem63@gmail.com`) with tabs
   `Reservations` and `Reviews`, matching these headers:

   - **Reservations**: `Date Submitted, Full Name, Phone, Email, Guests, Date, Time, Special Requests`
   - **Reviews**: `Date, Customer Name, Rating, Review, Photo URL`

4. Share the Sheet with the service account's email
   (`xxxx@your-project.iam.gserviceaccount.com`) as an Editor.
5. Add the service account JSON as a Supabase secret
   (`GOOGLE_SERVICE_ACCOUNT_KEY`), then in the Edge Function:

   ```ts
   import { google } from 'npm:googleapis'

   async function appendToGoogleSheet(reservation) {
     const auth = new google.auth.GoogleAuth({
       credentials: JSON.parse(Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY')),
       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
     })
     const sheets = google.sheets({ version: 'v4', auth })

     await sheets.spreadsheets.values.append({
       spreadsheetId: 'your-sheet-id',
       range: 'Reservations!A:H',
       valueInputOption: 'USER_ENTERED',
       requestBody: {
         values: [[
           new Date().toISOString(),
           reservation.full_name,
           reservation.phone,
           reservation.email,
           reservation.guests,
           reservation.reservation_date,
           reservation.reservation_time,
           reservation.special_requests || '',
         ]],
       },
     })
   }
   ```

   Repeat the same pattern for reviews in `handle-review`.

---

## 5. Connecting Live Data to the Frontend

Once the tables are populated, swap the hardcoded constants for live
queries. Examples:

```js
// Contact info (replaces the CONTACT constant in ContactSection.jsx)
const { data } = await supabase.from('contact_information').select('*').single()

// Restaurant status (replaces RESTAURANT_STATUS in Reservation.jsx)
const { data } = await supabase.from('restaurant_status').select('status').single()

// Gallery (replaces GALLERY_IMAGES in Gallery.jsx)
const { data } = await supabase
  .from('gallery')
  .select('*')
  .order('sort_order')

// Menu items (replaces MENU in menu.js)
const { data } = await supabase
  .from('menu_items')
  .select('*')
  .eq('is_available', true)

// Approved reviews (replaces REVIEWS in Reviews.jsx)
const { data } = await supabase
  .from('reviews')
  .select('*')
  .eq('approved', true)
  .eq('hidden', false)
  .order('created_at', { ascending: false })
```

For instant updates (e.g. gallery changes reflecting immediately), use
Supabase Realtime subscriptions:

```js
supabase
  .channel('gallery-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, (payload) => {
    // refetch or merge `payload.new` into state
  })
  .subscribe()
```

---

## 6. Google Reviews Embed

Google's official review widgets require either the **Places API**
(server-side, to avoid exposing your API key) or a third-party embed
tool (e.g. EmbedSocial, Elfsight). The simplest path:

1. Get your Place ID by searching "The Sem" on
   [Google's Place ID finder](https://developers.google.com/maps/documentation/places/web-service/place-id).
2. Use the Places API `Place Details` endpoint from a Supabase Edge
   Function (keeps your API key server-side) to fetch `rating` and
   `user_ratings_total`, cache the result, and serve it to the frontend
   (e.g. refresh every few hours via `pg_cron`).
3. Display alongside your own `reviews` table data, as already laid out
   in `Reviews.jsx`.

---

## 7. Deployment

- **Frontend**: any static host works well with Vite — Vercel, Netlify,
  or Cloudflare Pages. Build with `npm run build`, deploy the `dist/`
  folder. Set the `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` env vars
  in the host's dashboard.
- **Edge Functions**: deployed via `supabase functions deploy`, hosted by
  Supabase directly — no separate server needed.
- **Domain**: point your domain's DNS to the static host, then update the
  Open Graph tags and Restaurant schema URLs in `index.html` to match.

---

## 8. Suggested Build Order

1. Run `schema.sql`, set up Auth + the one admin user.
2. Wire the Reservation form to Supabase (insert only, no email yet) —
   confirm rows land in the `reservations` table.
3. Add the `handle-reservation` Edge Function for email + Sheets sync.
4. Repeat for Reviews (`handle-review` function).
5. Move Gallery, Menu, and Contact Info to live Supabase reads.
6. Add the scheduled post-visit feedback email (`pg_cron` + Edge
   Function).
7. Wire up Google Reviews embed last — it's the only piece dependent on
   a separate Google Cloud project/API key.
