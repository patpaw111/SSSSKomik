# 📊 Database Schema - SSSS Komik

## 📋 Overview
Dokumentasi struktur database untuk aplikasi SSSS Komik menggunakan Supabase (PostgreSQL).

## 🗂️ Struktur Tabel

### 1. **genres** - Tabel Genre Komik
```sql
- id (uuid, primary key)
- name (varchar, unique) - Nama genre (Action, Romance, dll)
- slug (varchar, unique) - URL-friendly slug
- description (text, nullable) - Deskripsi genre
- created_at (timestamp)
- updated_at (timestamp)
```

### 2. **authors** - Tabel Author/Penulis
```sql
- id (uuid, primary key)
- name (varchar) - Nama author
- slug (varchar, unique) - URL-friendly slug
- bio (text, nullable) - Biografi author
- created_at (timestamp)
- updated_at (timestamp)
```

### 3. **artists** - Tabel Artist/Ilustrator
```sql
- id (uuid, primary key)
- name (varchar) - Nama artist
- slug (varchar, unique) - URL-friendly slug
- bio (text, nullable) - Biografi artist
- created_at (timestamp)
- updated_at (timestamp)
```

### 4. **types** - Tabel Tipe Komik
```sql
- id (uuid, primary key)
- name (varchar, unique) - Nama tipe (Manga, Manhwa, Manhua, Webtoon, dll)
- slug (varchar, unique) - URL-friendly slug
- created_at (timestamp)
- updated_at (timestamp)
```

### 5. **formats** - Tabel Format Komik
```sql
- id (uuid, primary key)
- name (varchar, unique) - Nama format (Ongoing, Completed, Hiatus, dll)
- slug (varchar, unique) - URL-friendly slug
- created_at (timestamp)
- updated_at (timestamp)
```

### 6. **cover_images** - Tabel Gambar Sampul Komik
```sql
- id (uuid, primary key)
- series_id (uuid, foreign key -> series.id)
- url (varchar) - URL gambar sampul
- alt_text (varchar, nullable) - Alt text untuk accessibility
- width (integer, nullable)
- height (integer, nullable)
- is_primary (boolean, default true) - Sampul utama
- created_at (timestamp)
- updated_at (timestamp)
```

### 7. **series** - Tabel Judul Komik (Main Table)
```sql
- id (uuid, primary key)
- title (varchar) - Judul komik
- slug (varchar, unique) - URL-friendly slug
- description (text, nullable) - Deskripsi komik
- status (varchar) - Status (UP, Completed, Hiatus, dll)
- rating (decimal, nullable) - Rating komik
- view_count (bigint, default 0) - Jumlah view
- favorite_count (bigint, default 0) - Jumlah favorite
- type_id (uuid, foreign key -> types.id)
- format_id (uuid, foreign key -> formats.id)
- cover_image_id (uuid, foreign key -> cover_images.id, nullable)
- country_code (varchar, nullable) - Kode negara (KR, JP, CN, dll)
- publisher (varchar, nullable) - Nama publisher
- release_date (date, nullable) - Tanggal rilis
- created_at (timestamp)
- updated_at (timestamp)
```

### 8. **series_genres** - Tabel Relasi Many-to-Many Series & Genre
```sql
- id (uuid, primary key)
- series_id (uuid, foreign key -> series.id)
- genre_id (uuid, foreign key -> genres.id)
- created_at (timestamp)
- UNIQUE(series_id, genre_id)
```

### 9. **series_authors** - Tabel Relasi Many-to-Many Series & Author
```sql
- id (uuid, primary key)
- series_id (uuid, foreign key -> series.id)
- author_id (uuid, foreign key -> authors.id)
- created_at (timestamp)
- UNIQUE(series_id, author_id)
```

### 10. **series_artists** - Tabel Relasi Many-to-Many Series & Artist
```sql
- id (uuid, primary key)
- series_id (uuid, foreign key -> series.id)
- artist_id (uuid, foreign key -> artists.id)
- created_at (timestamp)
- UNIQUE(series_id, artist_id)
```

### 11. **chapters** - Tabel Chapter
```sql
- id (uuid, primary key)
- series_id (uuid, foreign key -> series.id)
- chapter_number (varchar) - Nomor chapter (bisa "1", "1.5", "Extra 1", dll)
- title (varchar, nullable) - Judul chapter
- slug (varchar) - URL-friendly slug
- view_count (bigint, default 0) - Jumlah view
- published_at (timestamp, nullable) - Tanggal publish
- created_at (timestamp)
- updated_at (timestamp)
- UNIQUE(series_id, chapter_number)
```

### 12. **chapter_images** - Tabel Gambar di 1 Chapter
```sql
- id (uuid, primary key)
- chapter_id (uuid, foreign key -> chapters.id)
- image_url (varchar) - URL gambar
- page_number (integer) - Nomor halaman (urutan)
- width (integer, nullable)
- height (integer, nullable)
- created_at (timestamp)
- UNIQUE(chapter_id, page_number)
```

### 13. **admins** - Tabel Akun Admin
```sql
- id (uuid, primary key)
- email (varchar, unique) - Email admin
- username (varchar, unique) - Username admin
- password_hash (varchar) - Hashed password
- role (varchar, default 'admin') - Role (admin, super_admin)
- is_active (boolean, default true) - Status aktif
- last_login (timestamp, nullable) - Last login time
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔗 Relasi Tabel

```
series
├── type_id → types
├── format_id → formats
├── cover_image_id → cover_images
├── series_genres (many-to-many) → genres
├── series_authors (many-to-many) → authors
├── series_artists (many-to-many) → artists
└── chapters
    └── chapter_images
```

## 📝 Fitur yang Sudah Diterapkan

### ✅ Yang Sudah Baik:
- Struktur dasar sudah solid
- Relasi many-to-many untuk genre, author, artist sudah tepat

### ✅ Fitur yang Sudah Diterapkan:

1. **Index untuk Performance:**
   - ✅ Index pada `series.slug` untuk pencarian cepat
   - ✅ Index pada `chapters.series_id` untuk query chapter
   - ✅ Index pada `chapter_images.chapter_id` untuk load gambar
   - ✅ Index pada semua foreign keys untuk join yang cepat
   - ✅ Index pada `series.created_at` dan `series.view_count` untuk sorting
   - ✅ Index pada `chapters.published_at` untuk sorting chapter terbaru

2. **Soft Delete:**
   - ✅ `deleted_at` (timestamp, nullable) pada tabel `series`
   - ✅ Partial index untuk query hanya data yang tidak dihapus
   - ✅ Lebih aman daripada hard delete

3. **Timestamps:**
   - ✅ Semua tabel sudah punya `created_at` dan `updated_at`
   - ✅ Auto-update `updated_at` menggunakan database triggers

4. **Tabel `series_ratings` (opsional untuk future)**
   - Bisa ditambahkan nanti jika perlu fitur rating user
   - Saat ini rating disimpan di `series.rating` sebagai aggregate

## 🎯 Status Implementasi

Struktur database sudah lengkap dan siap digunakan! Semua fitur penting sudah diterapkan:
- ✅ Index untuk performance optimal
- ✅ Soft delete untuk keamanan data
- ✅ Auto-update timestamps
- ✅ Foreign keys dengan cascade delete
- ✅ Unique constraints untuk integritas data

