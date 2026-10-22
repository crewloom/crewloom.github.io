'use client';

import React from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClipboard } from '@/hooks/useClipboard';

export interface CodeSnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showPrompt?: boolean;
  title?: string;
  compact?: boolean;
}

export function CodeSnippet({
  code,
  language = 'bash',
  showPrompt = false,
  title,
  compact = false,
  className,
  ...props
}: CodeSnippetProps) {
  const { isCopied, copy } = useClipboard({ timeout: 2000 });
  const copied = isCopied(code);

  return (
    <div
      className={cn(
        'group relative bg-space-950 border border-white/10 rounded-xl overflow-hidden font-mono text-xs sm:text-sm text-cyan-300 shadow-inner',
        className
      )}
      dir="ltr"
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02] text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">{title}</span>
          </div>
          <span className="text-[10px] uppercase text-gray-500 font-bold">{language}</span>
        </div>
      )}

      <div
        className={cn(
          'flex items-center justify-between gap-3',
          compact ? 'p-3' : 'p-4'
        )}
      >
        <div className="flex items-center gap-2 overflow-x-auto pr-2 scrollbar-none select-all">
          {showPrompt && (
            <span className="text-gray-500 select-none font-bold shrink-0">$</span>
          )}
          <code className="whitespace-pre">{code}</code>
        </div>

        <button
          onClick={() => copy(code)}
          aria-label={copied ? 'Copied command' : 'Copy command to clipboard'}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
          className={cn(
            'p-2 rounded-lg transition-all duration-200 cursor-pointer shrink-0 border select-none',
            copied
              ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-300 shadow-sm'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
          )}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400 animate-in fade-in zoom-in" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
