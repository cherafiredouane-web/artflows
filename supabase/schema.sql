-- ARTFLOW production data layer. Run this in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_artflow_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;

create table if not exists public.artworks (
  id text primary key,
  slug text not null unique,
  name text not null,
  image text not null,
  width integer,
  height integer,
  aspect_ratio numeric,
  categories text[] not null default '{}',
  colors text[] not null default '{}',
  color_metadata_source text,
  is_bestseller boolean not null default false,
  is_featured boolean not null default false,
  is_new_arrival boolean not null default false,
  archive_timestamp date,
  price numeric,
  sizes jsonb not null default '[]'::jsonb,
  description_fr text not null default '',
  description_ar text not null default '',
  source_files jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collections (
  id text primary key,
  name_fr text not null,
  name_ar text not null default '',
  description_fr text not null default '',
  description_ar text not null default '',
  image text,
  artwork_ids text[] not null default '{}',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.artworks enable row level security;
alter table public.collections enable row level security;

-- Admins can see their own membership row; nobody can self-promote through the public API.
drop policy if exists "admins can read their membership" on public.admin_users;
create policy "admins can read their membership" on public.admin_users for select to authenticated using (user_id = auth.uid());

-- Public visitors can see active catalogue items. Only pre-approved admin users can write.
drop policy if exists "public can read active artworks" on public.artworks;
create policy "public can read active artworks" on public.artworks for select to anon, authenticated using (active = true or public.is_artflow_admin());
drop policy if exists "admins can insert artworks" on public.artworks;
create policy "admins can insert artworks" on public.artworks for insert to authenticated with check (public.is_artflow_admin());
drop policy if exists "admins can update artworks" on public.artworks;
create policy "admins can update artworks" on public.artworks for update to authenticated using (public.is_artflow_admin()) with check (public.is_artflow_admin());
drop policy if exists "admins can delete artworks" on public.artworks;
create policy "admins can delete artworks" on public.artworks for delete to authenticated using (public.is_artflow_admin());

-- Collections are public when active and editable by admins.
drop policy if exists "public can read active collections" on public.collections;
create policy "public can read active collections" on public.collections for select to anon, authenticated using (active = true or public.is_artflow_admin());
drop policy if exists "admins can insert collections" on public.collections;
create policy "admins can insert collections" on public.collections for insert to authenticated with check (public.is_artflow_admin());
drop policy if exists "admins can update collections" on public.collections;
create policy "admins can update collections" on public.collections for update to authenticated using (public.is_artflow_admin()) with check (public.is_artflow_admin());
drop policy if exists "admins can delete collections" on public.collections;
create policy "admins can delete collections" on public.collections for delete to authenticated using (public.is_artflow_admin());

-- Product artwork images live in a public read bucket; write operations are admin-only.
insert into storage.buckets (id, name, public) values ('artworks','artworks',true) on conflict (id) do nothing;
drop policy if exists "public can view artwork images" on storage.objects;
create policy "public can view artwork images" on storage.objects for select to anon, authenticated using (bucket_id = 'artworks');
drop policy if exists "admins can upload artwork images" on storage.objects;
create policy "admins can upload artwork images" on storage.objects for insert to authenticated with check (bucket_id = 'artworks' and public.is_artflow_admin());
drop policy if exists "admins can update artwork images" on storage.objects;
create policy "admins can update artwork images" on storage.objects for update to authenticated using (bucket_id = 'artworks' and public.is_artflow_admin()) with check (bucket_id = 'artworks' and public.is_artflow_admin());
drop policy if exists "admins can delete artwork images" on storage.objects;
create policy "admins can delete artwork images" on storage.objects for delete to authenticated using (bucket_id = 'artworks' and public.is_artflow_admin());

-- Starter collection records. Assign actual works from the admin dashboard before launch.
insert into public.collections (id,name_fr,name_ar,description_fr,description_ar,sort_order)
values
 ('the-calm-collection','The Calm Collection','مجموعة السكينة','Calme, équilibre et douceur.','هدوء وتوازن ونعومة.',1),
 ('the-soul-collection','The Soul Collection','مجموعة الروح','Des œuvres qui racontent.','أعمال تحمل حكاية.',2),
 ('the-bold-collection','The Bold Collection','مجموعة الجرأة','Une présence qui affirme.','حضور فني جريء.',3),
 ('modern-living','Modern Living','الحياة المعاصرة','L’art dans les espaces d’aujourd’hui.','الفن في مساحات اليوم.',4)
on conflict (id) do nothing;
