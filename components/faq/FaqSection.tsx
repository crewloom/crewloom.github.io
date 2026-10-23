'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, SectionHeading } from '@/components/ui';

export function FaqSection() {
  const { t, isAr } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqData = t.faq;

  return (
    <section id="faq" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-space-950/60">
      <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      <Container size="lg" className="relative z-10">
        <SectionHeading
          badge={faqData.badge}
          badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-cyan-400" />}
          badgeVariant="cyan"
          title={faqData.heading}
          description={faqData.subheading}
          align="center"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 backdrop-blur-sm overflow-hidden ${
                  isOpen
                    ? 'border-cyan-500/40 bg-white/[0.04] shadow-lg shadow-cyan-500/5'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.03]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 transition-colors select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center text-xs font-mono shrink-0">
                      0{idx + 1}
                    </span>
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border ${
                      isOpen
                        ? 'rotate-180 bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                        : 'bg-white/[0.04] border-white/[0.08] text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/[0.04]">
                    <p className="font-normal text-gray-300/90">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
