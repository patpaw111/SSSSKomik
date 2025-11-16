/**
 * API Route untuk setup admin pertama kali
 * 
 * ⚠️ PENTING: Route ini hanya untuk setup pertama kali
 * Setelah admin pertama dibuat, sebaiknya disable atau protect route ini
 * dengan service role key atau environment variable
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdmin } from '@/lib/auth/create-admin';

export async function POST(request: NextRequest) {
  // Check if setup is allowed (only in development or with special key)
  const setupKey = request.headers.get('x-setup-key');
  const allowedSetupKey = process.env.ADMIN_SETUP_KEY;

  if (process.env.NODE_ENV === 'production' && setupKey !== allowedSetupKey) {
    return NextResponse.json(
      { success: false, error: 'Setup tidak diizinkan di production tanpa setup key' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email, username, password, role } = body;

    if (!email || !username || !password) {
      return NextResponse.json(
        { success: false, error: 'Email, username, dan password harus diisi' },
        { status: 400 }
      );
    }

    const admin = await createAdmin({
      email,
      username,
      password,
      role: role || 'admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin berhasil dibuat',
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal membuat admin' },
      { status: 500 }
    );
  }
}

