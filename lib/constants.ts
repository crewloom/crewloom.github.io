import desktopAgentMeta from './desktop-agent.json';
import downloadContract from './download-contract.json';

/** Stable download URL: only the release behind "latest" changes, never the file name. */
export const latestDownloadUrl = (asset: keyof typeof downloadContract.assets) =>
  `https://github.com/${downloadContract.repo}/releases/latest/download/${downloadContract.assets[asset]}`;

export const SITE_CONFIG = {
  name: 'Crewloom',
  legalName: 'Crewloom Autonomous Systems',
  domain: 'crewloom.org',
  url: 'https://crewloom.org',
  githubUrl: 'https://github.com/crewloom/crewloom',
  agentRepo: 'https://github.com/crewloom/crewloom',
  cliRepo: 'https://github.com/crewloom/crewloom',
  releasesRepo: 'https://github.com/crewloom/crewloom.github.io',
  installCommand: 'curl -fsSL https://crewloom.org/install.sh | bash',
  powershellCommand: 'irm https://crewloom.org/install.ps1 | iex',
  cliPackage: 'crewloom',
  brewTap: 'crewloom/tap/crewloom',
  macosDownloadUrl: `/${downloadContract.assets.macos}`,
  macosGithubUrl: latestDownloadUrl('macos'),
  windowsDownloadUrl: `/${downloadContract.assets.windowsInstaller}`,
  windowsGithubUrl: latestDownloadUrl('windowsInstaller'),
  version: `v${desktopAgentMeta.version || '0.5.10'} (Beta Preview)`,
  latencyTargetMs: 0.8,
  license: 'Apache-2.0',
} as const;

export const NAV_LINKS = [
  { href: '#install', labelEn: 'Install', labelAr: 'التثبيت' },
  { href: '#simulator', labelEn: 'Benchmark', labelAr: 'المحاكاة' },
  { href: '#features', labelEn: 'Architecture', labelAr: 'المعمارية' },
  { href: '#roles', labelEn: '47 Specialist Skills', labelAr: '٤٧ مهارة تخصصية' },
] as const;
