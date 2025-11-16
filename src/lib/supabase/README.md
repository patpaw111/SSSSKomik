# 🔌 Supabase Client Setup

## 📋 Overview
Setup Supabase client untuk Next.js dengan dukungan untuk Client Components dan Server Components.

## 🚀 Setup

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables
Copy `.env.example` ke `.env.local` dan isi dengan credentials dari Supabase Dashboard:

```bash
cp .env.example .env.local
```

Dapatkan credentials dari:
- Supabase Dashboard > Settings > API
- `NEXT_PUBLIC_SUPABASE_URL` - Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon/Public Key
- `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key (hanya untuk server-side)

## 📁 Struktur File

```
src/lib/supabase/
├── client.ts              # Client-side Supabase client
├── server.ts              # Server-side Supabase clients
├── database.types.ts      # TypeScript types untuk database
├── queries/               # Query helper functions
│   ├── series.ts         # Series-related queries
│   └── index.ts          # Barrel file
└── README.md             # Dokumentasi ini
```

## 💻 Usage

### Client Components
```tsx
'use client';

import { supabase } from '@/lib/supabase/client';

export default function ClientComponent() {
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('series')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error(error);
      return;
    }
    
    console.log(data);
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}
```

### Server Components
```tsx
import { createServerClient } from '@/lib/supabase/server';
import { getSeries } from '@/lib/supabase/queries';

export default async function ServerComponent() {
  const series = await getSeries({ limit: 10 });
  
  return (
    <div>
      {series.map((s) => (
        <div key={s.id}>{s.title}</div>
      ))}
    </div>
  );
}
```

### API Routes
```tsx
import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Hanya gunakan admin client di API routes dengan authentication
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('series')
    .insert({ title: 'New Series', slug: 'new-series' });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}
```

## 🔐 Security Notes

1. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: 
   - Aman untuk di-expose ke client
   - Dilindungi oleh Row Level Security (RLS) policies

2. **SUPABASE_SERVICE_ROLE_KEY**:
   - JANGAN pernah expose ke client!
   - Hanya digunakan di server-side API routes
   - Bypasses RLS - gunakan dengan hati-hati

3. **Row Level Security (RLS)**:
   - Setup RLS policies di Supabase Dashboard
   - Pastikan public read access untuk data yang perlu diakses user
   - Restrict write/delete operations untuk admin only

## 📚 Query Helpers

Gunakan helper functions dari `@/lib/supabase/queries` untuk query yang sering digunakan:

```tsx
import { 
  getSeries, 
  getSeriesBySlug, 
  searchSeries,
  getLatestSeries 
} from '@/lib/supabase/queries';

// Get all series
const series = await getSeries({ limit: 20 });

// Get series by slug with relations
const seriesDetail = await getSeriesBySlug('the-heavenly-demon');

// Search series
const results = await searchSeries('heavenly', 10);

// Get latest series
const latest = await getLatestSeries(20);
```

## 🎯 Next Steps

1. Setup RLS policies di Supabase Dashboard
2. Buat query helpers untuk tabel lain (genres, authors, dll)
3. Setup error handling dan logging
4. Implement caching untuk performance

