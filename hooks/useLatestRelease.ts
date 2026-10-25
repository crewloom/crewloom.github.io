'use client';

import { useState, useEffect } from 'react';
import {
  LatestReleaseData,
  ReleaseAsset,
  FALLBACK_RELEASE,
  formatBytes,
  detectAssetPlatform,
  getDesktopAgentVersion,
} from '@/lib/github-releases';
import { PlatformKey } from '@/hooks/useDeviceOS';

export function useLatestRelease() {
  const [release, setRelease] = useState<LatestReleaseData>(FALLBACK_RELEASE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRelease() {
      try {
        // 1. Fetch from internal Next.js Edge cached API endpoint (which reads from GitHub API)
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
        // 2. Direct client-side fetch from GitHub releases API
        const ghRes = await fetch('https://api.github.com/repos/crewloom/crewloom.github.io/releases', {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });

        if (ghRes.ok) {
          const releases = await ghRes.json();
          if (Array.isArray(releases) && releases.length > 0) {
            const agentReleases = releases.filter((r) => {
              const title = (r.name || '').toLowerCase();
              if (title.includes('website') && !title.includes('desktop') && !title.includes('agent')) return false;
              return Array.isArray(r.assets) && r.assets.length > 0;
            });

            const currentAgent = getDesktopAgentVersion();
            const exactMatch = agentReleases.find((r) => {
              const tagClean = (r.tag_name || '').replace(/^(crewloom-)?v?/, '');
              return tagClean === currentAgent.version;
            });

            const selected = exactMatch || agentReleases[0];
            if (selected) {
              const rawAssets = Array.isArray(selected.assets) ? selected.assets : [];
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

              const rawTagName = selected.tag_name || currentAgent.tagName;
              const cleanVersion = rawTagName.replace(/^(crewloom-)?v?/, '');
              const tagName = `v${cleanVersion}`;

              if (isMounted) {
                setRelease({
                  tagName,
                  version: cleanVersion,
                  name: selected.name || `Crewloom Desktop Agent ${tagName}`,
                  publishedAt: selected.published_at || new Date().toISOString(),
                  htmlUrl: selected.html_url || `https://github.com/crewloom/crewloom.github.io/releases/tag/${rawTagName}`,
                  body: selected.body || '',
                  repoUrl: 'https://github.com/crewloom/agent',
                  sourceUrl: 'https://github.com/crewloom/agent',
                  tarballUrl: selected.tarball_url || `https://github.com/crewloom/agent/archive/refs/tags/${rawTagName}.tar.gz`,
                  zipballUrl: selected.zipball_url || `https://github.com/crewloom/agent/archive/refs/tags/${rawTagName}.zip`,
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

  const macFileSize = release.primaryMacAsset?.sizeFormatted || '5.0 MB';
  const macDownloadUrl = release.primaryMacAsset?.downloadUrl || '/Crewloom.dmg';
  const versionTag = release.tagName;

  return {
    release,
    isLoading,
    versionTag,
    version: release.version,
    releaseName: release.name,
    publishedAt: release.publishedAt,
    releaseUrl: release.htmlUrl,
    releaseNotes: release.body,
    agentRepoUrl: release.repoUrl || 'https://github.com/crewloom/agent',
    sourceUrl: release.sourceUrl || 'https://github.com/crewloom/agent',
    tarballUrl: release.tarballUrl,
    zipballUrl: release.zipballUrl,
    macFileSize,
    macDownloadUrl,
    getAssetForPlatform,
  };
}
