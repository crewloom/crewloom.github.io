'use client';

import React from 'react';
import { ShieldAlert, Globe, Radio } from 'lucide-react';
import { FEATURES } from '@/data/dictionary';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, Container, SectionHeading } from '@/components/ui';

export function FeaturesGrid() {
  const { t, isAr } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-6 h-6 stroke-[2]" />,
    Globe: <Globe className="w-6 h-6 stroke-[2]" />,
    Radio: <Radio className="w-6 h-6 stroke-[2]" />,
  };

  const colorStyles: Record<string, { bg: string; border: string; text: string }> = {
    cyan: {
      bg: 'bg-cyan-950/80',
      border: 'border-cyan-800/80',
      text: 'text-cyan-400',
    },
    emerald: {
      bg: 'bg-emerald-950/80',
      border: 'border-emerald-800/80',
      text: 'text-emerald-400',
    },
    teal: {
      bg: 'bg-teal-950/80',
      border: 'border-teal-800/80',
      text: 'text-teal-400',
    },
  };

  return (
    <section id="features" className="py-24 relative z-10">
      <Container size="lg">
        <SectionHeading
          badge={t.features.badge}
          title={t.features.heading}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const colors = colorStyles[feature.colorScheme];
            return (
              <Card
                key={idx}
                variant="interactive"
                className="p-8 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} mb-6 shadow-inner transition-transform group-hover:scale-110 duration-300`}
                  >
                    {iconMap[feature.icon]}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {isAr ? feature.titleAr : feature.titleEn}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed font-normal">
                    {isAr ? feature.descAr : feature.descEn}
                  </p>
                </div>

                <div
                  className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono font-semibold text-gray-500 flex items-center justify-between"
                  dir="ltr"
                >
                  <span className="text-cyan-400/80">CORE_ENGINE_0{idx + 1}</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
