ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS color_theme TEXT NOT NULL DEFAULT 'lavender'
  CHECK (color_theme IN ('lavender', 'cream', 'ocean', 'sage', 'rose'));
