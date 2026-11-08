import type { PlatformKey } from '../hooks/useDeviceOS';

export interface ReleaseAsset {
  id: number;
  name: string;
  size: number;
  sizeFormatted: string;
  downloadUrl: string;
  contentType: string;
  platform: PlatformKey;
  supportedPlatforms?: readonly PlatformKey[];
  isInstaller: boolean;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

/** A generic .dmg does not establish its CPU architecture. */
export function detectAssetPlatform(fileName: string): PlatformKey {
  const name = fileName.toLowerCase();
  if (/\.dmg$|darwin|macos/.test(name)) {
    if (/x64|x86_64|intel/.test(name)) return 'macos-x64';
    if (/arm64|aarch64|universal/.test(name)) return 'macos-arm64';
    return 'curl';
  }
  if (/\.apk$|android/.test(name)) return 'android';
  if (/\.(exe|msi)$|windows/.test(name)) return 'windows';
  if (/\.(deb|rpm|appimage|tar\.gz)$|linux/.test(name)) return 'linux';
  return 'curl';
}

/** GitHub resolves a synchronized latest URL to a versioned URL in the same repository. */
function matchesKnownDownload(knownUrl: string, actual: URL): boolean {
  if (knownUrl === actual.href) return true;
  const known = new URL(knownUrl);
  if (known.origin !== 'https://github.com' || actual.origin !== known.origin) return false;
  const source = known.pathname.split('/');
  const target = actual.pathname.split('/');
  return source.length === 7 && target.length === 7
    && source[1] === target[1] && source[2] === target[2]
    && source[3] === 'releases' && target[3] === 'releases'
    && source[4] === 'latest' && source[5] === 'download'
    && target[4] === 'download' && Boolean(target[5])
    && source[6] === target[6] && !actual.search && !actual.hash;
}

/** Validates GitHub asset responses once for both client and server consumers. */
export function parseReleaseAssets(raw: unknown, knownAssets: readonly ReleaseAsset[] = []): ReleaseAsset[] {
  if (!Array.isArray(raw)) throw new Error('Invalid release assets');
  return raw.map((item: unknown) => {
    if (!item || typeof item !== 'object') throw new Error('Invalid release asset');
    const asset = item as Record<string, unknown>;
    if (typeof asset.id !== 'number' || !Number.isFinite(asset.id) ||
        typeof asset.name !== 'string' || !asset.name ||
        typeof asset.size !== 'number' || !Number.isFinite(asset.size) || asset.size < 0 ||
        typeof asset.browser_download_url !== 'string' || typeof asset.content_type !== 'string') {
      throw new Error('Invalid release asset fields');
    }
    const url = new URL(asset.browser_download_url);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Invalid release download URL');
    const known = knownAssets.find(item => item.name === asset.name && matchesKnownDownload(item.downloadUrl, url));
    const platform = known?.platform ?? detectAssetPlatform(asset.name);
    const universal = /universal/i.test(asset.name) && /\.dmg$/i.test(asset.name);
    return {
      id: asset.id, name: asset.name, size: asset.size,
      sizeFormatted: formatBytes(asset.size), downloadUrl: url.href,
      contentType: asset.content_type, platform,
      ...(universal ? { supportedPlatforms: ['macos-arm64', 'macos-x64'] as const } : {}),
      isInstaller: /\.(dmg|exe|msi|deb|rpm|appimage|tar\.gz|apk)$/i.test(asset.name),
    };
  });
}

export function selectReleaseAsset(assets: readonly ReleaseAsset[], platform: PlatformKey): ReleaseAsset | undefined {
  return assets.find(asset => asset.isInstaller && asset.platform === platform)
    ?? assets.find(asset => asset.isInstaller && asset.supportedPlatforms?.includes(platform));
}
