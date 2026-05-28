-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  display_name text,
  avatar_url text,
  bio text,
  role text not null default 'member' check (role in ('admin', 'member')),
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (is_public = true or auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Padas
create table public.padas (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  lyrics text not null,
  language text not null default 'Punjabi',
  audio_url text,
  tags text[] not null default '{}',
  is_public boolean not null default true,
  created_by uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.padas enable row level security;

create policy "Public padas viewable by all"
  on public.padas for select
  using (is_public = true or auth.uid() = created_by);

create policy "Admin can insert padas"
  on public.padas for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can update padas"
  on public.padas for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin can delete padas"
  on public.padas for delete
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Bhakti Clips
create table public.bhakti_clips (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  youtube_id text not null,
  start_seconds integer,
  end_seconds integer,
  tags text[] not null default '{}',
  rasa_type text,
  thumbnail_url text,
  created_by uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz not null default now()
);

alter table public.bhakti_clips enable row level security;

create policy "Clips viewable by all"
  on public.bhakti_clips for select using (true);

create policy "Admin can manage clips"
  on public.bhakti_clips for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Journal Entries
create table public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.journal_entries enable row level security;

create policy "Public entries viewable by all"
  on public.journal_entries for select
  using (is_public = true or auth.uid() = user_id);

create policy "Users manage own entries"
  on public.journal_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Discussions
create table public.discussions (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  channel text not null default 'general',
  created_by uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz not null default now()
);

alter table public.discussions enable row level security;

create policy "Discussions viewable by all authenticated"
  on public.discussions for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can create discussions"
  on public.discussions for insert
  with check (auth.role() = 'authenticated' and auth.uid() = created_by);

-- Messages
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  discussion_id uuid references public.discussions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  parent_id uuid references public.messages(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Messages viewable by authenticated users"
  on public.messages for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can post messages"
  on public.messages for insert
  with check (auth.role() = 'authenticated' and auth.uid() = user_id);

create policy "Users can delete own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

-- Supabase storage bucket for audio
insert into storage.buckets (id, name, public)
values ('audio', 'audio', true)
on conflict do nothing;

create policy "Anyone can read audio"
  on storage.objects for select
  using (bucket_id = 'audio');

create policy "Admin can upload audio"
  on storage.objects for insert
  with check (
    bucket_id = 'audio' and
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_padas_updated_at
  before update on public.padas
  for each row execute procedure public.set_updated_at();

create trigger set_journal_updated_at
  before update on public.journal_entries
  for each row execute procedure public.set_updated_at();
