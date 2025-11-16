// Database types untuk Supabase
// Auto-generated types sesuai dengan schema database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      types: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      formats: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      genres: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      authors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      artists: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cover_images: {
        Row: {
          id: string;
          series_id: string | null;
          url: string;
          alt_text: string | null;
          width: number | null;
          height: number | null;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          series_id?: string | null;
          url: string;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          series_id?: string | null;
          url?: string;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      series: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          status: string;
          rating: number | null;
          view_count: number;
          favorite_count: number;
          type_id: string | null;
          format_id: string | null;
          cover_image_id: string | null;
          country_code: string | null;
          publisher: string | null;
          release_date: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          status?: string;
          rating?: number | null;
          view_count?: number;
          favorite_count?: number;
          type_id?: string | null;
          format_id?: string | null;
          cover_image_id?: string | null;
          country_code?: string | null;
          publisher?: string | null;
          release_date?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          status?: string;
          rating?: number | null;
          view_count?: number;
          favorite_count?: number;
          type_id?: string | null;
          format_id?: string | null;
          cover_image_id?: string | null;
          country_code?: string | null;
          publisher?: string | null;
          release_date?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      series_genres: {
        Row: {
          id: string;
          series_id: string;
          genre_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          series_id: string;
          genre_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          series_id?: string;
          genre_id?: string;
          created_at?: string;
        };
      };
      series_authors: {
        Row: {
          id: string;
          series_id: string;
          author_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          series_id: string;
          author_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          series_id?: string;
          author_id?: string;
          created_at?: string;
        };
      };
      series_artists: {
        Row: {
          id: string;
          series_id: string;
          artist_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          series_id: string;
          artist_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          series_id?: string;
          artist_id?: string;
          created_at?: string;
        };
      };
      chapters: {
        Row: {
          id: string;
          series_id: string;
          chapter_number: string;
          title: string | null;
          slug: string;
          view_count: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          series_id: string;
          chapter_number: string;
          title?: string | null;
          slug: string;
          view_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          series_id?: string;
          chapter_number?: string;
          title?: string | null;
          slug?: string;
          view_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      chapter_images: {
        Row: {
          id: string;
          chapter_id: string;
          image_url: string;
          page_number: number;
          width: number | null;
          height: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          chapter_id: string;
          image_url: string;
          page_number: number;
          width?: number | null;
          height?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          chapter_id?: string;
          image_url?: string;
          page_number?: number;
          width?: number | null;
          height?: number | null;
          created_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          email: string;
          username: string;
          password_hash: string;
          role: string;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          username: string;
          password_hash: string;
          role?: string;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          password_hash?: string;
          role?: string;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

