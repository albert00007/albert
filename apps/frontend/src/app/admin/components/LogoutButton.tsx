'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh(); // Ensure layout re-validates auth state
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm text-on-surface-variant"
    >
      Logout
    </button>
  );
}
