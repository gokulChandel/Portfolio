ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS light_colors JSONB NOT NULL DEFAULT
    '{"background":"#D1E8E2","surface":"#E1EFEB","card":"#F6FBF9","text":"#2C3531","secondaryText":"#43534D","mutedText":"#64766E","accent":"#116466","accentSecondary":"#D9B08C","highlight":"#FCB99A","buttonText":"#D1E8E2"}'::jsonb,
  ADD COLUMN IF NOT EXISTS dark_colors JSONB NOT NULL DEFAULT
    '{"background":"#080B12","surface":"#0D1220","card":"#111827","text":"#F8FAFC","secondaryText":"#CBD5E1","mutedText":"#94A3B8","accent":"#8B5CF6","accentSecondary":"#22D3EE","highlight":"#A78BFA","buttonText":"#FFFFFF"}'::jsonb;
