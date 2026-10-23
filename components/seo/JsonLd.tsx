import React from 'react';
import { SchemaOrgEntity, JsonLdGraph } from '@/types/seo';

interface JsonLdProps {
  data: SchemaOrgEntity | SchemaOrgEntity[] | JsonLdGraph;
}

/**
 * Renders structured JSON-LD into the HTML document safely.
 * Sanitizes against XSS by replacing '<' with unicode escape.
 */
export function JsonLd({ data }: JsonLdProps) {
  let structuredData: any;

  if (Array.isArray(data)) {
    structuredData = {
      '@context': 'https://schema.org',
      '@graph': data,
    };
  } else if ('@context' in data) {
    structuredData = data;
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      ...data,
    };
  }

  const jsonString = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
