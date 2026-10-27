'use client';

import React, { useState } from 'react';
import { Apple, Download, Terminal, Check, Laptop, Monitor, Sparkles, ExternalLink, Box } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useClipboard } from '@/hooks/useClipboard';
import { useDeviceOS, PlatformKey } from '@/hooks/useDeviceOS';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { Button, Badge } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function MagneticInstallDock() {
  const { isClient, detectedPlatform, currentDevice, getPlatformDetails } = useDeviceOS();
  const { release, versionTag, macFileSize, macDownloadUrl } = useLatestRelease();
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>('macos-arm64');
  const { t } = useLanguage();
  const { isCopied, copy } = useClipboard({ timeout: 2500 });

  // Update selected platform when device is detected on client
  React.useEffect(() => {
    if (isClient && detectedPlatform) {
      setSelectedPlatform(detectedPlatform);
    }
  }, [isClient, detectedPlatform]);

  const activeInfo = getPlatformDetails(selectedPlatform);
  const curlCmd = SITE_CONFIG.installCommand;
  const psCmd = SITE_CONFIG.powershellCommand;
  const isCopiedCmd = isCopied(curlCmd);
  const isCopiedPs = isCopied(psCmd);

  const platforms: { key: PlatformKey; icon: React.ReactNode; isHot?: boolean }[] = [
    { key: 'macos-arm64', icon: <Apple className="w-3.5 h-3.5" />, isHot: true },
    { key: 'macos-x64', icon: <Apple className="w-3.5 h-3.5" /> },
    { key: 'windows', icon: <Monitor className="w-3.5 h-3.5" /> },
    { key: 'linux', icon: <Laptop className="w-3.5 h-3.5" /> },
    { key: 'curl', icon: <Terminal className="w-3.5 h-3.5" /> },
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
                    {t.install.recommendedForSystem}
                  </span>
                  <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                    {currentDevice.archNameEn}
                  </Badge>
                  <Badge variant="emerald" className="text-[10px] py-0 px-1.5 font-mono font-bold">
                    {versionTag}
                  </Badge>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white font-mono">
                  {t.platforms[currentDevice.platformKey]?.fullName || currentDevice.fullNameEn}
                </h3>
              </div>
            </div>

            {/* Quick 1-Click Recommended Action */}
            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
              {currentDevice.platformKey === 'windows' ? (
                <a
                  href={currentDevice.downloadUrl || SITE_CONFIG.windowsDownloadUrl}
                  download={currentDevice.fileName}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                    className="w-full sm:w-auto font-bold text-xs shadow-lg shadow-cyan-500/25 px-4 py-2"
                  >
                    {`${t.install.downloadWindows} (${currentDevice.fileSize || '12.4 MB'})`}
                  </Button>
                </a>
              ) : currentDevice.isDirectDownload ? (
                <a
                  href={macDownloadUrl}
                  download="Crewloom.dmg"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                    className="w-full sm:w-auto font-bold text-xs shadow-lg shadow-cyan-500/25 px-4 py-2"
                  >
                    {`${t.install.downloadNow} (${macFileSize})`}
                  </Button>
                </a>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedPlatform(currentDevice.platformKey)}
                  className="w-full sm:w-auto font-bold text-xs px-4 py-2"
                >
                  {t.install.viewInstructions}
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
              {t.install.allPlatforms}
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
                  <span>{t.platforms[p.key]?.label || p.key}</span>
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
                      {t.platforms[activeInfo.platformKey]?.fullName || activeInfo.fullNameEn}
                    </h4>
                    <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                      {`${t.install.officialRelease} ${versionTag}`}
                    </Badge>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                    {t.platforms[activeInfo.platformKey]?.compatibilityNote || activeInfo.compatibilityNoteEn}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-[11px] font-mono text-gray-500 mt-1.5">
                    <span>Format: <strong className="text-gray-300">Apple Disk Image (.dmg)</strong></span>
                    <span>•</span>
                    <span>Size: <strong className="text-cyan-400">{macFileSize}</strong></span>
                    <span>•</span>
                    <span>Target: <strong className="text-gray-300">macOS 11.0+</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                <a
                  href={macDownloadUrl}
                  download="Crewloom.dmg"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                    className="w-full sm:w-auto whitespace-nowrap text-xs font-bold px-4 py-2"
                  >
                    {t.install.downloadMac}
                  </Button>
                </a>
                <a
                  href={release.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-[11px] text-gray-400 hover:text-cyan-300 font-mono underline text-center flex items-center justify-center gap-1"
                >
                  <span>GitHub Release</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : activeInfo.platformKey === 'windows' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white font-mono">
                        {t.platforms[activeInfo.platformKey]?.fullName || activeInfo.fullNameEn}
                      </h4>
                      <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                        {`${t.install.officialRelease} ${versionTag}`}
                      </Badge>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                      {t.platforms[activeInfo.platformKey]?.compatibilityNote || activeInfo.compatibilityNoteEn}
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-[11px] font-mono text-gray-500 mt-1.5">
                      <span><strong className="text-gray-300">{t.install.windowsInstaller}</strong></span>
                      <span>•</span>
                      <span>Size: <strong className="text-cyan-400">{activeInfo.fileSize || '12.4 MB'}</strong></span>
                      <span>•</span>
                      <span><strong className="text-gray-300">{t.install.windowsTargetDetails}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
                  <a
                    href={activeInfo.downloadUrl || SITE_CONFIG.windowsDownloadUrl}
                    download={activeInfo.fileName || 'Crewloom-Agent-Setup.exe'}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                      className="w-full sm:w-auto whitespace-nowrap text-xs font-bold px-4 py-2"
                    >
                      {t.install.downloadWindows}
                    </Button>
                  </a>
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] text-gray-400 hover:text-cyan-300 font-mono underline text-center flex items-center justify-center gap-1"
                  >
                    <span>GitHub Release</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Native Windows PowerShell 1-liner */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.install.windowsPowershellPrompt}</span>
                </div>
                <div className="relative group bg-space-900 p-2.5 sm:p-3 rounded-lg border border-cyan-500/30 flex items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto code-scroll font-mono text-xs sm:text-sm text-cyan-300 select-all">
                    <span className="text-gray-500 select-none font-bold">PS&gt;</span>
                    <code>{psCmd}</code>
                  </div>
                  <Button
                    variant={isCopiedPs ? 'cyber' : 'primary'}
                    size="xs"
                    onClick={() => copy(psCmd)}
                    leftIcon={isCopiedPs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
                    className="font-mono text-xs shrink-0"
                  >
                    {isCopiedPs ? t.install.copied : t.install.copy}
                  </Button>
                </div>
              </div>

              {/* WSL2 Option */}
              <div className="p-2.5 sm:p-3 rounded-lg bg-space-900/60 border border-white/5 text-xs text-gray-400 font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>{t.install.wslPrompt}</span>
                <code className="text-cyan-300/90 text-[11px]">{curlCmd}</code>
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
                      {t.platforms[activeInfo.platformKey]?.fullName || activeInfo.fullNameEn}
                    </h4>
                    <Badge variant="cyan" className="text-[10px] py-0 px-1.5 font-mono">
                      CLI Live
                    </Badge>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                    {t.platforms[activeInfo.platformKey]?.compatibilityNote || activeInfo.compatibilityNoteEn}
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
                  size="xs"
                  onClick={() => copy(curlCmd)}
                  leftIcon={isCopiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
                  className="font-mono text-xs shrink-0"
                >
                  {isCopiedCmd ? t.install.copied : t.install.copy}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative group bg-space-950 p-3 rounded-lg border border-cyan-500/30 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto code-scroll font-mono text-xs sm:text-sm text-cyan-300 select-all">
                  <span className="text-gray-500 select-none font-bold">$</span>
                  <code>{curlCmd}</code>
                </div>
                <Button
                  variant={isCopiedCmd ? 'cyber' : 'primary'}
                  size="xs"
                  onClick={() => copy(curlCmd)}
                  leftIcon={isCopiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
                  className="font-mono text-xs shrink-0"
                >
                  {isCopiedCmd ? t.install.copied : t.install.copy}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 4. DYNAMIC LIVE GITHUB RELEASE ASSETS & AGENT SOURCE PANEL */}
        {release.assets.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2 text-gray-400">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {t.install.officialGithubRelease}:
              </span>
              <a
                href={release.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-bold hover:underline inline-flex items-center gap-1"
                title="View Release on GitHub"
              >
                <span>{versionTag}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={SITE_CONFIG.agentRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-[11px] text-cyan-300 hover:text-white transition-colors shadow-sm"
                title="View Crewloom Agent Source Code on GitHub"
              >
                <GithubIcon className="w-3 h-3 text-cyan-400" />
                <span className="font-semibold">{t.install.agentSource}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              {release.assets.map((asset) => (
                <a
                  key={asset.id}
                  href={asset.downloadUrl}
                  download={asset.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 text-[11px] text-gray-300 hover:text-white transition-colors"
                  title={`Download ${asset.name} (${asset.sizeFormatted})`}
                >
                  <Download className="w-3 h-3 text-cyan-400" />
                  <span className="font-semibold">{asset.name}</span>
                  <span className="text-cyan-300">({asset.sizeFormatted})</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 5. REAL-TIME TECHNICAL SPECIFICATIONS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-gray-400 mt-3 px-1 gap-2 border-t border-white/[0.06] pt-2.5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {t.install.zeroTelemetry}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">
              {t.install.localInference}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">
              {t.install.astGuard}
            </span>
          </div>
          <span className="text-emerald-400 font-semibold">{t.hero.trustNote}</span>
        </div>

      </div>
    </div>
  );
}
