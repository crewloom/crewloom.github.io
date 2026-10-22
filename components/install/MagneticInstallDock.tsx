'use client';

import React, { useState } from 'react';
import { Apple, Download, Terminal, Package, ChevronRight, Check } from 'lucide-react';
import { InstallMethod } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';
import { useClipboard } from '@/hooks/useClipboard';
import { Card, Button, Badge } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

const INSTALL_COMMANDS: Record<Exclude<InstallMethod, 'macos'>, string> = {
  curl: SITE_CONFIG.installCommand,
  npm: `npm install -g ${SITE_CONFIG.cliPackage}`,
  brew: `brew install ${SITE_CONFIG.brewTap}`,
};

export function MagneticInstallDock() {
  const [method, setMethod] = useState<InstallMethod>('curl');
  const { t } = useLanguage();
  const { isCopied, copy } = useClipboard({ timeout: 2500 });

  const currentCommand = method !== 'macos' ? INSTALL_COMMANDS[method] : '';
  const copied = currentCommand ? isCopied(currentCommand) : false;

  return (
    <div className="max-w-3xl mx-auto mb-16 beam-border shadow-2xl">
      <div className="beam-content p-6 sm:p-8 text-left" dir="ltr">
        {/* Header & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
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

        {/* Command Display or Native App Download */}
        {method === 'macos' ? (
          <div className="bg-space-950 p-6 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shadow-inner shrink-0">
                <Apple className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>Crewloom Studio for macOS</span>
                  <Badge variant="cyan" className="text-[10px] py-0 px-2">Apple Silicon & Intel</Badge>
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Standalone desktop environment with dual-core offline telemetry & visual team dashboard.
                </p>
              </div>
            </div>

            <a
              href={SITE_CONFIG.macosDownloadUrl}
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="md"
                leftIcon={<Download className="w-4 h-4" />}
                className="w-full sm:w-auto whitespace-nowrap"
              >
                {t.install.downloadMac}
              </Button>
            </a>
          </div>
        ) : (
          <div className="relative group bg-space-950 p-4 sm:p-5 rounded-xl border border-cyan-500/30 flex items-center justify-between gap-4 shadow-inner">
            <div className="flex items-center gap-3 overflow-x-auto pr-2 select-all font-mono text-xs sm:text-sm text-cyan-300">
              <span className="text-gray-500 select-none font-bold">$</span>
              <code className="whitespace-pre">{currentCommand}</code>
            </div>

            <Button
              variant={copied ? 'cyber' : 'primary'}
              size="sm"
              onClick={() => copy(currentCommand)}
              leftIcon={
                copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Terminal className="w-3.5 h-3.5" />
                )
              }
              className="shrink-0 font-mono"
            >
              {copied ? t.install.copied : t.install.copy}
            </Button>
          </div>
        )}

        {/* Real-time Subtext Features */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 mt-4 px-1 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Zero telemetry leaks
            </span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline text-gray-400">Auto-detects Ollama & DeepSeek</span>
          </div>
          <span className="text-emerald-400 font-semibold">{t.hero.trustNote}</span>
        </div>
      </div>
    </div>
  );
}
