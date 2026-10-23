#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// Ensure public dir exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Universal loader for articles without requiring experimental flags
async function loadArticles() {
  const tsContent = fs.readFileSync(path.join(ROOT_DIR, 'data/articles.ts'), 'utf8');
  const jsContent = tsContent
    .replace(/export interface[\s\S]*?\n\}\n/g, '')
    .replace(/: Article\[\]/g, '');
  const dataUri = `data:text/javascript;base64,${Buffer.from(jsContent).toString('base64')}`;
  const mod = await import(dataUri);
  return mod.ARTICLES;
}

const ARTICLES = await loadArticles();
const BASE_URL = 'https://crewloom.org';

function getGitLastMod(filePath) {
  try {
    const fullPath = path.join(ROOT_DIR, filePath);
    if (!fs.existsSync(fullPath)) return new Date().toISOString();
    const stdout = execSync(`git log -1 --format=%cI -- "${fullPath}"`, {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    if (stdout) return stdout;
  } catch {
    // fallback to fs stat
  }
  try {
    return fs.statSync(path.join(ROOT_DIR, filePath)).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// 1. Generate Sitemap XML
console.log('🗺️  Generating dynamic sitemap.xml...');

const homeLastMod = getGitLastMod('app/page.tsx');
const arLastMod = getGitLastMod('app/ar/page.tsx');
const blogIndexLastMod = getGitLastMod('app/blog/page.tsx');

const sitemapEntries = [
  {
    loc: `${BASE_URL}/`,
    lastmod: homeLastMod,
    changefreq: 'daily',
    priority: '1.0',
    alternates: [
      { hreflang: 'en', href: `${BASE_URL}/` },
      { hreflang: 'ar', href: `${BASE_URL}/ar/` },
      { hreflang: 'x-default', href: `${BASE_URL}/` },
    ],
  },
  {
    loc: `${BASE_URL}/ar/`,
    lastmod: arLastMod,
    changefreq: 'daily',
    priority: '1.0',
    alternates: [
      { hreflang: 'en', href: `${BASE_URL}/` },
      { hreflang: 'ar', href: `${BASE_URL}/ar/` },
      { hreflang: 'x-default', href: `${BASE_URL}/` },
    ],
  },
  {
    loc: `${BASE_URL}/blog/`,
    lastmod: blogIndexLastMod,
    changefreq: 'daily',
    priority: '0.9',
  },
];

for (const article of ARTICLES) {
  sitemapEntries.push({
    loc: `${BASE_URL}/blog/${article.slug}/`,
    lastmod: `${article.date}T12:00:00+00:00`,
    changefreq: 'weekly',
    priority: '0.85',
  });
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries
  .map((entry) => {
    let xml = `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>`;
    if (entry.alternates) {
      for (const alt of entry.alternates) {
        xml += `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`;
      }
    }
    xml += `\n  </url>`;
    return xml;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✅ sitemap.xml generated with ${sitemapEntries.length} verified URLs.`);

// 2. Generate robots.txt
console.log('🤖 Generating dynamic robots.txt...');

const robotsTxt = `# Crewloom Autonomous Systems (https://crewloom.org)
# Sovereign AI Coding Agent Runtime Robots Policy

User-agent: *
Allow: /
Disallow: /_next/
Disallow: /api/

# Explicit Allowances for Tier 1 Search & AI Retrieval Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Diffbot
Allow: /

User-agent: Bytespider
Allow: /

# Sitemap Index
Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log('✅ robots.txt generated with multi-crawler directives.');

// 3. Generate llms.txt (Curated AI overview)
console.log('🧠 Generating dynamic llms.txt...');

const llmsTxt = `# Crewloom (https://crewloom.org)

> Sovereign Autonomous AI Coding Agent uniting 44 open-source specialist skills with strict Zero-Destruction contract verification and omni-channel bridge control.

## Project Identity
- **Name**: Crewloom (كرو لوم)
- **Domain**: https://crewloom.org
- **License**: Open-Source Specialist Layer & Sovereign Core
- **Repository**: https://github.com/crewloom
- **Primary Mission**: Delivering autonomous software engineering without catastrophic mutations, schema erasures, or telemetry leaks.

## Core Architectural Pillars
1. **Zero-Destruction Verification**: Formal AST auditing before any commit or database mutation. Destructive operations (DROP TABLE, TRUNCATE, unchecked schema ALTERs) are automatically intercepted and rejected.
2. **44 Specialist AI Personas**: Open-source domain skills covering backend architectures, frontend performance, distributed databases, kernel debugging, and security penetration.
3. **Dual Sovereign English & Arabic Intelligence**: Native bilingual comprehension for technical queries and enterprise specifications.
4. **Omni-Channel Bridge Daemon**: Manage workflows seamlessly across terminal CLI, native macOS Cocoa desktop app, Telegram, and WhatsApp.

## Technical Knowledge Base & Documentation
- [Introducing Crewloom](${BASE_URL}/blog/introducing-crewloom/): The foundational manifesto of the sovereign autonomous AI coding agent.
- [Crewloom vs Devin vs Cursor vs Windsurf](${BASE_URL}/blog/crewloom-vs-devin-vs-cursor/): Comprehensive 2026 architectural benchmark comparison across autonomy, verification, and privacy.
- [Zero-Destruction AST Verification Engine](${BASE_URL}/blog/zero-destruction-ast-verification/): Deep dive into pre-flight safety algorithms, AST mutation interception, and contract testing.
- [دليل كرو لوم الشامل للمطور العربي](${BASE_URL}/blog/dalil-crewloom-arabic-developer-guide/): Complete Arabic engineering handbook covering installation, personas, and workflows.

## Installation
\`\`\`bash
curl -fsSL ${BASE_URL}/install.sh | bash
\`\`\`
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf8');
console.log('✅ llms.txt generated.');

// 4. Generate llms-full.txt (Full Technical Knowledge Base for Deep RAG)
console.log('📚 Generating dynamic llms-full.txt...');

let llmsFullTxt = `${llmsTxt}\n---\n\n# Complete Technical Publications & Knowledge Base\n\n`;

for (const article of ARTICLES) {
  llmsFullTxt += `\n## Article: ${article.titleEn}\n`;
  llmsFullTxt += `- **Arabic Title**: ${article.titleAr}\n`;
  llmsFullTxt += `- **URL**: ${BASE_URL}/blog/${article.slug}/\n`;
  llmsFullTxt += `- **Date**: ${article.date}\n`;
  llmsFullTxt += `- **Author**: ${article.author}\n`;
  llmsFullTxt += `- **Tags**: ${article.tags.join(', ')}\n\n`;
  llmsFullTxt += `### English Content\n${article.contentEn.trim()}\n\n`;
  llmsFullTxt += `### المحتوى باللغة العربية\n${article.contentAr.trim()}\n\n`;
  llmsFullTxt += `---\n`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf8');
console.log('✅ llms-full.txt generated with full article corpus.');

console.log('\n🚀 All Dynamic SEO/GEO/AEO Assets Generated Successfully!\n');
