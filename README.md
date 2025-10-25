# SSSS Komik - Dokumentasi Proyek

## 📋 Deskripsi Proyek
Proyek SSSS Komik adalah aplikasi web yang dibangun menggunakan Next.js 15 dengan TypeScript dan Tailwind CSS v4.

## 🛠️ Tech Stack
- **Framework**: Next.js 15.5.5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint dengan Next.js config
- **Font**: Geist Sans & Geist Mono
- **Package Manager**: npm

## 🚀 Setup Development

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd sssskomik

# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Development server dengan Turbopack
npm run build    # Build production dengan Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Struktur Proyek

```
sssskomik/
├── src/
│   ├── app/                 # App Router (Next.js 13+)
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   └── lib/                 # Utility functions
├── public/                  # Static assets
├── package.json
├── tsconfig.json           # TypeScript config
├── next.config.ts          # Next.js config
├── eslint.config.mjs       # ESLint config
└── tailwind.config.js      # Tailwind config
```

## 🎨 Styling Guidelines

### Tailwind CSS v4
- Menggunakan Tailwind CSS v4 dengan konfigurasi inline
- Custom CSS variables untuk theme:
  - `--background`: Background color
  - `--foreground`: Text color
- Dark mode support dengan `prefers-color-scheme`

### Font System
- **Sans**: Geist Sans (primary)
- **Mono**: Geist Mono (code)

## 🔧 Konfigurasi

### TypeScript
- Strict mode enabled
- Path mapping: `@/*` → `./src/*`
- Target: ES2017

### ESLint
- Next.js core web vitals
- TypeScript support
- Ignore patterns: node_modules, .next, out, build

## 📝 Development Guidelines

### File Naming
- Components: PascalCase (`UserProfile.tsx`)
- Pages: lowercase (`page.tsx`, `layout.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Import Order
1. React imports
2. Next.js imports
3. Third-party libraries
4. Local components
5. Local utilities
6. Types

### Component Structure
```tsx
// Types
interface ComponentProps {
  // props definition
}

// Component
export default function Component({ prop }: ComponentProps) {
  // hooks
  // handlers
  // render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## 🌐 Environment Variables
Buat file `.env.local` untuk environment variables:
```bash
# Example
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your_database_url
```

## 🚀 Deployment
Proyek siap untuk deployment di Vercel atau platform lainnya.

### Build untuk Production
```bash
npm run build
npm run start
```

## 📚 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing
Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk panduan kontribusi.

## 📄 License
[License information]