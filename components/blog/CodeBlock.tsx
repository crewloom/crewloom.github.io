'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative group my-6 rounded-xl border border-white/10 bg-space-950 p-4 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner" dir="ltr">
      <div className="flex items-center justify-between mb-2">
        {language ? (
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold select-none">
            {language}
          </span>
        ) : <span />}
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-sans">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="m-0 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
