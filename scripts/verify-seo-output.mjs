import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('out');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log('🧪 Starting Expanded Crewloom Production SEO/GEO/AEO Verification Tests...\n');

// 1. Verify Core Output Files Exist (All 8 Articles + RSS Feed + Badges + Manifest)
const requiredFiles = [
  'index.html',
  'ar/index.html',
  'blog/index.html',
  'blog/introducing-crewloom/index.html',
  'blog/crewloom-vs-devin-vs-cursor/index.html',
  'blog/zero-destruction-ast-verification/index.html',
  'blog/dalil-crewloom-arabic-developer-guide/index.html',
  'blog/crewloom-vs-claude-code-and-open-code-agents/index.html',
  'blog/crewloom-vs-aider-and-cline-local-coding-agents/index.html',
  'blog/running-crewloom-offline-with-ollama-and-deepseek/index.html',
  'blog/remote-ai-coding-via-telegram-and-whatsapp/index.html',
  'robots.txt',
  'sitemap.xml',
  'feed.xml',
  'llms.txt',
  'llms-full.txt',
  'badge.svg',
  'badge-powered.svg',
  'google6d88c509a96bb024.html',
  '6adab85ec7f9e8a1d2b34e5f6a7b8c9d.txt',
  'site.webmanifest',
  '404.html',
];

for (const file of requiredFiles) {
  const fullPath = path.join(OUT_DIR, file);
  assert(fs.existsSync(fullPath), `Required output file exists: ${file}`);
}

// Read HTML files
const homeHtml = fs.readFileSync(path.join(OUT_DIR, 'index.html'), 'utf8');
const arHtml = fs.readFileSync(path.join(OUT_DIR, 'ar/index.html'), 'utf8');
const blogHtml = fs.readFileSync(path.join(OUT_DIR, 'blog/index.html'), 'utf8');
const article1Html = fs.readFileSync(path.join(OUT_DIR, 'blog/introducing-crewloom/index.html'), 'utf8');
const article2Html = fs.readFileSync(path.join(OUT_DIR, 'blog/crewloom-vs-devin-vs-cursor/index.html'), 'utf8');
const article5Html = fs.readFileSync(path.join(OUT_DIR, 'blog/crewloom-vs-claude-code-and-open-code-agents/index.html'), 'utf8');
const article6Html = fs.readFileSync(path.join(OUT_DIR, 'blog/crewloom-vs-aider-and-cline-local-coding-agents/index.html'), 'utf8');
const article7Html = fs.readFileSync(path.join(OUT_DIR, 'blog/running-crewloom-offline-with-ollama-and-deepseek/index.html'), 'utf8');
const article8Html = fs.readFileSync(path.join(OUT_DIR, 'blog/remote-ai-coding-via-telegram-and-whatsapp/index.html'), 'utf8');

// 2. Verify Page Titles
assert(homeHtml.includes('Crewloom — Sovereign Autonomous AI Coding Agent | كرو لوم'), 'Home page has canonical English/Arabic title');
assert(arHtml.includes('كرو لوم Crewloom — الوكيل البرمجي السيادي الفائق | أتمتة برمجية بدون هدم'), 'Arabic home page has dedicated Arabic title');
assert(blogHtml.includes('Articles, Research') && blogHtml.includes('Knowledge Base'), 'Blog hub has dedicated research title');
assert(article5Html.includes('Crewloom vs Claude Code vs Open Code Agents'), 'Article 5 has unique comparison title');
assert(article6Html.includes('Crewloom vs Aider vs Cline'), 'Article 6 has unique local coding agent title');
assert(article7Html.includes('Running Crewloom 100% Offline with Ollama & DeepSeek-Coder'), 'Article 7 has unique air-gapped sovereign title');
assert(article8Html.includes('Orchestrating Autonomous Coding Missions via Telegram & WhatsApp'), 'Article 8 has unique omni-channel bridge title');

