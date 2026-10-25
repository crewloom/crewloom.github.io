'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Download, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export function FloatingActionDock() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toggleLang, isAr } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
      dir="ltr"
    >
      <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-space-950/90 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-300">
        <a href={SITE_CONFIG.macosDownloadUrl} download="Crewloom.dmg">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
            className="font-bold text-xs"
          >
            {isAr ? 'تحميل تطبيق الماك' : 'Download Mac App'}
          </Button>
        </a>

        <a href="#simulator" className="hidden sm:inline-block">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Terminal className="w-3.5 h-3.5 text-cyan-400" />}
            className="text-gray-300 text-xs"
          >
            {isAr ? 'المحاكاة' : 'Simulator'}
          </Button>
        </a>

        <Button
          variant="ghost"
          size="xs"
          onClick={toggleLang}
          className="text-gray-400 hover:text-white p-2"
          aria-label="Toggle Language"
          title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
        </Button>

        {showScrollTop && (
          <Button
            variant="ghost"
            size="xs"
            onClick={scrollToTop}
            className="text-gray-400 hover:text-white p-2"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
