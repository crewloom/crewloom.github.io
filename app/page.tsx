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

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://crewloom.org/#software",
      "name": "Crewloom",
      "operatingSystem": "macOS, Linux, Windows",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "AI Coding Agent",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Zero-Destruction Autonomy with AST verification",
        "Dual-Core English & Arabic native parsing",
        "44 Specialist Engineering skills",
        "Omni-channel bridge control (Telegram, WhatsApp, CLI, Cocoa App)",
        "Local offline inference support via Ollama"
      ],
      "description": "The sovereign autonomous AI coding agent engineered for zero-destruction software development with 44 specialist skills.",
      "url": "https://crewloom.org/",
      "downloadUrl": "https://crewloom.org/install.sh",
      "softwareVersion": "1.0.0",
      "author": {
        "@id": "https://crewloom.org/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://crewloom.org/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Crewloom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crewloom (https://crewloom.org) is an enterprise-grade sovereign autonomous AI coding agent. It combines 44 open-source specialist skills with a dual English/Arabic core, rigorous non-destructive contract verification, and an omni-channel bridge control room."
          }
        },
        {
          "@type": "Question",
          "name": "How does Crewloom guarantee Zero-Destruction coding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crewloom integrates pre-execution AST syntax audits, contract verification, and strict additive migration constraints. Any destructive drop operations, unversioned regressions, or unauthorized file deletions are automatically caught and blocked before execution."
          }
        },
        {
          "@type": "Question",
          "name": "How does Crewloom compare to Devin, Cursor, and Windsurf?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike cloud-bound code generators, Crewloom is sovereign-first: it runs as a native lightweight background daemon (<0.8ms latency), supports 100% offline air-gapped local models (Ollama/llama.cpp), features full English and Arabic linguistic parity, and connects to remote control bridges like Telegram and WhatsApp."
          }
        },
        {
          "@type": "Question",
          "name": "How do I install Crewloom on macOS or Linux?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can install Crewloom with a single command in your terminal: curl -fsSL https://crewloom.org/install.sh | bash. It also provides a native macOS Cocoa app (58KB binary) and official Homebrew tap."
          }
        },
        {
          "@type": "Question",
          "name": "Can Crewloom run completely offline with local LLMs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Crewloom was designed for complete data privacy and air-gapped sovereignty. You can point it directly to your local Ollama or llama.cpp socket with zero external telemetry or cloud dependencies."
          }
        }
      ]
    }
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
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
  );
}
