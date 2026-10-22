import React from 'react';
import { Lang } from '@/types';
import { ARCHITECTURE_LAYERS, DICTIONARY } from '@/data/dictionary';

interface ArchitectureTopologyProps {
  lang: Lang;
}

export function ArchitectureTopology({ lang }: ArchitectureTopologyProps) {
  const t = DICTIONARY[lang];
  const isAr = lang === 'ar';

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-12 bg-space-900/30 border-y border-white/[0.08] relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
            {t.architecture.badge}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.architecture.heading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ARCHITECTURE_LAYERS.map((layer, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 rounded-2xl border-l-4 ${layer.borderColor} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {layer.layerNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${layer.badgeColor}`}
                  >
                    {layer.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {isAr ? layer.titleAr : layer.titleEn}
                </h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  {isAr ? layer.descAr : layer.descEn}
                </p>
              </div>

              <div
                className="bg-space-950 p-3 rounded-lg text-xs font-mono text-gray-300 border border-white/5 flex items-center justify-between"
                dir="ltr"
              >
                <span className={layer.isPrivate ? 'text-emerald-300 font-semibold' : 'text-gray-300'}>
                  {layer.repo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
