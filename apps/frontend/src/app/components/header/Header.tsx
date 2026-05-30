"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconCodeAsterisk } from "@tabler/icons-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`w-full h-24 px-6 md:px-12 lg:px-24 flex justify-between items-center sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center">
        <Link href="/" onClick={closeMenu} className="no-underline group/logo flex items-center gap-3 will-change-transform-opacity">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#111827] border border-[#374151] overflow-hidden group-hover/logo:border-[#0A84FF] transition-colors duration-500">
            <div className="absolute inset-0 sci-fi-gradient opacity-0 group-hover/logo:opacity-20 transition-opacity duration-500" />
            <IconCodeAsterisk size={24} className="msd-icon-code-asterisk" />
          </div>
            <span
              className="msd-logo-text text-2xl tracking-tight font-extrabold sci-fi-text-gradient"
              style={{ fontFamily: "var(--font)" }}
            >
              MicroStateDev
            </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center">
        <ul className="flex gap-8 list-none items-center m-0 p-0">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/#about" },
            { name: "Service", href: "/#service" },
            { name: "Portfolio", href: "/#portfolio" },
            { name: "Contact", href: "/#contact" }
          ].map((item) => (
            <li
              key={item.name}
              className="relative group"
            >
              <Link 
                href={item.href} 
                className="text-gray-400 text-sm font-medium tracking-wide uppercase transition-colors duration-300 group-hover:text-white"
              >
                {item.name}
              </Link>
              {/* Glowing underline indicator */}
              <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <a
          href="#contact"
          className="hidden md:flex relative overflow-hidden group px-8 py-3 rounded-full bg-surface-container-high border border-outline/30 transition-all duration-300 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(100,255,218,0.2)]"
        >
          {/* Button Hover Background Effect */}
          <div className="absolute inset-0 bg-brand-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
          <span className="relative z-10 text-sm font-bold text-white uppercase tracking-widest group-hover:text-brand-cyan transition-colors">
            Contact
          </span>
        </a>
        
        <button
          type="button"
          className="md:hidden relative z-50 flex flex-col items-center justify-center w-12 h-12 gap-1.5 bg-surface-container-high border border-white/10 rounded-xl"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={`w-5 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <ul className="flex flex-col gap-10 list-none items-center">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/#about" },
              { name: "Service", href: "/#service" },
              { name: "Portfolio", href: "/#portfolio" },
              { name: "Contact", href: "/#contact" }
            ].map((item, i) => (
              <li
                key={item.name}
                className="transform transition-transform duration-500"
                style={{ transitionDelay: isOpen ? `${i * 100}ms` : '0ms', transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <Link 
                  href={item.href} 
                  className="text-white text-4xl font-extrabold tracking-tight hover:text-green-400 transition-colors duration-300"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-12 text-center text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 uppercase tracking-widest"
          >
            Связаться с нами
          </a>
        </div>
      </div>
    </header>
  );
}
