"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "./translations";

type Language = "EN" | "RU" | "AM";
type Translations = typeof translations.EN;

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved && (saved === "EN" || saved === "RU" || saved === "AM")) {
      setLang(saved);
    }
    setMounted(true);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  if (!mounted) {
    // Return children with default EN to avoid hydration mismatch, or a fragment
    return <I18nContext.Provider value={{ lang: "EN", setLang: handleSetLang, t: translations.EN }}>{children}</I18nContext.Provider>;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
