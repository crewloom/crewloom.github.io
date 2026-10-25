'use client';

import React, { useState } from 'react';
import { Apple, Download, Terminal, Check, Laptop, Monitor, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useClipboard } from '@/hooks/useClipboard';
import { useDeviceOS, PlatformKey } from '@/hooks/useDeviceOS';
import { Button, Badge } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export function MagneticInstallDock() {
  const { isClient, detectedPlatform, currentDevice, getPlatformDetails } = useDeviceOS();
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>('macos-arm64');
  const { t, isAr } = useLanguage();
  const { isCopied, copy } = useClipboard({ timeout: 2500 });

  // Update selected platform when device is detected on client
  React.useEffect(() => {
    if (isClient && detectedPlatform) {
      setSelectedPlatform(detectedPlatform);
    }
  }, [isClient, detectedPlatform]);

  const activeInfo = getPlatformDetails(selectedPlatform);
  const curlCmd = SITE_CONFIG.installCommand;
  const isCopiedCmd = isCopied(curlCmd);

  const platforms: { key: PlatformKey; labelEn: string; labelAr: string; icon: React.ReactNode; isHot?: boolean }[] = [
    { key: 'macos-arm64', labelEn: 'Mac (Apple Silicon)', labelAr: 'ماك (Apple Silicon)', icon: <Apple className="w-3.5 h-3.5" />, isHot: true },
    { key: 'macos-x64', labelEn: 'Mac (Intel)', labelAr: 'ماك (Intel)', icon: <Apple className="w-3.5 h-3.5" /> },
    { key: 'windows', labelEn: 'Windows', labelAr: 'ويندوز', icon: <Monitor className="w-3.5 h-3.5" /> },
    { key: 'linux', labelEn: 'Linux', labelAr: 'لينكس', icon: <Laptop className="w-3.5 h-3.5" /> },
    { key: 'curl', labelEn: 'Terminal (curl)', labelAr: 'الطرفية (curl)', icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  return (
    <div id="install" className="max-w-3xl mx-auto mb-10 sm:mb-12 beam-border shadow-2xl overflow-hidden scroll-mt-28">
      <div className="beam-content p-4 sm:p-6 text-left" dir="ltr">

        {/* 1. INTELLIGENT SYSTEM DETECTION & RECOMMENDATION BANNER */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-space-950 to-emerald-950/80 border border-cyan-500/40 rounded-xl p-3.5 sm:p-4 mb-4 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-600/80 flex items-center justify-center text-cyan-300 shadow-inner shrink-0">
                {currentDevice.osNameEn === 'macOS' ? (
                  <Apple className="w-5 h-5" />
                ) : currentDevice.osNameEn === 'Windows' ? (
                  <Monitor className="w-5 h-5" />
                ) : (
                  <Laptop className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    {isAr ? 'النسخة الموصى بها لجهازك' : 'Recommended for Your System'}
                  </span>
                  <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                    {currentDevice.archNameEn}
                  </Badge>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white font-mono">
                  {isAr ? currentDevice.fullNameAr : currentDevice.fullNameEn}
                </h3>
              </div>
            </div>

            {/* Quick 1-Click Recommended Action */}
            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
              {currentDevice.isDirectDownload ? (
                <a
                  href={currentDevice.downloadUrl}
                  download={currentDevice.fileName}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                    className="w-full sm:w-auto font-bold text-xs shadow-lg shadow-cyan-500/25 px-4 py-2"
                  >
                    {isAr ? 'تحميل فوري مباشر (5.2 MB)' : 'Download Now (5.2 MB)'}
                  </Button>
                </a>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedPlatform(currentDevice.platformKey)}
                  className="w-full sm:w-auto font-bold text-xs px-4 py-2"
                >
                  {isAr ? 'عرض تعليمات النظام' : 'View Instructions'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 2. PLATFORM SWITCHER TABS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-200 tracking-wider uppercase">
              {isAr ? 'اختر النظام أو المعمارية' : 'All Platforms & Architectures'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 bg-space-950 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {platforms.map((p) => {
              const active = selectedPlatform === p.key;
              const isRec = detectedPlatform === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setSelectedPlatform(p.key)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 text-[11px] sm:text-xs select-none ${
                    active
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/80 font-bold shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p.icon}
                  <span>{isAr ? p.labelAr : p.labelEn}</span>
                  {isRec && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Auto-detected system" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. PLATFORM-SPECIFIC CARD CONTENT */}
        <div className="bg-space-950 p-3.5 sm:p-5 rounded-xl border border-white/10">
          {activeInfo.platformKey === 'macos-arm64' || activeInfo.platformKey === 'macos-x64' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shadow-inner shrink-0 mt-0.5">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono">
                      {isAr ? activeInfo.fullNameAr : activeInfo.fullNameEn}
                    </h4>
                    <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                      {activeInfo.statusBadgeEn}
                    </Badge>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                    {isAr ? activeInfo.compatibilityNoteAr : activeInfo.compatibilityNoteEn}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-[11px] font-mono text-gray-500 mt-1.5">
                    <span>Format: <strong className="text-gray-300">Apple Disk Image (.dmg)</strong></span>
                    <span>•</span>
                    <span>Size: <strong className="text-cyan-400">5.2 MB</strong></span>
                    <span>•</span>
                    <span>Target: <strong className="text-gray-300">macOS 11.0+</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                <a
                  href={activeInfo.downloadUrl}
                  download={activeInfo.fileName}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                    className="w-full sm:w-auto whitespace-nowrap text-xs font-bold px-4 py-2"
                  >
                    {isAr ? 'تحميل تطبيق الماك' : 'Download for macOS'}
                  </Button>
                </a>
                <a
                  href={SITE_CONFIG.macosGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] text-gray-400 hover:text-cyan-300 font-mono underline text-center flex items-center justify-center gap-1"
                >
                  <span>GitHub Mirror</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : activeInfo.platformKey === 'windows' ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono">
                      {isAr ? activeInfo.fullNameAr : activeInfo.fullNameEn}
                    </h4>
                    <Badge variant="amber" className="text-[10px] py-0 px-1.5 font-mono">
                      {isAr ? 'قيد التجهيز التلقائي' : 'In CI Staging'}
                    </Badge>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                    {isAr ? activeInfo.compatibilityNoteAr : activeInfo.compatibilityNoteEn}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-space-900 border border-white/5 text-xs text-gray-300 font-mono flex items-center justify-between">
                <span>WSL2 / Linux Preview Command:</span>
                <code className="text-cyan-300">{curlCmd}</code>
              </div>
            </div>
          ) : activeInfo.platformKey === 'linux' ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono">
                      {isAr ? activeInfo.fullNameAr : activeInfo.fullNameEn}
                    </h4>
                    <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                      CLI Live
                    </Badge>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                    {isAr ? activeInfo.compatibilityNoteAr : activeInfo.compatibilityNoteEn}
                  </p>
                </div>
              </div>

              <div className="relative group bg-space-950 p-3 rounded-lg border border-cyan-500/30 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto code-scroll font-mono text-xs sm:text-sm text-cyan-300 select-all">
                  <span className="text-gray-500 select-none font-bold">$</span>
                  <code>{curlCmd}</code>
                </div>
                <Button
                  variant={isCopiedCmd ? 'cyber' : 'primary'}
                  size="sm"
                  onClick={() => copy(curlCmd)}
                  leftIcon={isCopiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
                  className="shrink-0 font-mono text-xs px-3 py-1.5"
                >
                  {isCopiedCmd ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative group bg-space-950 p-3.5 rounded-xl border border-cyan-500/30 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-x-auto code-scroll font-mono text-xs sm:text-sm text-cyan-300 select-all">
                  <span className="text-gray-500 select-none font-bold">$</span>
                  <code>{curlCmd}</code>
                </div>
                <Button
                  variant={isCopiedCmd ? 'cyber' : 'primary'}
                  size="sm"
                  onClick={() => copy(curlCmd)}
                  leftIcon={isCopiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
                  className="shrink-0 font-mono text-xs px-3 py-1.5"
                >
                  {isCopiedCmd ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 4. REAL-TIME TECHNICAL SPECIFICATIONS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-gray-400 mt-4 px-1 gap-2 border-t border-white/[0.06] pt-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {isAr ? 'صفر تسريب للبيانات (Zero Telemetry)' : 'Zero telemetry leaks'}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">
              {isAr ? 'معالجة محلية كاملة' : '100% Local Inference Supported'}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">
              {isAr ? 'تدقيق AST لمنع الهدم' : 'AST Non-Destructive Guard'}
            </span>
          </div>
          <span className="text-emerald-400 font-semibold">{t.hero.trustNote}</span>
        </div>

      </div>
    </div>
  );
}
