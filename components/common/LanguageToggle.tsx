'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui';

export function LanguageToggle() {
  const { lang, toggleLang, isAr } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname === '/ar' || pathname === '/ar/') {
        window.location.href = '/';
        return;
      }
      if (pathname === '/' || pathname === '') {
        window.location.href = '/ar/';
        return;
      }
    }
    toggleLang();
  };

  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={handleClick}
      className="border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white px-2.5 py-1 text-xs font-medium"
      aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
      title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
    >
      <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span className="font-semibold">{isAr ? 'English' : 'عربي'}</span>
    </Button>
  );
}
