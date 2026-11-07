-- ====================================================================
-- SUPABASE MIGRATION 00003: STORAGE BUCKETS CONFIGURATION
-- ====================================================================

-- Create storage bucket for portfolio uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio', 
  'portfolio', 
  true, 
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public files are viewable by everyone" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'portfolio');

CREATE POLICY "Authenticated users can upload files" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update files" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete files" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
