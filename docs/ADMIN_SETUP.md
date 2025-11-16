# 🔐 Setup Admin Account dengan Supabase Auth

Panduan untuk membuat akun admin menggunakan Supabase Auth.

## 📋 Cara Membuat Admin (Recommended)

### Langkah 1: Buat User di Supabase Auth

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **Authentication** > **Users**
4. Klik **Add User** atau **Create User**
5. Isi form:
   - **Email**: Email admin (contoh: `admin@example.com`)
   - **Password**: Password yang kuat
   - **Auto Confirm User**: ✅ Centang (agar langsung bisa login)
6. Klik **Create User**

### Langkah 2: Set Metadata (Optional)

Setelah user dibuat, klik user tersebut dan edit **User Metadata**:

```json
{
  "username": "admin",
  "role": "admin",
  "is_active": true
}
```

**Atau** langsung edit di SQL Editor:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'username', 'admin',
  'role', 'admin',
  'is_active', true
)
WHERE email = 'admin@example.com';
```

### Langkah 3: Jalankan Migration

Jalankan migration `003_link_auth_to_admins.sql` di Supabase SQL Editor:

1. Buka **SQL Editor** di Supabase Dashboard
2. Copy isi file `supabase/migrations/003_link_auth_to_admins.sql`
3. Paste dan jalankan SQL

Migration ini akan:
- ✅ Sync user yang sudah ada dari `auth.users` ke tabel `admins`
- ✅ Membuat trigger untuk auto-sync user baru
- ✅ Update trigger untuk sync perubahan user

### Langkah 4: Verifikasi

Cek apakah user sudah masuk ke tabel `admins`:

```sql
SELECT id, email, username, role, is_active
FROM admins
WHERE email = 'admin@example.com';
```

### Langkah 5: Login

1. Buka `/admin/login` di aplikasi
2. Masukkan email dan password yang Anda buat di Supabase Auth
3. Login berhasil! 🎉

---

## 🔄 Sync User yang Sudah Ada

Jika Anda sudah punya user di Supabase Auth sebelum migration, jalankan function ini:

```sql
SELECT public.sync_existing_auth_users();
```

Function ini akan sync semua user dari `auth.users` ke tabel `admins`.

---

## 📝 Update User Metadata

Untuk update username, role, atau is_active:

### Via Dashboard:
1. Buka **Authentication** > **Users**
2. Klik user yang ingin di-update
3. Edit **User Metadata**
4. Save

### Via SQL:
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'username', 'newusername',
  'role', 'super_admin',
  'is_active', true
)
WHERE email = 'admin@example.com';
```

Trigger akan otomatis update tabel `admins`.

---

## 🔒 Security Best Practices

1. **Gunakan password yang kuat:**
   - Minimal 12 karakter
   - Kombinasi huruf besar, huruf kecil, angka, dan simbol

2. **Set role yang sesuai:**
   - `admin` - Admin biasa
   - `super_admin` - Super admin dengan akses penuh

3. **Nonaktifkan admin yang tidak digunakan:**
   ```sql
   UPDATE auth.users
   SET raw_user_meta_data = jsonb_set(
     COALESCE(raw_user_meta_data, '{}'::jsonb),
     '{is_active}',
     'false'::jsonb
   )
   WHERE email = 'old-admin@example.com';
   ```

4. **Enable MFA (Multi-Factor Authentication):**
   - Bisa diaktifkan di Supabase Dashboard > Authentication > Settings

---

## 🆘 Troubleshooting

### User tidak muncul di tabel `admins`

**Solusi:**
1. Jalankan migration `003_link_auth_to_admins.sql`
2. Atau jalankan sync manual:
   ```sql
   SELECT public.sync_existing_auth_users();
   ```

### Error: "Email atau password salah"

**Solusi:**
- Pastikan email dan password yang dimasukkan benar
- Pastikan user sudah di-confirm (Auto Confirm User = true)
- Pastikan `is_active = true` di metadata

### Error: "Akun admin tidak aktif"

**Solusi:**
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{is_active}',
  'true'::jsonb
)
WHERE email = 'admin@example.com';
```

### Trigger tidak bekerja

**Solusi:**
1. Pastikan migration sudah dijalankan
2. Cek apakah trigger ada:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname LIKE '%auth_user%';
   ```
3. Jika tidak ada, jalankan migration lagi

---

## 📚 Cara Kerja

1. **User dibuat di Supabase Auth** → Trigger `on_auth_user_created` otomatis insert ke tabel `admins`
2. **User di-update di Supabase Auth** → Trigger `on_auth_user_updated` otomatis update tabel `admins`
3. **Login menggunakan Supabase Auth** → Password di-verify oleh Supabase, session dibuat
4. **Session check** → Cek apakah user ada di tabel `admins` dan `is_active = true`

---

## ✅ Checklist Setup

- [ ] User dibuat di Supabase Auth
- [ ] Metadata di-set (username, role, is_active)
- [ ] Migration `003_link_auth_to_admins.sql` dijalankan
- [ ] User muncul di tabel `admins` (verifikasi dengan query)
- [ ] Login berhasil di `/admin/login`
