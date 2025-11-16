import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from './database.types';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

/**
 * Create Supabase client for Server Components
 * Uses cookies for session management
 */
export function createServerClient() {
  const cookieStore = cookies();

  // Get Supabase auth token from cookies
  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;

  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          if (key.includes('access_token') && accessToken) {
            return accessToken;
          }
          if (key.includes('refresh_token') && refreshToken) {
            return refreshToken;
          }
          return null;
        },
        setItem: () => {
          // No-op - we handle cookies manually
        },
        removeItem: () => {
          // No-op - we handle cookies manually
        },
      },
    },
  });

  // Set session if cookies exist
  if (accessToken && refreshToken) {
    // Set session synchronously using internal state
    (client.auth as any)._session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Date.now() + 3600 * 1000, // 1 hour default
    };
  }

  return client;
}

/**
 * Create Supabase admin client (bypasses RLS)
 * Only use in server-side API routes with proper authentication
 */
export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is required for admin client. This should only be used in secure server-side code.'
    );
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