// 3. Verify Target Search Query Term Density
assert(homeHtml.includes('open code') || homeHtml.includes('Open Code'), 'Homepage contains "open code" search query in content/metadata');
assert(homeHtml.includes('claude code') || homeHtml.includes('Claude Code'), 'Homepage contains "Claude Code" search query');
assert(homeHtml.includes('smart agent') || homeHtml.includes('Smart Agent') || homeHtml.includes('smart, disciplined agent'), 'Homepage contains "smart agent" search query');
assert(arHtml.includes('أوبن كود') || arHtml.includes('اوبن كود'), 'Arabic page contains "اوبن كود" search query');
assert(arHtml.includes('كلود كود'), 'Arabic page contains "كلود كود" search query');
assert(arHtml.includes('إيجنت ذكي') || arHtml.includes('ايجنت ذكي'), 'Arabic page contains "إيجنت ذكي" search query');

// 4. Verify Viral GitHub README Badge Integration
assert(homeHtml.includes('badge.svg') && homeHtml.includes('Zero-Destruction Badge'), 'Homepage integrates viral GitHub README badge widget');
assert(arHtml.includes('badge.svg'), 'Arabic homepage integrates viral GitHub README badge widget');
assert(blogHtml.includes('badge.svg'), 'Blog index integrates viral GitHub README badge widget');

// 5. Verify Structured Data Scoping & Unproven Claims Elimination
assert(!homeHtml.includes('aggregateRating'), 'Fabricated aggregateRating is removed from Homepage');
assert(!article1Html.includes('aggregateRating'), 'Fabricated aggregateRating is removed from Articles');
assert(homeHtml.includes('"@type":"SoftwareApplication"'), 'SoftwareApplication schema present on Homepage');
assert(homeHtml.includes('"@type":"FAQPage"'), 'FAQPage schema present on Homepage');
assert(!article6Html.includes('"@type":"FAQPage"'), 'FAQPage schema correctly NOT present on Blog Article');
assert(article6Html.includes('"@type":"TechArticle"'), 'TechArticle schema present on Blog Article');
assert(article7Html.includes('"@type":"TechArticle"'), 'TechArticle schema present on Article 7');
assert(article8Html.includes('"@type":"TechArticle"'), 'TechArticle schema present on Article 8');

// 6. Verify Semantic HTML & Markdown Rendering in Articles
assert(article6Html.includes('<table class="w-full text-left border-collapse text-xs sm:text-sm"'), 'Article 6 renders semantic <table> element');
assert(article6Html.includes('<th'), 'Article 6 renders semantic <th> table headers');
assert(article7Html.includes('<pre class="m-0 leading-relaxed"><code>ollama pull deepseek-coder:6.7b'), 'Article 7 renders semantic <pre><code> block');
assert(article8Html.includes('<h2 id="breaking-the-desk-boundary-with-crewloom-bridge"'), 'Article 8 renders slugified H2 heading id');

// 7. Verify RSS 2.0 Feed Validity & Item Count
const feed = fs.readFileSync(path.join(OUT_DIR, 'feed.xml'), 'utf8');
assert(feed.includes('<rss version="2.0"'), 'feed.xml has valid RSS 2.0 root');
assert(feed.includes('<title>Crewloom Engineering Insights &amp; Research</title>'), 'feed.xml has channel title');
assert(feed.includes('<link>https://crewloom.org/blog/running-crewloom-offline-with-ollama-and-deepseek/</link>'), 'feed.xml contains Article 7');
assert(feed.includes('<link>https://crewloom.org/blog/remote-ai-coding-via-telegram-and-whatsapp/</link>'), 'feed.xml contains Article 8');
const itemCount = (feed.match(/<item>/g) || []).length;
assert(itemCount === 8, `feed.xml contains all 8 published articles (found: ${itemCount})`);

