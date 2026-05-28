"use client";

import { useEffect, useState } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Header from './components/header/Header';
import Service from './components/service/Service';
import Footer from './components/footer/Footer';

export default function Home() {
  const [top, setTop] = useState('none');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setTop('flex');
      } else {
        setTop('none');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header />
      <About />
      <Service />
      <Contact />
      <Footer />
      <p className='top_page' style={{ display: top }} onClick={() => {
        window.scrollTo({
          behavior: 'smooth',
          top: 0
        });
        setTop('none');
      }}></p>
    </div>
  );
}
