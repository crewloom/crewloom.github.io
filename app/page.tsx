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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
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
  );
}
