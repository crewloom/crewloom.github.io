import React from 'react';
import { Logo } from '@/components/common/Logo';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const t = DICTIONARY[lang];

  return (
    <footer className="border-t border-white/[0.08] bg-space-950 px-6 lg:px-12 py-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" glow={false} />
          <span className="font-bold text-sm text-white font-mono">CREWLOOM SOVEREIGN</span>
          <span className="text-xs text-gray-500">{t.footer.rights}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-semibold">
          <a
            href="https://github.com/crewloom"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {t.footer.org}
          </a>
          <a href="https://crewloom.org" className="hover:text-cyan-400 transition-colors cursor-pointer">
            {t.footer.site}
          </a>
          <a
            href="mailto:support@crewloom.org"
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {t.footer.support}
          </a>
        </div>
      </div>
    </footer>
  );
}
