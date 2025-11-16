import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/series/[slug]
 * Get series detail by slug dengan semua relations
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const supabase = createServerClient();

    // Get series
    const { data: series, error: seriesError } = await supabase
      .from('series')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (seriesError || !series) {
      return NextResponse.json(
        {
          success: false,
          error: 'Series not found',
        },
        { status: 404 }
      );
    }

    // Get relations
    const [type, format, coverImage, genresResult, authorsResult, artistsResult] =
      await Promise.all([
        series.type_id
          ? supabase.from('types').select('*').eq('id', series.type_id).single()
          : Promise.resolve({ data: null, error: null }),
        series.format_id
          ? supabase
              .from('formats')
              .select('*')
              .eq('id', series.format_id)
              .single()
          : Promise.resolve({ data: null, error: null }),
        series.cover_image_id
          ? supabase
              .from('cover_images')
              .select('*')
              .eq('id', series.cover_image_id)
              .single()
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

    return NextResponse.json({
      success: true,
      data: {
        ...series,
        type: type.data,
        format: format.data,
        cover_image: coverImage.data,
        genres: genresResult,
        authors: authorsResult,
        artists: artistsResult,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}


