'use client';

import { useState, useEffect } from 'react';
import { LatestReleaseData, ReleaseAsset, FALLBACK_RELEASE, formatBytes, detectAssetPlatform } from '@/lib/github-releases';
import { PlatformKey } from '@/hooks/useDeviceOS';

export function useLatestRelease() {
  const [release, setRelease] = useState<LatestReleaseData>(FALLBACK_RELEASE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRelease() {
      try {
        // First try the internal API route (cached on edge)
        const res = await fetch('/api/releases/latest/');
        if (res.ok) {
          const data: LatestReleaseData = await res.json();
          if (isMounted && data && data.tagName) {
            setRelease(data);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to direct client-side fetch from GitHub
      }

      try {
        const ghRes = await fetch('https://api.github.com/repos/crewloom/crewloom.github.io/releases/latest');
        if (ghRes.ok) {
          const data = await ghRes.json();
          const rawAssets = Array.isArray(data.assets) ? data.assets : [];
          const parsedAssets: ReleaseAsset[] = rawAssets.map((a: { id: number; name: string; size: number; browser_download_url: string; content_type: string }) => ({
            id: a.id,
            name: a.name,
            size: a.size,
            sizeFormatted: formatBytes(a.size),
            downloadUrl: a.browser_download_url,
            contentType: a.content_type,
            platform: detectAssetPlatform(a.name),
            isInstaller: a.name.endsWith('.dmg') || a.name.endsWith('.exe') || a.name.endsWith('.msi') || a.name.endsWith('.deb'),
          }));

          const primaryMac = parsedAssets.find((a) => a.platform === 'macos-arm64' || a.name.endsWith('.dmg')) || parsedAssets[0];
          const primaryWin = parsedAssets.find((a) => a.platform === 'windows');
          const primaryLinux = parsedAssets.find((a) => a.platform === 'linux');
          const tagName = data.tag_name || 'v1.0.2';

          if (isMounted) {
            setRelease({
              tagName,
              version: tagName.replace(/^v/, ''),
              name: data.name || `Crewloom Desktop ${tagName}`,
              publishedAt: data.published_at || new Date().toISOString(),
              htmlUrl: data.html_url || 'https://github.com/crewloom/crewloom.github.io/releases/latest',
              body: data.body || '',
              assets: parsedAssets,
              primaryMacAsset: primaryMac,
              primaryWindowsAsset: primaryWin,
              primaryLinuxAsset: primaryLinux,
              isLive: true,
            });
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fallback stays in place
      }

      if (isMounted) {
        setIsLoading(false);
      }
    }

    loadRelease();

    return () => {
      isMounted = false;
    };
  }, []);

  const getAssetForPlatform = (platform: PlatformKey): ReleaseAsset | undefined => {
    if (platform === 'macos-arm64' || platform === 'macos-x64') {
      return release.primaryMacAsset;
    }
    if (platform === 'windows') {
      return release.primaryWindowsAsset;
    }
    if (platform === 'linux') {
      return release.primaryLinuxAsset;
    }
    return undefined;
  };

  const macFileSize = release.primaryMacAsset?.sizeFormatted || '5.2 MB';
  const macDownloadUrl = release.primaryMacAsset?.downloadUrl || '/Crewloom.dmg';
  const versionTag = release.tagName || 'v1.0.2';

  return {
    release,
    isLoading,
    versionTag,
    macFileSize,
    macDownloadUrl,
    getAssetForPlatform,
  };
}
