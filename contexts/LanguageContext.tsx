'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';
import { storage } from '@/lib/utils';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  isAr: boolean;
  t: typeof DICTIONARY['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'crewloom_preferred_lang';

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang || 'en');

  useEffect(() => {
    if (initialLang) {
      setLangState(initialLang);
      document.documentElement.lang = initialLang;
      document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
      return;
    }
    // Read persisted preference if available
    const saved = storage.get<Lang | null>(STORAGE_KEY, null);
    if (saved === 'ar' || saved === 'en') {
      setLangState(saved);
    }
  }, [initialLang]);

  useEffect(() => {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    storage.set(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
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
