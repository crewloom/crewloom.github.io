import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { BenchmarkSimulator } from "@/components/simulator/BenchmarkSimulator";
import { MetricsGrid } from "@/components/metrics/MetricsGrid";
import { FeaturesGrid } from "@/components/features/FeaturesGrid";
import { ArchitectureTopology } from "@/components/architecture/ArchitectureTopology";
import { SpecialistRolesDirectory } from "@/components/roles/SpecialistRolesDirectory";
import { QuickstartSection } from "@/components/quickstart/QuickstartSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FloatingActionDock } from "@/components/floating/FloatingActionDock";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "كرو لوم Crewloom — الوكيل البرمجي السيادي الفائق | أتمتة برمجية بدون هدم",
  description:
    "كرو لوم (https://crewloom.org) هو أول وكيل برمجي سيادي مستقل يدمج ٤٤ مهارة تخصصية مع ميثاق عدم الهدم البرمجي ونظام حماية قواعد البيانات عبر التليجرام والطرفية.",
  keywords: [
    "كرو لوم",
    "Crewloom",
    "وكيل برمجي",
    "ذكاء اصطناعي برمجي",
    "أتمتة برمجية",
    "بديل ديفين",
    "برمجة سيادية",
    "حماية قواعد البيانات",
    "مطور ذكاء اصطناعي",
  ],
  alternates: {
    canonical: "https://crewloom.org/ar/",
    languages: {
      en: "https://crewloom.org/",
      ar: "https://crewloom.org/ar/",
      "x-default": "https://crewloom.org/",
    },
  },
  openGraph: {
    title: "كرو لوم Crewloom — الوكيل البرمجي السيادي الفائق",
    description:
      "أول بيئة عمل برمجية تجمع بين 44 خبيراً تخصصياً مفتوح المصدر ومحرك مغلق فائق الانضباط مع ميثاق عدم الهدم المطلق.",
    url: "https://crewloom.org/ar/",
    siteName: "Crewloom",
    locale: "ar_AR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "كرو لوم Crewloom — الوكيل البرمجي السيادي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كرو لوم Crewloom — الوكيل البرمجي السيادي",
    description: "أول بيئة عمل برمجية ذكية تجمع 44 خبيراً مع ميثاق عدم الهدم المطلق.",
    images: ["https://crewloom.org/logo.png"],
  },
};

const arJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://crewloom.org/ar/#software",
      "name": "Crewloom - كرو لوم",
      "operatingSystem": "macOS, Linux, Windows",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "AI Coding Agent",
      "inLanguage": "ar",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "ميثاق عدم الهدم البرمجي وتدقيق AST",
        "نواة لغوية ثنائية عربية وإنجليزية أصلية",
        "44 خبيراً برمجياً متخصصاً",
        "التحكم العابر للقنوات عبر تليجرام وواتساب وتطبيق سطح المكتب والطرفية",
        "دعم التشغيل المحلي الأوفلاين عبر Ollama"
      ],
      "description": "الوكيل البرمجي السيادي الفائق المطور لأتمتة برمجية خالية من الهدم والكسر لقواعد البيانات.",
      "url": "https://crewloom.org/ar/",
      "downloadUrl": "https://crewloom.org/install.sh",
      "softwareVersion": "1.0.0",
      "author": {
        "@id": "https://crewloom.org/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://crewloom.org/ar/#faq",
      "inLanguage": "ar",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "ما هو Crewloom (كرو لوم)؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "كرو لوم (https://crewloom.org) هو وكيل برمجي ذكي ومستقل يتميز بالسيادة والأمان الفائق. يدمج ٤٤ مهارة تخصصية مفتوحة المصدر مع نواة ذكاء ثنائية عربية/إنجليزية، ونظام فحص عقود صارم يمنع الهدم، وغرفة تحكم شاملة عبر التليجرام والواتساب وتطبيقات سطح المكتب والطرفية."
          }
        },
        {
          "@type": "Question",
          "name": "كيف يضمن Crewloom عدم الهدم أو التدمير البرمجي؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يطبق Crewloom تدقيقاً صارماً على مستوى شجرة الصرف والنحو البرمجية (AST) وعقود الأمان قبل تنفيذ أي أمر؛ مما يمنع نهائياً مسح قواعد البيانات (DROP) أو كسر التوافقية العكسية أو التعديلات العشوائية في بيئات الإنتاج الحية."
          }
        },
        {
          "@type": "Question",
          "name": "ما الفرق بين Crewloom وبين Devin و Cursor و Copilot؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "كرو لوم مبني لمبدأ السيادة الكاملة: لا يجبرك على رفع أسرار مشروعك إلى سحابة خارجية، ويعمل كخادم خفيف فوري (أقل من 0.8 ملي ثانية)، ويدعم النماذج المحلية بنسبة 100% (مثل Ollama)، ويتعامل بالعربية والإنجليزية بنفس القوة، فضلاً عن تحكمه السحابي عبر التليجرام."
          }
        },
        {
          "@type": "Question",
          "name": "كيف أقوم بتثبيت واستخدام Crewloom؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يمكن التثبيت عبر أمر مباشر في الطرفية: curl -fsSL https://crewloom.org/install.sh | bash، كما يتوفر تطبيق ماك أصلي فائق السرعة وخفيف الحجم (58 كيلوبايت) وحزمة Homebrew الرسمية."
          }
        },
        {
          "@type": "Question",
          "name": "هل يدعم Crewloom العمل في البيئات المعزولة عن الإنترنت (Air-gapped)؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، صُمم كرو لوم ليكون سيادياً وخالياً من أي تسريبات للمعلومات. يمكنك تشغيله بالكامل على معالجات جهازك المحلية عبر مقبس Ollama دون الحاجة لأي اتصال بالإنترنت."
          }
        }
      ]
    }
  ]
};

export default function ArabicHome() {
  return (
    <LanguageProvider initialLang="ar">
      <main className="min-h-screen flex flex-col justify-between" dir="rtl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(arJsonLd) }}
        />
        {/* Top Banner Announcement */}
        <AnnouncementBar />

        {/* Main Navigation Header */}
        <Navbar />

        {/* Hero Section with Magnetic Install & Interactive Terminal */}
        <Hero />

        {/* Live Interactive Agent Benchmark Simulator */}
        <BenchmarkSimulator />

        {/* Sovereign Engineering Metrics */}
        <MetricsGrid />

        {/* 3 Core Sovereign Capabilities */}
        <FeaturesGrid />

        {/* 3-Tier Architecture System Topology */}
        <ArchitectureTopology />

        {/* 44 Specialist Skills Directory */}
        <SpecialistRolesDirectory />

        {/* Quickstart Deployment Guide */}
        <QuickstartSection />

        {/* Frequently Asked Questions (GEO & Search Engine Snippets) */}
        <FaqSection />

        {/* Floating Action Dock */}
        <FloatingActionDock />

        {/* Footer */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
