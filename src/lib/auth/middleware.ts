import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminSession } from './utils';

/**
 * Middleware untuk protect admin routes
 * Redirect ke /admin/login jika tidak authenticated
 */
export async function requireAdmin(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return null; // Continue to route
}

/**
 * Check if user is admin (for API routes)
 */
export async function checkAdminAuth() {
  const session = await getAdminSession();
  return session;
}

