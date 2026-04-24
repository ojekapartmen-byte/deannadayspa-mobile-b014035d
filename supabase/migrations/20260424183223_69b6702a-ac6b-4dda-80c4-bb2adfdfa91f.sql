
-- Create public bucket for brochures (PDFs)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('brochures', 'brochures', true, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 52428800, allowed_mime_types = ARRAY['application/pdf'];

-- RLS for storage.objects on brochures bucket
CREATE POLICY "Brochures are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'brochures');

CREATE POLICY "Admins can upload brochures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update brochures"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete brochures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));

-- Seed site_content keys for brochure
INSERT INTO public.site_content (key, value, content_type) VALUES
  ('brochure_url', '', 'text'),
  ('brochure_button_text', 'Download Brochure', 'text'),
  ('brochure_button_visible', 'true', 'text')
ON CONFLICT (key) DO NOTHING;
