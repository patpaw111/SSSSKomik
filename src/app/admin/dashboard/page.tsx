import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/utils';
import { createAdminClient } from '@/lib/supabase/server';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const supabase = createAdminClient();

  // Get statistics
  const [seriesCount, chaptersCount, genresCount, authorsCount] = await Promise.all([
    supabase
      .from('series')
      .select('id', { count: 'exact', head: true })
      .is('deleted_at', null),
    supabase.from('chapters').select('id', { count: 'exact', head: true }),
    supabase.from('genres').select('id', { count: 'exact', head: true }),
    supabase.from('authors').select('id', { count: 'exact', head: true }),
  ]);

  const stats = {
    series: seriesCount.count || 0,
    chapters: chaptersCount.count || 0,
    genres: genresCount.count || 0,
    authors: authorsCount.count || 0,
  };

  return (
    <div className="min-h-screen bg-base-dark">
      {/* Header */}
      <header className="bg-base-card border-b border-base-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">
                Selamat datang, <span className="text-white font-semibold">{session.username}</span>
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Series"
            value={stats.series}
            icon="📚"
            color="blue"
          />
          <StatCard
            title="Total Chapters"
            value={stats.chapters}
            icon="📖"
            color="green"
          />
          <StatCard
            title="Total Genres"
            value={stats.genres}
            icon="🏷️"
            color="purple"
          />
          <StatCard
            title="Total Authors"
            value={stats.authors}
            icon="✍️"
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-base-card rounded-lg border border-base-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              title="Kelola Series"
              description="Tambah, edit, atau hapus series komik"
              href="/admin/series"
              icon="📚"
            />
            <ActionCard
              title="Kelola Chapters"
              description="Tambah atau edit chapters"
              href="/admin/chapters"
              icon="📖"
            />
            <ActionCard
              title="Kelola Genres"
              description="Tambah atau edit genres"
              href="/admin/genres"
              icon="🏷️"
            />
            <ActionCard
              title="Kelola Authors"
              description="Tambah atau edit authors"
              href="/admin/authors"
              icon="✍️"
            />
            <ActionCard
              title="Kelola Artists"
              description="Tambah atau edit artists"
              href="/admin/artists"
              icon="🎨"
            />
            <ActionCard
              title="Pengaturan"
              description="Pengaturan sistem dan admin"
              href="/admin/settings"
              icon="⚙️"
            />
          </div>
        </div>

        {/* Recent Activity (Placeholder) */}
        <div className="mt-8 bg-base-card rounded-lg border border-base-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <p className="text-gray-400">Fitur ini akan segera hadir...</p>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 border-blue-500/50',
    green: 'bg-green-500/20 border-green-500/50',
    purple: 'bg-purple-500/20 border-purple-500/50',
    orange: 'bg-orange-500/20 border-orange-500/50',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value.toLocaleString('id-ID')}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="bg-base-dark border border-base-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl group-hover:scale-110 transition-transform">{icon}</div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
}

