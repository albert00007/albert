"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconLanguage, IconChevronDown } from "@tabler/icons-react";
import { useI18n } from "../../i18nContext";

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'RU', name: 'Русский' },
  { code: 'AM', name: 'Հայերեն' }
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang: currentLang, setLang } = useI18n();

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high border border-outline/30 text-on-surface-variant hover:text-white hover:border-outline transition-all duration-300 group"
      >
        <IconLanguage size={18} className="group-hover:text-brand-cyan transition-colors" />
        <span className="font-semibold text-sm">{currentLang}</span>
        <IconChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-36 bg-surface-container-high border border-outline/50 rounded-xl shadow-xl overflow-hidden z-50"
            >
              {languages.map((langItem) => (
                <button
                  key={langItem.code}
                  onClick={() => {
                    setLang(langItem.code as "EN" | "RU" | "AM");
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    currentLang === langItem.code 
                      ? 'bg-brand-cyan/10 text-brand-cyan' 
                      : 'text-on-surface hover:bg-surface-container-highest hover:text-brand-cyan'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {langItem.name}
                    {currentLang === langItem.code && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />}
                  </span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
