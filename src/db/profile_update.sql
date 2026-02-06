-- 1. Add new columns to users table
alter table public.users add column if not exists skills text[];
alter table public.users add column if not exists social_links jsonb default '{}'::jsonb;
alter table public.users add column if not exists website_url text;
alter table public.users add column if not exists github_url text;
alter table public.users add column if not exists linkedin_url text;

-- 2. Ensure RLS policies for users table allow updates
alter table public.users enable row level security;

-- Drop existing policies to avoid conflicts (optional, be careful)
drop policy if exists "Users can view their own profile" on public.users;
drop policy if exists "Users can update their own profile" on public.users;
drop policy if exists "Public profiles are viewable by everyone" on public.users;

-- Create comprehensive policies
create policy "Public profiles are viewable by everyone" 
on public.users for select 
using (true);

create policy "Users can update their own profile" 
on public.users for update 
using (auth.uid() = id);

create policy "Users can insert their own profile" 
on public.users for insert 
with check (auth.uid() = id);

-- 3. Trigger to create user_stats automatically
create or replace function public.handle_new_user_stats()
returns trigger as $$
begin
  insert into public.user_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users (if you have access to auth schema triggers, otherwise on public.users)
-- Note: Usually triggers on auth.users require postgres level access. 
-- We'll attach it to public.users insert if the app inserts there, OR we rely on the app to insert user_stats.
-- Since Supabase handles auth.users -> public.users trigger usually, we can hook into public.users.

create or replace trigger on_public_user_created
after insert on public.users
for each row execute procedure public.handle_new_user_stats();

-- 4. Fix user_stats RLS
drop policy if exists "Users can view own stats" on user_stats;
drop policy if exists "Services update performance" on user_stats;

create policy "Everyone can view stats" on user_stats for select using (true);
create policy "Users can update own stats" on user_stats for update using (auth.uid() = user_id);
create policy "Users can insert own stats" on user_stats for insert with check (auth.uid() = user_id);

-- 5. Add storage bucket for avatars if not exists
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar"
on storage.objects for insert
with check ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

create policy "Anyone can update their own avatar"
on storage.objects for update
using ( bucket_id = 'avatars' AND auth.uid() = owner )
with check ( bucket_id = 'avatars' AND auth.uid() = owner );
