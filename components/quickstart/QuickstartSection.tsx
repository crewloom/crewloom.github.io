import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface QuickstartSectionProps {
  lang: Lang;
}

export function QuickstartSection({ lang }: QuickstartSectionProps) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const t = DICTIONARY[lang];

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const curlCmd = 'curl -fsSL https://crewloom.org/install.sh | bash';
  const studioCmd = 'crewloom studio --open';

  return (
    <section id="install" className="py-24 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
          {t.quickstart.badge}
        </h2>
        <p className="text-3xl font-extrabold text-white">{t.quickstart.heading}</p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
        {/* Step 1 */}
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
            {t.quickstart.step1Label}
          </label>
          <div
            className="bg-space-950 p-4 rounded-xl border border-white/5 flex items-center justify-between font-mono text-sm text-cyan-300"
            dir="ltr"
          >
            <code className="text-xs sm:text-sm overflow-x-auto pr-2">{curlCmd}</code>
            <button
              onClick={() => copyToClipboard(curlCmd)}
              className="text-gray-400 hover:text-white transition cursor-pointer p-1"
              title="Copy Command"
              aria-label="Copy Universal Install Command"
            >
              {copiedCmd === curlCmd ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
            {t.quickstart.step2Label}
          </label>
          <div
            className="bg-space-950 p-4 rounded-xl border border-white/5 flex items-center justify-between font-mono text-sm text-cyan-300"
            dir="ltr"
          >
            <code className="text-xs sm:text-sm overflow-x-auto pr-2">{studioCmd}</code>
            <button
              onClick={() => copyToClipboard(studioCmd)}
              className="text-gray-400 hover:text-white transition cursor-pointer p-1"
              title="Copy Command"
              aria-label="Copy Studio Command"
            >
              {copiedCmd === studioCmd ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
            {t.quickstart.step3Label}
          </label>
          <p className="text-xs text-gray-400 mb-3">{t.quickstart.step3Desc}</p>
          <div
            className="bg-space-950 p-4 rounded-xl border border-white/5 flex items-center justify-between font-mono text-xs text-emerald-300"
            dir="ltr"
          >
            <code>/Applications/Crewloom Agent.app</code>
          </div>
        </div>
      </div>
    </section>
  );
}
