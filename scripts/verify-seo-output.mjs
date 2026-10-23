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

console.log('🧪 Starting Crewloom Production SEO/GEO/AEO Verification Tests...\n');

// 1. Verify files exist
const requiredFiles = [
  'index.html',
  'ar/index.html',
  'blog/index.html',
  'blog/introducing-crewloom/index.html',
  'blog/crewloom-vs-devin-vs-cursor/index.html',
  'blog/zero-destruction-ast-verification/index.html',
  'blog/dalil-crewloom-arabic-developer-guide/index.html',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'llms-full.txt',
  'google6d88c509a96bb024.html',
];

for (const file of requiredFiles) {
  const fullPath = path.join(OUT_DIR, file);
  assert(fs.existsSync(fullPath), `Required output file exists: ${file}`);
}

// 2. Verify Page Titles (Hydration / Build separation)
const homeHtml = fs.readFileSync(path.join(OUT_DIR, 'index.html'), 'utf8');
const arHtml = fs.readFileSync(path.join(OUT_DIR, 'ar/index.html'), 'utf8');
const blogHtml = fs.readFileSync(path.join(OUT_DIR, 'blog/index.html'), 'utf8');
const article1Html = fs.readFileSync(path.join(OUT_DIR, 'blog/introducing-crewloom/index.html'), 'utf8');
const article2Html = fs.readFileSync(path.join(OUT_DIR, 'blog/crewloom-vs-devin-vs-cursor/index.html'), 'utf8');

assert(homeHtml.includes('Crewloom — Sovereign Autonomous AI Coding Agent | كرو لوم'), 'Home page has canonical English/Arabic title');
assert(arHtml.includes('كرو لوم Crewloom — الوكيل البرمجي السيادي الفائق | أتمتة برمجية بدون هدم'), 'Arabic home page has dedicated Arabic title');
assert(blogHtml.includes('Articles, Research') && blogHtml.includes('Knowledge Base'), 'Blog hub has dedicated research title');
assert(article1Html.includes('Introducing Crewloom: The Sovereign Autonomous AI Coding Agent | Crewloom Research'), 'Article 1 has unique headline title (not overwritten)');
assert(article2Html.includes('Crewloom vs Devin vs Cursor vs Windsurf: 2026 Architectural Comparison | Crewloom Research'), 'Article 2 has unique comparison title');

// 3. Verify Structured Data Scoping & Unproven Claims Elimination
assert(!homeHtml.includes('aggregateRating'), 'Fabricated aggregateRating is removed from Homepage');
assert(!article1Html.includes('aggregateRating'), 'Fabricated aggregateRating is removed from Articles');
assert(homeHtml.includes('"@type":"SoftwareApplication"'), 'SoftwareApplication schema present on Homepage');
assert(homeHtml.includes('"@type":"FAQPage"'), 'FAQPage schema present on Homepage');
assert(!article1Html.includes('"@type":"FAQPage"'), 'FAQPage schema correctly NOT present on Blog Article');
assert(article1Html.includes('"@type":"TechArticle"'), 'TechArticle schema present on Blog Article');
assert(blogHtml.includes('"@type":"Blog"'), 'Blog schema present on Blog Index');

// 4. Verify Semantic HTML Rendering in Articles (Markdown to HTML)
assert(article2Html.includes('<table class="w-full text-left border-collapse text-xs sm:text-sm"'), 'Article 2 renders semantic <table> element');
assert(article2Html.includes('<th'), 'Article 2 renders semantic <th> table headers');
assert(article2Html.includes('<td'), 'Article 2 renders semantic <td> table cells');
assert(article1Html.includes('<pre class="m-0 leading-relaxed"><code>curl -fsSL https://crewloom.org/install.sh | bash</code></pre>'), 'Article 1 renders semantic <pre><code> block');
assert(article1Html.includes('<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight mt-10 mb-4 border-b border-white/[0.08] pb-3"'), 'Article 1 renders semantic <h2> heading');

// 5. Verify FAQ Accessibility & Search Engine Availability
assert(homeHtml.includes('<details'), 'FAQ uses semantic <details> element');
assert(homeHtml.includes('<summary'), 'FAQ uses semantic <summary> element');
assert(homeHtml.includes('What is Crewloom?'), 'FAQ Question 1 is in static HTML');
assert(homeHtml.includes('How does Crewloom guarantee Zero-Destruction coding?'), 'FAQ Question 2 is in static HTML');
assert(arHtml.includes('ما هو Crewloom (كرو لوم)؟'), 'Arabic FAQ Question 1 is in static HTML');

// 6. Verify Sitemap & Robots
const sitemap = fs.readFileSync(path.join(OUT_DIR, 'sitemap.xml'), 'utf8');
assert(sitemap.includes('<loc>https://crewloom.org/</loc>'), 'Sitemap contains homepage');
assert(sitemap.includes('<loc>https://crewloom.org/ar/</loc>'), 'Sitemap contains dedicated Arabic page');
assert(sitemap.includes('<loc>https://crewloom.org/blog/</loc>'), 'Sitemap contains blog index');
assert(sitemap.includes('<loc>https://crewloom.org/blog/introducing-crewloom/</loc>'), 'Sitemap contains Article 1');
assert(sitemap.includes('<loc>https://crewloom.org/blog/crewloom-vs-devin-vs-cursor/</loc>'), 'Sitemap contains Article 2');

const robots = fs.readFileSync(path.join(OUT_DIR, 'robots.txt'), 'utf8');
assert(robots.includes('User-agent: Googlebot'), 'Robots.txt configures Googlebot');
assert(robots.includes('User-agent: GPTBot'), 'Robots.txt configures GPTBot (OpenAI)');
assert(robots.includes('User-agent: PerplexityBot'), 'Robots.txt configures PerplexityBot');
assert(robots.includes('User-agent: ClaudeBot'), 'Robots.txt configures ClaudeBot (Anthropic)');
assert(robots.includes('Sitemap: https://crewloom.org/sitemap.xml'), 'Robots.txt points to Sitemap');

// 7. Verify Canonical & Hreflang
assert(homeHtml.includes('<link rel="canonical" href="https://crewloom.org/"/>'), 'Homepage has correct canonical link');
assert(homeHtml.includes('<link rel="alternate" hrefLang="ar" href="https://crewloom.org/ar/"/>'), 'Homepage links to /ar/ alternate');
assert(arHtml.includes('<link rel="canonical" href="https://crewloom.org/ar/"/>'), 'Arabic page has correct canonical link');
assert(arHtml.includes('<link rel="alternate" hrefLang="en" href="https://crewloom.org/"/>'), 'Arabic page links to / en alternate');

console.log('\n🎉 ALL 24 VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
