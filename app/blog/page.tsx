import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Sparkles, Tag } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Articles, Research & Knowledge Base | Crewloom — Sovereign AI Coding Agent',
  description:
    'Deep technical articles, architecture benchmarks, Devin vs Cursor comparisons, and developer guides for Crewloom, the sovereign autonomous AI coding agent.',
  alternates: {
    canonical: 'https://crewloom.org/blog/',
  },
  openGraph: {
    title: 'Crewloom Articles & Knowledge Base',
    description:
      'Explore deep engineering breakthroughs, Zero-Destruction audits, and benchmark comparisons from the Crewloom team.',
    url: 'https://crewloom.org/blog/',
    siteName: 'Crewloom',
    images: [{ url: '/logo.png', width: 1024, height: 1024, alt: 'Crewloom Research' }],
  },
  keywords: [
    'Crewloom articles',
    'Crewloom vs Devin',
    'AI coding agent benchmarks',
    'Zero destruction software engineering',
    'مقالات كرو لوم',
    'ذكاء اصطناعي برمجي',
    'دليل مطوري كرو لوم',
  ],
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://crewloom.org/blog/#blog",
  "name": "Crewloom Engineering Insights & Research",
  "description": "Deep technical articles, architecture benchmarks, and developer guides for Crewloom Sovereign AI.",
  "url": "https://crewloom.org/blog/",
  "publisher": {
    "@id": "https://crewloom.org/#organization"
  },
  "blogPost": ARTICLES.map((article) => ({
    "@type": "BlogPosting",
    "headline": article.titleEn,
    "description": article.descriptionEn,
    "datePublished": article.date,
    "url": `https://crewloom.org/blog/${article.slug}/`,
    "author": {
      "@type": "Person",
      "name": article.author
    }
  }))
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-space-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        <Container size="lg" className="relative z-10">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <div className="flex justify-center mb-4">
              <Badge variant="cyan" icon={<BookOpen className="w-3.5 h-3.5 text-cyan-400" />}>
                CREWLOOM RESEARCH & KNOWLEDGE BASE
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Engineering Insights & Architecture
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-medium">
              Explore in-depth technical guides, comparative benchmarks, and breakthroughs in sovereign autonomous software engineering.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 gap-2">
                    <span className="font-mono text-cyan-400 uppercase tracking-wider text-[11px] font-semibold">
                      {article.categoryEn}
                    </span>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTimeEn}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                    <Link href={`/blog/${article.slug}/`}>
                      {article.titleEn}
                    </Link>
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                    {article.descriptionEn}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 border border-white/[0.05]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${article.slug}/`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 tracking-wide uppercase group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Arabic Community Callout */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-cyan-800/40 bg-gradient-to-r from-cyan-950/40 via-space-900 to-space-950 p-6 sm:p-8 text-center sm:text-right">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              جميع المقالات مدعومة بالكامل باللغة العربية داخل كل منشور
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              يوفر كرو لوم Crewloom ترجمة وتأصيلاً معمارياً عربياً أصيلاً لكافة المفاهيم الهندسية، مع إمكانية التبديل الفوري بين اللغتين في صفحة كل مقال.
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
