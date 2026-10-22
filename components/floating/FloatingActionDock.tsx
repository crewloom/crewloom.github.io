import React, { useState } from 'react';
import { Terminal, Download, Copy, Check } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface FloatingActionDockProps {
  lang: Lang;
}

export function FloatingActionDock({ lang }: FloatingActionDockProps) {
  const [copied, setCopied] = useState(false);
  const t = DICTIONARY[lang];

  const curlCmd = 'curl -fsSL https://crewloom.org/install.sh | bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-6 inset-x-0 z-40 max-w-xl mx-auto px-4 pointer-events-none"
    >
      <div className="pointer-events-auto glass-card rounded-2xl p-2 sm:p-2.5 border border-cyan-500/40 shadow-2xl flex items-center justify-between gap-3 animate-float backdrop-blur-2xl">
        <div className="flex items-center gap-2.5 pl-2" dir="ltr">
          <Logo className="w-7 h-7" glow={false} />
          <div className="hidden sm:block">
            <span className="text-xs font-mono font-bold text-white block">
              {t.floating.version}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">
              {t.floating.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <button
            onClick={handleCopy}
            className="px-3 sm:px-3.5 py-2 rounded-xl bg-space-950 hover:bg-space-900 border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition cursor-pointer active:scale-95"
            title="Copy curl install command"
            aria-label="Copy curl install command"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 text-[11px]">{t.install.copied}</span>
              </>
            ) : (
              <>
                <Terminal className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px]">{t.floating.curlBtn}</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/crewloom/agent/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-space-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:scale-105 transition animate-shimmer cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{t.floating.appBtn}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
