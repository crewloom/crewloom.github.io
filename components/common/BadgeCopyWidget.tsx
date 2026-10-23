'use client';

import React, { useState } from 'react';
import { Check, Copy, ShieldCheck, Terminal } from 'lucide-react';

export function BadgeCopyWidget() {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'markdown' | 'html'>('markdown');

  const markdownSnippet = `[![Protected by Crewloom Zero-Destruction](https://crewloom.org/badge.svg)](https://crewloom.org)`;
  const htmlSnippet = `<a href="https://crewloom.org"><img src="https://crewloom.org/badge.svg" alt="Protected by Crewloom Zero-Destruction" /></a>`;

  const snippet = format === 'markdown' ? markdownSnippet : htmlSnippet;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative rounded-2xl border border-cyan-800/40 bg-gradient-to-r from-space-950 via-space-900 to-cyan-950/30 p-6 sm:p-8 backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Developer Viral Distribution Flywheel</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Add the Zero-Destruction Badge to your GitHub README
          </h3>
          <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
            Signal to contributors and clients that your repository enforces strict AST mutation safety, additive schema migrations, and zero-telemetry sovereignty.
          </p>
        </div>

        {/* Live Badge Preview */}
        <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0">
          <div className="p-3 rounded-xl bg-space-950/80 border border-white/10 shadow-lg flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/badge.svg"
              alt="Protected by Crewloom Zero-Destruction"
              className="h-7 w-auto select-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Toggle format */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFormat('markdown')}
            className={`text-xs px-3 py-1.5 rounded-lg font-mono font-medium transition-colors ${
              format === 'markdown'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            Markdown
          </button>
          <button
            type="button"
            onClick={() => setFormat('html')}
            className={`text-xs px-3 py-1.5 rounded-lg font-mono font-medium transition-colors ${
              format === 'html'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            HTML
          </button>
        </div>

        {/* Code + Copy */}
        <div className="flex-1 max-w-xl flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-space-950 border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto">
          <span className="truncate select-all">{snippet}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 text-space-950 font-sans font-bold hover:bg-cyan-400 transition-colors flex-shrink-0 text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-space-950" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-space-950" />
                <span>Copy Badge</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
