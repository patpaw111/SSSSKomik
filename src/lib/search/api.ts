import type { SearchResult } from './types';
import { getCachedResults, setCachedResults } from './cache';

// Fungsi untuk fetch hasil pencarian dari API
export const fetchSearchResults = async (
  term: string,
  signal?: AbortSignal
): Promise<SearchResult[]> => {
  if (term.length < 3) {
    return [];
  }

  // Cek cache terlebih dahulu (Client Cache)
  const cached = getCachedResults(term);
  if (cached) {
    return cached;
  }

  try {
    // TODO: Ganti dengan API endpoint yang sebenarnya
    const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`, {
      signal,
      // Prefetch headers untuk optimasi
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 menit cache
      },
    });

    if (!response.ok) throw new Error('Search failed');

    const data = await response.json();
    const results: SearchResult[] = data.results || [];

    // Simpan ke cache (Client Cache)
    setCachedResults(term, results);

    return results;
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      console.error('Search error:', error);
    }
    return [];
  }
};

