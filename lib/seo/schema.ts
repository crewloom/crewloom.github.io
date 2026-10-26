import { SEO_CONFIG } from './config';
import { BreadcrumbItem, FaqItem, SchemaOrgEntity } from '@/types/seo';
import { Article } from '@/data/articles';

/**
 * Generates Schema.org Organization for Crewloom
 */
export function generateOrganizationSchema(): SchemaOrgEntity {
  return {
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SEO_CONFIG.siteUrl}/#logo`,
      url: `${SEO_CONFIG.siteUrl}/logo.png`,
      caption: `${SEO_CONFIG.siteName} Logo`,
    },
    sameAs: [
      SEO_CONFIG.social.githubRepo,
      `https://twitter.com/${SEO_CONFIG.social.twitterHandle.replace('@', '')}`,
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
      ? 'إيجنت ذكي ونظام تطوير برمجي سيادي مفتوح (أوبن كود - Open Code) وبديل كلود كود يدمج 47 تخصصاً برمجياً مع ميثاق عدم الهدم البرمجي AST.'
      : 'Sovereign autonomous smart AI coding agent and open-code runtime providing a private alternative to Claude Code with 47 specialist skills and strict Zero-Destruction contract verification.',
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'AI Coding Agent, Smart Agent, Open Code Developer Runtime',
    keywords: isArabic
      ? 'اوبن كود, كلود كود, ايجنت ذكي, ايجنت زكي, ايجنت يمات, وكيل برمجي ذكي, بديل كلود كود, برمجة سيادية, أتمتة برمجية'
      : 'open code, claude code, claude code alternative, smart agent, intelligent coding agent, ai coding agents, zero-destruction coding',
    operatingSystem: 'macOS, Linux',
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
      '47 Specialist AI Developer Skills',
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
