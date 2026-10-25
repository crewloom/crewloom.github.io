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
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <Container size="lg" className="text-center relative z-10">
        {/* Architecture Badge */}
        <div className="mb-4 sm:mb-5 flex justify-center">
          <Badge
            variant="cyan"
            icon={
              <Sparkles
                className="w-3.5 h-3.5 text-cyan-400 animate-spin"
                style={{ animationDuration: '12s' }}
              />
            }
            className="px-3 py-1 text-[11px] sm:text-xs font-semibold"
          >
            {t.hero.badge}
          </Badge>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-3 sm:mb-4 max-w-3xl mx-auto">
          <span className="block mb-1 sm:mb-1.5">{t.hero.titleLine1}</span>
          <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-300/85 leading-relaxed mb-6 sm:mb-8 font-normal px-2">
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
