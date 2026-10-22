'use client';

import React from 'react';
import { Download, Zap } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useLanguage } from '@/hooks/useLanguage';
import { Button, Badge } from '@/components/ui';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { SITE_CONFIG } from '@/lib/constants';

export function Navbar() {
  const { t, isAr } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-space-950/80 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-12 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer select-none">
          <Logo className="w-9 h-9 transition-transform group-hover:scale-105" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl text-white tracking-wider font-mono">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
              <Badge variant="cyan" className="text-[10px] py-0 px-2 font-mono">
                SOVEREIGN
              </Badge>
            </div>
            <span className="text-[11px] text-gray-400 tracking-tight block">
              {t.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-300">
          <a href="#features" className="hover:text-cyan-400 transition-colors cursor-pointer">
            {t.nav.capabilities}
          </a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors cursor-pointer">
            {t.nav.architecture}
          </a>
          <a
            href="#simulator"
            className="hover:text-cyan-400 transition-colors text-cyan-400 flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.nav.simulator}</span>
          </a>
          <a href="#roles" className="hover:text-cyan-400 transition-colors cursor-pointer">
            {t.nav.skills}
          </a>
          <a href="#install" className="hover:text-cyan-400 transition-colors cursor-pointer">
            {t.nav.quickstart}
          </a>
        </nav>

        {/* Language switcher & CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LanguageToggle />

          <a href="#install">
            <Button
              variant="primary"
              size="xs"
              leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
              className="font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <span className="hidden sm:inline">{t.nav.getStarted}</span>
              <span className="sm:hidden">{isAr ? 'تثبيت' : 'Install'}</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
