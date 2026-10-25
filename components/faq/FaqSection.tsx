'use client';

import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, SectionHeading } from '@/components/ui';

export function FaqSection() {
  const { t } = useLanguage();
  const faqData = t.faq;

  return (
    <section id="faq" className="py-12 sm:py-16 relative border-t border-white/[0.06] bg-space-950/60 scroll-mt-20" aria-label="Frequently Asked Questions">
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

        <div className="max-w-2xl mx-auto space-y-3">
          {faqData.items.map((item, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] open:border-cyan-500/40 open:bg-white/[0.04] open:shadow-lg open:shadow-cyan-500/5 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              <summary className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between cursor-pointer list-none select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50">
                <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2.5 text-start">
                  <span className="w-5 h-5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center text-[11px] font-mono shrink-0">
                    0{idx + 1}
                  </span>
                  {item.q}
                </span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-white/[0.08] bg-white/[0.04] text-gray-400 group-open:rotate-180 group-open:bg-cyan-500/20 group-open:border-cyan-500/40 group-open:text-cyan-300 transition-transform duration-300">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </summary>

              <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-300/90 leading-relaxed border-t border-white/[0.04]">
                <p className="font-normal">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
