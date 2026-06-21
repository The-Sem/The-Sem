-- =====================================================================
-- THE SEM — SUPABASE SCHEMA
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- =====================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- 1. RESERVATIONS
-- ---------------------------------------------------------------------
create table reservations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  guests integer not null check (guests > 0),
  reservation_date date not null,
  reservation_time time not null,
  special_requests text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  feedback_email_sent boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_reservations_date on reservations (reservation_date);
create index idx_reservations_status on reservations (status);

-- ---------------------------------------------------------------------
-- 2. GALLERY
-- ---------------------------------------------------------------------
create table gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  sort_order integer not null default 0,
  uploaded_by uuid,
  created_at timestamptz not null default now()
);

create index idx_gallery_sort on gallery (sort_order);

-- ---------------------------------------------------------------------
-- 3. CONTACT INFORMATION  (single editable row)
-- ---------------------------------------------------------------------
create table contact_information (
  id integer primary key default 1,
  phone text not null default '+91 90461 57720',
  whatsapp_number text not null default '919046157720',
  email text not null default 'thesem63@gmail.com',
  address text not null default
    'Near Central Bank of India, Ranipool, Gangtok, Sikkim 737135',
  google_maps_embed_url text,
  instagram_url text not null default
    'https://www.instagram.com/thesem_sikkim',
  facebook_url text not null default
    'https://www.facebook.com/share/1DGbeTaFeG/',
  zomato_url text not null default
    'https://link.zomato.com/xqzv/rshare?id=1304077753056341e',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into contact_information (id) values (1);

-- ---------------------------------------------------------------------
-- 4. RESTAURANT STATUS  (single editable row)
-- ---------------------------------------------------------------------
create table restaurant_status (
  id integer primary key default 1,
  status text not null default 'open'
    check (status in ('open', 'limited', 'full')),
  updated_at timestamptz not null default now(),
  updated_by uuid,
  constraint single_row check (id = 1)
);

insert into restaurant_status (id) values (1);

-- ---------------------------------------------------------------------
-- 5. ADMIN USERS
-- Note: actual login/password is handled by Supabase Auth
-- (auth.users). This table stores role/profile info linked to it.
-- ---------------------------------------------------------------------
create table admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 6. MENU ITEMS
-- ---------------------------------------------------------------------
create table menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  ingredients text[],
  taste_tags text[],
  mood_tags text[],
  spirit text,
  abv text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_menu_items_category on menu_items (category);

-- ---------------------------------------------------------------------
-- 7. REVIEWS
-- ---------------------------------------------------------------------
create table reviews (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid references reservations (id) on delete set null,
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  review_text text,
  photo_url text,
  approved boolean not null default false,
  hidden boolean not null default false,
  admin_response text,
  created_at timestamptz not null default now()
);

create index idx_reviews_approved on reviews (approved, hidden);

-- ---------------------------------------------------------------------
-- 8. COCKTAIL BUILDER ANALYTICS  (for "most selected mood/spirit")
-- ---------------------------------------------------------------------
create table cocktail_builder_logs (
  id uuid primary key default gen_random_uuid(),
  moods text[] not null,
  spirit text,
  mouthfeels text[],
  recommended_items uuid[],
  favorited_items uuid[],
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 9. SITE ANALYTICS (lightweight visit counter, optional)
-- ---------------------------------------------------------------------
create table page_visits (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  visited_at timestamptz not null default now()
);

create index idx_page_visits_path_date on page_visits (page_path, visited_at);


-- =====================================================================
-- ROW LEVEL SECURITY (RLS)
-- Public (anon) users may INSERT reservations/reviews/builder-logs and
-- READ public-facing data, but cannot read/modify admin-only data.
-- Authenticated admins (via admin_users) get full access.
-- =====================================================================

alter table reservations enable row level security;
alter table gallery enable row level security;
alter table contact_information enable row level security;
alter table restaurant_status enable row level security;
alter table admin_users enable row level security;
alter table menu_items enable row level security;
alter table reviews enable row level security;
alter table cocktail_builder_logs enable row level security;
alter table page_visits enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from admin_users where id = auth.uid()
  );
$$;

-- RESERVATIONS: anyone can insert; only admins can read/update/delete
create policy "Public can create reservations"
  on reservations for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view reservations"
  on reservations for select
  to authenticated
  using (is_admin());

create policy "Admins can update reservations"
  on reservations for update
  to authenticated
  using (is_admin());

create policy "Admins can delete reservations"
  on reservations for delete
  to authenticated
  using (is_admin());

-- GALLERY: public can read, only admins can write
create policy "Public can view gallery"
  on gallery for select
  to anon, authenticated
  using (true);

create policy "Admins can manage gallery"
  on gallery for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- CONTACT INFO: public can read, only admins can write
create policy "Public can view contact info"
  on contact_information for select
  to anon, authenticated
  using (true);

create policy "Admins can update contact info"
  on contact_information for update
  to authenticated
  using (is_admin());

-- RESTAURANT STATUS: public can read, only admins can write
create policy "Public can view restaurant status"
  on restaurant_status for select
  to anon, authenticated
  using (true);

create policy "Admins can update restaurant status"
  on restaurant_status for update
  to authenticated
  using (is_admin());

-- ADMIN USERS: only admins can view/manage
create policy "Admins can view admin_users"
  on admin_users for select
  to authenticated
  using (is_admin());

-- MENU ITEMS: public can read available items, admins manage everything
create policy "Public can view available menu items"
  on menu_items for select
  to anon, authenticated
  using (is_available = true or is_admin());

create policy "Admins can manage menu items"
  on menu_items for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- REVIEWS: public can submit + read approved/visible reviews;
-- admins can read/manage everything
create policy "Public can submit reviews"
  on reviews for insert
  to anon, authenticated
  with check (true);

create policy "Public can view approved reviews"
  on reviews for select
  to anon, authenticated
  using ((approved = true and hidden = false) or is_admin());

create policy "Admins can manage reviews"
  on reviews for update
  to authenticated
  using (is_admin());

create policy "Admins can delete reviews"
  on reviews for delete
  to authenticated
  using (is_admin());

-- COCKTAIL BUILDER LOGS: public can insert (anonymous analytics),
-- only admins can read
create policy "Public can log builder usage"
  on cocktail_builder_logs for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view builder logs"
  on cocktail_builder_logs for select
  to authenticated
  using (is_admin());

-- PAGE VISITS: public can insert, only admins can read
create policy "Public can log page visits"
  on page_visits for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view page visits"
  on page_visits for select
  to authenticated
  using (is_admin());


-- =====================================================================
-- DATABASE FUNCTIONS / TRIGGERS
-- =====================================================================

-- Auto-update `updated_at` on contact_information / restaurant_status
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_contact_information_updated
  before update on contact_information
  for each row execute function set_updated_at();

create trigger trg_restaurant_status_updated
  before update on restaurant_status
  for each row execute function set_updated_at();


-- =====================================================================
-- SEED DATA (optional) — uncomment to insert a few starter menu items
-- =====================================================================
-- insert into menu_items (category, name, description, price, spirit, abv, taste_tags, mood_tags)
-- values
--   ('Signature Cocktails', 'The Zesty Ex', 'Gin, lemon, elderflower, and soda.', 450, 'Gin', 'Medium · 12% ABV', array['Citrusy','Refreshing'], array['adventurous','curious']),
--   ('Mocktails', 'Virgin Mojito', 'Mint, lime, and soda.', 280, 'Non-Alcoholic', '0% ABV', array['Refreshing','Citrusy'], array['relaxed','happy']);
