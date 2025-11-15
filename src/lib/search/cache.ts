import type { SearchResult } from './types';

// Client-side cache untuk hasil pencarian (Browser Cache)
const searchCache = new Map<string, { results: SearchResult[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

// Fungsi untuk mendapatkan hasil dari cache
export const getCachedResults = (term: string): SearchResult[] | null => {
  const cached = searchCache.get(term);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.results;
  }
  return null;
};

// Fungsi untuk menyimpan hasil ke cache
export const setCachedResults = (term: string, results: SearchResult[]): void => {
  searchCache.set(term, { results, timestamp: Date.now() });
};

// Fungsi untuk clear cache (optional, untuk testing atau manual clear)
export const clearSearchCache = (): void => {
  searchCache.clear();
};

