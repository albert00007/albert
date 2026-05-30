import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/graphql';
    
    // In build time or if backend is not running, return null
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
      console.warn('Skipping post fetch during build for slug:', slug);
      return null;
    }
    
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPost($slug: String!) {
            post(slug: $slug) {
              id
              title
              content
              createdAt
            }
          }
        `,
        variables: { slug }
      }),
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch post: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const json = await res.json();
    return json.data?.post || null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

// Generate basic params to prevent build failure if dynamic params aren't enough
export async function generateStaticParams() {
  return [];
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/blog" className="text-purple-400 hover:text-cyan-400 transition-colors mb-8 inline-block font-medium">
        ← Back to Blog
      </Link>
      
      <header className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-400">
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}</span>
        </div>
      </header>

      <div 
        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-purple-400 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
