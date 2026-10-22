import React from 'react';
import { Globe, Download, Zap } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
}

export function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = DICTIONARY[lang];
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/[0.08] px-4 sm:px-6 lg:px-12 py-3 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <Logo className="w-9 h-9" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl text-white tracking-wider font-mono">
                CREWLOOM
              </span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded-full font-mono font-bold tracking-tight">
                SOVEREIGN
              </span>
            </div>
            <span className="text-[11px] text-gray-400 tracking-tight block">
              {t.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-300">
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
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-lg bg-space-850 hover:bg-space-800 border border-white/10 hover:border-cyan-500/60 text-xs font-bold text-cyan-300 flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          <a
            href="#install"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-space-950 px-3.5 sm:px-4 py-2 rounded-lg font-bold text-xs shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 animate-shimmer cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">{t.nav.getStarted}</span>
            <span className="sm:hidden">{isAr ? 'تثبيت' : 'Install'}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
