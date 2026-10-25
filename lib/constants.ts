import desktopAgentMeta from './desktop-agent.json';

export const SITE_CONFIG = {
  name: 'Crewloom',
  legalName: 'Crewloom Autonomous Systems',
  domain: 'crewloom.org',
  url: 'https://crewloom.org',
  githubUrl: 'https://github.com/crewloom',
  cliRepo: 'https://github.com/crewloom/crewloom.github.io',
  installCommand: 'curl -fsSL https://crewloom.org/install.sh | bash',
  cliPackage: 'crewloom',
  brewTap: 'crewloom/tap/crewloom',
  macosDownloadUrl: '/Crewloom.dmg',
  macosGithubUrl: 'https://github.com/crewloom/crewloom.github.io/releases/latest/download/Crewloom.dmg',
  version: `v${desktopAgentMeta.version || '0.3.5'} (Beta Preview)`,
  latencyTargetMs: 0.8,
  license: 'Apache-2.0',
} as const;

export const NAV_LINKS = [
  { href: '#install', labelEn: 'Install', labelAr: 'التثبيت' },
  { href: '#simulator', labelEn: 'Benchmark', labelAr: 'المحاكاة' },
  { href: '#features', labelEn: 'Architecture', labelAr: 'المعمارية' },
  { href: '#roles', labelEn: '44 Specialist Skills', labelAr: '٤٤ مهارة تخصصية' },
] as const;
