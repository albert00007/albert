"use client";
import { useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Enterprise SaaS Platform",
    category: "Web Development",
    description: "A high-performance SaaS platform built with Next.js and NestJS, handling 10k+ concurrent users with GraphQL-powered real-time data.",
    tech: ["React", "Next.js", "NestJS", "GraphQL"],
  },
  {
    title: "Mobile Commerce App",
    category: "Mobile",
    description: "Cross-platform mobile application for iOS and Android built with React Native, featuring real-time inventory and payment processing.",
    tech: ["React Native", "Node.js", "Stripe API"],
  },
  {
    title: "Data Analytics Dashboard",
    category: "Data & Automation",
    description: "Real-time analytics dashboard with Python-based data processing pipeline, providing actionable insights through interactive visualizations.",
    tech: ["Python", "D3.js", "WebSocket", "PostgreSQL"],
  },
  {
    title: "API Gateway & Microservices",
    category: "Backend Architecture",
    description: "Enterprise API gateway orchestrating 15+ microservices with NestJS, featuring rate limiting, caching, and comprehensive monitoring.",
    tech: ["NestJS", "Redis", "Docker", "TypeORM"],
  },
  {
    title: "Healthcare Platform",
    category: "Web Development",
    description: "HIPAA-compliant healthcare management platform with secure patient data handling, appointment scheduling, and telemedicine integration.",
    tech: ["React", "Next.js", "GraphQL", "PostgreSQL"],
  },
  {
    title: "AI-Powered Chat System",
    category: "Data & Automation",
    description: "Intelligent customer service chatbot with NLP processing, sentiment analysis, and seamless handoff to human agents.",
    tech: ["Python", "TensorFlow", "WebSocket", "Redis"],
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);



  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children);
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div className="fade-in-section w-full min-h-[60vh] py-20" id="portfolio">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white mb-md" style={{ fontFamily: "var(--font)" }}>
           Our Portfolio
         </h2>
         <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2 mb-xl" style={{ fontFamily: "var(--font)" }}>
           A selection of enterprise projects that showcase our software engineering expertise.
         </p>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              key={index}
              className="glass-panel glow-card bg-[#09090B]/50 p-6 md:p-8 rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-2 border border-outline-variant hover:border-primary/50 group"
            >
              <div className="mb-4">
                 <span className="inline-block font-label-sm text-label-sm text-neon-indigo mb-sm uppercase tracking-widest" style={{ fontFamily: "var(--font)" }}>
                  {project.category}
                </span>
              </div>
               <h3 className="font-headline-md text-headline-md text-white mb-xs group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font)" }}>
                 {project.title}
               </h3>
               <p className="font-body-md text-body-md text-on-surface-variant mb-lg" style={{ fontFamily: "var(--font)" }}>
                 {project.description}
               </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                     className="bg-primary/10 border border-primary/20 text-primary text-xs font-label-sm px-3 py-1.5 rounded-lg"
                    style={{ fontFamily: "var(--font)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
