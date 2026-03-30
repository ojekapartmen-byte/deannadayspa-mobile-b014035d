
-- Create public storage bucket for service images
INSERT INTO storage.buckets (id, name, public) VALUES ('service-images', 'service-images', true);

-- Allow anyone to view images
CREATE POLICY "Anyone can view service images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'service-images');

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload service images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow authenticated admins to update images
CREATE POLICY "Admins can update service images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow authenticated admins to delete images
CREATE POLICY "Admins can delete service images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));
