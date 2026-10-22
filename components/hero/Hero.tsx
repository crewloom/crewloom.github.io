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
    <section className="relative pt-12 sm:pt-16 pb-20 sm:pb-24 overflow-hidden">
      <Container size="lg" className="text-center relative z-10">
        {/* Architecture Badge */}
        <div className="mb-8 flex justify-center">
          <Badge
            variant="cyan"
            icon={
              <Sparkles
                className="w-3.5 h-3.5 text-cyan-400 animate-spin"
                style={{ animationDuration: '12s' }}
              />
            }
            className="px-4 py-1.5 text-xs font-semibold"
          >
            {t.hero.badge}
          </Badge>
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
        <MagneticInstallDock />

        {/* Interactive Terminal Demo */}
        <InteractiveTerminal />
      </Container>
    </section>
  );
}
