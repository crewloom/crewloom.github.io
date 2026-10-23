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
import { createPageMetadata } from "@/lib/seo/metadata";
import { FAQS_AR } from "@/data/faq";
import { generateSoftwareApplicationSchema, generateFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "كرو لوم Crewloom — الوكيل البرمجي السيادي الفائق | أتمتة برمجية بدون هدم",
  description:
    "كرو لوم (https://crewloom.org) هو أول وكيل برمجي سيادي مستقل يدمج ٤٤ مهارة تخصصية مع ميثاق عدم الهدم البرمجي ونظام حماية قواعد البيانات عبر التليجرام والطرفية.",
  pathname: "/ar/",
  locale: "ar",
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
});

const arabicSchemas = [
  generateSoftwareApplicationSchema('ar'),
  generateFaqSchema(FAQS_AR, 'ar'),
];

export default function ArabicHome() {
  return (
    <LanguageProvider initialLang="ar">
      <main className="min-h-screen flex flex-col justify-between" dir="rtl">
        <JsonLd data={arabicSchemas} />

        {/* Top Banner Announcement */}
        <AnnouncementBar />

        {/* Main Global Navigation */}
        <Navbar />

        {/* Hero Header with Terminal Preview */}
        <Hero />

        {/* Real-time Interactive Benchmark Simulator */}
        <section id="simulator" className="relative z-10 py-12">
          <BenchmarkSimulator />
        </section>

        {/* Verification Metrics Grid */}
        <section id="metrics" className="relative z-10 py-12">
          <MetricsGrid />
        </section>

        {/* Core Architectural Features */}
        <section id="features" className="relative z-10 py-12">
          <FeaturesGrid />
        </section>

        {/* Interactive 3-Layer Topology */}
        <section id="architecture" className="relative z-10 py-12">
          <ArchitectureTopology />
        </section>

        {/* 44 Specialist Skills Directory */}
        <section id="skills" className="relative z-10 py-12">
          <SpecialistRolesDirectory />
        </section>

        {/* Deployment & CLI Quickstart */}
        <section id="install" className="relative z-10 py-12">
          <QuickstartSection />
        </section>

        {/* Accessible Interactive FAQ Section */}
        <FaqSection />

        {/* Sticky Quick Action Dock */}
        <FloatingActionDock />

        {/* Sovereign Global Footer */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
