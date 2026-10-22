'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TerminalTab } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge } from '@/components/ui';

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<TerminalTab>('cli');
  const { t } = useLanguage();

  return (
    <div
      className="max-w-4xl mx-auto rounded-2xl glass-card border border-cyan-500/25 shadow-2xl overflow-hidden text-left"
      dir="ltr"
    >
      {/* Top Window Bar */}
      <div className="bg-space-900/95 px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />

          {/* Terminal Tabs */}
          <div className="flex items-center gap-1.5 ml-4 text-xs font-mono">
            {(['cli', 'guard', 'bridge'] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded transition cursor-pointer select-none ${
                    active
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold shadow-sm'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {t.terminal.tabs[tab]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daemon Pulse */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">{t.terminal.daemonStatus}</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm space-y-3 bg-space-950/90 min-h-[190px]">
        {activeTab === 'cli' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-gray-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">crewloom</span> roles --category backend
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm pl-4 border-l-2 border-emerald-500/50">
              ✓ Loaded 44 autonomous roles with strict zero-loss verification
            </div>
            <div className="text-cyan-200/90 text-xs sm:text-sm pl-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Orchestrator online • Target latency: &lt; 0.8ms</span>
            </div>
          </div>
        )}

        {activeTab === 'guard' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-gray-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">crewloom</span> audit --preflight
            </div>
            <div className="text-cyan-400 text-xs sm:text-sm pl-4 border-l-2 border-cyan-500/50">
              [Contract Guard] Scanning code diffs against strict Zero-Destruction Policy...
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm pl-4">
              ✓ 0 destructive edits detected • 100% additive safety guarantee passed
            </div>
          </div>
        )}

        {activeTab === 'bridge' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-gray-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">crewloom</span> bridge --telegram --whatsapp
            </div>
            <div className="text-purple-400 text-xs sm:text-sm pl-4 border-l-2 border-purple-500/50">
              [Omni-Channel] Bridge listening on encrypted dual-socket gateways
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm pl-4">
              ✓ Live Telegram control room activated • Remote execution authorized
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
