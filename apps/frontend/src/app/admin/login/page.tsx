'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconLockAccess } from '@tabler/icons-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        window.location.href = '/admin'; // Force hard reload to update layout cookies
      } else {
        const data = await res.json();
        setError(data.error || 'Access Denied');
      }
    } catch (err) {
      setError('System connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full p-10 bg-surface-container-high/80 backdrop-blur-xl border border-outline/30 rounded-2xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-surface-container-highest border border-outline/50 rounded-2xl flex items-center justify-center mb-4">
            <IconLockAccess className="text-brand-cyan" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white text-center tracking-tight">MicroStateDev<br/><span className="text-brand-cyan">Secure Admin</span></h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Master Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark border border-outline/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
               <p className="text-red-400 text-sm text-center font-medium">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-cyan text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Establish Connection'}
          </button>
        </form>
      </div>
    </div>
  );
}
