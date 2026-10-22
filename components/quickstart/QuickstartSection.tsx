'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, Container, SectionHeading, CodeSnippet } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export function QuickstartSection() {
  const { t } = useLanguage();

  const curlCmd = SITE_CONFIG.installCommand;
  const studioCmd = 'crewloom studio --open';
  const rolesCmd = 'crewloom roles list';

  return (
    <section id="install" className="py-24 relative z-10">
      <Container size="md">
        <SectionHeading
          badge={t.quickstart.badge}
          title={t.quickstart.heading}
          align="center"
        />

        <Card variant="glass" className="p-6 sm:p-8 space-y-6">
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
