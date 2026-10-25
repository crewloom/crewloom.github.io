import { PlatformKey } from '@/hooks/useDeviceOS';
import desktopAgentMeta from './desktop-agent.json';

export interface ReleaseAsset {
  id: number;
  name: string;
  size: number;
  sizeFormatted: string;
  downloadUrl: string;
  contentType: string;
  platform: PlatformKey;
  isInstaller: boolean;
}

export interface LatestReleaseData {
  tagName: string;
  version: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  body?: string;
  assets: ReleaseAsset[];
  primaryMacAsset?: ReleaseAsset;
  primaryWindowsAsset?: ReleaseAsset;
  primaryLinuxAsset?: ReleaseAsset;
  isLive: boolean;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

export function detectAssetPlatform(fileName: string): PlatformKey {
  const lower = fileName.toLowerCase();

  if (lower.endsWith('.dmg') || lower.includes('darwin') || lower.includes('mac')) {
    if (lower.includes('x64') || lower.includes('x86_64') || lower.includes('intel')) {
      return 'macos-x64';
    }
    return 'macos-arm64';
  }

  if (lower.endsWith('.exe') || lower.endsWith('.msi') || lower.includes('win')) {
    return 'windows';
  }

  if (lower.endsWith('.deb') || lower.endsWith('.rpm') || lower.endsWith('.appimage') || lower.endsWith('.tar.gz') || lower.includes('linux')) {
    return 'linux';
  }

  return 'curl';
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
};

export async function fetchLatestReleaseFromGitHub(): Promise<LatestReleaseData> {
  const agentInfo = getDesktopAgentVersion();

  const REPOS = [
    'crewloom/crewloom.github.io',
    'crewloom/agent',
  ];

  for (const repo of REPOS) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Crewloom-Website-Client',
        },
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
