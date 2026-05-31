'use client';

import { useState } from 'react';

export default function PortfolioUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    year: new Date().getFullYear().toString()
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create content via GraphQL proxy
      const res = await fetch('/api/graphql-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation CreatePortfolioItem($input: CreateContentInput!) {
              createContent(createContentInput: $input) {
                id
                title
              }
            }
          `,
          variables: {
            input: {
              section: 'portfolio',
              title: formData.title,
              description: formData.description,
              // Storing category and year in a JSON string within 'icon' field as a workaround
              // until a proper portfolio entity is added
              icon: JSON.stringify({ category: formData.category, year: formData.year }),
              order: 0
            }
          }
        })
      });

      const data = await res.json();
      
      if (data.errors) {
        setMessage({ type: 'error', text: data.errors[0].message || 'Upload failed' });
      } else {
        setMessage({ type: 'success', text: 'Portfolio item uploaded successfully!' });
        setFormData({ title: '', description: '', category: '', year: new Date().getFullYear().toString() });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Upload Portfolio Item</h1>
      
      <div className="card-base p-6 md:p-8">
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g. E-Commerce Platform"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Backend System">Backend System</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Describe the project, technologies used, and outcomes..."
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Project Image</label>
            <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center bg-[#18181B] hover:bg-white/5 transition-colors cursor-pointer">
              <span className="text-purple-400 font-medium">Click to upload</span>
              <span className="text-gray-500 ml-2">or drag and drop</span>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG or WEBP (max. 5MB)</p>
            </div>
            <p className="text-xs text-yellow-500/80 mt-2">Note: Image uploading requires S3/Cloud storage setup in the backend. Currently saving text data only.</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
          >
            {loading ? 'Uploading...' : 'Publish Project'}
          </button>
        </form>
      </div>
    </div>
  );
}
