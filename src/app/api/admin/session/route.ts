import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/utils';

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      admin: session,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}

