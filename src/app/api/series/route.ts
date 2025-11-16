import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/series
 * Get all series dengan pagination
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');
    const typeId = searchParams.get('type_id');
    const formatId = searchParams.get('format_id');

    const supabase = createServerClient();

    let query = supabase
      .from('series')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (typeId) {
      query = query.eq('type_id', typeId);
    }

    if (formatId) {
      query = query.eq('format_id', formatId);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
      limit,
      offset,
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



