'use client';

import React from 'react';
import { METRICS } from '@/data/dictionary';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui';

export function MetricsGrid() {
  const { isAr } = useLanguage();

  return (
    <section id="metrics" className="py-8 sm:py-10 border-b border-white/[0.06] bg-space-900/20 relative z-10 select-none">
      <Container size="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-1 group">
              <div
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono transition-transform duration-300 group-hover:scale-105 ${metric.colorClass}`}
              >
                {metric.value}
              </div>
              <div className="text-xs sm:text-[13px] text-gray-400 font-medium mt-1">
                {isAr ? metric.labelAr : metric.labelEn}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
