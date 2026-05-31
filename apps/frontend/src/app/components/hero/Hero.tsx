"use client";
import TechMarquee from '../effects/TechMarquee';
import { useI18n } from "../../i18nContext";

const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center fade-in-section relative pt-20 w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(66,133,244,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />
      <TechMarquee />

      <div className="relative z-10 flex flex-col items-center w-full mt-auto mb-auto pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-600 mb-8 animate-fade-up pointer-events-auto">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          {t.hero.badge || "Accepting New Projects"}
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl animate-fade-up pointer-events-auto" style={{ animationDelay: '100ms' }}>
          {t.hero.title1 || "Engineering Digital"} <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#9A67EA] to-[#34A853]">
            {t.hero.title2 || "Excellence"}
          </span>
        </h1>
        
        <p className="mt-4 text-xl md:text-2xl text-[var(--muted)] max-w-3xl mb-12 font-normal leading-relaxed animate-fade-up pointer-events-auto" style={{ animationDelay: '200ms' }}>
          {t.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center animate-fade-up pointer-events-auto" style={{ animationDelay: '300ms' }}>
          <a href="#contact" className="btn-primary">
            {t.hero.startProject}
          </a>
          <a href="#contact" className="inline-flex items-center justify-center bg-white text-gray-700 px-6 py-3 rounded-full font-medium border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow transition-all">
            {t.hero.readBlog}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
