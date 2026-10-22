import React from 'react';
import { Sparkles } from 'lucide-react';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';
import { MagneticInstallDock } from '@/components/install/MagneticInstallDock';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';

interface HeroProps {
  lang: Lang;
}

export function Hero({ lang }: HeroProps) {
  const t = DICTIONARY[lang];
  const isAr = lang === 'ar';

  return (
    <section className="relative pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Architecture Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-8 backdrop-blur shadow-inner">
          <Sparkles
            className="w-3.5 h-3.5 text-cyan-400 animate-spin"
            style={{ animationDuration: '12s' }}
          />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6">
          <span className="block">{t.hero.titleLine1}</span>
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed mb-10 font-medium">
          {t.hero.subtitle}
        </p>

        {/* HIGH-CONVERSION MAGNETIC INSTALL DOCK */}
        <MagneticInstallDock lang={lang} />

        {/* Interactive Terminal Demo */}
        <InteractiveTerminal lang={lang} />
      </div>
    </section>
  );
}
