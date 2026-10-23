# Crewloom Production SEO, GEO & AEO Architecture Manual

> **Official Engineering Standard & Reference Architecture**  
> **Domain**: [https://crewloom.org](https://crewloom.org)  
> **Repository**: [https://github.com/crewloom](https://github.com/crewloom)  
> **Specification Version**: 2.0 (Dynamic, Reusable, Verified)  
> **Last Updated**: October 2026

---

## 1. Executive Architecture Overview

Crewloom’s search and answer engine optimization (SEO, GEO, AEO) runtime is engineered as a **100% dynamic, type-safe, reusable system** built directly on Next.js App Router and static export (`output: 'export'`).

Instead of static, brittle tags scattered throughout page components, all metadata, OpenGraph cards, Twitter cards, bidirectional `hreflang` mappings, JSON-LD structured data graphs, and LLM training summaries are generated dynamically through a unified modular pipeline.

```
+-----------------------------------------------------------------------------------------+
|                                    Central Source of Truth                              |
|                          data/articles.ts  |  data/faq.ts  |  lib/seo/config.ts         |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+----------------------------------+               +--------------------------------------+
|    Dynamic Runtime Modules       |               |     Build-Time Automation Pipeline   |
|                                  |               |                                      |
| • lib/seo/metadata.ts            |               | • scripts/generate-seo-assets.mjs    |
| • lib/seo/schema.ts              |               |    ├── public/sitemap.xml (dynamic)  |
| • components/seo/JsonLd.tsx      |               |    ├── public/robots.txt (dynamic)   |
| • components/seo/Breadcrumbs.tsx |               |    ├── public/llms.txt (curated)     |
| • components/blog/MarkdownRenderer|              |    └── public/llms-full.txt (corpus) |
| • components/blog/TableOfContents|               |                                      |
+----------------------------------+               +--------------------------------------+
                 |                                                    |
                 v                                                    v
+-----------------------------------------------------------------------------------------+
|                                   Static Output (`out/`)                                |
| • Strict Zero-Destruction Claims                                                         |
| • Scoped Schema: SoftwareApplication, FAQPage, TechArticle, BreadcrumbList, Blog, Org   |
| • Semantic HTML: Tables, <pre><code>, Slugified Heading Anchors (#), Details/Summary     |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
|                          Verification & Instant Push Protocols                          |
| • scripts/verify-seo-output.mjs (40 Automated Tests)                                     |
| • scripts/ping-indexnow.mjs (Bing, Yandex, Seznam, Naver HTTP 202 Instant Crawl)        |
| • Google Search Console Domain Verification & Sitemap Submission                        |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Multi-Engine Strategy (SEO + GEO + AEO)

### 2.1 Traditional Search Engines (Google & Bing)
- **Problem**: New sovereign brand queries ("Crewloom") are frequently autocorrected to legacy entities (e.g. "CrewBloom", a 2016 staffing agency).
- **Solution**:
  - Unify Organization and WebSite schemas referencing `@id: "https://crewloom.org/#organization"`.
  - Establish exact brand disambiguation with explicit `name`, `alternateName` (`["Crewloom AI", "كرو لوم", "Crewloom Sovereign Engine", "crewloom.org"]`).
  - Deploy verified `sitemap.xml` with `<xhtml:link rel="alternate" hreflang="..."/>` to Google Search Console and Bing Webmaster Tools.
  - Implement bidirectional `hreflang` reciprocity between English (`https://crewloom.org/`) and Arabic (`https://crewloom.org/ar/`).

### 2.2 Generative Engine Optimization (GEO — Perplexity, ChatGPT Search, Gemini, Claude)
- **Problem**: AI engines summarize documentation and prioritize sources with dense facts, transparent claims, and direct code samples.
- **Solution**:
  - `llms.txt`: Curated markdown summary serving core technical positioning, 44 specialist personas, zero-destruction pledge, and direct links.
  - `llms-full.txt`: Full concatenated corpus of all architectural guides, comparison tables, and bilingual handbooks for one-shot retrieval augmented generation (RAG).
  - Explicit crawler allowances in `robots.txt` for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`, `Diffbot`, and `Bytespider`.

### 2.3 Answer Engine Optimization (AEO — Direct Voice & Snippet Extraction)
- **Problem**: Voice assistants and AI search snippets require atomic, structured Q&A pairs.
- **Solution**:
  - High-precision `FAQPage` schema on `/` and `/ar/` backed by semantic `<details>` and `<summary>` tags in static HTML.
  - Slugified `<h2>` and `<h3>` tags with deep-link anchors (`#slug`) in every technical publication, enabling direct snippet jumping.
  - Interactive Table of Contents (`<TableOfContents />`) allowing search bots and users to reference exact subsections.

---

## 3. Directory & Module Reference

```
website/
├── types/
│   └── seo.ts                      # Full TypeScript interfaces for SEO, Schemas & Metadata
├── lib/
│   └── seo/
│       ├── config.ts               # Central configuration (domain, keys, bot agents)
│       ├── metadata.ts             # createPageMetadata() factory
│       └── schema.ts               # Type-safe Schema.org generators
├── components/
│   ├── seo/
│   │   ├── JsonLd.tsx              # XSS-safe JSON-LD renderer
│   │   └── Breadcrumbs.tsx         # Accessible UI breadcrumbs
│   └── blog/
│       ├── MarkdownRenderer.tsx    # Semantic table, code, slugified H2/H3 anchors
│       ├── CodeBlock.tsx           # Interactive copy button for terminal snippets
│       └── TableOfContents.tsx     # Sticky navigation sidebar for AEO
├── data/
│   ├── articles.ts                 # Knowledge base articles (Bilingual corpus)
│   └── faq.ts                      # FAQ dataset (English & Arabic)
├── scripts/
│   ├── generate-seo-assets.mjs     # Build-time dynamic asset generator
│   ├── ping-indexnow.mjs           # Dynamic IndexNow ping script
│   └── verify-seo-output.mjs       # 40-point automated CI/CD test suite
└── docs/
    └── SEO_GEO_AEO_ARCHITECTURE.md # This documentation
```

---

## 4. Reusable Modules Breakdown

### 4.1 `lib/seo/metadata.ts`
Eliminates boilerplate and guarantees uniform metadata across all current and future routes.

```typescript
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'My Technical Guide | Crewloom Research',
  description: 'Detailed explanation of AST verification algorithms.',
  pathname: '/blog/my-guide/',
  type: 'article',
  publishedTime: '2026-10-23T12:00:00+00:00',
  tags: ['AST', 'Verification'],
});
```

**Key Capabilities**:
- Automatically normalizes trailing slashes for canonical URLs.
- Injects sovereign default keywords while appending page-specific tags.
- Configures `openGraph` with alternate locales (`en_US` / `ar_AR`), default 1024x1024 branding cards, and article publication timestamps.
- Configures `twitter:card` as `summary_large_image`.
- Sets search engine directives (`max-image-preview: large`, `max-snippet: -1`).

### 4.2 `lib/seo/schema.ts`
Pure, functional generators strictly adhering to Schema.org standards:
- `generateWebSiteSchema()`: Injects search actions and alternate languages.
- `generateOrganizationSchema()`: Establishes official entity identity, logos, and social anchors (`sameAs`).
- `generateSoftwareApplicationSchema(locale)`: Defines Crewloom runtime with zero unproven metrics.
- `generateFaqSchema(faqs, locale)`: Generates `FAQPage` with atomic Question/Answer pairs.
- `generateArticleSchema(article, locale)`: Generates dual-language `TechArticle` schemas.
- `generateBreadcrumbSchema(items)`: Generates standard hierarchical `BreadcrumbList`.
- `generateBlogIndexSchema(articles)`: Generates collection `Blog` schema with posting entities.

### 4.3 `components/blog/MarkdownRenderer.tsx`
Transforms plain Markdown into rich semantic HTML:
- **Slugified Heading Anchors**: Converts `## The Dual-Core Sovereign Architecture` into `<h2 id="the-dual-core-sovereign-architecture">` with a clickable `#` anchor link.
- **Semantic Tables**: Renders styled `<table>`, `<th>`, and `<td>` grids with responsive horizontal scrollbars.
- **Semantic `<pre><code>`**: Formats terminal commands and snippets with language badges and interactive one-click clipboard copying.
- **Bilingual RTL/LTR**: Dynamic directional switching for Arabic and English typography.

---

## 5. Build-Time Dynamic Asset Generation

The script `website/scripts/generate-seo-assets.mjs` executes automatically during the `prebuild` lifecycle phase (`npm run build`).

### What It Generates Automatically:
1. **`public/sitemap.xml`**:
   - Discovers all static pages (`/`, `/ar/`, `/blog/`) and all articles in `data/articles.ts`.
   - Inspects git commit history (`git log -1 --format=%cI`) to determine real `<lastmod>` timestamps.
   - Attaches `<xhtml:link rel="alternate" hreflang="..."/>` tags to declare multilingual equivalents to Google and Bing.
2. **`public/robots.txt`**:
   - Sets universal allow policies for indexing.
   - Explicitly welcomes top AI crawlers (`Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`, `Diffbot`, `Bytespider`).
   - Disallows private build artifacts (`/_next/`, `/api/`).
   - Links directly to the canonical sitemap.
3. **`public/llms.txt`**:
   - Generates a concise, high-signal guide containing project mission, core features, 44 specialist skills, installation command, and deep article links.
4. **`public/llms-full.txt`**:
   - Concatenates the entire bilingual knowledge base into a single file for direct LLM training and RAG ingestion.

---

## 6. How-To Guide for Engineers

### How to Add a New Blog Article
1. Open `website/data/articles.ts`.
2. Append a new article object to the `ARTICLES` array:
   ```typescript
   {
     slug: 'my-new-breakthrough',
     titleEn: 'My New Breakthrough',
     titleAr: 'عنوان المقال بالعربية',
     descriptionEn: 'Concise summary for search engines and AI assistants.',
     descriptionAr: 'ملخص موجز لمحركات البحث ومساعدي الذكاء الاصطناعي.',
     date: '2026-10-24',
     readTimeEn: '4 min read',
     readTimeAr: '٤ دقائق قراءة',
     author: 'Crewloom Core Architecture Team',
     categoryEn: 'Benchmarks',
     categoryAr: 'مقارنات واختبارات',
     tags: ['Crewloom', 'Benchmarks', 'Sovereign AI'],
     contentEn: `## Heading...`,
     contentAr: `## عنوان فرعي...`
   }
   ```
3. Run the automated test suite and build:
   ```bash
   npm run build
   npm run test:seo
   ```
4. Everything else happens **automatically**:
   - Next.js statically renders `/blog/my-new-breakthrough/index.html`.
   - Sitemaps, robots, `llms.txt`, and `llms-full.txt` are regenerated with the new article.
   - Dual-language `TechArticle` and `BreadcrumbList` schemas are injected.
   - The article is registered for instant IndexNow submission.

### How to Push Instant Updates to Bing and Yandex
```bash
npm run ping:indexnow
```
This dynamically gathers all site URLs and submits them directly to `https://api.indexnow.org/IndexNow`, returning `HTTP 202 Accepted`.

---

## 7. Truthful Claims & Zero-Destruction Policy

In accordance with strict engineering standards:
1. **No Fabricated Reviews**: `aggregateRating` has been permanently purged from all schemas and markup until independent third-party reviews are established.
2. **No Fictitious Accreditations**: Removed unsupported "100% certified" badges; replaced with accurate descriptions of formal AST contract verification algorithms.
3. **Transparent Latency Metrics**: Latency claims are qualified as sub-millisecond local Unix daemon execution benchmarks (`<0.8ms IPC overhead`).
4. **Data Privacy**: Highlighted local inference capabilities via Ollama / llama.cpp sockets without telemetry transmission.
