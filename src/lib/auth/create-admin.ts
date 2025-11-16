/**
 * Script helper untuk create admin pertama kali
 * 
 * Usage:
 * 1. Import di file temporary atau run via Node.js
 * 2. Atau gunakan di API route untuk setup pertama kali
 * 
 * Example:
 * ```ts
 * import { createAdmin } from '@/lib/auth/create-admin';
 * 
 * const admin = await createAdmin({
 *   email: 'admin@example.com',
 *   username: 'admin',
 *   password: 'securepassword123',
 *   role: 'admin'
 * });
 * ```
 */

import { createAdminClient } from '@/lib/supabase/server';
import { hashPassword } from './utils';

export interface CreateAdminInput {
  email: string;
  username: string;
  password: string;
  role?: 'admin' | 'super_admin';
}

export async function createAdmin(input: CreateAdminInput) {
  const supabase = createAdminClient();

  // Check if admin already exists
  const { data: existingAdmin } = await supabase
    .from('admins')
    .select('id')
    .eq('email', input.email)
    .single();

  if (existingAdmin) {
    throw new Error('Admin dengan email ini sudah ada');
  }

  // Hash password
  const passwordHash = await hashPassword(input.password);

  // Create admin
  const { data: admin, error } = await supabase
    .from('admins')
    .insert({
      email: input.email,
      username: input.username,
      password_hash: passwordHash,
      role: input.role || 'admin',
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Gagal membuat admin: ${error.message}`);
  }

  return {
    id: admin.id,
    email: admin.email,
    username: admin.username,
    role: admin.role,
  };
}

