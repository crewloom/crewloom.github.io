'use client';

import React, { useState } from 'react';
import { Download, Zap, Menu, X, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useLanguage } from '@/hooks/useLanguage';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { Button, Badge } from '@/components/ui';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { SITE_CONFIG } from '@/lib/constants';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isAr } = useLanguage();
  const { versionTag, macDownloadUrl } = useLatestRelease();

  const navItems = [
    { href: '/#features', label: t.nav.capabilities },
    { href: '/#architecture', label: t.nav.architecture },
    { href: '/#simulator', label: t.nav.simulator, icon: <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> },
    { href: '/#roles', label: t.nav.skills },
    { href: '/#install', label: t.nav.quickstart },
    { href: '/blog/', label: isAr ? 'المقالات والأبحاث' : 'Articles' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-space-950/90 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-12 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none shrink-0">
          <Logo className="w-8 h-8 sm:w-9 sm:h-9" glow />
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-base sm:text-xl text-white tracking-wider font-mono">
                {SITE_CONFIG.name.toUpperCase()}
              </span>
              <Badge variant="cyan" className="text-[9px] sm:text-[10px] py-0 px-1.5 sm:px-2 font-mono">
                SOVEREIGN
              </Badge>
            </div>
            <span className="hidden sm:block text-[11px] text-gray-400 tracking-tight">
              {t.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-300">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5 text-xs sm:text-[13px] tracking-normal"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Language switcher & CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />

          <a
            href={macDownloadUrl}
            download="Crewloom.dmg"
            className="hidden xs:inline-block"
            title={isAr ? `تحميل تطبيق الماك المكتبي (${versionTag})` : `Download macOS Desktop App (${versionTag})`}
          >
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
              className="font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <span className="hidden sm:inline">{isAr ? `تحميل تطبيق الماك (${versionTag})` : `Download Mac App (${versionTag})`}</span>
              <span className="sm:hidden">{isAr ? 'تحميل' : 'Download'}</span>
            </Button>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 transition cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/[0.08] pb-4 px-2 space-y-2 animate-fade-in bg-space-950/95 rounded-b-2xl">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-cyan-950/40 hover:border-cyan-800/40 border border-transparent transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
            <a
              href="#install"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1"
            >
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                className="w-full font-bold text-xs"
              >
                {t.nav.getStarted}
              </Button>
            </a>

            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
