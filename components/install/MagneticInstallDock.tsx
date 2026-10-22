import React, { useState } from 'react';
import { Copy, Check, Apple, Download, Terminal, Package } from 'lucide-react';
import { InstallMethod, Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface MagneticInstallDockProps {
  lang: Lang;
}

export function MagneticInstallDock({ lang }: MagneticInstallDockProps) {
  const [method, setMethod] = useState<InstallMethod>('curl');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const t = DICTIONARY[lang];

  const commands: Record<Exclude<InstallMethod, 'macos'>, string> = {
    curl: 'curl -fsSL https://crewloom.org/install.sh | bash',
    npm: 'npm install -g @crewloom/cli',
    brew: 'brew install crewloom/tap/crewloom',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto mb-16 beam-border shadow-2xl">
      <div className="beam-content p-6 sm:p-8 text-left" dir="ltr">
        {/* Header & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
            <span className="text-xs font-mono font-bold text-gray-200 tracking-wider">
              {t.install.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-space-950 p-1 rounded-lg border border-white/10 text-xs font-mono">
            {(['curl', 'npm', 'brew', 'macos'] as const).map((m) => {
              const active = method === m;
              return (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/80 font-bold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {m === 'macos' && <Apple className="w-3 h-3" />}
                  <span>{m === 'macos' ? 'Native App' : m}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Command displays */}
        {method !== 'macos' && (
          <div className="flex items-center justify-between bg-space-950/90 border border-cyan-500/30 rounded-xl p-4 font-mono text-sm group hover:border-cyan-400/80 transition-colors shadow-inner">
            <div className="flex items-center gap-3 overflow-x-auto text-cyan-300 pr-2">
              <span className="text-emerald-400 font-bold select-none">$</span>
              <code className="text-xs sm:text-sm whitespace-nowrap">{commands[method]}</code>
            </div>
            <button
              onClick={() => copyToClipboard(commands[method])}
              className="ml-4 shrink-0 px-4 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-300 text-xs font-bold transition flex items-center gap-2 shadow cursor-pointer active:scale-95"
              aria-label="Copy install command"
            >
              {copiedCmd === commands[method] ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-sans">{t.install.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="font-sans">{t.install.copy}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* macOS Native App */}
        {method === 'macos' && (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-space-950/90 border border-cyan-500/30 rounded-xl p-4 gap-4 shadow-inner">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">{t.install.macTitle}</div>
                <div className="text-xs text-gray-400">{t.install.macSub}</div>
              </div>
            </div>
            <a
              href="https://github.com/crewloom/agent/releases/latest"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-400 text-space-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{t.install.downloadMac}</span>
            </a>
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 mt-4 gap-2">
          <span>{t.hero.trustNote}</span>
          <span className="text-emerald-400 font-mono font-semibold">100% Non-Destructive Certified</span>
        </div>
      </div>
    </div>
  );
}
