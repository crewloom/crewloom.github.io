import { SEO_CONFIG } from './config';
import { BreadcrumbItem, FaqItem, SchemaOrgEntity } from '@/types/seo';
import { Article } from '@/data/articles';
import METRICS_DATA from '../../data/project-metrics.json';

/**
 * Generates Schema.org Organization for Crewloom
 */
export function generateOrganizationSchema(): SchemaOrgEntity {
  return {
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    legalName: 'Crewloom Autonomous Systems',
    url: SEO_CONFIG.siteUrl,
    disambiguatingDescription:
      'Crewloom is an open-source sovereign autonomous AI coding agent framework and developer runtime (crewloom.org). It is distinct from and unaffiliated with CrewBloom, the staffing agency.',
    foundingDate: '2026-10-22',
    founder: {
      '@type': 'Person',
      name: 'Mohamed Ashraf',
      url: 'https://github.com/mohamedashraf',
    },
    brand: {
      '@type': 'Brand',
      name: 'Crewloom',
      logo: `${SEO_CONFIG.siteUrl}/logo.png`,
      slogan: 'Sovereign Autonomous AI Coding Agent',
    },
    logo: {
      '@type': 'ImageObject',
      '@id': `${SEO_CONFIG.siteUrl}/#logo`,
      url: `${SEO_CONFIG.siteUrl}/logo.png`,
      caption: `${SEO_CONFIG.siteName} Logo`,
    },
    sameAs: [
      SEO_CONFIG.social.githubRepo,
      'https://github.com/crewloom/crewloom',
      `https://twitter.com/${SEO_CONFIG.social.twitterHandle.replace('@', '')}`,
      `https://x.com/${SEO_CONFIG.social.twitterHandle.replace('@', '')}`,
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Autonomous Coding Agents',
      'Software Engineering',
      'Zero-Destruction AST Verification',
      'LLM Speculative Orchestration',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      url: `${SEO_CONFIG.siteUrl}/blog/`,
    },
  };
}

/**
 * Generates Schema.org WebSite for Crewloom
 */
export function generateWebSiteSchema(): SchemaOrgEntity {
  return {
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    alternateName: [
      'Crewloom AI',
      'كرو لوم',
      'Crewloom Open Code Agent',
      'Crewloom Claude Code Alternative',
      'Crewloom Smart Agent',
      'إيجنت ذكي',
      'وكيل برمجي ذكي',
    ],
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    inLanguage: ['en', 'ar'],
  };
}

/**
 * Generates Schema.org SoftwareApplication for Crewloom
 */
export function generateSoftwareApplicationSchema(locale: 'en' | 'ar' = 'en'): SchemaOrgEntity {
  const isArabic = locale === 'ar';

  return {
    '@type': 'SoftwareApplication',
    '@id': `${SEO_CONFIG.siteUrl}/#software-${locale}`,
    name: isArabic ? 'كرو لوم Crewloom' : 'Crewloom',
    alternateName: isArabic
      ? [
          'كرو لوم إيجنت ذكي',
          'أوبن كود برمجي',
          'بديل كلود كود',
          'Crewloom Sovereign AI Coding Agent',
          'وكيل برمجي ذكي',
        ]
      : [
          'Crewloom Sovereign AI Coding Agent',
          'Crewloom Open Code Agent',
          'Crewloom Claude Code Alternative',
          'Crewloom Smart Agent',
          'كرو لوم',
        ],
    description: isArabic
      ? `إيجنت ذكي ونظام تطوير برمجي سيادي مفتوح (أوبن كود - Open Code) وبديل كلود كود يدمج ${METRICS_DATA.skillsDisplayAr} تخصصاً برمجياً مع ميثاق عدم الهدم البرمجي AST.`
      : `Sovereign autonomous smart AI coding agent and open-code runtime providing a private alternative to Claude Code with ${METRICS_DATA.skillsDisplay} specialist skills and strict Zero-Destruction contract verification.`,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'AI Coding Agent, Smart Agent, Open Code Developer Runtime',
    keywords: isArabic
      ? 'اوبن كود, كلود كود, ايجنت ذكي, ايجنت زكي, ايجنت يمات, وكيل برمجي ذكي, بديل كلود كود, برمجة سيادية, أتمتة برمجية'
      : 'open code, claude code, claude code alternative, smart agent, intelligent coding agent, ai coding agents, zero-destruction coding',
    disambiguatingDescription: isArabic
      ? 'نظام برمجي ووكيل ذكاء اصطناعي مستقل (crewloom.org) غير مرتبط بأي شركات توظيف أو وساطة تجارية.'
      : 'Sovereign autonomous AI coding agent and developer runtime (crewloom.org), distinct from recruiting or staffing agencies.',
    operatingSystem: 'macOS, Windows, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    downloadUrl: `${SEO_CONFIG.siteUrl}/install.sh`,
    softwareVersion: '1.0.0',
    featureList: [
      'Dual-Core Sovereign Architecture',
      'Zero-Destruction AST Verification',
      `${METRICS_DATA.skillsDisplay} Specialist AI Developer Skills`,
      'Omni-channel Bridge (CLI, Cocoa Desktop, Telegram, WhatsApp)',
      'Dual English and Arabic Engineering Intelligence',
    ],
  };
}

/**
 * Generates Schema.org FAQPage from FAQ items
 */
export function generateFaqSchema(faqs: FaqItem[], locale: 'en' | 'ar' = 'en'): SchemaOrgEntity {
  return {
    '@type': 'FAQPage',
    '@id': `${SEO_CONFIG.siteUrl}/${locale === 'ar' ? 'ar/' : ''}#faq`,
    inLanguage: locale,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Schema.org BreadcrumbList
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): SchemaOrgEntity {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isAbsolute = item.path.startsWith('http');
      const itemUrl = isAbsolute
        ? item.path
        : `${SEO_CONFIG.siteUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Generates Schema.org TechArticle for blog articles
 */
export function generateArticleSchema(article: Article, locale: 'en' | 'ar' = 'en'): SchemaOrgEntity {
  const isArabic = locale === 'ar';
  const headline = isArabic ? article.titleAr : article.titleEn;
  const description = isArabic ? article.descriptionAr : article.descriptionEn;
  const articleUrl = `${SEO_CONFIG.siteUrl}/blog/${article.slug}/`;

  return {
    '@type': 'TechArticle',
    '@id': `${articleUrl}#article-${locale}`,
    inLanguage: locale,
    headline,
    description,
    author: {
      '@type': 'Person',
      name: article.author,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: articleUrl,
    keywords: article.tags.join(', '),
    articleSection: isArabic ? article.categoryAr : article.categoryEn,
    image: `${SEO_CONFIG.siteUrl}/logo.png`,
  };
}

/**
 * Generates Schema.org Blog catalog schema
 */
export function generateBlogIndexSchema(articles: Article[]): SchemaOrgEntity {
  return {
    '@type': 'Blog',
    '@id': `${SEO_CONFIG.siteUrl}/blog/#catalog`,
    name: 'Crewloom Autonomous Systems Research & Knowledge Base',
    description:
      'Official technical publications, architecture deep-dives, comparisons, and manuals for the Crewloom sovereign AI coding agent.',
    url: `${SEO_CONFIG.siteUrl}/blog/`,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.titleEn,
      url: `${SEO_CONFIG.siteUrl}/blog/${article.slug}/`,
      datePublished: article.date,
      author: {
        '@type': 'Person',
        name: article.author,
      },
    })),
  };
}
