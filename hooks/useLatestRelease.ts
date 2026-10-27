'use client';

import { useState, useEffect } from 'react';
import {
  LatestReleaseData,
  ReleaseAsset,
  FALLBACK_RELEASE,
  getDesktopAgentVersion,
} from '@/lib/github-releases';
import { parseReleaseAssets, selectReleaseAsset } from '@/lib/release-assets';
import { useDeviceOS, type PlatformKey } from '@/hooks/useDeviceOS';

export function useLatestRelease() {
  const { detectedPlatform } = useDeviceOS();
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
              const parsedAssets = parseReleaseAssets(rawAssets, FALLBACK_RELEASE.assets);

              const primaryMac = selectReleaseAsset(parsedAssets, 'macos-arm64');
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
                  repoUrl: 'https://github.com/crewloom/crewloom',
                  sourceUrl: 'https://github.com/crewloom/crewloom',
                  tarballUrl: selected.tarball_url || `https://github.com/crewloom/crewloom.github.io/archive/refs/tags/${rawTagName}.tar.gz`,
                  zipballUrl: selected.zipball_url || `https://github.com/crewloom/crewloom.github.io/archive/refs/tags/${rawTagName}.zip`,
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

  const getAssetForPlatform = (platform: PlatformKey): ReleaseAsset | undefined => selectReleaseAsset(release.assets, platform);

  const macAsset = detectedPlatform === 'macos-arm64' || detectedPlatform === 'macos-x64'
    ? selectReleaseAsset(release.assets, detectedPlatform) : undefined;
  const macFileSize = macAsset?.sizeFormatted || '';
  const macDownloadUrl = macAsset?.downloadUrl || '#install';
  const macDownloadAvailable = Boolean(macAsset);
  const macFileName = macAsset?.name;
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
    agentRepoUrl: release.repoUrl || 'https://github.com/crewloom/crewloom',
    sourceUrl: release.sourceUrl || 'https://github.com/crewloom/crewloom',
    tarballUrl: release.tarballUrl,
    zipballUrl: release.zipballUrl,
    macFileSize,
    macDownloadUrl,
    macDownloadAvailable,
    macFileName,
    getAssetForPlatform,
  };
}
