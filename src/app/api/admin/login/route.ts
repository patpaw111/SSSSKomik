import { NextRequest, NextResponse } from 'next/server';
import { signInAdmin } from '@/lib/auth/utils';
import { createServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    const result = await signInAdmin(email, password);

    if (!result.success || !result.admin || !result.session) {
      return NextResponse.json(
        { success: false, error: result.error || 'Login gagal' },
        { status: 401 }
      );
    }

    // Set cookies untuk session
    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil',
      admin: result.admin,
    });

    // Set Supabase auth cookies
    response.cookies.set('sb-access-token', result.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    response.cookies.set('sb-refresh-token', result.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}

