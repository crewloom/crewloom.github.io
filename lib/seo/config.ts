import { SeoConfig } from '@/types/seo';

export const SEO_CONFIG: SeoConfig = {
  siteName: 'Crewloom',
  siteUrl: 'https://crewloom.org',
  titleTemplate: '%s | Crewloom',
  defaultTitle: 'Crewloom — Sovereign Autonomous AI Coding Agent | كرو لوم',
  defaultDescription:
    'Crewloom is the premier sovereign autonomous AI coding agent uniting 44 specialist skills with dual English/Arabic intelligence, strict Zero-Destruction contract verification, and omni-channel bridge control.',
  defaultKeywords: [
    'Crewloom',
    'crewloom',
    'crewloom.org',
    'Crewloom AI',
    'crewloom agent',
    'AI coding agent',
    'autonomous software engineer',
    'sovereign AI',
    'zero-destruction coding',
    'AI programmer',
    'developer agent',
    'generative AI software engineering',
    'AI coding assistant',
    'Devin alternative',
    'Cursor alternative',
    'local AI coding agent',
    'كرو لوم',
    'وكيل برمجي ذكي',
    'ذكاء اصطناعي للبرمجة',
    'أتمتة برمجية',
    'برمجة سيادية',
  ],
  defaultImage: '/logo.png',
  author: {
    name: 'Crewloom Autonomous Systems',
    url: 'https://crewloom.org',
  },
  social: {
    twitterHandle: '@crewloom',
    githubRepo: 'https://github.com/crewloom',
  },
  indexNow: {
    key: '6adab85ec7f9e8a1d2b34e5f6a7b8c9d',
    keyLocation: 'https://crewloom.org/6adab85ec7f9e8a1d2b34e5f6a7b8c9d.txt',
  },
  googleVerificationId: 'B7o9s_pB4dE9Z5nE4u3oN7f5b3V6l2q8X0y1w4z9A7c',
};

export const AI_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'ClaudeBot',
  'PerplexityBot',
  'Applebot-Extended',
  'cohere-ai',
  'Diffbot',
  'Bytespider',
] as const;
