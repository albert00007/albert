
'use client';
import { useEffect, useState } from 'react';
import { IconInputSearch, IconRoute, IconChartBar, IconShieldCheck } from '@tabler/icons-react';

interface Content {
  id: number;
  title: string;
  description: string;
}

export default function About() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch('/api/graphql-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                contents(section: "about") {
                  id
                  title
                  description
                }
              }
            `
          })
        });
        const data = await res.json();
        if (data.data?.contents && data.data.contents.length > 0) {
          setContent(data.data.contents);
        } else {
          setContent([
            {
              id: 1,
              title: 'Who We Are',
              description: 'At our core, we are more than just a software development agency; we are a dedicated full-service technology partner committed to transforming complex business ideas into high-performance digital realities. In an era where speed and scalability define success, we provide the architectural backbone and creative finesse needed to thrive in a competitive landscape.',
            },
            {
              id: 2,
              title: 'Our Approach',
              description: 'Our technical expertise is strategically built on a dual-engine approach. We harness the versatility of Python for advanced data processing, automation, and intelligent backend logic, ensuring your platform is as smart as it is functional. Complementing this is our mastery of the Node.js ecosystem, where we utilize Nest.js to engineer enterprise-grade, modular, and highly secure backend architectures designed to handle massive growth without compromise.',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch about content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <main className="pt-24">
      {/* Dynamic Content Section (Collapsible Cards) */}
      <section className="py-16 max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
             <div className="col-span-1 md:col-span-2 text-center text-gray-400">Loading company information...</div>
          ) : (
             content.map((item) => {
               // Extract a short summary (first sentence) for the always-visible part
               const firstPeriodIdx = item.description.indexOf('.');
               const summary = firstPeriodIdx !== -1 
                 ? item.description.substring(0, firstPeriodIdx + 1) 
                 : item.description;
               const fullText = item.description;
               
               // Fallback summaries based on title if the API returns the default text
               let customSummary = summary;
               if (item.title === 'Who We Are') customSummary = "We are a dedicated full-service technology partner transforming complex business ideas into high-performance digital realities.";
               if (item.title === 'Our Approach') customSummary = "Our stack: Python for advanced data processing and Node.js/Nest.js for highly secure enterprise architectures.";

               return (
                 <div 
                   key={item.id} 
                   className="glass-panel p-6 md:p-8 rounded-xl group cursor-pointer border border-[#374151] hover:border-gray-300 transition-colors duration-500 will-change-transform-opacity"
                 >
                   <h2 className="font-display-lg text-headline-lg mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                     {item.title}
                   </h2>
                   
                   {/* Always visible summary */}
                   <p className="font-body-lg text-body-lg text-[#9CA3AF] leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                     {customSummary}
                   </p>
                   
                   {/* Hidden full text that expands smoothly on hover */}
                   <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                     <div className="overflow-hidden">
                       <p className="pt-4 font-body-md text-body-md text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                         {fullText}
                       </p>
                     </div>
                   </div>
                 </div>
               );
             })
          )}
        </div>
      </section>

      {/* How We Work / Process Timeline */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop" onMouseLeave={() => setHoveredStep(null)}>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-md">
            <div>
              <h2 className="font-display-lg text-headline-lg mb-sm">Development Lifecycle</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Our proprietary development stack follows a strictly engineered pipeline to ensure every product is crafted with precision from concept to deployment.
              </p>
            </div>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Desktop Progress Line */}
              <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-outline-variant/30 z-0 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white shadow-[0_0_10px_#ffffff] origin-left will-change-transform" 
                  style={{ 
                    transform: hoveredStep !== null ? `scaleX(${(hoveredStep + 1) * 0.25})` : 'scaleX(0)',
                    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></div>
              </div>
              
              {/* Step 0 */}
              <div 
                className="relative z-10 cursor-pointer group"
                onMouseEnter={() => setHoveredStep(0)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${hoveredStep !== null && hoveredStep >= 0 ? 'msd-circle-white-glow' : 'bg-[#1F2937] border border-[#374151] text-[#9CA3AF]'}`}>
                  <IconInputSearch className="w-6 h-6" />
                </div>
                <h3 className={`font-headline-md text-headline-md mb-2 transition-colors duration-300 ${hoveredStep !== null && hoveredStep >= 0 ? 'text-white' : 'text-[#9CA3AF]'}`}>Atomic Discovery</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Precise requirements gathering and system architecture planning.
                </p>
              </div>
              
              {/* Step 1 */}
              <div 
                className="relative z-10 cursor-pointer group"
                onMouseEnter={() => setHoveredStep(1)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${hoveredStep !== null && hoveredStep >= 1 ? 'msd-circle-white-glow' : 'bg-[#1F2937] border border-[#374151] text-[#9CA3AF]'}`}>
                  <IconRoute className="w-6 h-6" />
                </div>
                <h3 className={`font-headline-md text-headline-md mb-2 transition-colors duration-300 ${hoveredStep !== null && hoveredStep >= 1 ? 'text-white' : 'text-[#9CA3AF]'}`}>Kinetic Engineering</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  High-performance software development utilizing AI-driven tooling.
                </p>
              </div>
              
              {/* Step 2 */}
              <div 
                className="relative z-10 cursor-pointer group"
                onMouseEnter={() => setHoveredStep(2)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${hoveredStep !== null && hoveredStep >= 2 ? 'msd-circle-white-glow' : 'bg-[#1F2937] border border-[#374151] text-[#9CA3AF]'}`}>
                  <IconChartBar className="w-6 h-6" />
                </div>
                <h3 className={`font-headline-md text-headline-md mb-2 transition-colors duration-300 ${hoveredStep !== null && hoveredStep >= 2 ? 'text-white' : 'text-[#9CA3AF]'}`}>MicroState Quality</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Zero-latency continuous integration with granular test telemetry.
                </p>
              </div>
              
              {/* Step 3 */}
              <div 
                className="relative z-10 cursor-pointer group"
                onMouseEnter={() => setHoveredStep(3)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${hoveredStep !== null && hoveredStep >= 3 ? 'msd-circle-white-glow' : 'bg-[#1F2937] border border-[#374151] text-[#9CA3AF]'}`}>
                  <IconShieldCheck className="w-6 h-6" />
                </div>
              <h3 className={`font-headline-md text-headline-md mb-2 transition-colors duration-300 ${hoveredStep !== null && hoveredStep >= 3 ? 'text-white' : 'text-[#9CA3AF]'}`}>Immutable Deployment</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                Secure, automated deployment pipelines with zero-downtime rollouts.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1200px] mx-auto">
          <div className="glass-panel p-xl rounded-xl text-center relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700"></div>
            <h2 className="font-display-lg text-display-lg mb-md text-white relative z-10">Ready to Build Your <span className="sci-fi-text-gradient font-extrabold">Next Project?</span></h2>
            <p className="font-body-lg text-body-lg text-[#9CA3AF] max-w-2xl mx-auto mb-lg relative z-10">
              Connect your enterprise to the most advanced development team. Experience the power of MicroStateDev.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button className="msd-btn-white-glow px-8 py-3.5 rounded-full font-medium w-full sm:w-auto">
                Start a Project
              </button>
              <button className="bg-[#111827] border border-[#374151] px-8 py-3.5 rounded-full font-medium text-white transition-all hover:bg-[#1F2937] hover:border-[#9CA3AF] w-full sm:w-auto">
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
