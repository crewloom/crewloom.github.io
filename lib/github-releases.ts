import { PlatformKey } from '@/hooks/useDeviceOS';
import desktopAgentMeta from './desktop-agent.json';

import { parseReleaseAssets, selectReleaseAsset } from './release-assets';
import type { ReleaseAsset } from './release-assets';
export { formatBytes, detectAssetPlatform } from './release-assets';
export type { ReleaseAsset } from './release-assets';

export interface LatestReleaseData {
  tagName: string;
  version: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  body?: string;
  repoUrl: string;
  sourceUrl: string;
  tarballUrl?: string;
  zipballUrl?: string;
  assets: ReleaseAsset[];
  primaryMacAsset?: ReleaseAsset;
  primaryWindowsAsset?: ReleaseAsset;
  primaryLinuxAsset?: ReleaseAsset;
  isLive: boolean;
}

/**
 * Resolves the desktop agent version from the pre-synced desktop-agent.json metadata.
 * (Synchronized automatically from agent/apps/crewloom-desktop/package.json via scripts/sync-desktop-agent.mjs)
 */
export function getDesktopAgentVersion() {
  const version = desktopAgentMeta.version || '0.3.5';
  const tagName = desktopAgentMeta.tagName || `v${version}`;
  return {
    version,
    tagName,
    name: desktopAgentMeta.name || `Crewloom Desktop Agent ${tagName}`,
    dmgSize: desktopAgentMeta.dmgSize || 5269425,
    dmgSizeFormatted: desktopAgentMeta.dmgSizeFormatted || '5.0 MB',
    downloadUrl: desktopAgentMeta.downloadUrl || `https://github.com/crewloom/crewloom.github.io/releases/download/${tagName}/Crewloom.dmg`,
    agentRepo: 'https://github.com/crewloom/crewloom',
  };
}

const currentAgent = getDesktopAgentVersion();

export const FALLBACK_RELEASE: LatestReleaseData = {
  tagName: currentAgent.tagName,
  version: currentAgent.version,
  name: currentAgent.name,
  publishedAt: desktopAgentMeta.syncedAt || new Date().toISOString(),
  htmlUrl: `https://github.com/crewloom/crewloom.github.io/releases/tag/${currentAgent.tagName}`,
  body: 'Official production bundle for macOS Apple Silicon with verified zero-destruction guarantees.',
  repoUrl: 'https://github.com/crewloom/crewloom',
  sourceUrl: 'https://github.com/crewloom/crewloom',
  tarballUrl: `https://github.com/crewloom/crewloom.github.io/archive/refs/tags/${currentAgent.tagName}.tar.gz`,
  zipballUrl: `https://github.com/crewloom/crewloom.github.io/archive/refs/tags/${currentAgent.tagName}.zip`,
  isLive: false,
  assets: [
    {
      id: 1,
      name: 'Crewloom.dmg',
      size: currentAgent.dmgSize,
      sizeFormatted: currentAgent.dmgSizeFormatted,
      downloadUrl: currentAgent.downloadUrl,
      contentType: 'application/x-apple-diskimage',
      platform: 'macos-arm64',
      isInstaller: true,
    },
    {
      id: 2,
      name: 'Crewloom-Agent-Setup.bat',
      size: 616,
      sizeFormatted: '1.0 KB',
      downloadUrl: `https://github.com/crewloom/crewloom.github.io/releases/download/${currentAgent.tagName}/Crewloom-Agent-Setup.bat`,
      contentType: 'application/x-bat',
      platform: 'windows',
      isInstaller: true,
    },
  ],
  primaryMacAsset: {
    id: 1,
    name: 'Crewloom.dmg',
    size: currentAgent.dmgSize,
    sizeFormatted: currentAgent.dmgSizeFormatted,
    downloadUrl: currentAgent.downloadUrl,
    contentType: 'application/x-apple-diskimage',
    platform: 'macos-arm64',
    isInstaller: true,
  },
  primaryWindowsAsset: {
    id: 2,
    name: 'Crewloom-Agent-Setup.bat',
    size: 616,
    sizeFormatted: '1.0 KB',
    downloadUrl: `https://github.com/crewloom/crewloom.github.io/releases/download/${currentAgent.tagName}/Crewloom-Agent-Setup.bat`,
    contentType: 'application/x-bat',
    platform: 'windows',
    isInstaller: true,
  },
};

