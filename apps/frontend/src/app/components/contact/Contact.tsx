"use client";
import { IconMail, IconPhone } from '@tabler/icons-react';
import { useI18n } from "../../i18nContext";

export default function Contact() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col h-full" id="contact-info">
      <div>
        <h4 className="font-display-lg text-headline-lg text-white mb-md">
          {t.contact.title}
        </h4>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-xl">
          We architect digital solutions for the future. Reach out for an engineering consultation or to discuss your next big product.
        </p>

        <div className="flex flex-col gap-6 mt-8">
          <a href="mailto:tech@microstatedev.com" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-lg bg-[#050B16]/70 border border-white/10 flex items-center justify-center text-on-surface-variant group-hover:border-[rgba(10,132,255,0.45)] group-hover:text-[var(--accent)] transition-all duration-300">
              <IconMail size={22} />
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant">Email</span>
              <p className="font-body-lg text-body-lg text-white group-hover:text-[var(--accent)] transition-colors duration-200">tech@microstatedev.com</p>
            </div>
          </a>
          <a href="tel:+37441355605" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-lg bg-[#050B16]/70 border border-white/10 flex items-center justify-center text-on-surface-variant group-hover:border-[rgba(10,132,255,0.45)] group-hover:text-[var(--accent)] transition-all duration-300">
              <IconPhone size={22} />
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant">Phone</span>
              <p className="font-body-lg text-body-lg text-white group-hover:text-[var(--accent)] transition-colors duration-200">+374 41 355 605</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
