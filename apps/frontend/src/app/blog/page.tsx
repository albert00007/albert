import Link from 'next/link';

// Simple fetch since we don't have Apollo configured on the server here
async function getPosts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/graphql';
    
    // In build time or if backend is not running, return empty array to prevent build failure
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
      console.warn('Skipping post fetch during build');
      return [];
    }
    
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts {
              id
              title
              slug
              excerpt
              createdAt
            }
          }
        `
      }),
      next: { revalidate: 60 } // revalidate every minute
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const json = await res.json();
    return json.data?.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
          Our Blog
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Insights, updates, and deep dives into the world of software development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <article className="card-base group cursor-pointer h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50">
              <div className="p-6">
                <p className="text-sm text-cyan-400 mb-2">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                </p>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <span className="text-purple-400 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No posts found. Check back later!
        </div>
      )}
    </div>
  );
}