export async function fetchLatestReleaseFromGitHub(): Promise<LatestReleaseData> {
  const agentInfo = getDesktopAgentVersion();

  const REPOS = [
    'crewloom/crewloom.github.io',
    'crewloom/crewloom',
  ];

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Crewloom-Website-Client',
  };

  const token = (typeof process !== 'undefined' && (process.env?.GITHUB_TOKEN || process.env?.GH_TOKEN)) || undefined;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  for (const repo of REPOS) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases`, {
        headers,
        next: { revalidate: 300 }, // Edge cache: 5 minutes
      });

      if (!res.ok) continue;

      const releases = await res.json();
      if (!Array.isArray(releases) || releases.length === 0) continue;

      // Filter and prioritize releases that belong to the Desktop Agent:
      // 1. Matches desktop agent version (e.g. tag 'v0.3.5' or 'crewloom-v0.3.5')
      // 2. Or title contains 'Desktop' or 'Agent' (and not 'Website')
      // 3. Must have downloadable assets
      const agentReleases = releases.filter((r) => {
        const title = (r.name || '').toLowerCase();
        // Ignore releases clearly meant for website only
        if (title.includes('website') && !title.includes('desktop') && !title.includes('agent')) {
          return false;
        }
        return Array.isArray(r.assets) && r.assets.length > 0;
      });

      if (agentReleases.length === 0) continue;

      // Prefer exact version match with current desktop agent if present
      const exactMatch = agentReleases.find((r) => {
        const tagClean = (r.tag_name || '').replace(/^(crewloom-)?v?/, '');
        return tagClean === agentInfo.version;
      });

      const selectedRelease = exactMatch || agentReleases[0];
      const rawAssets = Array.isArray(selectedRelease.assets) ? selectedRelease.assets : [];

      const parsedAssets = parseReleaseAssets(rawAssets, FALLBACK_RELEASE.assets);

      const primaryMac = selectReleaseAsset(parsedAssets, 'macos-arm64');
      const primaryWin = parsedAssets.find((a) => a.platform === 'windows');
      const primaryLinux = parsedAssets.find((a) => a.platform === 'linux');

      const rawTagName = selectedRelease.tag_name || agentInfo.tagName;
      const cleanVersion = rawTagName.replace(/^(crewloom-)?v?/, '');
      const tagName = `v${cleanVersion}`;

      return {
        tagName,
        version: cleanVersion,
        name: selectedRelease.name || `Crewloom Desktop Agent ${tagName}`,
        publishedAt: selectedRelease.published_at || new Date().toISOString(),
        htmlUrl: selectedRelease.html_url || `https://github.com/${repo}/releases/tag/${rawTagName}`,
        body: selectedRelease.body || '',
        repoUrl: `https://github.com/${repo}`,
        sourceUrl: `https://github.com/${repo}`,
        tarballUrl: selectedRelease.tarball_url || `https://github.com/${repo}/archive/refs/tags/${rawTagName}.tar.gz`,
        zipballUrl: selectedRelease.zipball_url || `https://github.com/${repo}/archive/refs/tags/${rawTagName}.zip`,
        assets: parsedAssets,
        primaryMacAsset: primaryMac,
        primaryWindowsAsset: primaryWin,
        primaryLinuxAsset: primaryLinux,
        isLive: true,
      };
    } catch {
      // Continue to next repo or fallback
    }
  }

  return FALLBACK_RELEASE;
}
