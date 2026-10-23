import { SeoConfig } from '@/types/seo';

export const SEO_CONFIG: SeoConfig = {
  siteName: 'Crewloom',
  siteUrl: 'https://crewloom.org',
  titleTemplate: '%s | Crewloom',
  defaultTitle: 'Crewloom — Sovereign Autonomous AI Coding Agent | كرو لوم',
  defaultDescription:
    'Crewloom is the premier sovereign autonomous AI coding agent uniting 44 specialist skills with dual English/Arabic intelligence, strict Zero-Destruction contract verification, and omni-channel bridge control.',
  defaultKeywords: [
    // Brand Core
    'Crewloom',
    'crewloom',
    'crewloom.org',
    'Crewloom AI',
    'crewloom agent',
    'كرو لوم',

    // "اوبن كود" / Open Code / Open Source
    'اوبن كود',
    'أوبن كود',
    'كود مفتوح',
    'كود مفتوح المصدر',
    'أوبن كود ذكاء اصطناعي',
    'وكيل برمجي أوبن كود',
    'open code',
    'open code ai',
    'open code agent',
    'open-source coding agent',
    'open source ai coder',
    'open source developer assistant',
    'open source software engineer',

    // "كلود كود" / Claude Code / Cloud Code
    'كلود كود',
    'كلاود كود',
    'بديل كلود كود',
    'كلود كود محلي',
    'مقارنة كلود كود',
    'claude code',
    'claude code alternative',
    'claude code open source',
    'claude code local',
    'claude code vs crewloom',
    'cloud code ai',
    'anthropic claude code alternative',

    // "ايجنت زكي" / "ايجنت ذكي" / Smart Agent / Intelligent Agent
    'ايجنت زكي',
    'ايجنت ذكي',
    'إيجنت ذكي',
    'وكيل ذكي',
    'وكيل برمجي ذكي',
    'وكيل ذكاء اصطناعي ذكي',
    'أفضل إيجنت ذكي للبرمجة',
    'مساعد ذكي للمطورين',
    'smart agent',
    'smart ai agent',
    'intelligent coding agent',
    'autonomous smart developer agent',
    'intelligent software agent',

    // "ايجنت يمات" / AI Coding Agents / Multi-Agent
    'ايجنت يمات',
    'إيجنتات الذكاء الاصطناعي',
    'إيجنتات برمجية',
    'وكلاء الذكاء الاصطناعي',
    'وكلاء البرمجة الذاتية',
    'أتمتة الوكلاء البرمجية',
    'ai coding agents',
    'autonomous coding agents',
    'multi-agent coding framework',
    'agentic software engineering',

    // Core Categorical & Alternatives
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
    'Windsurf alternative',
    'local AI coding agent',
    'ذكاء اصطناعي للبرمجة',
    'أتمتة برمجية',
    'برمجة سيادية',
    'حماية قواعد البيانات',

    // Multilingual Top Tech Languages:
    // French (fr)
    'agent de codage IA',
    'alternative à Claude Code',
    'code ouvert IA',
    'agent intelligent de code',
    'ingénieur logiciel autonome',
    // Spanish (es)
    'agente de código abierto',
    'alternativa a Claude Code',
    'agente inteligente de programación',
    'programador IA autónomo',
    // German (de)
    'Open-Source-KI-Coding-Agent',
    'Claude Code Alternative',
    'intelligenter KI-Agent',
    'autonomer Software-Entwickler',
    // Chinese (zh)
    '开源AI代码代理',
    'Claude Code替代方案',
    '智能编程代理',
    '自主AI软件工程师',
    'Open Code AI',
    // Japanese (ja)
    'オープンソースAIコーディングエージェント',
    'Claude Code代替',
    'スマートAIエージェント',
    '自律型AIソフトウェアエンジニア',
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
