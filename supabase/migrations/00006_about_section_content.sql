ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS about_label TEXT NOT NULL DEFAULT 'About Gokul',
  ADD COLUMN IF NOT EXISTS about_heading TEXT NOT NULL DEFAULT 'Engineering Clean Architectures & Scalable Systems',
  ADD COLUMN IF NOT EXISTS about_description TEXT NOT NULL DEFAULT 'A developer passionate about high-efficiency systems, robust APIs, and modern frontend technologies.';

UPDATE public.profiles
SET career_targets = career_targets || '["Full Stack Software Engineer", "Backend Software Engineer", "Frontend Software Engineer", "API Developer", "MERN Stack Developer"]'::jsonb
WHERE id = 'gokul-chandel-profile';
