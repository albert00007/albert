'use client';

import { useEffect, useState } from 'react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                inquiries {
                  id
                  name
                  email
                  phone
                  message
                  createdAt
                }
              }
            `
          })
        });
        const data = await res.json();
        if (data.data?.inquiries) {
          setInquiries(data.data.inquiries);
        }
      } catch (error) {
        console.error('Failed to fetch inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Client Inquiries</h1>
      
      {loading ? (
        <div className="text-gray-400 animate-pulse">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-gray-400">No inquiries found.</div>
      ) : (
        <div className="grid gap-6">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="card-base p-6">
              <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{inquiry.name}</h3>
                  <div className="text-sm text-cyan-400 mt-1">
                    <a href={`mailto:${inquiry.email}`} className="hover:underline mr-4">{inquiry.email}</a>
                    <a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
