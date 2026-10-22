'use client';

import React from 'react';
import { METRICS } from '@/data/dictionary';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui';

export function MetricsGrid() {
  const { isAr } = useLanguage();

  return (
    <section className="py-12 border-y border-white/[0.08] bg-space-900/40 relative z-10 select-none">
      <Container size="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-1 group">
              <div
                className={`text-3xl sm:text-4xl md:text-5xl font-black font-mono transition-transform duration-300 group-hover:scale-105 ${metric.colorClass}`}
              >
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">
                {isAr ? metric.labelAr : metric.labelEn}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
