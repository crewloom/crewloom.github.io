import React from 'react';
import { ShieldAlert, Globe, Radio } from 'lucide-react';
import { Lang } from '@/types';
import { DICTIONARY, FEATURES } from '@/data/dictionary';

interface FeaturesGridProps {
  lang: Lang;
}

export function FeaturesGrid({ lang }: FeaturesGridProps) {
  const t = DICTIONARY[lang];
  const isAr = lang === 'ar';

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
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
          {t.features.badge}
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-white">
          {t.features.heading}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => {
          const colors = colorStyles[feature.colorScheme];
          return (
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 rounded-2xl border border-white/[0.08]"
            >
              <div
                className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} mb-6`}
              >
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isAr ? feature.titleAr : feature.titleEn}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isAr ? feature.descAr : feature.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
