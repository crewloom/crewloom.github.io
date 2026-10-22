import React, { useState } from 'react';
import { Zap, RotateCcw, Play, CheckCircle2, Download } from 'lucide-react';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';

interface BenchmarkSimulatorProps {
  lang: Lang;
}

export function BenchmarkSimulator({ lang }: BenchmarkSimulatorProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simStep, setSimStep] = useState(0);

  const t = DICTIONARY[lang];
  const isAr = lang === 'ar';

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
    <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-12 bg-space-900/50 border-y border-white/[0.08]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-mono font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.simulator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {t.simulator.heading}
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            {t.simulator.description}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-left" dir="ltr">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                {t.simulator.taskLabel}
              </span>
              <span className="text-sm text-white font-mono font-semibold">
                {t.simulator.taskDesc}
              </span>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-space-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:scale-100 shadow-lg shadow-cyan-500/20 cursor-pointer shrink-0"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>{t.simulator.buttonRunning}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.simulator.buttonRun}</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-space-950 h-3 rounded-full overflow-hidden border border-white/10 mb-6">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-100 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${simProgress}%` }}
            />
          </div>

          {/* Live Steps & Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div
              className={`p-4 rounded-xl border transition ${
                simStep >= 1
                  ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-300'
                  : 'bg-space-950 border-white/5 text-gray-500'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{t.simulator.step1Title}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {simStep >= 1 ? t.simulator.step1Desc : t.simulator.stepWaiting}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border transition ${
                simStep >= 2
                  ? 'bg-teal-950/40 border-teal-500/60 text-teal-300'
                  : 'bg-space-950 border-white/5 text-gray-500'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>{t.simulator.step2Title}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {simStep >= 2 ? t.simulator.step2Desc : t.simulator.stepWaiting}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border transition ${
                simStep >= 3
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                  : 'bg-space-950 border-white/5 text-gray-500'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t.simulator.step3Title}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {simStep >= 4
                  ? t.simulator.step3DescDone
                  : simStep >= 3
                  ? t.simulator.step3DescVerifying
                  : t.simulator.stepWaiting}
              </p>
            </div>
          </div>

          {/* Success Verdict Box */}
          {simStep === 4 && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3 text-left">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-200 font-sans font-semibold">
                  {t.simulator.successBanner}
                </span>
              </div>
              <a
                href="#install"
                className="px-5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-space-950 font-black text-xs flex items-center gap-1.5 shadow cursor-pointer transition shrink-0"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{t.simulator.downloadCta}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
