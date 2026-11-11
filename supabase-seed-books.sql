-- NudgePops: add the Money Brain guides to the products table.
-- Run in the Supabase SQL editor. Adjust columns if your table differs.
-- The site reads prices from lib/catalog.ts (₹299 / $20); these columns
-- are kept in sync for reference.

insert into products (title, slug, description, price_inr, price_usd, cover_url, active)
values
  ('Your Brain Doesn''t Feel Card Money',
   'your-brain-doesnt-feel-card-money',
   'The Pain-of-Paying Playbook: 10 science-backed tricks to stop overspending with cards & UPI.',
   299, 20, '/books/card-money-p1.jpg', true),
  ('Why You''re Still Broke After a Raise',
   'why-youre-still-broke-after-a-raise',
   'The Lifestyle Inflation Escape Plan: 10 science-backed fixes to make every raise actually count.',
   299, 20, '/books/still-broke-p1.jpg', true),
  ('The 10 Days That Decide Your Returns',
   'the-10-days-that-decide-your-returns',
   'The AI Bubble Panic Guide: a panic-proof plan for when everyone is screaming "bubble".',
   299, 20, '/books/ten-days-p1.jpg', true)
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      price_inr = excluded.price_inr,
      price_usd = excluded.price_usd,
      cover_url = excluded.cover_url,
      active = true;

-- After running this, copy each row's `id` into your Make.com scenario
-- so it knows which PDF to email for each productId.
