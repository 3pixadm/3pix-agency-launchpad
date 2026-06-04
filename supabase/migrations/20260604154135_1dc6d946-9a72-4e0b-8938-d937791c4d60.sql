CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  cover_color TEXT NOT NULL DEFAULT 'coral',
  tag TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  author_id UUID DEFAULT auth.uid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.blog_posts (title, excerpt, content, cover_color, tag, published) VALUES
('Jak projektujemy interfejsy, które sprzedają', 'Proces projektowy 3pix krok po kroku — od researchu po wdrożenie.', 'W 3pix wierzymy, że dobry design to nie tylko estetyka, ale przede wszystkim wyniki. W tym wpisie pokazujemy nasz proces: badania użytkowników, prototypowanie, testy A/B i iteracje, które realnie zwiększają konwersję naszych klientów.', 'coral', 'Design', true),
('Animacje, które robią różnicę', 'Mikrointerakcje i płynne przejścia — dlaczego warto w nie inwestować.', 'Dobrze zaprojektowane animacje prowadzą użytkownika za rękę. Opowiadamy, jak używamy ruchu, by budować hierarchię, dawać feedback i sprawiać, że produkt wydaje się żywy.', 'teal', 'Motion', true),
('Branding nowej generacji', 'Tworzymy marki, które zapadają w pamięć od pierwszego spojrzenia.', 'Marka to coś więcej niż logo. To system, emocje i obietnica. Pokazujemy, jak budujemy spójne identyfikacje wizualne, które wyróżniają się na tle konkurencji.', 'violet', 'Branding', true),
('Wydajność = przychód', 'Szybka strona to zadowoleni użytkownicy i lepsze pozycje w Google.', 'Każda sekunda ładowania ma znaczenie. Dzielimy się technikami optymalizacji, które stosujemy w 3pix, by nasze realizacje były błyskawiczne.', 'yellow', 'Development', true);