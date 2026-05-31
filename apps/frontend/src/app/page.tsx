import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Service from './components/service/Service';
import Portfolio from './components/portfolio/Portfolio';
import Contact from './components/contact/Contact';
import ContactForm from './components/contact-form/ContactForm';
import Footer from './components/footer/Footer';
import GradientBackground from './components/effects/GradientBackground';
import ScrollProgressIndicator from './components/effects/ScrollProgressIndicator';

export default function Home() {
  return (
    <>
      <ScrollProgressIndicator />
      <GradientBackground />
      <Header />
      <main className="flex-1 max-w-[1200px] w-full mx-auto pb-12 relative z-10 px-4 sm:px-6 lg:px-8">
        
        <Hero />

        <About />
        <Service />
        <Portfolio />
        
        {/* Contact Section Group - Antigravity Style */}
        <div id="contact" className="mt-32 section-bg animate-hidden animate-fade-up">
          <div className="text-center mb-12">
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white mb-md">
              Let’s Connect
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? We’d love to hear from you.
            </p>
          </div>
          <div className="glass-panel unified-card p-xl rounded-lg grid grid-cols-1 lg:grid-cols-5 gap-xl mt-xl">
            <div className="lg:col-span-2">
              <Contact />
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
