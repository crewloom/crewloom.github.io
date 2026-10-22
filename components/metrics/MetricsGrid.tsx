import React from 'react';
import { Lang } from '@/types';
import { METRICS } from '@/data/dictionary';

interface MetricsGridProps {
  lang: Lang;
}

export function MetricsGrid({ lang }: MetricsGridProps) {
  const isAr = lang === 'ar';

  return (
    <section className="py-12 border-y border-white/[0.08] bg-space-900/40 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="space-y-1">
            <div className={`text-3xl sm:text-4xl md:text-5xl font-black font-mono ${metric.colorClass}`}>
              {metric.value}
            </div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">
              {isAr ? metric.labelAr : metric.labelEn}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
