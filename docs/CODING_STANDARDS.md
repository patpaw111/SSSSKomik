# 📋 Standar Coding & Best Practices

## 🎯 Prinsip Umum

### 1. Konsistensi
- Gunakan konvensi yang sama di seluruh proyek
- Ikuti pola yang sudah ditetapkan
- Jangan mengubah struktur tanpa diskusi tim

### 2. Readability
- Kode harus mudah dibaca dan dipahami
- Gunakan nama variabel dan fungsi yang deskriptif
- Tambahkan komentar untuk logika kompleks

### 3. Maintainability
- Struktur kode yang modular
- Separation of concerns
- DRY (Don't Repeat Yourself)

## 📁 Struktur File & Folder

### Organisasi Folder
```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   └── dashboard/         # Feature-based routing
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utilities & configurations
│   ├── utils.ts          # Helper functions
│   ├── validations.ts    # Zod schemas
│   └── constants.ts      # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── styles/               # Additional styles
```

### Naming Conventions

#### Files & Folders
- **Components**: PascalCase (`UserProfile.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`, `loading.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Types**: PascalCase dengan suffix Type (`UserType.ts`)
- **Hooks**: camelCase dengan prefix `use` (`useAuth.ts`)

#### Variables & Functions
- **Variables**: camelCase (`userName`, `isLoading`)
- **Functions**: camelCase (`getUserData`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Booleans**: prefix `is`, `has`, `can` (`isVisible`, `hasPermission`)

## ⚛️ React & Next.js Standards

### Component Structure
```tsx
// 1. Imports (urutkan sesuai prioritas)
import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { UserType } from '@/types/UserType';
import { formatDate } from '@/lib/utils';

// 2. Types & Interfaces
interface ComponentProps {
  user: UserType;
  onEdit?: (id: string) => void;
}

// 3. Component
const UserProfile: NextPage<ComponentProps> = ({ user, onEdit }) => {
  // 4. Hooks
  const router = useRouter();
  
  // 5. State
  const [isEditing, setIsEditing] = useState(false);
  
  // 6. Event Handlers
  const handleEdit = () => {
    setIsEditing(true);
    onEdit?.(user.id);
  };
  
  // 7. Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // 8. Render
  return (
    <div className="user-profile">
      {/* JSX content */}
    </div>
  );
};

// 9. Export
export default UserProfile;
```

### Hooks Guidelines
- Gunakan custom hooks untuk logic yang bisa di-reuse
- Nama hook harus dimulai dengan `use`
- Return object dengan nama yang jelas

```tsx
// ✅ Good
const useUserData = (userId: string) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  return { user, loading, error };
};

// ❌ Bad
const useUserData = (userId: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  return [data, loading]; // Tidak jelas apa yang di-return
};
```

### Props & State Management
- Gunakan TypeScript untuk semua props
- Destructure props di parameter
- Gunakan optional chaining untuk props opsional
- Minimal state, prefer derived state

```tsx
// ✅ Good
interface UserCardProps {
  user: UserType;
  showActions?: boolean;
  onEdit?: (user: UserType) => void;
}

const UserCard = ({ user, showActions = false, onEdit }: UserCardProps) => {
  const displayName = user.name || 'Anonymous';
  
  return (
    <div>
      <h3>{displayName}</h3>
      {showActions && (
        <button onClick={() => onEdit?.(user)}>Edit</button>
      )}
    </div>
  );
};
```

## 🎨 Styling Standards

### Tailwind CSS Guidelines
- Gunakan utility classes yang sudah ada
- Buat custom components untuk pattern yang sering digunakan
- Gunakan CSS variables untuk theme values
- Responsive design dengan mobile-first approach

```tsx
// ✅ Good - Responsive & Semantic
<div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:p-6">
  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
    User Profile
  </h1>
</div>

// ❌ Bad - Fixed values & tidak responsive
<div className="flex gap-4 p-4">
  <h1 className="text-2xl font-bold">
    User Profile
  </h1>
</div>
```

### Component Styling
- Gunakan `clsx` atau `cn` utility untuk conditional classes
- Buat reusable style variants
- Gunakan CSS modules untuk component-specific styles

```tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button = ({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
};
```

## 🔧 TypeScript Standards

### Type Definitions
- Gunakan interfaces untuk object shapes
- Gunakan types untuk unions dan primitives
- Export types dari file terpisah
- Gunakan generic types untuk reusable components

```tsx
// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export type UserRole = 'admin' | 'user' | 'moderator';

export interface UserWithRole extends User {
  role: UserRole;
}

// components/UserCard.tsx
interface UserCardProps<T extends User = User> {
  user: T;
  onSelect?: (user: T) => void;
}
```

### Error Handling
- Gunakan Result pattern untuk error handling
- Jangan throw errors di components
- Gunakan proper error boundaries

```tsx
// lib/api.ts
export type ApiResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

export const fetchUser = async (id: string): Promise<ApiResult<User>> => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return { success: false, error: 'Failed to fetch user' };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};
```

## 🧪 Testing Standards

### Test Structure
- Gunakan `describe` untuk grouping tests
- Gunakan descriptive test names
- Test behavior, bukan implementation
- Mock external dependencies

```tsx
// __tests__/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from '@/components/UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  it('should display user name and email', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} showActions />);
    
    screen.getByRole('button', { name: /edit/i }).click();
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

## 📝 Documentation Standards

### Code Comments
- Jangan comment hal yang obvious
- Comment "why", bukan "what"
- Gunakan JSDoc untuk functions dan components

```tsx
/**
 * Formats a date string to Indonesian locale format
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  // Implementation
};

// ✅ Good comment
// Skip validation for admin users to improve performance
if (user.role === 'admin') {
  return processAdminRequest(request);
}

// ❌ Bad comment
// Set loading to true
setLoading(true);
```

### README Files
- Setiap folder utama harus ada README.md
- Dokumentasikan purpose dan usage
- Include examples untuk complex components

## 🚫 Anti-Patterns

### Yang Harus Dihindari
- ❌ Props drilling (gunakan context atau state management)
- ❌ Large components (pecah menjadi smaller components)
- ❌ Inline styles (gunakan Tailwind classes)
- ❌ Any types (gunakan proper TypeScript types)
- ❌ Console.log di production code
- ❌ Mutating props atau state langsung
- ❌ Side effects di render function

### Performance Anti-Patterns
- ❌ Creating objects/functions di render
- ❌ Unnecessary re-renders
- ❌ Large bundle sizes
- ❌ Blocking operations di main thread

## 🔍 Code Review Checklist

### Before Submitting PR
- [ ] Code follows naming conventions
- [ ] TypeScript types are properly defined
- [ ] Components are properly structured
- [ ] No console.log or debug code
- [ ] Tests are written and passing
- [ ] ESLint passes without errors
- [ ] Responsive design implemented
- [ ] Accessibility considerations
- [ ] Performance optimizations applied

### Review Focus Areas
- [ ] Code readability and maintainability
- [ ] Proper error handling
- [ ] Security considerations
- [ ] Performance implications
- [ ] Test coverage
- [ ] Documentation updates
