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
import { BadgeCopyWidget } from "@/components/common/BadgeCopyWidget";
import { FaqSection } from "@/components/faq/FaqSection";
import { FloatingActionDock } from "@/components/floating/FloatingActionDock";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
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
      <main className="min-h-screen flex flex-col justify-between font-arabic" dir="rtl">
        <JsonLd data={arabicSchemas} />

        {/* Top Banner Announcement */}
        <AnnouncementBar />

        {/* Main Global Navigation */}
        <Navbar />

        {/* Hero Header with Terminal Preview */}
        <Hero />

        {/* Real-time Interactive Benchmark Simulator */}
        <BenchmarkSimulator />

        {/* Verification Metrics Grid */}
        <MetricsGrid />

        {/* Core Architectural Features */}
        <FeaturesGrid />

        {/* Interactive 3-Layer Topology */}
        <ArchitectureTopology />

        {/* 44 Specialist Skills Directory */}
        <SpecialistRolesDirectory />

        {/* Deployment & CLI Quickstart */}
        <QuickstartSection />

        {/* Viral GitHub README Badge */}
        <section id="badge" className="py-10 sm:py-12 border-t border-white/[0.06] bg-space-900/20 relative z-10" dir="ltr">
          <Container size="lg">
            <BadgeCopyWidget />
          </Container>
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
