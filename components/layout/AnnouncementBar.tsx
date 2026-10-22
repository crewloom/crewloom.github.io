import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface AnnouncementBarProps {
  lang: Lang;
}

export function AnnouncementBar({ lang }: AnnouncementBarProps) {
  const t = DICTIONARY[lang];

  return (
    <div className="bg-gradient-to-r from-cyan-950/90 via-space-900 to-emerald-950/90 border-b border-cyan-800/30 px-4 py-2 text-center text-xs text-gray-300 flex items-center justify-center gap-2 relative z-50">
      <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" aria-hidden="true" />
      <span className="font-medium truncate max-w-[85vw] sm:max-w-none">
        {t.announcement}
      </span>
      <a
        href="https://github.com/crewloom"
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 hover:text-cyan-300 font-bold underline ml-1 inline-flex items-center gap-1 group cursor-pointer transition-colors shrink-0"
      >
        <span>{t.exploreGithub}</span>
        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}
