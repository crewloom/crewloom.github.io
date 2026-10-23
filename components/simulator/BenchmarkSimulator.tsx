'use client';

import React, { useState } from 'react';
import { Zap, RotateCcw, Play, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button, Card, Container, SectionHeading } from '@/components/ui';

export function BenchmarkSimulator() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simStep, setSimStep] = useState(0);

  const { t } = useLanguage();

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimProgress(0);
    setSimStep(1);

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setSimStep(4);
          return 100;
        }
        if (prev === 25) setSimStep(2);
        if (prev === 65) setSimStep(3);
        return prev + 5;
      });
    }, 60);
  };

  return (
    <section id="simulator" className="py-16 sm:py-20 bg-space-900/50 border-y border-white/[0.08]">
      <Container size="md">
        <SectionHeading
          badge={t.simulator.badge}
          badgeVariant="emerald"
          badgeIcon={<Zap className="w-3.5 h-3.5" />}
          title={t.simulator.heading}
          description={t.simulator.description}
          align="center"
        />

        <Card variant="glass" className="p-4 sm:p-6 md:p-8 border-cyan-500/30 text-left" dir="ltr">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="min-w-0 flex-1">
              <span className="text-[11px] sm:text-xs font-mono text-cyan-400 font-bold block mb-1">
                {t.simulator.taskLabel}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                &quot;Refactor monolith database layer into contract-verified queries with zero destructive diffs&quot;
              </p>
            </div>

            <Button
              variant={isSimulating ? 'outline' : 'glow'}
              size="sm"
              onClick={runSimulation}
              disabled={isSimulating}
              leftIcon={
                isSimulating ? (
                  <RotateCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )
              }
              className="w-full sm:w-auto shrink-0 text-xs font-bold"
            >
              {isSimulating ? t.simulator.buttonRunning : t.simulator.buttonRun}
            </Button>
          </div>

          {/* Dual Engine Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Autonomous Dual-Core Telemetry</span>
              <span className="text-cyan-400 font-bold">{simProgress}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-space-950 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 rounded-full transition-all duration-150"
                style={{ width: `${simProgress}%` }}
              />
            </div>
          </div>

          {/* Stepper Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs">
            <div
              className={`p-3 rounded-xl border transition ${
                simStep >= 1
                  ? 'bg-cyan-950/60 border-cyan-600 text-cyan-300'
                  : 'bg-space-950/40 border-white/5 text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">1. Contract Guard</span>
              </div>
              <p className="text-[11px] text-gray-400">Zero-Loss AST Policy Audit</p>
            </div>

            <div
              className={`p-3 rounded-xl border transition ${
                simStep >= 2
                  ? 'bg-teal-950/60 border-teal-600 text-teal-300'
                  : 'bg-space-950/40 border-white/5 text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">2. Local Inference</span>
              </div>
              <p className="text-[11px] text-gray-400">Offline Ollama Dual-Socket</p>
            </div>

            <div
              className={`p-3 rounded-xl border transition ${
                simStep >= 3
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                  : 'bg-space-950/40 border-white/5 text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">3. Zero Drift Commit</span>
              </div>
              <p className="text-[11px] text-gray-400">Additive Diff Certified (0.78ms)</p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
