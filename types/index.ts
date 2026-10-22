export type Lang = 'en' | 'ar';

export type InstallMethod = 'curl' | 'npm' | 'brew' | 'macos';

export type TerminalTab = 'cli' | 'guard' | 'bridge';

export interface SpecialistRole {
  id: string;
  nameAr: string;
  nameEn: string;
  cat: 'Core' | 'Database' | 'Safety' | 'Security' | 'DevOps' | 'Frontend' | 'CI/CD' | 'Agent' | 'Data';
  descEn?: string;
  descAr?: string;
}

export interface MetricItem {
  value: string;
  labelEn: string;
  labelAr: string;
  colorClass: string;
}

export interface FeatureItem {
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  colorScheme: 'cyan' | 'emerald' | 'teal';
}

export interface ArchitectureLayer {
  layerNumber: string;
  titleEn: string;
  titleAr: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  descEn: string;
  descAr: string;
  repo: string;
  isPrivate?: boolean;
}