// 8. Verify Sitemap & Multi-language alternates
const sitemap = fs.readFileSync(path.join(OUT_DIR, 'sitemap.xml'), 'utf8');
assert(sitemap.includes('<loc>https://crewloom.org/</loc>'), 'Sitemap contains homepage');
assert(sitemap.includes('<loc>https://crewloom.org/ar/</loc>'), 'Sitemap contains dedicated Arabic page');
assert(sitemap.includes('<loc>https://crewloom.org/blog/</loc>'), 'Sitemap contains blog index');
assert(sitemap.includes('<loc>https://crewloom.org/blog/crewloom-vs-aider-and-cline-local-coding-agents/</loc>'), 'Sitemap contains Article 6');
assert(sitemap.includes('<loc>https://crewloom.org/blog/running-crewloom-offline-with-ollama-and-deepseek/</loc>'), 'Sitemap contains Article 7');
assert(sitemap.includes('<loc>https://crewloom.org/blog/remote-ai-coding-via-telegram-and-whatsapp/</loc>'), 'Sitemap contains Article 8');
const sitemapUrlCount = (sitemap.match(/<loc>/g) || []).length;
assert(sitemapUrlCount === 11, `Sitemap contains all 11 verified URLs (found: ${sitemapUrlCount})`);

// 9. Verify Robots.txt & AI Crawler directives
const robots = fs.readFileSync(path.join(OUT_DIR, 'robots.txt'), 'utf8');
assert(robots.includes('User-agent: Googlebot'), 'Robots.txt configures Googlebot');
assert(robots.includes('User-agent: Bingbot'), 'Robots.txt configures Bingbot');
assert(robots.includes('User-agent: GPTBot'), 'Robots.txt configures GPTBot (OpenAI)');
assert(robots.includes('User-agent: PerplexityBot'), 'Robots.txt configures PerplexityBot');
assert(robots.includes('User-agent: ClaudeBot'), 'Robots.txt configures ClaudeBot (Anthropic)');
assert(robots.includes('Sitemap: https://crewloom.org/sitemap.xml'), 'Robots.txt points to Sitemap');

// 10. Verify Canonical & Hreflang reciprocity
assert(homeHtml.includes('<link rel="canonical" href="https://crewloom.org/"/>'), 'Homepage has correct canonical link');
assert(homeHtml.includes('<link rel="alternate" hrefLang="ar" href="https://crewloom.org/ar/"/>'), 'Homepage links to /ar/ alternate');
assert(arHtml.includes('<link rel="canonical" href="https://crewloom.org/ar/"/>'), 'Arabic page has correct canonical link');
assert(arHtml.includes('<link rel="alternate" hrefLang="en" href="https://crewloom.org/"/>'), 'Arabic page links to / en alternate');

// 11. Verify IndexNow & LLM Knowledge Dossiers
const llmsTxt = fs.readFileSync(path.join(OUT_DIR, 'llms.txt'), 'utf8');
const llmsFullTxt = fs.readFileSync(path.join(OUT_DIR, 'llms-full.txt'), 'utf8');
const indexNowKeyFile = fs.readFileSync(path.join(OUT_DIR, '6adab85ec7f9e8a1d2b34e5f6a7b8c9d.txt'), 'utf8');

assert(llmsTxt.includes('Sovereign Autonomous AI Coding Agent'), 'llms.txt contains primary positioning');
assert(llmsTxt.includes('Claude Code alternative') && llmsTxt.includes('كلود كود'), 'llms.txt contains target query keywords');
assert(llmsFullTxt.includes('Running Crewloom 100% Offline with Ollama & DeepSeek-Coder'), 'llms-full.txt includes Article 7');
assert(llmsFullTxt.includes('Orchestrating Autonomous Coding Missions via Telegram & WhatsApp'), 'llms-full.txt includes Article 8');
assert(indexNowKeyFile.trim() === '6adab85ec7f9e8a1d2b34e5f6a7b8c9d', 'IndexNow key file matches registered protocol key');

console.log('\n🎉 ALL 56 MASSIVE VIRAL EXPANSION VERIFICATION CHECKS PASSED WITH 100% SUCCESS!\n');
