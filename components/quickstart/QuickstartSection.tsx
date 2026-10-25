'use client';

import React from 'react';
import { Download, Apple } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, Container, SectionHeading, CodeSnippet, Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export function QuickstartSection() {
  const { t, isAr } = useLanguage();

  const curlCmd = SITE_CONFIG.installCommand;
  const studioCmd = 'crewloom studio --open';
  const rolesCmd = 'crewloom roles list';

  return (
    <section id="quickstart" className="py-16 sm:py-24 relative z-10">
      <Container size="md">
        <SectionHeading
          badge={t.quickstart.badge}
          title={t.quickstart.heading}
          align="center"
        />

        <Card variant="glass" className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* Native Desktop Download Banner */}
          <div className="bg-gradient-to-r from-cyan-950/70 to-space-900 border border-cyan-800/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/80 flex items-center justify-center text-cyan-400 shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>{isAr ? 'تطبيق الماك المكتبي (Beta v0.3.0)' : 'macOS Desktop Studio (Beta v0.3.0)'}</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isAr ? 'حزمة أصلية جاهزة للعمل فوراً بحجم 5.2 ميجابايت' : 'Native 5.2 MB bundle ready for immediate local execution'}
                </p>
              </div>
            </div>
            <a href={SITE_CONFIG.macosDownloadUrl} download="Crewloom.dmg" className="w-full sm:w-auto shrink-0">
              <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />} className="w-full sm:w-auto text-xs font-bold">
                {isAr ? 'تحميل مباشر للماك' : 'Download for Mac'}
              </Button>
            </a>
          </div>
          {/* Step 1 */}
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
              {t.quickstart.step1Label}
            </label>
            <CodeSnippet
              code={curlCmd}
              title="Step 1: Install Engine"
              showPrompt
            />
          </div>

          {/* Step 2 */}
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
              {t.quickstart.step2Label}
            </label>
            <CodeSnippet
              code={studioCmd}
              title="Step 2: Launch Studio & Visual Dashboard"
              showPrompt
            />
          </div>

          {/* Step 3 */}
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
              Step 3: List & Activate 44 Autonomous Specialist Skills
            </label>
            <CodeSnippet
              code={rolesCmd}
              title="Step 3: Inspect Local Specialists"
              showPrompt
            />
          </div>
        </Card>
      </Container>
    </section>
  );
}
