'use client';

import { useState, useEffect } from 'react';

export default function ContentManager() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    section: '',
    title: '',
    description: '',
    icon: '',
    order: 0
  });

  const fetchContents = async () => {
    try {
      const res = await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              contents {
                id
                section
                title
                description
                icon
                order
              }
            }
          `
        })
      });
      const data = await res.json();
      if (data.data?.contents) {
        setContents(data.data.contents);
      }
    } catch (error) {
      console.error('Failed to fetch contents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isUpdate = formData.id !== 0;
      const query = isUpdate ? `
        mutation UpdateContent($input: UpdateContentInput!) {
          updateContent(updateContentInput: $input) { id }
        }
      ` : `
        mutation CreateContent($input: CreateContentInput!) {
          createContent(createContentInput: $input) { id }
        }
      `;

      const variables = isUpdate ? {
        input: {
          id: formData.id,
          section: formData.section,
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          order: formData.order
        }
      } : {
        input: {
          section: formData.section,
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          order: formData.order
        }
      };

      await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
      });

      setFormData({ id: 0, section: '', title: '', description: '', icon: '', order: 0 });
      setIsEditing(false);
      fetchContents();
    } catch (error) {
      console.error('Failed to save content:', error);
      setLoading(false);
    }
  };

  const deleteContent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    setLoading(true);
    try {
      await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation DeleteContent($id: Int!) {
              deleteContent(id: $id)
            }
          `,
          variables: { id }
        })
      });
      fetchContents();
    } catch (error) {
      console.error('Failed to delete content:', error);
      setLoading(false);
    }
  };

  const handleEdit = (content: any) => {
    setFormData({
      id: content.id,
      section: content.section,
      title: content.title,
      description: content.description,
      icon: content.icon || '',
      order: content.order
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Content Manager</h1>

      <div className="card-base p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEditing ? 'Edit Content' : 'Add New Content'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Section</label>
              <input type="text" required value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="e.g. about, service" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
              <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Icon (Optional)</label>
            <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white" />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 disabled:opacity-50">
              {isEditing ? 'Update Content' : 'Add Content'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: 0, section: '', title: '', description: '', icon: '', order: 0 }); }} className="bg-transparent border border-white/20 text-white font-bold py-2 px-6 rounded-lg hover:bg-white/5">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card-base overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Existing Content</h2>
        </div>
        {loading && contents.length === 0 ? (
          <div className="p-6 text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-sm font-medium text-gray-400">Section</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Title</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Order</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contents.map(content => (
                  <tr key={content.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-cyan-400">{content.section}</td>
                    <td className="p-4 text-sm text-white font-medium">{content.title}</td>
                    <td className="p-4 text-sm text-gray-400">{content.order}</td>
                    <td className="p-4 text-sm space-x-3">
                      <button onClick={() => handleEdit(content)} className="text-purple-400 hover:underline">Edit</button>
                      <button onClick={() => deleteContent(content.id)} className="text-red-400 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {contents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-400">No content found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
