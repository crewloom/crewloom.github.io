import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, User, Tag } from 'lucide-react';
import { ARTICLES, Article } from '@/data/articles';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container, Badge } from '@/components/ui';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | Crewloom',
    };
  }

  return {
    title: `${article.titleEn} | Crewloom Research`,
    description: article.descriptionEn,
    authors: [{ name: article.author, url: 'https://crewloom.org' }],
    keywords: [...article.tags, 'Crewloom', 'crewloom.org', 'AI Coding Agent'],
    alternates: {
      canonical: `https://crewloom.org/blog/${article.slug}/`,
    },
    openGraph: {
      title: article.titleEn,
      description: article.descriptionEn,
      url: `https://crewloom.org/blog/${article.slug}/`,
      siteName: 'Crewloom',
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: '/logo.png', width: 1024, height: 1024, alt: article.titleEn }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.titleEn,
      description: article.descriptionEn,
      images: ['https://crewloom.org/logo.png'],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.titleEn,
    description: article.descriptionEn,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Crewloom',
      url: 'https://crewloom.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://crewloom.org/logo.png',
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `https://crewloom.org/blog/${article.slug}/`,
    keywords: article.tags.join(', '),
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-space-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20 relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        <Container size="md" className="relative z-10 max-w-4xl">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12 border-b border-white/[0.08] pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="cyan" className="text-[11px] font-mono">
                {article.categoryEn}
              </Badge>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-400 flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {article.date}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-400 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                {article.readTimeEn}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              {article.titleEn}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              {article.descriptionEn}
            </p>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.05] text-xs text-gray-400">
              <span className="flex items-center gap-2 font-medium">
                <User className="w-4 h-4 text-cyan-400" />
                By {article.author}
              </span>
              <div className="flex gap-2">
                {article.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 font-mono text-[11px] border border-white/[0.05]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* English Content */}
          <article className="max-w-none mb-16 text-gray-300 text-base leading-relaxed">
            <MarkdownRenderer content={article.contentEn} dir="ltr" />
          </article>

          {/* Arabic Version Card */}
          <section className="rounded-2xl border border-cyan-800/40 bg-gradient-to-br from-cyan-950/30 via-space-900 to-space-950 p-6 sm:p-10 mb-16" dir="rtl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="cyan" className="text-xs font-bold">
                النسخة العربية الكاملة
              </Badge>
              <span className="text-xs text-gray-400 font-mono">{article.readTimeAr}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              {article.titleAr}
            </h2>

            <p className="text-base text-gray-300 mb-6 font-medium leading-relaxed">
              {article.descriptionAr}
            </p>

            <div className="text-gray-200 text-base leading-loose border-t border-white/[0.08] pt-6">
              <MarkdownRenderer content={article.contentAr} dir="rtl" />
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Ready to experience Sovereign AI Coding?
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6">
              Install Crewloom in seconds on your Mac or Linux workstation with Zero-Destruction verification.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#install"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 text-space-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
              >
                Install Crewloom Free
              </Link>
              <Link
                href="/#simulator"
                className="px-6 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-xs tracking-wider hover:bg-white/10 transition-colors"
              >
                Try Live Simulator
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
