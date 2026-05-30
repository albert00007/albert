import ContactForm from "../contact-form/ContactForm";

export default function Contact() {
  return (
    <div className="flex flex-col h-full" id="contact-info">
      <div>
        <h4 className="font-display-lg text-headline-lg text-white mb-md">
          Get in Touch
        </h4>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-xl">
          We architect digital solutions for the future. Reach out for an engineering consultation or to discuss your next big product.
        </p>

        <div className="flex flex-col gap-6 mt-8">
          <a href="mailto:tech@microstatedev.com" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant">Email</span>
              <p className="font-body-lg text-body-lg text-white group-hover:text-primary transition-colors duration-200">tech@microstatedev.com</p>
            </div>
          </a>
          <a href="tel:+37441355605" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant">Phone</span>
              <p className="font-body-lg text-body-lg text-white group-hover:text-primary transition-colors duration-200">+374 41 355 605</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
