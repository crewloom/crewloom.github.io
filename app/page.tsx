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
import { FAQS_EN } from "@/data/faq";
import { generateSoftwareApplicationSchema, generateFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const homeSchemas = [
  generateSoftwareApplicationSchema('en'),
  generateFaqSchema(FAQS_EN, 'en'),
];

export default function Home() {
  return (
    <LanguageProvider initialLang="en">
      <main className="min-h-screen flex flex-col justify-between font-latin" dir="ltr">
        <JsonLd data={homeSchemas} />
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

        {/* 47 Specialist Skills Directory */}
        <SpecialistRolesDirectory />

        {/* Deployment & CLI Quickstart */}
        <QuickstartSection />

        {/* Viral GitHub README Badge */}
        <section id="badge" className="py-10 sm:py-12 border-t border-white/[0.06] bg-space-900/20 relative z-10">
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
