'use client';

import React from 'react';
import { ARCHITECTURE_LAYERS } from '@/data/dictionary';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, Badge, Container, SectionHeading } from '@/components/ui';

export function ArchitectureTopology() {
  const { t, isAr } = useLanguage();

  return (
    <section id="architecture" className="py-12 sm:py-16 bg-space-900/30 border-y border-white/[0.06] relative z-10 scroll-mt-20">
      <Container size="lg">
        <SectionHeading
          badge={t.architecture.badge}
          title={t.architecture.heading}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {ARCHITECTURE_LAYERS.map((layer, idx) => (
            <Card
              key={idx}
              variant="glass"
              className={`p-4 sm:p-5 border-l-4 ${layer.borderColor} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {layer.layerNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${layer.badgeColor}`}
                  >
                    {layer.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                  {isAr ? layer.titleAr : layer.titleEn}
                </h3>

                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  {isAr ? layer.descAr : layer.descEn}
                </p>
              </div>

              <div
                className="bg-space-950 p-2.5 rounded-lg text-xs font-mono text-gray-300 border border-white/5 flex items-center justify-between"
                dir="ltr"
              >
                <span className={layer.isPrivate ? 'text-emerald-300 font-semibold' : 'text-gray-300'}>
                  {layer.repo}
                </span>
                <span className="text-[10px] text-gray-500 font-bold">
                  {layer.isPrivate ? 'ENTERPRISE' : 'OPEN'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
