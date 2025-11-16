# 🔌 Supabase Setup Guide

## 📋 Prerequisites
- Supabase project sudah dibuat
- Database migration sudah dijalankan (lihat `supabase/migrations/001_initial_schema.sql`)

## 🔑 Environment Variables

Buat file `.env.local` di root project dengan isi berikut:

```bash
# Supabase Configuration
# Dapatkan dari Supabase Dashboard > Settings > API

# Public URL (untuk client-side)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Anon/Public Key (untuk client-side, aman untuk di-expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Service Role Key (HANYA untuk server-side, JANGAN expose ke client!)
# Hanya digunakan di API routes dengan authentication yang proper
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 📍 Cara Mendapatkan Credentials

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Pergi ke **Settings** > **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ JANGAN expose ke client!)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 2. Setup Environment Variables
Copy template di atas ke `.env.local` dan isi dengan credentials Anda.

### 3. Test Connection

**Client Component:**
```tsx
'use client';

import { supabase } from '@/lib/supabase/client';

export default function TestClient() {
  const testConnection = async () => {
    const { data, error } = await supabase
      .from('series')
      .select('*')
      .limit(1);
    
    console.log('Data:', data);
    console.log('Error:', error);
  };

  return <button onClick={testConnection}>Test Connection</button>;
}
```

**Server Component:**
```tsx
import { getSeries } from '@/lib/supabase/queries';

export default async function TestServer() {
  const series = await getSeries({ limit: 5 });
  
  return (
    <div>
      <h1>Series List</h1>
      {series.map((s) => (
        <div key={s.id}>{s.title}</div>
      ))}
    </div>
  );
}
```

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Gunakan `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk client-side
- ✅ Setup Row Level Security (RLS) policies di Supabase
- ✅ Gunakan `SUPABASE_SERVICE_ROLE_KEY` hanya di server-side API routes
- ✅ Validasi input sebelum insert/update
- ✅ Gunakan prepared statements (Supabase sudah handle ini)

### ❌ DON'T:
- ❌ JANGAN expose `SUPABASE_SERVICE_ROLE_KEY` ke client
- ❌ JANGAN disable RLS tanpa alasan yang jelas
- ❌ JANGAN hardcode credentials di code
- ❌ JANGAN commit `.env.local` ke Git

## 📚 Usage Examples

### Query Series
```tsx
import { getSeries, getSeriesBySlug, searchSeries } from '@/lib/supabase/queries';

// Get all series
const series = await getSeries({ limit: 20, status: 'UP' });

// Get series by slug with relations
const seriesDetail = await getSeriesBySlug('the-heavenly-demon');

// Search series
const results = await searchSeries('heavenly', 10);
```

### Insert Data (Admin Only)
```tsx
import { createAdminClient } from '@/lib/supabase/server';

const supabase = createAdminClient();

const { data, error } = await supabase
  .from('series')
  .insert({
    title: 'New Series',
    slug: 'new-series',
    status: 'UP',
  });
```

### Update Data
```tsx
const { data, error } = await supabase
  .from('series')
  .update({ view_count: 100 })
  .eq('id', seriesId);
```

## 🔒 Row Level Security (RLS) Setup

Setelah migration, setup RLS policies di Supabase Dashboard:

1. **Public Read Access untuk Series:**
```sql
-- Allow public to read non-deleted series
CREATE POLICY "Public can read series"
ON series FOR SELECT
USING (deleted_at IS NULL);
```

2. **Public Read Access untuk Chapters:**
```sql
CREATE POLICY "Public can read chapters"
ON chapters FOR SELECT
USING (true);
```

3. **Admin Only untuk Write Operations:**
```sql
-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage series"
ON series FOR ALL
USING (auth.role() = 'admin');
```

## 📝 Next Steps

1. ✅ Setup environment variables
2. ✅ Test connection
3. ✅ Setup RLS policies
4. ✅ Create seed data (opsional)
5. ✅ Implement API routes untuk CRUD operations

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan `.env.local` sudah dibuat
- Pastikan variable names benar (case-sensitive)
- Restart development server setelah menambah environment variables

### Error: "Failed to fetch"
- Cek RLS policies di Supabase Dashboard
- Pastikan credentials benar
- Cek network tab di browser untuk detail error

### TypeScript Error: "Cannot find module"
- Restart TypeScript server di VS Code (Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server")
- Pastikan file `database.types.ts` ada di `src/lib/supabase/`

