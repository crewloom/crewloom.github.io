import { PlatformKey } from '@/hooks/useDeviceOS';

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

export const FALLBACK_RELEASE: LatestReleaseData = {
  tagName: 'v1.0.3',
  version: '1.0.3',
  name: 'Crewloom Desktop v1.0.3',
  publishedAt: new Date().toISOString(),
  htmlUrl: 'https://github.com/crewloom/crewloom.github.io/releases/latest',
  body: 'Official production bundle for macOS Apple Silicon with verified zero-destruction guarantees.',
  isLive: false,
  assets: [
    {
      id: 1,
      name: 'Crewloom.dmg',
      size: 5269425,
      sizeFormatted: '5.0 MB',
      downloadUrl: 'https://github.com/crewloom/crewloom.github.io/releases/download/v1.0.3/Crewloom.dmg',
      contentType: 'application/x-apple-diskimage',
      platform: 'macos-arm64',
      isInstaller: true,
    },
  ],
  primaryMacAsset: {
    id: 1,
    name: 'Crewloom.dmg',
    size: 5269425,
    sizeFormatted: '5.0 MB',
    downloadUrl: 'https://github.com/crewloom/crewloom.github.io/releases/download/v1.0.3/Crewloom.dmg',
    contentType: 'application/x-apple-diskimage',
    platform: 'macos-arm64',
    isInstaller: true,
  },
};

export async function fetchLatestReleaseFromGitHub(): Promise<LatestReleaseData> {
  const REPOS = [
    'crewloom/crewloom.github.io',
    'crewloom/crewloom',
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

      // Select the newest release that contains downloadable assets, or fallback to the latest release
      const releaseWithAssets = releases.find((r) => Array.isArray(r.assets) && r.assets.length > 0) || releases[0];

      const rawAssets = Array.isArray(releaseWithAssets.assets) ? releaseWithAssets.assets : [];

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

      const tagName = releaseWithAssets.tag_name || 'v1.0.3';
      const version = tagName.replace(/^v/, '');

      return {
        tagName,
        version,
        name: releaseWithAssets.name || `Crewloom Desktop ${tagName}`,
        publishedAt: releaseWithAssets.published_at || new Date().toISOString(),
        htmlUrl: releaseWithAssets.html_url || `https://github.com/${repo}/releases/tag/${tagName}`,
        body: releaseWithAssets.body || '',
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
