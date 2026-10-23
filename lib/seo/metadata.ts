import type { Metadata } from 'next';
import { SEO_CONFIG } from './config';
import { PageMetadataOptions } from '@/types/seo';

/**
 * Reusable dynamic metadata generator for Next.js App Router pages.
 * Ensures consistent canonicals, hreflang alternates, OpenGraph, and Twitter tags.
 */
export function createPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    titleTemplate,
    description = SEO_CONFIG.defaultDescription,
    keywords = [],
    pathname = '/',
    image = SEO_CONFIG.defaultImage,
    type = 'website',
    locale = 'en',
    publishedTime,
    modifiedTime,
    authors = [SEO_CONFIG.author.name],
    tags = [],
    noIndex = false,
  } = options;

  // Normalize pathname to ensure leading and trailing slash
  const cleanPath = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}/`;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}${cleanPath}`;

  // Combine default sovereign keywords with page-specific keywords
  const mergedKeywords = Array.from(new Set([...keywords, ...SEO_CONFIG.defaultKeywords]));

  // Resolve alternate languages
  const alternatesLanguages: Record<string, string> = {
    'x-default': `${SEO_CONFIG.siteUrl}/`,
  };

  if (cleanPath === '/' || cleanPath === '/ar/') {
    alternatesLanguages['en'] = `${SEO_CONFIG.siteUrl}/`;
    alternatesLanguages['ar'] = `${SEO_CONFIG.siteUrl}/ar/`;
  } else {
    // For subpages, link canonical
    alternatesLanguages['en'] = canonicalUrl;
    alternatesLanguages['ar'] = canonicalUrl;
  }

  const isArabic = locale === 'ar';
  const pageTitle = title || SEO_CONFIG.defaultTitle;

  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: titleTemplate
      ? { template: titleTemplate, default: pageTitle }
      : pageTitle,
    description,
    keywords: mergedKeywords,
    authors: authors.map((name) => ({ name, url: SEO_CONFIG.siteUrl })),
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    applicationName: SEO_CONFIG.siteName,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      locale: isArabic ? 'ar_AR' : 'en_US',
      alternateLocale: isArabic ? ['en_US'] : ['ar_AR'],
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors.length > 0 && { authors }),
      ...(tags.length > 0 && { tags }),
      images: [
        {
          url: image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`,
          width: 1024,
          height: 1024,
          alt: `${SEO_CONFIG.siteName} — Sovereign Autonomous AI Coding Agent`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`],
      creator: SEO_CONFIG.social.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
