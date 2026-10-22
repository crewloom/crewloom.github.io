'use client';

import React from 'react';
import { Logo } from '@/components/common/Logo';
import { useLanguage } from '@/hooks/useLanguage';
import { SITE_CONFIG } from '@/lib/constants';
import { Container } from '@/components/ui';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.08] bg-space-950 py-12 relative z-10">
      <Container size="lg" className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" glow={false} />
          <span className="font-bold text-sm text-white font-mono">
            {SITE_CONFIG.name.toUpperCase()} SOVEREIGN
          </span>
          <span className="text-xs text-gray-500">{t.footer.rights}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-semibold">
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {t.footer.org}
          </a>
          <a
            href={SITE_CONFIG.url}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {t.footer.site}
          </a>
          <a
            href="mailto:support@crewloom.org"
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {t.footer.support}
          </a>
        </div>
      </Container>
    </footer>
  );
}
