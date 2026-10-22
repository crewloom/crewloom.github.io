'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { SITE_CONFIG } from '@/lib/constants';

export function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <aside
      aria-label="Release Announcement"
      className="bg-gradient-to-r from-cyan-950/90 via-space-900 to-emerald-950/90 border-b border-cyan-800/30 px-4 py-2 text-center text-xs text-gray-300 flex items-center justify-center gap-2 relative z-50 select-none"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
      </span>
      <span className="font-medium truncate max-w-[85vw] sm:max-w-none">
        {t.announcement}
      </span>
      <a
        href={SITE_CONFIG.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 font-bold underline ml-1 inline-flex items-center gap-1 group cursor-pointer transition-colors shrink-0"
      >
        <span>{t.exploreGithub}</span>
        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </aside>
  );
}
