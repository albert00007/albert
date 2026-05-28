"use client";

import { useEffect, useState } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Header from './components/header/Header';
import Service from './components/service/Service';
import Footer from './components/footer/Footer';
import Portfolio from './components/portfolio/Portfolio';
import GradientBackground from './components/effects/GradientBackground';
import ScrollProgressIndicator from './components/effects/ScrollProgressIndicator';
import ContactForm from './components/contact-form/ContactForm';

export default function Home() {
  const [top, setTop] = useState<'none' | 'flex'>('none');

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY > 100 ? 'flex' : 'none');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <ScrollProgressIndicator />
      <GradientBackground />
      <Header />
      <About />
      <Service />
      <Portfolio />
      <Contact />
      <ContactForm />
      <Footer />
      <p className="top_page" style={{ display: top }} onClick={() => {
        window.scrollTo({
          behavior: 'smooth',
          top: 0
        });
        setTop('none');
      }} />
    </div>
  );
}
