'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ inquiries: 0, posts: 0, contents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                inquiries { id }
                posts { id }
                contents { id }
              }
            `
          })
        });
        const data = await res.json();
        
        setStats({
          inquiries: data.data?.inquiries?.length || 0,
          posts: data.data?.posts?.length || 0,
          contents: data.data?.contents?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats Cards */}
        <div className="bg-surface-container-high border border-outline/30 rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <h3 className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider mb-2">Total Inquiries</h3>
          <p className="text-4xl font-extrabold text-brand-cyan">
            {loading ? '...' : stats.inquiries}
          </p>
        </div>
        
        <div className="bg-surface-container-high border border-outline/30 rounded-xl p-6 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
           </div>
          <h3 className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider mb-2">Blog Posts</h3>
          <p className="text-4xl font-extrabold text-primary">
            {loading ? '...' : stats.posts}
          </p>
        </div>
        
        <div className="bg-surface-container-high border border-outline/30 rounded-xl p-6 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
           </div>
          <h3 className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider mb-2">Content Blocks</h3>
          <p className="text-4xl font-extrabold text-white">
            {loading ? '...' : stats.contents}
          </p>
        </div>
      </div>
      
      <div className="mt-12 bg-surface-container-high border border-outline/30 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to MicroStateDev Admin</h2>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl">
          Use the sidebar to navigate through the administration tools. You can manage dynamic section content,
          upload new portfolio items, write and publish technical blog posts, and view client inquiries securely.
        </p>
        <div className="mt-8 flex gap-4">
           <a href="/admin/inquiries" className="px-6 py-3 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-white transition-colors">View Inquiries</a>
           <a href="/admin/posts" className="px-6 py-3 bg-surface-container-highest border border-outline/50 text-white font-bold rounded-lg hover:border-brand-cyan transition-colors">Write Post</a>
        </div>
      </div>
    </div>
  );
}
