'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TerminalTab } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<TerminalTab>('cli');
  const { t } = useLanguage();

  const tabLabelsShort: Record<TerminalTab, string> = {
    cli: 'CLI',
    guard: 'Guard',
    bridge: 'Bridge',
  };

  return (
    <div
      className="max-w-4xl mx-auto rounded-2xl glass-card border border-cyan-500/25 shadow-2xl overflow-hidden text-left max-w-full"
      dir="ltr"
    >
      {/* Top Window Bar */}
      <div className="bg-space-900/95 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Terminal Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 ml-2 sm:ml-4 text-xs font-mono overflow-x-auto scrollbar-none min-w-0">
            {(['cli', 'guard', 'bridge'] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 sm:px-3 py-1 rounded transition cursor-pointer select-none whitespace-nowrap text-[11px] sm:text-xs ${
                    active
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold shadow-sm'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="hidden sm:inline">{t.terminal.tabs[tab]}</span>
                  <span className="sm:hidden">{tabLabelsShort[tab]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daemon Pulse */}
        <div className="hidden xs:flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-cyan-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden md:inline">{t.terminal.daemonStatus}</span>
          <span className="md:hidden">Daemon: OK</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 bg-space-950/90 min-h-[170px] sm:min-h-[190px] overflow-x-auto code-scroll">
        {activeTab === 'cli' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-gray-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">crewloom</span> roles --category backend
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm pl-3 sm:pl-4 border-l-2 border-emerald-500/50">
              ✓ Loaded 44 autonomous roles with strict zero-loss verification
            </div>
            <div className="text-cyan-200/90 text-xs sm:text-sm pl-3 sm:pl-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
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
            <div className="text-cyan-400 text-xs sm:text-sm pl-3 sm:pl-4 border-l-2 border-cyan-500/50">
              [Contract Guard] Scanning code diffs against strict Zero-Destruction Policy...
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm pl-3 sm:pl-4">
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
            <div className="text-purple-400 text-xs sm:text-sm pl-3 sm:pl-4 border-l-2 border-purple-500/50">
              [Omni-Channel] Bridge listening on encrypted dual-socket gateways
            </div>
            <div className="text-emerald-400 text-xs sm:text-sm pl-3 sm:pl-4">
              ✓ Live Telegram control room activated • Remote execution authorized
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
