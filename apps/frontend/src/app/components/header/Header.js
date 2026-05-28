"use client";
import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <div className="logo">
        <p>MicroStateDev</p>
      </div>

      <nav className={`nav-wrapper ${isOpen ? "open" : ""}`}>
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          <li
            onClick={() => {
              window.scrollTo({ behavior: "smooth", top: 0 });
              closeMenu();
            }}
          >
            Home
          </li>
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#service" onClick={closeMenu}>
              Service
            </a>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <a href="#contact" className="btn-contact-header">
          Связаться
        </a>
        <button
          type="button"
          className={`hamburger ${isOpen ? "is-open" : ""}`}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
