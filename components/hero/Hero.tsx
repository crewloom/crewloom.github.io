'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge, Container } from '@/components/ui';
import { MagneticInstallDock } from '@/components/install/MagneticInstallDock';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      <Container size="lg" className="text-center relative z-10">
        {/* Architecture Badge */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <Badge
            variant="cyan"
            icon={
              <Sparkles
                className="w-3.5 h-3.5 text-cyan-400 animate-spin"
                style={{ animationDuration: '12s' }}
              />
            }
            className="px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold"
          >
            {t.hero.badge}
          </Badge>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.22] lg:leading-[1.16] mb-5 sm:mb-6 max-w-4xl mx-auto">
          <span className="block mb-1 sm:mb-2">{t.hero.titleLine1}</span>
          <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-300/90 leading-relaxed mb-8 sm:mb-10 font-normal px-2">
          {t.hero.subtitle}
        </p>

        {/* HIGH-CONVERSION MAGNETIC INSTALL DOCK */}
        <MagneticInstallDock />

        {/* Interactive Terminal Demo */}
        <InteractiveTerminal />
      </Container>
    </section>
  );
}
