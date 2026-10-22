"use client";

import React, { useState } from "react";
import {
  Layers,
  Terminal,
  ShieldAlert,
  Bot,
  Cpu,
  Globe,
  Radio,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Zap,
  Lock,
  GitBranch,
  ArrowRight,
  Download,
  Code2,
} from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cli" | "guard" | "bridge">("cli");
  const [roleSearch, setRoleSearch] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const isAr = lang === "ar";

  const allRoles = [
    { id: "chix-brain-and-contracts", nameAr: "عقود الذاكرة والشبكة (DAC/ZLRC)", nameEn: "Brain & Network Contracts", cat: "Core" },
    { id: "chix-database-migrations", nameAr: "ترحيل قواعد البيانات التراكمي", nameEn: "Additive Database Migrations", cat: "Database" },
    { id: "zero-destruction-policy", nameAr: "حارس عدم الهدم المطلق", nameEn: "Zero-Destruction Constitutional Guard", cat: "Safety" },
    { id: "chix-security-privacy", nameAr: "أمن الهوية والخصوصية الصارمة", nameEn: "Security & Privacy Protocol", cat: "Security" },
    { id: "chix-release-and-deploy", nameAr: "إطلاق ونشر البوابات المحمية", nameEn: "Release & Deployment Gates", cat: "DevOps" },
    { id: "ui-ux-pro-max", nameAr: "تصميم الواجهات المتقدمة (50 أسلوباً)", nameEn: "UI/UX Pro Max Intelligence", cat: "Frontend" },
    { id: "chix-ci-contract-gates", nameAr: "بوابات التحقق المستمر (14 عقداً)", nameEn: "14 CI Contract Ratchet Gates", cat: "CI/CD" },
    { id: "google-antigravity-sdk", nameAr: "محرك وكلاء الذكاء المستقلة", nameEn: "Antigravity Autonomous Multi-Agent", cat: "Agent" },
  ];

  const filteredRoles = allRoles.filter(
    (r) =>
      r.id.toLowerCase().includes(roleSearch.toLowerCase()) ||
      r.nameAr.includes(roleSearch) ||
      r.nameEn.toLowerCase().includes(roleSearch.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col justify-between ${isAr ? "font-arabic" : "font-latin"}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-space-900 to-emerald-950/80 border-b border-cyan-800/30 px-4 py-2 text-center text-xs text-gray-300 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span className="font-medium">
          {isAr
            ? "مبادرة وطنية تقنية مفتوحة المصدر بقيادة رموز (Rumuze) — محرك Next.js السيادي v1.0.0 متاح الآن"
            : "Sovereign Open-Source Engineering Initiative by Rumuze — Next.js Engine v1.0.0 is live"}
        </span>
        <a
          href="https://github.com/crewloom"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-bold underline ml-1 inline-flex items-center gap-1"
        >
          <span>{isAr ? "استكشف المستودعات" : "Explore Repositories"}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              <Layers className="text-space-950 w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-white tracking-wider font-mono">CREWLOOM</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono font-semibold">
                  NEXT.JS
                </span>
              </div>
              <span className="text-[11px] text-gray-400 tracking-tight block">
                {isAr ? "كرو لوم · الذكاء البرمجي المستقل" : "Sovereign Autonomous AI Agent"}
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <a href="#features" className="hover:text-cyan-400 transition">
              {isAr ? "المزايا السيادية" : "Features"}
            </a>
            <a href="#architecture" className="hover:text-cyan-400 transition">
              {isAr ? "المعمارية" : "Architecture"}
            </a>
            <a href="#roles" className="hover:text-cyan-400 transition">
              {isAr ? "الـ 44 خبيراً" : "44 Skills"}
            </a>
            <a href="#install" className="hover:text-cyan-400 transition">
              {isAr ? "التثبيت والتشغيل" : "Installation"}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="px-3.5 py-1.5 rounded-lg bg-space-800 border border-white/10 hover:border-cyan-500 text-xs font-bold text-cyan-300 flex items-center gap-2 transition"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            <a
              href="https://github.com/crewloom"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-space-950 px-4 py-2 rounded-lg font-bold text-xs shadow-md shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
            >
              <span>GitHub Org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-semibold mb-8 backdrop-blur shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {isAr
                ? "المعمارية ثنائية النواة: مفتوحة الأدوار ومحكمة المحرك"
                : "Dual-Core Architecture: Open Roles · Proprietary Engine"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-6">
            <span className="block">{isAr ? "الوكيل البرمجي السيادي الفائق" : "The Sovereign AI Coding Agent"}</span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {isAr ? "بدقة كوديكس وحرية الأنظمة المستقلة" : "Codex Precision with Sovereign Autonomy"}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 font-medium">
            {isAr
              ? "أول بيئة عمل برمجية تجمع بين 44 خبيراً تخصصياً مفتوح المصدر ومحرك مغلق فائق الانضباط مبني بتقنية Next.js الحديثة، مع ميثاق عدم الهدم المطلق وغرفة عمليات شاملة."
              : "The premier autonomous development runtime merging 44 open-source specialist skills with a proprietary disciplined engine built with modern Next.js, strict Zero-Destruction guarantees, and an omni-channel bridge control room."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#install"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-space-950 font-black text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <Terminal className="w-5 h-5" />
              <span>{isAr ? "تثبيت أمر الطرفية والتطبيق" : "Install Global CLI & App"}</span>
            </a>

            <a
              href="https://github.com/crewloom/bridge"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-space-800 border border-white/10 text-white font-bold text-base transition flex items-center justify-center gap-3"
            >
              <Radio className="w-5 h-5 text-cyan-400" />
              <span>{isAr ? "غرفة التحكم عن بعد" : "Remote Control Room"}</span>
            </a>
          </div>

          {/* Interactive Terminal Showcase */}
          <div className="max-w-4xl mx-auto rounded-2xl glass-card border border-cyan-500/20 shadow-2xl overflow-hidden text-left" dir="ltr">
            <div className="bg-space-900/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <div className="flex items-center gap-1 ml-4 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("cli")}
                    className={`px-3 py-1 rounded ${activeTab === "cli" ? "bg-cyan-950 text-cyan-300 border border-cyan-800/60" : "text-gray-400 hover:text-gray-200"}`}
                  >
                    1. CLI Runtime
                  </button>
                  <button
                    onClick={() => setActiveTab("guard")}
                    className={`px-3 py-1 rounded ${activeTab === "guard" ? "bg-cyan-950 text-cyan-300 border border-cyan-800/60" : "text-gray-400 hover:text-gray-200"}`}
                  >
                    2. Zero-Destruction
                  </button>
                  <button
                    onClick={() => setActiveTab("bridge")}
                    className={`px-3 py-1 rounded ${activeTab === "bridge" ? "bg-cyan-950 text-cyan-300 border border-cyan-800/60" : "text-gray-400 hover:text-gray-200"}`}
                  >
                    3. Omni-Bridge
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Daemon: PID 7136</span>
              </div>
            </div>

            <div className="p-6 font-mono text-sm space-y-3 bg-space-950/80 min-h-[180px]">
              {activeTab === "cli" && (
                <>
                  <div className="text-gray-400 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-cyan-300 font-semibold">crewloom</span> roles --category backend
                  </div>
                  <div className="text-gray-300 text-xs pl-4 space-y-1">
                    <p className="text-emerald-300">✓ Loaded 44 Sovereign Specialist Roles:</p>
                    <p className="text-gray-400">  [01] chix-brain-and-contracts (DAC + ZLRC Binding Verification)</p>
                    <p className="text-gray-400">  [02] chix-database-migrations (Additive Only · Partial Index)</p>
                    <p className="text-gray-400">  [03] zero-destruction-policy (Constitution Article IV Guard)</p>
                  </div>
                  <div className="text-cyan-400 text-xs pl-4 font-mono terminal-cursor">
                    Ready for autonomous instruction dispatch.
                  </div>
                </>
              )}

              {activeTab === "guard" && (
                <>
                  <div className="text-gray-400 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-cyan-300 font-semibold">crewloom</span> verify --strict
                  </div>
                  <div className="text-gray-300 text-xs pl-4 space-y-1">
                    <p className="text-cyan-300">▶ Executing 14 CI Contract gates...</p>
                    <p className="text-emerald-400">  ✓ Gate 01: Raw Colors Baseline (0 regressions)</p>
                    <p className="text-emerald-400">  ✓ Gate 02: Data Access Contract (Forbidden keys audit clean)</p>
                    <p className="text-emerald-400">  ✓ Gate 03: Zero-Destruction Policy Guard (100% additive)</p>
                  </div>
                  <div className="text-emerald-300 text-xs pl-4 font-mono font-bold">
                    [CONSTITUTION RATIFIED]: All changes certified non-destructive.
                  </div>
                </>
              )}

              {activeTab === "bridge" && (
                <>
                  <div className="text-gray-400 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-cyan-300 font-semibold">crewloom</span> bridge status
                  </div>
                  <div className="text-gray-300 text-xs pl-4 space-y-1">
                    <p className="text-emerald-300">● Omni-Channel Bridge Daemon: ONLINE</p>
                    <p className="text-gray-400">  Telegram Gateway: Connected (@CrewloomBot)</p>
                    <p className="text-gray-400">  Local IPC Socket: /tmp/crewloom-bridge.sock (&lt;1ms)</p>
                    <p className="text-gray-400">  Web Studio UI: http://localhost:3030</p>
                  </div>
                  <div className="text-cyan-400 text-xs pl-4 font-mono terminal-cursor">
                    Awaiting remote telegram commands or local socket messages...
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 border-y border-white/5 bg-space-900/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-5xl font-black text-cyan-400 font-mono mb-2">44</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">
              {isAr ? "خبير برمجي تخصصي" : "Specialist Roles"}
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-emerald-400 font-mono mb-2">0%</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">
              {isAr ? "نسبة هدم الكود المستقر" : "Destructive Regressions"}
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-cyan-300 font-mono mb-2">&lt; 5ms</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">
              {isAr ? "زمن اتصال المعمارية البينية" : "IPC Latency"}
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-amber-300 font-mono mb-2">100%</div>
            <div className="text-xs md:text-sm text-gray-400 font-medium">
              {isAr ? "سيادة لغوية ثنائية كاملة" : "Bicultural Sovereignty"}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
            {isAr ? "القدرات السيادية" : "Sovereign Capabilities"}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            {isAr ? "لماذا صُمم كرو لوم للمهام المعقدة؟" : "Engineered for Complex Enterprise Autonomy"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card glass-card-hover p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              {isAr ? "ميثاق عدم الهدم (Zero-Destruction)" : "Zero-Destruction Contract"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isAr
                ? "قانون صارم ملزم برمجياً يمنع مس أو تكسير أي كود مستقر. لا يتم إدخال أي تعديل إلا بصيغة تراكمية مع التحقق الآلي من عقود الأداء وميزانيات الاستعلامات."
                : "A constitutionally binding software contract preventing regression or destruction of stable systems. Additive-only execution enforced by CI ratchets."}
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              {isAr ? "سيادة لغوية ثنائية (عربي / English)" : "Dual Bicultural Persona"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isAr
                ? "هوية فكرية أصيلة تجيد التفكير والتنفيذ بالعربية الفصحى الدقيقة بنفس الكفاءة الإنجليزية العالمية، مع فصل تام يمنع التشويه أو الرطانة اللغوية."
                : "Authentic sovereign identity operating with equal eloquence in Classical Arabic and modern English, strictly preserving linguistic purity without fragmentation."}
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800/80 flex items-center justify-center text-teal-400 mb-6">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              {isAr ? "غرفة العمليات الشاملة (Bridge)" : "Omni-Channel Control Room"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isAr
                ? "تحكم كامل في جهازك وأدواتك البرمجية عن بعد عبر تليجرام، واتساب، أو المتصفح مع مراقبة حية لتنفيذ الأوامر وسلامة النظام."
                : "Complete mediation through Telegram, WhatsApp, web, or native macOS app with live telemetry and asynchronous remote dispatch."}
            </p>
          </div>
        </div>
      </section>

      {/* 44 Roles Section */}
      <section id="roles" className="py-20 px-6 lg:px-12 bg-space-900/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
                {isAr ? "كتيبة الخبراء" : "Specialist Skills"}
              </h2>
              <p className="text-3xl font-extrabold text-white">
                {isAr ? "44 خبيراً برمجياً في خدمتك" : "44 Sovereign Specialist Roles"}
              </p>
            </div>
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder={isAr ? "بحث في المهارات..." : "Search skills..."}
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                className="w-full bg-space-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredRoles.map((role) => (
              <div key={role.id} className="glass-card p-4 rounded-xl border border-white/5 hover:border-cyan-500/40 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                    {role.cat}
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1 font-mono">
                  {role.id}
                </h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  {isAr ? role.nameAr : role.nameEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Installation */}
      <section id="install" className="py-24 px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
            {isAr ? "التثبيت السريع" : "Quickstart"}
          </h2>
          <p className="text-3xl font-extrabold text-white">
            {isAr ? "ابدأ تشغيل كرو لوم في ثوانٍ" : "Deploy Crewloom in Seconds"}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
              {isAr ? "1. تثبيت أمر الطرفية العالمي (CLI):" : "1. Install Global CLI:"}
            </label>
            <div className="bg-space-950 p-4 rounded-xl border border-white/5 flex items-center justify-between font-mono text-sm text-cyan-300" dir="ltr">
              <code>npm install -g @crewloom/cli</code>
              <button
                onClick={() => copyToClipboard("npm install -g @crewloom/cli")}
                className="text-gray-400 hover:text-white transition"
              >
                {copiedCmd === "npm install -g @crewloom/cli" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
              {isAr ? "2. تشغيل استوديو الوكيل والتطبيق المكتبي:" : "2. Launch Studio & Desktop App:"}
            </label>
            <div className="bg-space-950 p-4 rounded-xl border border-white/5 flex items-center justify-between font-mono text-sm text-cyan-300" dir="ltr">
              <code>crewloom studio --open</code>
              <button
                onClick={() => copyToClipboard("crewloom studio --open")}
                className="text-gray-400 hover:text-white transition"
              >
                {copiedCmd === "crewloom studio --open" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2 font-semibold">
              {isAr ? "3. تطبيق الماك الأصلي (Native macOS Cocoa):" : "3. Native macOS Cocoa App:"}
            </label>
            <p className="text-xs text-gray-400 mb-3">
              {isAr
                ? "تطبيق فائق الخفة (58 كيلوبايت) مدمج مع نظام WebKit الأصلي دون أي استهلاك للذاكرة. متاح تحت:"
                : "Hyper-optimized native macOS Cocoa app (58KB binary) powered by WebKit with zero background bloat. Located at:"}
            </p>
            <div className="bg-space-950 p-4 rounded-xl border border-white/5 flex items-center justify-between font-mono text-xs text-emerald-300" dir="ltr">
              <code>/Applications/Crewloom Agent.app</code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-space-950 px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
              <Layers className="text-space-950 w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-sm text-white font-mono">CREWLOOM SOVEREIGN</span>
            <span className="text-xs text-gray-500">| © 2026 Rumuze (رموز). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400 font-semibold">
            <a href="https://github.com/crewloom" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
              GitHub Organization
            </a>
            <a href="https://crewloom.org" className="hover:text-cyan-400 transition">
              Official Site
            </a>
            <a href="mailto:support@crewloom.org" className="hover:text-cyan-400 transition">
              support@crewloom.org
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
