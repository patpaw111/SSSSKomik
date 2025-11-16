import { createServerClient } from '../server';
import type { Series, SeriesWithRelations, Chapter, ChapterWithImages } from '@/lib/database/types';

/**
 * Get all series (with pagination)
 */
export async function getSeries(options?: {
  limit?: number;
  offset?: number;
  status?: string;
  typeId?: string;
  formatId?: string;
}) {
  const supabase = createServerClient();
  let query = supabase
    .from('series')
    .select('*')
    .is('deleted_at', null) // Only get non-deleted series
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.typeId) {
    query = query.eq('type_id', options.typeId);
  }

  if (options?.formatId) {
    query = query.eq('format_id', options.formatId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch series: ${error.message}`);
  }

  return data as Series[];
}

/**
 * Get series by slug with all relations
 */
export async function getSeriesBySlug(slug: string): Promise<SeriesWithRelations | null> {
  const supabase = createServerClient();

  // Get series
  const { data: series, error: seriesError } = await supabase
    .from('series')
    .select('*')
    .eq('slug', slug)
    .is('deleted_at', null)
    .single();

  if (seriesError || !series) {
    return null;
  }

  // Get relations
  const [type, format, coverImage, genres, authors, artists] = await Promise.all([
    series.type_id
      ? supabase.from('types').select('*').eq('id', series.type_id).single()
      : Promise.resolve({ data: null, error: null }),
    series.format_id
      ? supabase.from('formats').select('*').eq('id', series.format_id).single()
      : Promise.resolve({ data: null, error: null }),
    series.cover_image_id
      ? supabase.from('cover_images').select('*').eq('id', series.cover_image_id).single()
      : Promise.resolve({ data: null, error: null }),
    supabase
      .from('series_genres')
      .select('genre_id')
      .eq('series_id', series.id)
      .then(async (result) => {
        if (result.data && result.data.length > 0) {
          const genreIds = result.data.map((r) => r.genre_id);
          const { data: genresData } = await supabase
            .from('genres')
            .select('*')
            .in('id', genreIds);
          return genresData || [];
        }
        return [];
      }),
    supabase
      .from('series_authors')
      .select('author_id')
      .eq('series_id', series.id)
      .then(async (result) => {
        if (result.data && result.data.length > 0) {
          const authorIds = result.data.map((r) => r.author_id);
          const { data: authorsData } = await supabase
            .from('authors')
            .select('*')
            .in('id', authorIds);
          return authorsData || [];
        }
        return [];
      }),
    supabase
      .from('series_artists')
      .select('artist_id')
      .eq('series_id', series.id)
      .then(async (result) => {
        if (result.data && result.data.length > 0) {
          const artistIds = result.data.map((r) => r.artist_id);
          const { data: artistsData } = await supabase
            .from('artists')
            .select('*')
            .in('id', artistIds);
          return artistsData || [];
        }
        return [];
      }),
  ]);

  return {
    ...series,
    type: type.data,
    format: format.data,
    cover_image: coverImage.data,
    genres: genres,
    authors: authors,
    artists: artists,
  } as SeriesWithRelations;
}

/**
 * Search series by title
 */
export async function searchSeries(searchTerm: string, limit: number = 10) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('series')
    .select('id, title, slug, cover_image_id')
    .ilike('title', `%${searchTerm}%`)
    .is('deleted_at', null)
    .limit(limit);

  if (error) {
    throw new Error(`Failed to search series: ${error.message}`);
  }

  return data;
}

/**
 * Get latest updated series (for homepage)
 */
export async function getLatestSeries(limit: number = 20) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('series')
    .select('*')
    .is('deleted_at', null)
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch latest series: ${error.message}`);
  }

  return data as Series[];
}

/**
 * Get chapters for a series
 */
export async function getChaptersBySeriesId(seriesId: string): Promise<Chapter[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('series_id', seriesId)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('chapter_number', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch chapters: ${error.message}`);
  }

  return data as Chapter[];
}

/**
 * Get chapter by slug with images
 */
export async function getChapterBySlug(
  seriesSlug: string,
  chapterSlug: string
): Promise<ChapterWithImages | null> {
  const supabase = createServerClient();

  // First get series to get series_id
  const { data: series } = await supabase
    .from('series')
    .select('id')
    .eq('slug', seriesSlug)
    .is('deleted_at', null)
    .single();

  if (!series) {
    return null;
  }

  // Get chapter
  const { data: chapter, error: chapterError } = await supabase
    .from('chapters')
    .select('*')
    .eq('series_id', series.id)
    .eq('slug', chapterSlug)
    .single();

  if (chapterError || !chapter) {
    return null;
  }

  // Get chapter images
  const { data: images, error: imagesError } = await supabase
    .from('chapter_images')
    .select('*')
    .eq('chapter_id', chapter.id)
    .order('page_number', { ascending: true });

  if (imagesError) {
    throw new Error(`Failed to fetch chapter images: ${imagesError.message}`);
  }

  return {
    ...chapter,
    images: images || [],
  } as ChapterWithImages;
}

