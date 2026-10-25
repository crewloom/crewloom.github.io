'use client';

import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

export type PlatformKey = 'macos-arm64' | 'macos-x64' | 'windows' | 'linux' | 'curl';

export interface DeviceInfo {
  platformKey: PlatformKey;
  osNameEn: string;
  osNameAr: string;
  archNameEn: string;
  archNameAr: string;
  fullNameEn: string;
  fullNameAr: string;
  isDirectDownload: boolean;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: string;
  statusBadgeEn: string;
  statusBadgeAr: string;
  isRecommendedForDevice: boolean;
  compatibilityNoteEn: string;
  compatibilityNoteAr: string;
}

export function useDeviceOS() {
  const [detectedPlatform, setDetectedPlatform] = useState<PlatformKey>('macos-arm64');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window === 'undefined' || !navigator) return;

    const ua = navigator.userAgent || '';
    const platform = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.platform || '';

    // Check Windows
    if (/Win/i.test(platform) || /Windows/i.test(ua)) {
      setDetectedPlatform('windows');
      return;
    }

    // Check Linux (excluding Android)
    if ((/Linux/i.test(platform) || /Linux/i.test(ua)) && !/Android/i.test(ua)) {
      setDetectedPlatform('linux');
      return;
    }

    // Check Mac
    if (/Mac/i.test(platform) || /Macintosh|MacIntel/i.test(ua)) {
      let isAppleSilicon = true; // Modern Macs are overwhelmingly Apple Silicon (M1-M5)

      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && 'getExtension' in gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
            if (/Intel/i.test(renderer)) {
              isAppleSilicon = false;
            } else if (/Apple/i.test(renderer)) {
              isAppleSilicon = true;
            }
          }
        }
      } catch {
        // Fallback: keep Apple Silicon
      }

      setDetectedPlatform(isAppleSilicon ? 'macos-arm64' : 'macos-x64');
      return;
    }

    // Default to macOS Apple Silicon
    setDetectedPlatform('macos-arm64');
  }, []);

  const getPlatformDetails = (key: PlatformKey): DeviceInfo => {
    switch (key) {
      case 'macos-arm64':
        return {
          platformKey: 'macos-arm64',
          osNameEn: 'macOS',
          osNameAr: 'ماك macOS',
          archNameEn: 'Apple Silicon (M1–M5)',
          archNameAr: 'معالجات أبل سيليكون (M1–M5)',
          fullNameEn: 'Crewloom Studio for macOS (Apple Silicon)',
          fullNameAr: 'تطبيق كرو لوم المكتبي لأجهزة الماك (Apple Silicon)',
          isDirectDownload: true,
          downloadUrl: SITE_CONFIG.macosDownloadUrl,
          fileName: 'Crewloom.dmg',
          fileSize: '5.2 MB',
          statusBadgeEn: 'Beta v0.3.0 · Ready to Download',
          statusBadgeAr: 'النسخة التجريبية v0.3.0 · جاهزة للتحميل',
          isRecommendedForDevice: detectedPlatform === 'macos-arm64',
          compatibilityNoteEn: 'Universal ARM64 package natively optimized for Apple Silicon (M1 through M5).',
          compatibilityNoteAr: 'حزمة أصلية مخصصة لمعالجات Apple Silicon وتعمل بكفاءة تامة على شرائح M1 حتى M5.',
        };

      case 'macos-x64':
        return {
          platformKey: 'macos-x64',
          osNameEn: 'macOS',
          osNameAr: 'ماك macOS',
          archNameEn: 'Intel (x86_64)',
          archNameAr: 'معالجات إنتل (x86_64)',
          fullNameEn: 'Crewloom Studio for macOS (Intel)',
          fullNameAr: 'تطبيق كرو لوم لأجهزة الماك (معالجات إنتل)',
          isDirectDownload: true,
          downloadUrl: SITE_CONFIG.macosDownloadUrl,
          fileName: 'Crewloom.dmg',
          fileSize: '5.2 MB',
          statusBadgeEn: 'Compatible via Rosetta 2 & Native CI',
          statusBadgeAr: 'متوافق عبر Rosetta 2 وقيد التجهيز المباشر',
          isRecommendedForDevice: detectedPlatform === 'macos-x64',
          compatibilityNoteEn: 'Can run immediately via macOS Rosetta 2 emulation while native x86_64 binaries compile in CI.',
          compatibilityNoteAr: 'يمكن تشغيله فوراً عبر بيئة Rosetta 2 في الماك لحين اكتمال تجميع حزم x86_64 الأصلية.',
        };

      case 'windows':
        return {
          platformKey: 'windows',
          osNameEn: 'Windows',
          osNameAr: 'ويندوز Windows',
          archNameEn: '64-bit (x64 / ARM)',
          archNameAr: 'نواة 64-بت (x64 / ARM)',
          fullNameEn: 'Crewloom Studio for Windows 10/11',
          fullNameAr: 'تطبيق كرو لوم لويندوز 10/11',
          isDirectDownload: false,
          downloadUrl: SITE_CONFIG.macosGithubUrl,
          fileSize: 'Coming Soon',
          statusBadgeEn: 'Beta 2 Target · Pipeline Active',
          statusBadgeAr: 'مستهدف في بيتا 2 · قيد التجهيز',
          isRecommendedForDevice: detectedPlatform === 'windows',
          compatibilityNoteEn: 'Windows NSIS installer is preparing for release. You can use WSL2 or CLI preview today.',
          compatibilityNoteAr: 'حزمة ويندوز التثبيتية قيد التجهيز عبر CI. يمكنك استخدام بيئة WSL2 أو الطرفية حالياً.',
        };

      case 'linux':
        return {
          platformKey: 'linux',
          osNameEn: 'Linux',
          osNameAr: 'لينكس Linux',
          archNameEn: 'x86_64 / aarch64',
          archNameAr: 'نواة x86_64 و aarch64',
          fullNameEn: 'Crewloom Linux Runtime (.deb / CLI)',
          fullNameAr: 'بيئة تشغيل كرو لوم لنظام لينكس',
          isDirectDownload: false,
          downloadUrl: SITE_CONFIG.macosGithubUrl,
          fileSize: 'CLI Available',
          statusBadgeEn: 'CLI Available · GUI in Pipeline',
          statusBadgeAr: 'الطرفية متاحة · الواجهة قيد البناء',
          isRecommendedForDevice: detectedPlatform === 'linux',
          compatibilityNoteEn: 'Run the one-line terminal installer or pull the container image for Linux servers and workstations.',
          compatibilityNoteAr: 'ثبّت بيئة التشغيل عبر سطر الأوامر الفوري أو عبر حاويات Docker للعمل على خوادم لينكس.',
        };

      case 'curl':
      default:
        return {
          platformKey: 'curl',
          osNameEn: 'Universal CLI',
          osNameAr: 'الطرفية العامة',
          archNameEn: 'macOS & Linux Terminal',
          archNameAr: 'طرفية الماك ولينكس',
          fullNameEn: 'Crewloom Sovereign Developer CLI',
          fullNameAr: 'أداة الطرفية للمطورين Crewloom CLI',
          isDirectDownload: false,
          statusBadgeEn: 'Developer Preview',
          statusBadgeAr: 'معاينة المطورين',
          isRecommendedForDevice: false,
          compatibilityNoteEn: 'Lightweight daemon runtime with local sockets and remote chat bridge capabilities.',
          compatibilityNoteAr: 'خادم خفيف يعمل في الخلفية ويوفر وصولاً سريعاً للمحرك والجسور التفاعلية.',
        };
    }
  };

  const currentDevice = getPlatformDetails(detectedPlatform);

  return {
    isClient,
    detectedPlatform,
    currentDevice,
    getPlatformDetails,
  };
}
