export interface SeoConfig {
  siteName: string;
  siteUrl: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage: string;
  author: {
    name: string;
    url: string;
  };
  social: {
    twitterHandle: string;
    githubRepo: string;
  };
  indexNow: {
    key: string;
    keyLocation: string;
  };
  googleVerificationId: string;
}

export interface PageMetadataOptions {
  title?: string;
  titleTemplate?: string;
  description?: string;
  keywords?: string[];
  pathname?: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: 'en' | 'ar';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SchemaOrgEntity {
  '@type': string;
  [key: string]: any;
}

export interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': SchemaOrgEntity[];
}
