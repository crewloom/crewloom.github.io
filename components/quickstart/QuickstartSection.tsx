'use client';

import React from 'react';
import { Download, Apple } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { Card, Container, SectionHeading, CodeSnippet, Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export function QuickstartSection() {
  const { t, isAr } = useLanguage();
  const { versionTag, macFileSize, macDownloadUrl } = useLatestRelease();

  const curlCmd = SITE_CONFIG.installCommand;
  const studioCmd = 'crewloom studio --open';
  const rolesCmd = 'crewloom roles list';

  return (
    <section id="quickstart" className="py-12 sm:py-16 relative z-10 scroll-mt-20">
      <Container size="md">
        <SectionHeading
          badge={t.quickstart.badge}
          title={t.quickstart.heading}
          align="center"
        />

        <Card variant="glass" className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Native Desktop Download Banner */}
          <div className="bg-gradient-to-r from-cyan-950/70 to-space-900 border border-cyan-800/60 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-700/80 flex items-center justify-center text-cyan-400 shrink-0">
                <Apple className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>{isAr ? `تطبيق الماك المكتبي (${versionTag})` : `macOS Desktop Studio (${versionTag})`}</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  {isAr ? `حزمة أصلية جاهزة للعمل فوراً بحجم ${macFileSize}` : `Native ${macFileSize} bundle ready for immediate local execution`}
                </p>
              </div>
            </div>
            <a href={macDownloadUrl} download="Crewloom.dmg" className="w-full sm:w-auto shrink-0">
              <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />} className="w-full sm:w-auto text-xs font-bold py-2">
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
