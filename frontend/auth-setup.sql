-- Phase 2: Auth + Dashboard + Workflow Requests Setup

-- 1. Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  role text,
  created_at timestamptz default now()
);

-- 2. Create workflow_requests table
create table if not exists public.workflow_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null, -- e.g. 'lead_automation', 'onboarding_automation', 'support_automation'
  details text,
  status text default 'pending', -- pending, in_progress, completed
  created_at timestamptz default now()
);

-- 3. Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.workflow_requests enable row level security;

-- 4. Create RLS policies for profiles
drop policy if exists "Profiles select/update own" on public.profiles;
create policy "Profiles select/update own"
on public.profiles
as permissive
for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- 5. Create RLS policies for workflow_requests
drop policy if exists "Requests by owner" on public.workflow_requests;
create policy "Requests by owner"
on public.workflow_requests
as permissive
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 6. Enable email authentication (this is done in Supabase UI)
-- Go to Authentication → Providers → Enable "Email" provider
