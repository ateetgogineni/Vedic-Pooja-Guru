-- Vedic Pooja Guru — MVP database schema (Supabase / Postgres)
--
-- WHAT THIS SETS UP
--   1. profiles          — one row per signed-up user (auto-created on sign-up)
--   2. pooja_plans       — the "Headcount Planning" answer for a user + pooja
--   3. checklist_state   — the checked/unchecked state of each samagri item
--                          on the "Item Checklist" screen for a user + pooja
--
-- Pooja content itself (names, steps, mantras, item lists) is NOT stored
-- here yet — it currently lives as static, in-app reference data at
-- mobile/src/data/poojas.ts so the app works before this schema is run.
-- Moving that content into the database (with priest-verification fields,
-- as called out in the PRD) is a natural next step and can be layered on
-- top of this schema without breaking the tables below.
--
-- HOW TO RUN THIS
--   1. Create a Supabase project at https://supabase.com (free tier is fine).
--   2. In the Supabase dashboard, go to the SQL Editor.
--   3. Paste the entire contents of this file and click "Run".
--   4. Go to Project Settings -> API, copy the "Project URL" and the
--      "anon public" key.
--   5. In mobile/.env (copy mobile/.env.example if it doesn't exist yet),
--      set:
--        EXPO_PUBLIC_SUPABASE_URL=<Project URL>
--        EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
--   6. Restart `npx expo start` so the new env vars are picked up.
--
-- This file is safe to re-run (uses IF NOT EXISTS / OR REPLACE throughout).

-- ---------------------------------------------------------------------------
-- 1. profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  preferred_language text not null default 'en',
  tradition text not null default 'north_indian',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. pooja_plans — one row per (user, pooja): the Headcount Planning answer
-- ---------------------------------------------------------------------------
create table if not exists public.pooja_plans (
  user_id uuid not null references auth.users (id) on delete cascade,
  pooja_id text not null,
  headcount integer not null default 1 check (headcount between 1 and 500),
  include_children boolean not null default false,
  extended_family boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, pooja_id)
);

alter table public.pooja_plans enable row level security;

drop policy if exists "Users manage their own pooja plans" on public.pooja_plans;
create policy "Users manage their own pooja plans"
  on public.pooja_plans for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 3. checklist_state — checked/unchecked state per samagri item
-- ---------------------------------------------------------------------------
create table if not exists public.checklist_state (
  user_id uuid not null references auth.users (id) on delete cascade,
  pooja_id text not null,
  item_key text not null,
  is_checked boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, pooja_id, item_key)
);

alter table public.checklist_state enable row level security;

drop policy if exists "Users manage their own checklist state" on public.checklist_state;
create policy "Users manage their own checklist state"
  on public.checklist_state for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Done. The app (mobile/src/lib/plan-store.ts) reads/writes pooja_plans and
-- checklist_state directly via the Supabase JS client using the signed-in
-- user's session, so no further setup is required beyond the .env values
-- above.
-- ---------------------------------------------------------------------------
