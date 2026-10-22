"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "@/types";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { BenchmarkSimulator } from "@/components/simulator/BenchmarkSimulator";
import { MetricsGrid } from "@/components/metrics/MetricsGrid";
import { FeaturesGrid } from "@/components/features/FeaturesGrid";
import { ArchitectureTopology } from "@/components/architecture/ArchitectureTopology";
import { SpecialistRolesDirectory } from "@/components/roles/SpecialistRolesDirectory";
import { QuickstartSection } from "@/components/quickstart/QuickstartSection";
import { FloatingActionDock } from "@/components/floating/FloatingActionDock";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.title = isAr
      ? "كرو لوم — الوكيل البرمجي السيادي ثنائي النواة | Crewloom"
      : "Crewloom — The Sovereign Dual-Core AI Agent Engine";
  }, [lang, isAr]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 ${
        isAr ? "font-arabic" : "font-latin"
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Top Banner Announcement */}
      <AnnouncementBar lang={lang} />

      {/* Main Navigation Header */}
      <Navbar lang={lang} onToggleLang={toggleLanguage} />

      {/* Hero Section with Magnetic Install & Interactive Terminal */}
      <Hero lang={lang} />

      {/* Live Interactive Agent Benchmark Simulator */}
      <BenchmarkSimulator lang={lang} />

      {/* Sovereign Engineering Metrics */}
      <MetricsGrid lang={lang} />

      {/* 3 Core Sovereign Capabilities */}
      <FeaturesGrid lang={lang} />

      {/* 3-Tier Architecture System Topology */}
      <ArchitectureTopology lang={lang} />

      {/* 44 Specialist Skills Directory */}
      <SpecialistRolesDirectory lang={lang} />

      {/* Quickstart Deployment Guide */}
      <QuickstartSection lang={lang} />

      {/* Floating Action Dock */}
      <FloatingActionDock lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
