'use client';

import { useState, useEffect } from 'react';

export default function PostsManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    content: '',
    excerpt: '',
    slug: ''
  });

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              posts {
                id
                title
                content
                excerpt
                slug
                createdAt
              }
            }
          `
        })
      });
      const data = await res.json();
      if (data.data?.posts) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isUpdate = formData.id !== 0;
      const query = isUpdate ? `
        mutation UpdatePost($id: Int!, $title: String, $content: String, $excerpt: String, $slug: String) {
          updatePost(id: $id, title: $title, content: $content, excerpt: $excerpt, slug: $slug) { id }
        }
      ` : `
        mutation CreatePost($title: String!, $content: String!, $excerpt: String, $slug: String) {
          createPost(title: $title, content: $content, excerpt: $excerpt, slug: $slug) { id }
        }
      `;

      const variables = isUpdate ? {
        id: formData.id,
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        slug: formData.slug
      } : {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        slug: formData.slug
      };

      await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
      });

      setFormData({ id: 0, title: '', content: '', excerpt: '', slug: '' });
      setIsEditing(false);
      fetchPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    try {
      await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation DeletePost($id: Int!) {
              deletePost(id: $id)
            }
          `,
          variables: { id }
        })
      });
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
      setLoading(false);
    }
  };

  const handleEdit = (post: any) => {
    setFormData({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      slug: post.slug || ''
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Blog Posts</h1>

      <div className="card-base p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEditing ? 'Edit Post' : 'Add New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Slug (Optional - auto generated if empty)</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="my-awesome-post" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt (Optional)</label>
            <textarea rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Content (Markdown/HTML supported)</label>
            <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2 text-white resize-vertical font-mono text-sm" />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 disabled:opacity-50">
              {isEditing ? 'Update Post' : 'Publish Post'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: 0, title: '', content: '', excerpt: '', slug: '' }); }} className="bg-transparent border border-white/20 text-white font-bold py-2 px-6 rounded-lg hover:bg-white/5">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card-base overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Published Posts</h2>
        </div>
        {loading && posts.length === 0 ? (
          <div className="p-6 text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-sm font-medium text-gray-400">Title</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Slug</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-white font-medium">{post.title}</td>
                    <td className="p-4 text-sm text-cyan-400">{post.slug}</td>
                    <td className="p-4 text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-sm space-x-3">
                      <button onClick={() => handleEdit(post)} className="text-purple-400 hover:underline">Edit</button>
                      <button onClick={() => deletePost(post.id)} className="text-red-400 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-400">No posts found</td>
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
