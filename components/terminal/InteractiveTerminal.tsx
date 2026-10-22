import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Lang, TerminalTab } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface InteractiveTerminalProps {
  lang: Lang;
}

export function InteractiveTerminal({ lang }: InteractiveTerminalProps) {
  const [activeTab, setActiveTab] = useState<TerminalTab>('cli');
  const t = DICTIONARY[lang];

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
                  className={`px-3 py-1 rounded transition cursor-pointer ${
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
            <div className="text-gray-300 text-xs pl-4 space-y-1">
              <p className="text-emerald-300 font-semibold">✓ Loaded 44 Sovereign Specialist Roles:</p>
              <p className="text-gray-400">  [01] chix-brain-and-contracts (DAC + ZLRC Binding Verification)</p>
              <p className="text-gray-400">  [02] chix-database-migrations (Additive Only · Partial Index Guard)</p>
              <p className="text-gray-400">  [03] zero-destruction-policy (Constitution Article IV Non-Destructive)</p>
            </div>
            <div className="text-cyan-400 text-xs pl-4 font-mono terminal-cursor">
              Ready for autonomous instruction dispatch.
            </div>
          </div>
        )}

        {activeTab === 'guard' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-gray-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">crewloom</span> verify --strict
            </div>
            <div className="text-gray-300 text-xs pl-4 space-y-1">
              <p className="text-cyan-300">▶ Executing 14 CI Contract gates...</p>
              <p className="text-emerald-400">  ✓ Gate 01: Raw Colors Baseline (0 regressions)</p>
              <p className="text-emerald-400">  ✓ Gate 02: Data Access Contract (Forbidden keys audit clean)</p>
              <p className="text-emerald-400">  ✓ Gate 03: Zero-Destruction Policy Guard (100% additive enforcement)</p>
            </div>
            <div className="text-emerald-300 text-xs pl-4 font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
              <span>[CONSTITUTION RATIFIED]: All changes certified non-destructive.</span>
            </div>
          </div>
        )}

        {activeTab === 'bridge' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-gray-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">crewloom</span> bridge status
            </div>
            <div className="text-gray-300 text-xs pl-4 space-y-1">
              <p className="text-emerald-300 font-semibold">● Omni-Channel Bridge Daemon: ONLINE</p>
              <p className="text-gray-400">  Telegram Gateway: Connected (@CrewloomBot)</p>
              <p className="text-gray-400">  Local IPC Socket: /tmp/crewloom-bridge.sock (&lt;1ms latency)</p>
              <p className="text-gray-400">  Web Studio UI: http://localhost:3030</p>
            </div>
            <div className="text-cyan-400 text-xs pl-4 font-mono terminal-cursor">
              Awaiting remote telegram commands or local socket messages...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
