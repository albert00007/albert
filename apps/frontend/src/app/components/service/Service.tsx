
'use client';
import { useEffect, useState } from 'react';
import { IconDeviceDesktop, IconServer, IconDeviceMobile, IconPackage } from '@tabler/icons-react';

interface Content {
  id: number;
  title: string;
  description: string;
  icon: string; // Assuming icon is a string identifier
}

const ServiceItem = ({ item }: { item: Content }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'web':
        return <IconDeviceDesktop className="text-primary w-8 h-8" />;
      case 'backend':
        return <IconServer className="text-primary w-8 h-8" />;
      case 'mobile':
        return <IconDeviceMobile className="text-primary w-8 h-8" />;
      default:
        return <IconPackage className="text-primary w-8 h-8" />;
    }
  };

  return (
    <div
      className="glass-card unified-card p-6 md:p-8 rounded-lg flex flex-col items-start gap-4 md:gap-6"
    >
      <div className="w-12 h-12 rounded-lg bg-[rgba(10,132,255,0.10)] flex items-center justify-center border border-[rgba(10,132,255,0.22)] shadow-[0_0_24px_rgba(10,132,255,0.12)]">
        {getIcon(item.icon)}
      </div>
      <div>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{item.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {item.description}
        </p>
      </div>
      <div className="mt-auto pt-md">
        <button className="font-label-md text-label-md border border-[rgba(10,132,255,0.45)] text-primary px-lg py-xs rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default function Service() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                contents(section: "service") {
                  id
                  title
                  description
                  icon
                }
              }
            `
          })
        });
        const data = await res.json();
        if (data.data?.contents && data.data.contents.length > 0) {
          setContent(data.data.contents);
        } else {
          // Fallback to mock data if empty
          setContent([
            { id: 1, title: 'Next-Generation Web Development', description: 'We build high-performance, future-proof web ecosystems designed for maximum engagement. Utilizing React.js and Next.js, we ensure lightning-fast, SEO-optimized experiences.', icon: 'web' },
            { id: 2, title: 'Scalable Backend Architecture', description: 'Specializing in robust, secure systems using Node.js and Nest.js. From REST to complex GraphQL architectures handling thousands of concurrent users.', icon: 'backend' },
            { id: 3, title: 'Cross-Platform Mobile Apps', description: 'Engaging, high-performance mobile applications for iOS and Android using React Native, delivering a native look and feel with a single codebase.', icon: 'mobile' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="w-full py-20" id="service">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6">
            Our Engineering <span className="section-title-accent">Solutions</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Next-generation technical precision for digital enterprises. Scalable, automated, and architecturally optimized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="glass-card unified-card p-6 md:p-8 rounded-lg flex flex-col items-start gap-4 md:gap-6 animate-pulse">
                <div className="w-12 h-12 rounded-lg bg-white/10"></div>
                <div className='w-full'>
                  <div className="h-6 w-1/2 rounded bg-white/10 mb-xs"></div>
                  <div className="h-4 w-full rounded bg-white/10"></div>
                  <div className="h-4 w-5/6 rounded bg-white/10"></div>
                </div>
                <div className="mt-auto pt-md w-full">
                    <div className="h-8 w-1/3 rounded-lg bg-white/10"></div>
                </div>
              </div>
            ))
          ) : (
            content.map((item) => (
              <ServiceItem key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
