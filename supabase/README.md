# 🗄️ Supabase Database Setup

## 📋 Cara Menggunakan Migration

### 1. Via Supabase Dashboard
1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **SQL Editor**
4. Copy isi file `migrations/001_initial_schema.sql`
5. Paste dan jalankan di SQL Editor

### 2. Via Supabase CLI (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ke project
supabase link --project-ref your-project-ref

# Jalankan migration
supabase db push
```

## 📁 Struktur Migration

```
supabase/
└── migrations/
    └── 001_initial_schema.sql  # Initial database schema
```

## 🔐 Row Level Security (RLS)

Setelah migration, pastikan untuk setup RLS policies di Supabase Dashboard:

1. **Public Read Access** untuk:
   - `series` (hanya yang tidak deleted)
   - `chapters`
   - `chapter_images`
   - `genres`, `authors`, `artists`, `types`, `formats`

2. **Admin Only** untuk:
   - `admins`
   - Insert/Update/Delete operations

## 📝 Next Steps

1. Setup RLS policies
2. Create seed data (opsional)
3. Setup API routes untuk CRUD operations
4. Test database connection

