create table if not exists public.finance_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.finance_state enable row level security;

drop policy if exists finance_state_public on public.finance_state;
create policy finance_state_public on public.finance_state
  for all
  using (true)
  with check (true);

grant all on table public.finance_state to anon, authenticated, public;
