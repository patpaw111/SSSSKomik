-- ============================================
-- SSSS Komik Database Schema
-- Supabase (PostgreSQL) Migration
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Tabel Types (Tipe Komik)
-- ============================================
CREATE TABLE types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_types_slug ON types(slug);

-- ============================================
-- 2. Tabel Formats (Format Komik)
-- ============================================
CREATE TABLE formats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_formats_slug ON formats(slug);

-- ============================================
-- 3. Tabel Genres
-- ============================================
CREATE TABLE genres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_genres_slug ON genres(slug);

-- ============================================
-- 4. Tabel Authors
-- ============================================
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_authors_name ON authors(name);

-- ============================================
-- 5. Tabel Artists
-- ============================================
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_artists_slug ON artists(slug);
CREATE INDEX idx_artists_name ON artists(name);

-- ============================================
-- 6. Tabel Cover Images
-- ============================================
CREATE TABLE cover_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID, -- Will be set after series table created
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    width INTEGER,
    height INTEGER,
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cover_images_series_id ON cover_images(series_id);
CREATE INDEX idx_cover_images_is_primary ON cover_images(is_primary);

-- ============================================
-- 7. Tabel Series (Judul Komik - Main Table)
-- ============================================
CREATE TABLE series (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    status VARCHAR(50) DEFAULT 'UP', -- UP, Completed, Hiatus, Cancelled
    rating DECIMAL(3,2), -- 0.00 - 10.00
    view_count BIGINT DEFAULT 0,
    favorite_count BIGINT DEFAULT 0,
    type_id UUID REFERENCES types(id) ON DELETE SET NULL,
    format_id UUID REFERENCES formats(id) ON DELETE SET NULL,
    cover_image_id UUID REFERENCES cover_images(id) ON DELETE SET NULL,
    country_code VARCHAR(10), -- KR, JP, CN, ID, dll
    publisher VARCHAR(255),
    release_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete
);

CREATE INDEX idx_series_slug ON series(slug);
CREATE INDEX idx_series_status ON series(status);
CREATE INDEX idx_series_type_id ON series(type_id);
CREATE INDEX idx_series_format_id ON series(format_id);
CREATE INDEX idx_series_created_at ON series(created_at DESC);
CREATE INDEX idx_series_view_count ON series(view_count DESC);
CREATE INDEX idx_series_deleted_at ON series(deleted_at) WHERE deleted_at IS NULL;

-- Update foreign key untuk cover_images setelah series dibuat
ALTER TABLE cover_images 
ADD CONSTRAINT fk_cover_images_series 
FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE;

-- ============================================
-- 8. Tabel Relasi Many-to-Many: Series & Genres
-- ============================================
CREATE TABLE series_genres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    genre_id UUID NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(series_id, genre_id)
);

CREATE INDEX idx_series_genres_series_id ON series_genres(series_id);
CREATE INDEX idx_series_genres_genre_id ON series_genres(genre_id);

-- ============================================
-- 9. Tabel Relasi Many-to-Many: Series & Authors
-- ============================================
CREATE TABLE series_authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(series_id, author_id)
);

CREATE INDEX idx_series_authors_series_id ON series_authors(series_id);
CREATE INDEX idx_series_authors_author_id ON series_authors(author_id);

-- ============================================
-- 10. Tabel Relasi Many-to-Many: Series & Artists
-- ============================================
CREATE TABLE series_artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(series_id, artist_id)
);

CREATE INDEX idx_series_artists_series_id ON series_artists(series_id);
CREATE INDEX idx_series_artists_artist_id ON series_artists(artist_id);

-- ============================================
-- 11. Tabel Chapters
-- ============================================
CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id UUID NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    chapter_number VARCHAR(50) NOT NULL, -- "1", "1.5", "Extra 1", dll
    title VARCHAR(500),
    slug VARCHAR(500) NOT NULL,
    view_count BIGINT DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(series_id, chapter_number)
);

CREATE INDEX idx_chapters_series_id ON chapters(series_id);
CREATE INDEX idx_chapters_published_at ON chapters(published_at DESC);
CREATE INDEX idx_chapters_slug ON chapters(slug);

-- ============================================
-- 12. Tabel Chapter Images
-- ============================================
CREATE TABLE chapter_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    page_number INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(chapter_id, page_number)
);

CREATE INDEX idx_chapter_images_chapter_id ON chapter_images(chapter_id);
CREATE INDEX idx_chapter_images_page_number ON chapter_images(chapter_id, page_number);

-- ============================================
-- 13. Tabel Admins
-- ============================================
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_username ON admins(username);
CREATE INDEX idx_admins_is_active ON admins(is_active);

-- ============================================
-- Triggers untuk updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger ke semua tabel yang punya updated_at
CREATE TRIGGER update_types_updated_at BEFORE UPDATE ON types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formats_updated_at BEFORE UPDATE ON formats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_genres_updated_at BEFORE UPDATE ON genres
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cover_images_updated_at BEFORE UPDATE ON cover_images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_series_updated_at BEFORE UPDATE ON series
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

