import React from "react";
import "./Footer.css";

function Icon({ name }) {
  if (name === "twitter")
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden>
        <path
          d="M22 5.92c-.64.28-1.32.46-2.04.55.73-.44 1.28-1.14 1.54-1.98-.69.4-1.46.69-2.28.85C18.36 4.4 17.36 4 16.28 4c-1.6 0-2.9 1.28-2.9 2.86 0 .22.02.44.07.65C10.45 7.35 7.2 5.6 5 3.02c-.24.42-.38.9-.38 1.42 0 .98.5 1.86 1.26 2.37-.47-.02-.92-.14-1.31-.36v.04c0 1.38.98 2.53 2.28 2.79-.24.06-.5.08-.77.08-.19 0-.38-.02-.56-.05.38 1.16 1.48 2.01 2.78 2.04C8.44 15.5 6.9 16.14 5.18 16.14c-.34 0-.68-.02-1.01-.06C5.94 17.94 7.98 19 10.28 19c6.18 0 9.56-5.12 9.56-9.56v-.44c.66-.48 1.2-1.08 1.64-1.76-.6.28-1.24.46-1.9.54z"
          fill="currentColor"
        />
      </svg>
    );
  if (name === "github")
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden>
        <path
          d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.68.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.62.07-.6.07-.6 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.9.85.09-.66.34-1.11.62-1.36-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0112 6.8c.85.004 1.71.11 2.51.32 1.9-1.32 2.74-1.05 2.74-1.05.56 1.39.21 2.41.11 2.67.64.72 1.03 1.63 1.03 2.75 0 3.95-2.35 4.81-4.59 5.07.35.32.67.94.67 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.59.69.49A10.21 10.21 0 0022 12.2C22 6.58 17.52 2 12 2z"
          fill="currentColor"
        />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden>
        <path
          d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.1A4.9 4.9 0 1112 17a4.9 4.9 0 010-8.9zM18.4 6.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
          fill="currentColor"
        />
      </svg>
    );
  return null;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="logo">MSD</p>
          <p className="slogan">MicroState Development Agency</p>
        </div>

        <nav className="footer-nav">
          <a href="#about">About</a>
          <a href="#service">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <div
          className="socials">
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="social"
            target="_blank"
            rel="noreferrer">
            <Icon name="twitter" /> <span>Twitter</span>
          </a>
          <a
            href="https://github.com"
            aria-label="GitHub"
            className="social"
            target="_blank"
            rel="noreferrer">
            <Icon name="github" /> <span>GitHub</span>
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="social"
            target="_blank"
            rel="noreferrer">
            <Icon name="instagram" /> <span>Instagram</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} MSD — All rights reserved.</small>
      </div>
    </footer>
  );
}
