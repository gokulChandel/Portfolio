-- ====================================================================
-- SUPABASE MIGRATION 00002: ROW LEVEL SECURITY POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Anonymous and Authenticated can read public data)
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Skill categories are viewable by everyone" 
  ON public.skill_categories FOR SELECT USING (true);

CREATE POLICY "Active skills are viewable by everyone" 
  ON public.skills FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Published projects are viewable by everyone" 
  ON public.projects FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Experiences are viewable by everyone" 
  ON public.experiences FOR SELECT USING (true);

CREATE POLICY "Education entries are viewable by everyone" 
  ON public.education FOR SELECT USING (true);

CREATE POLICY "Certifications are viewable by everyone" 
  ON public.certifications FOR SELECT USING (true);

CREATE POLICY "Services are viewable by everyone" 
  ON public.services FOR SELECT USING (true);

CREATE POLICY "Site settings are viewable by everyone" 
  ON public.site_settings FOR SELECT USING (true);

-- 2. Contact Message Submission (Public can insert contact messages)
CREATE POLICY "Anyone can submit a contact message" 
  ON public.contact_messages FOR INSERT WITH CHECK (
    char_length(name) >= 2 AND 
    char_length(email) >= 5 AND 
    char_length(message) >= 10
  );

-- 3. Admin Full Control Policies (Only authenticated users have write/update/delete access)
CREATE POLICY "Authenticated users can update profiles" 
  ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage skill categories" 
  ON public.skill_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage skills" 
  ON public.skills FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage projects" 
  ON public.projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage experiences" 
  ON public.experiences FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage education" 
  ON public.education FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage certifications" 
  ON public.certifications FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage services" 
  ON public.services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage contact messages" 
  ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users manage site settings" 
  ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
