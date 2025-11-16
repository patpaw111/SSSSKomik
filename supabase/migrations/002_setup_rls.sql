-- ============================================
-- Setup Row Level Security (RLS) Policies
-- SSSS Komik Database
-- ============================================

-- ============================================
-- Enable RLS pada semua tabel
-- ============================================
ALTER TABLE types ENABLE ROW LEVEL SECURITY;
ALTER TABLE formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE series_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE series_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE series_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Public Read Policies (Semua user bisa baca)
-- ============================================

-- Types: Public can read
CREATE POLICY "Public can read types"
ON types FOR SELECT
USING (true);

-- Formats: Public can read
CREATE POLICY "Public can read formats"
ON formats FOR SELECT
USING (true);

-- Genres: Public can read
CREATE POLICY "Public can read genres"
ON genres FOR SELECT
USING (true);

-- Authors: Public can read
CREATE POLICY "Public can read authors"
ON authors FOR SELECT
USING (true);

-- Artists: Public can read
CREATE POLICY "Public can read artists"
ON artists FOR SELECT
USING (true);

-- Cover Images: Public can read
CREATE POLICY "Public can read cover_images"
ON cover_images FOR SELECT
USING (true);

-- Series: Public can read (hanya yang tidak dihapus)
CREATE POLICY "Public can read series"
ON series FOR SELECT
USING (deleted_at IS NULL);

-- Series Genres: Public can read
CREATE POLICY "Public can read series_genres"
ON series_genres FOR SELECT
USING (true);

-- Series Authors: Public can read
CREATE POLICY "Public can read series_authors"
ON series_authors FOR SELECT
USING (true);

-- Series Artists: Public can read
CREATE POLICY "Public can read series_artists"
ON series_artists FOR SELECT
USING (true);

-- Chapters: Public can read
CREATE POLICY "Public can read chapters"
ON chapters FOR SELECT
USING (true);

-- Chapter Images: Public can read
CREATE POLICY "Public can read chapter_images"
ON chapter_images FOR SELECT
USING (true);

-- ============================================
-- Admin Only Policies (Hanya admin yang bisa write/delete)
-- ============================================
-- Note: Untuk sekarang, kita disable write/delete untuk public
-- Nanti bisa ditambahkan authentication check jika perlu

-- Types: Admin only untuk insert/update/delete
CREATE POLICY "Admins can manage types"
ON types FOR ALL
USING (false) -- Disable untuk sekarang, bisa diubah nanti dengan auth check
WITH CHECK (false);

-- Formats: Admin only
CREATE POLICY "Admins can manage formats"
ON formats FOR ALL
USING (false)
WITH CHECK (false);

-- Genres: Admin only
CREATE POLICY "Admins can manage genres"
ON genres FOR ALL
USING (false)
WITH CHECK (false);

-- Authors: Admin only
CREATE POLICY "Admins can manage authors"
ON authors FOR ALL
USING (false)
WITH CHECK (false);

-- Artists: Admin only
CREATE POLICY "Admins can manage artists"
ON artists FOR ALL
USING (false)
WITH CHECK (false);

-- Cover Images: Admin only
CREATE POLICY "Admins can manage cover_images"
ON cover_images FOR ALL
USING (false)
WITH CHECK (false);

-- Series: Admin only untuk insert/update/delete
CREATE POLICY "Admins can manage series"
ON series FOR ALL
USING (false)
WITH CHECK (false);

-- Series Genres: Admin only
CREATE POLICY "Admins can manage series_genres"
ON series_genres FOR ALL
USING (false)
WITH CHECK (false);

-- Series Authors: Admin only
CREATE POLICY "Admins can manage series_authors"
ON series_authors FOR ALL
USING (false)
WITH CHECK (false);

-- Series Artists: Admin only
CREATE POLICY "Admins can manage series_artists"
ON series_artists FOR ALL
USING (false)
WITH CHECK (false);

-- Chapters: Admin only
CREATE POLICY "Admins can manage chapters"
ON chapters FOR ALL
USING (false)
WITH CHECK (false);

-- Chapter Images: Admin only
CREATE POLICY "Admins can manage chapter_images"
ON chapter_images FOR ALL
USING (false)
WITH CHECK (false);

-- Admins: No public access (hanya via service role key)
CREATE POLICY "No public access to admins"
ON admins FOR ALL
USING (false)
WITH CHECK (false);

-- ============================================
-- Note:
-- Untuk insert/update/delete operations, gunakan:
-- 1. Service Role Key di server-side API routes (bypasses RLS)
-- 2. Atau setup authentication dan update policies dengan auth check
-- ============================================

