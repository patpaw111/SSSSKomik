'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!confirm('Apakah Anda yakin ingin logout?')) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/login');
        router.refresh();
      } else {
        alert('Logout gagal');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

