'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  isAr: boolean;
  t: typeof DICTIONARY['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const pathname = usePathname();

  // URL path is the single authoritative source of truth for language:
  // /ar, /ar/ => Arabic
  // /, /blog, etc. => English
  const getRouteLang = (): Lang => {
    if (initialLang) return initialLang;
    if (pathname && (pathname === '/ar' || pathname.startsWith('/ar/'))) {
      return 'ar';
    }
    return 'en';
  };

  const [lang, setLangState] = useState<Lang>(getRouteLang);

  useEffect(() => {
    const activeLang = getRouteLang();
    setLangState(activeLang);
    const isArabic = activeLang === 'ar';
    document.documentElement.lang = activeLang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [pathname, initialLang]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      if (newLang === 'ar' && !window.location.pathname.startsWith('/ar')) {
        window.location.href = '/ar/';
      } else if (newLang === 'en' && window.location.pathname.startsWith('/ar')) {
        window.location.href = '/';
      }
    }
  };

  const toggleLang = () => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (currentPath === '/ar' || currentPath.startsWith('/ar/')) {
        window.location.href = '/';
      } else {
        window.location.href = '/ar/';
      }
    }
  };

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    isAr: lang === 'ar',
    t: DICTIONARY[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
