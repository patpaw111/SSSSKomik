"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchSearchResults, debounce, type SearchResult } from '@/lib/search';

// Komponen utama
const SearchBar = () => {
  // State untuk menyimpan nilai input pencarian
  const [searchTerm, setSearchTerm] = useState('');
  // State untuk mengontrol visibilitas dropdown
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // State untuk hasil pencarian
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  // State untuk loading
  const [isLoading, setIsLoading] = useState(false);
  // State untuk expand search di desktop (md+)
  const [isExpanded, setIsExpanded] = useState(false);
  // Ref untuk mendeteksi klik di luar komponen
  const searchBarRef = useRef<HTMLDivElement>(null);
  // Ref untuk AbortController (cancel request)
  const abortControllerRef = useRef<AbortController | null>(null);

  // Efek untuk menangani shortcut keyboard (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Pastikan dropdown disembunyikan jika tombol Escape ditekan
      if (event.key === 'Escape') {
        setIsDropdownVisible(false);
        setIsExpanded(false);
        setSearchTerm('');
        return;
      }
      
      // Shortcut Ctrl + K untuk fokus ke input
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); // Mencegah perilaku default browser
        setIsExpanded(true); // Expand search di desktop
        setTimeout(() => {
          searchBarRef.current?.querySelector('input')?.focus();
          setIsDropdownVisible(true);
        }, 0);
      }
    };

    // Efek untuk menyembunyikan dropdown jika ada klik di luar area search bar
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        // Hanya sembunyikan jika input tidak kosong (jika kosong, ia tetap bisa disembunyikan saat input blur)
        if (searchTerm.length === 0) {
          setIsDropdownVisible(false);
          setIsExpanded(false); // Tutup expanded state di desktop
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchTerm]);


  // Fungsi untuk fetch hasil pencarian dengan caching dan prefetching
  const handleSearch = useCallback(async (term: string) => {
    if (term.length < 3) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    // Cancel previous request jika ada
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Buat AbortController baru
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const results = await fetchSearchResults(term, abortControllerRef.current.signal);
      setSearchResults(results);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setSearchResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search function untuk prefetching proaktif
  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      handleSearch(term);
    }, 300), // 300ms debounce
    [handleSearch]
  );

  // Efek untuk prefetching saat user mengetik (Proactive Prefetching)
  useEffect(() => {
    if (searchTerm.length >= 3) {
      setIsDropdownVisible(true);
      debouncedSearch(searchTerm);
    } else {
      setSearchResults([]);
      if (searchTerm.length === 0) {
        setIsDropdownVisible(false);
      }
    }

    // Cleanup: cancel request saat unmount atau searchTerm berubah
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchTerm, debouncedSearch]);

  // Handler saat input berubah (optimized dengan useCallback)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  // Handler untuk tombol X (Clear) pada mobile (optimized)
  const handleClear = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    // Cancel ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Fokuskan kembali setelah clear
    searchBarRef.current?.querySelector('input')?.focus();
  }, []);

  // Memoized computed values untuk optimasi rendering
  const isClearButtonVisible = useMemo(() => searchTerm.length > 0, [searchTerm]);
  const showResults = useMemo(() => searchTerm.length >= 3 && (searchResults.length > 0 || isLoading), [searchTerm.length, searchResults.length, isLoading]);

  return (
    <div 
      className="relative max-w-[320px] md:max-w-none ml-0"
      ref={searchBarRef}
    >
      {/* Mobile (di bawah md): Icon search yang bisa expand */}
      <div className="md:hidden">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center justify-center w-10 h-10 border-base-card border rounded-lg bg-[#252528] hover:bg-[#2a2a2d] transition-colors"
            aria-label="Buka pencarian"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-2 border-base-card border rounded-lg bg-[#252528] pl-3 pr-2 py-2 transition-all w-full">
            <input
              placeholder="Cari Komik"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onFocus={() => setIsDropdownVisible(true)}
              className="outline-none text-sm leading-4 bg-transparent border-0 placeholder:text-gray-400 text-white w-full"
              autoFocus
            />
            <button
              onClick={() => {
                setIsExpanded(false);
                setSearchTerm('');
                setIsDropdownVisible(false);
              }}
              className="flex-shrink-0 text-gray-400 hover:text-white"
              aria-label="Tutup pencarian"
            >
              <svg className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.5867L16.95 5.63672L18.364 7.05072L13.414 12.0007L18.364 16.9507L16.95 18.3647L12 13.4147L7.04999 18.3647L5.63599 16.9507L10.586 12.0007L5.63599 7.05072L7.04999 5.63672L12 10.5867Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Desktop (md ke atas): Full search bar */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 border-base-card border rounded-lg bg-[#252528] pl-3 pr-2 py-2 transition-all">
          <input
            placeholder="Cari Komik"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setIsDropdownVisible(true)}
            className="outline-none text-sm leading-4 bg-transparent border-0 placeholder:text-gray-400 text-white w-[200px]"
          />
          {isClearButtonVisible && (
            <button 
              className="flex-shrink-0 text-gray-400 hover:text-white"
              onClick={handleClear}
              aria-label="Hapus Pencarian"
            >
              <svg className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.5867L16.95 5.63672L18.364 7.05072L13.414 12.0007L18.364 16.9507L16.95 18.3647L12 13.4147L7.04999 18.3647L5.63599 16.9507L10.586 12.0007L5.63599 7.05072L7.04999 5.63672L12 10.5867Z" fill="currentColor"></path>
              </svg>
            </button>
          )}
        </div>
      </div> 
      
      {/* Dropdown Hasil Pencarian (Partial Rendering - hanya update bagian ini) */}
      {isDropdownVisible && (
        <div className="absolute left-0 top-full mt-2 w-full md:w-[320px] z-20">
          <div className="p-4 bg-[#252528] rounded-xl flex flex-col gap-2 shadow-lg border border-gray-700 max-h-[400px] overflow-y-auto">
            {searchTerm.length < 3 ? (
              <div className="text-xs text-gray-300 p-1">
                Ketik Minimal 3 Huruf untuk Mencari
              </div>
            ) : isLoading ? (
              <div className="text-sm text-gray-300 p-1">Mencari...</div>
            ) : showResults ? (
              <>
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/series/${result.slug || result.id}`}
                    className="text-sm text-gray-100 p-2 hover:bg-gray-700/50 rounded-md cursor-pointer transition-colors flex items-center gap-2"
                    prefetch={true} // Next.js automatic prefetching
                  >
                    {result.imageUrl && (
                      <div className="relative w-8 h-10 flex-shrink-0">
                        <Image
                          src={result.imageUrl}
                          alt={result.title}
                          fill
                          sizes="32px"
                          className="object-cover rounded"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="truncate">{result.title}</span>
                  </Link>
                ))}
              </>
            ) : (
              <div className="text-sm text-gray-300 p-1">Tidak ada hasil ditemukan</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;