# 🔐 Environment Variables Setup

## 📋 File Environment Variables

Untuk development, Next.js akan membaca file environment variables dalam urutan berikut:
1. `.env.local` (prioritas tertinggi, di-ignore oleh Git)
2. `.env.development` (untuk development)
3. `.env` (default)

## ✅ Template untuk `.env` atau `.env.local`

Copy template berikut ke file `.env` atau `.env.local` di root project:

```bash
# ============================================
# Supabase Configuration
# Dapatkan dari Supabase Dashboard > Settings > API
# ============================================

# Public URL (untuk client-side)
# Format: https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Anon/Public Key (untuk client-side, aman untuk di-expose)
# Key ini aman untuk di-expose karena dilindungi oleh RLS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Service Role Key (HANYA untuk server-side, JANGAN expose ke client!)
# ⚠️ PENTING: Key ini bypasses RLS, hanya gunakan di server-side API routes
# JANGAN pernah commit key ini ke Git atau expose ke client!
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 📍 Cara Mendapatkan Credentials

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **Settings** > **API**
4. Copy credentials:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

## ✅ Checklist

Pastikan file `.env` atau `.env.local` Anda sudah berisi:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - URL project Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon/Public key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service role key (opsional untuk sekarang)

## 🔄 Setelah Setup

1. **Restart Development Server**
   ```bash
   # Stop server (Ctrl + C)
   # Start lagi
   npm run dev
   ```

2. **Test Connection**
   - Cek apakah tidak ada error di console
   - Test dengan query sederhana

## ⚠️ Important Notes

1. **Jangan Commit `.env` ke Git**
   - File `.env` sudah di-ignore oleh `.gitignore`
   - Jangan pernah commit credentials ke repository

2. **`.env.local` vs `.env`**
   - `.env.local` lebih aman untuk development (di-ignore oleh Git)
   - `.env` bisa digunakan jika ingin commit template (tanpa credentials)

3. **Environment Variables Naming**
   - `NEXT_PUBLIC_*` = Exposed ke client-side (browser)
   - Tanpa `NEXT_PUBLIC_` = Hanya server-side

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan file `.env` atau `.env.local` ada di root project
- Pastikan nama variable benar (case-sensitive)
- Restart development server setelah menambah/mengubah environment variables

### Error: "Invalid API key"
- Pastikan key yang di-copy sudah benar (tidak ada spasi)
- Pastikan menggunakan key yang tepat (anon key untuk client, service role untuk server)

### Environment variables tidak terbaca
- Restart development server
- Pastikan file ada di root project (bukan di subfolder)
- Cek apakah ada typo di nama file (`.env` bukan `env` atau `.env.`)


