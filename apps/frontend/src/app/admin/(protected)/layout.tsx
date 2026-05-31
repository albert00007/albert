import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // Basic protection - actual verification happens on API calls
  if (!token?.value) {
    // If not logged in, redirect to login page
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-brand-dark text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-high border-r border-outline/30 flex flex-col">
        <div className="p-6 border-b border-outline/30">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-light">
            MSD Admin
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-surface-container-highest hover:text-brand-cyan transition-colors text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/admin/portfolio" className="block px-4 py-3 rounded-lg hover:bg-surface-container-highest hover:text-brand-cyan transition-colors text-sm font-medium">
            Portfolio Upload
          </Link>
          <Link href="/admin/posts" className="block px-4 py-3 rounded-lg hover:bg-surface-container-highest hover:text-brand-cyan transition-colors text-sm font-medium">
            Blog Posts
          </Link>
          <Link href="/admin/content" className="block px-4 py-3 rounded-lg hover:bg-surface-container-highest hover:text-brand-cyan transition-colors text-sm font-medium">
            Content Manager
          </Link>
          <Link href="/admin/inquiries" className="block px-4 py-3 rounded-lg hover:bg-surface-container-highest hover:text-brand-cyan transition-colors text-sm font-medium">
            Inquiries
          </Link>
        </nav>
        
        <div className="p-4 border-t border-outline/30 flex flex-col gap-2">
          <Link href="/" className="block px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-colors text-sm text-on-surface-variant">
            ← Back to Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-brand-dark p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
