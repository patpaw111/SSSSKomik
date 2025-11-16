import { createServerClient, createAdminClient } from '@/lib/supabase/server';

export interface AdminSession {
  id: string;
  email: string;
  username: string;
  role: string;
}

/**
 * Get admin session from Supabase Auth
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;

    if (!accessToken) {
      return null;
    }

    // Verify token dengan Supabase Admin API (bisa verify token tanpa session)
    const adminSupabase = createAdminClient();
    
    // Get user dari access token
    let userId: string | null = null;
    try {
      const { data: { user }, error } = await adminSupabase.auth.getUser(accessToken);
      if (error || !user) {
        return null;
      }
      userId = user.id;
    } catch {
      return null;
    }

    if (!userId) {
      return null;
    }

    // Check if user exists in admins table and is active
    const { data: adminData, error: adminError } = await adminSupabase
      .from('admins')
      .select('id, email, username, role, is_active')
      .eq('id', userId)
      .eq('is_active', true)
      .single();

    if (adminError || !adminData) {
      return null;
    }

    const admin = adminData as { id: string; email: string; username: string; role: string; is_active: boolean };

    // Update last_login (skip jika ada error type)
    try {
      await (adminSupabase.from('admins').update as any)({ last_login: new Date().toISOString() }).eq('id', admin.id);
    } catch {
      // Ignore update error
    }

    return {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Sign in admin using Supabase Auth
 */
export async function signInAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; admin?: AdminSession; session?: any; error?: string }> {
  try {
    const supabase = createServerClient();
    
    // Sign in dengan Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user || !authData.session) {
      return { success: false, error: 'Email atau password salah' };
    }

    // Check if user exists in admins table and is active
    const adminSupabase = createAdminClient();
    const { data: adminData, error: adminError } = await adminSupabase
      .from('admins')
      .select('id, email, username, role, is_active')
      .eq('id', authData.user.id)
      .eq('is_active', true)
      .single();

    if (adminError || !adminData) {
      // Sign out jika bukan admin
      await supabase.auth.signOut();
      return { success: false, error: 'Akun tidak memiliki akses admin' };
    }

    const admin = adminData as { id: string; email: string; username: string; role: string; is_active: boolean };

    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
      session: authData.session,
    };
  } catch (error) {
    return { success: false, error: 'Terjadi kesalahan saat login' };
  }
}

/**
 * Sign out admin
 */
export async function signOutAdmin() {
  try {
    const supabase = createServerClient();
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Terjadi kesalahan saat logout' };
  }
}

