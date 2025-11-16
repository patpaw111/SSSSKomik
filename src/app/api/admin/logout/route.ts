import { NextResponse } from 'next/server';
import { signOutAdmin } from '@/lib/auth/utils';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    await signOutAdmin();

    // Clear cookies
    const cookieStore = await cookies();
    cookieStore.delete('sb-access-token');
    cookieStore.delete('sb-refresh-token');

    return NextResponse.json({
      success: true,
      message: 'Logout berhasil',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}

