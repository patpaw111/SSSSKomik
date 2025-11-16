// Database Types untuk SSSS Komik
// Sesuai dengan schema Supabase

export interface Type {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Format {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoverImage {
  id: string;
  series_id: string;
  url: string;
  alt_text?: string | null;
  width?: number | null;
  height?: number | null;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  status: 'UP' | 'Completed' | 'Hiatus' | 'Cancelled';
  rating?: number | null;
  view_count: number;
  favorite_count: number;
  type_id?: string | null;
  format_id?: string | null;
  cover_image_id?: string | null;
  country_code?: string | null;
  publisher?: string | null;
  release_date?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface SeriesGenre {
  id: string;
  series_id: string;
  genre_id: string;
  created_at: string;
}

export interface SeriesAuthor {
  id: string;
  series_id: string;
  author_id: string;
  created_at: string;
}

export interface SeriesArtist {
  id: string;
  series_id: string;
  artist_id: string;
  created_at: string;
}

export interface Chapter {
  id: string;
  series_id: string;
  chapter_number: string;
  title?: string | null;
  slug: string;
  view_count: number;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChapterImage {
  id: string;
  chapter_id: string;
  image_url: string;
  page_number: number;
  width?: number | null;
  height?: number | null;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  role: 'admin' | 'super_admin';
  is_active: boolean;
  last_login?: string | null;
  created_at: string;
  updated_at: string;
}

// Extended types dengan relations
export interface SeriesWithRelations extends Series {
  type?: Type | null;
  format?: Format | null;
  cover_image?: CoverImage | null;
  genres?: Genre[];
  authors?: Author[];
  artists?: Artist[];
}

export interface ChapterWithImages extends Chapter {
  images?: ChapterImage[];
}


