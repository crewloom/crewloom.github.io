import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://crewloom.org"),
  title: {
    default: "Crewloom — Sovereign Autonomous AI Coding Agent | كرو لوم",
    template: "%s | Crewloom",
  },
  description:
    "Crewloom is the premier sovereign autonomous AI coding agent uniting 44 specialist skills with dual English/Arabic intelligence, strict Zero-Destruction contract verification, and omni-channel bridge control.",
  keywords: [
    "Crewloom",
    "crewloom",
    "crewloom.org",
    "Crewloom AI",
    "crewloom agent",
    "AI coding agent",
    "autonomous software engineer",
    "sovereign AI",
    "zero-destruction coding",
    "AI programmer",
    "developer agent",
    "generative AI software engineering",
    "AI coding assistant",
    "Devin alternative",
    "Cursor alternative",
    "local AI coding agent",
    "كرو لوم",
    "وكيل برمجي ذكي",
    "ذكاء اصطناعي للبرمجة",
    "أتمتة برمجية",
    "برمجة سيادية",
  ],
  authors: [{ name: "Crewloom Team", url: "https://crewloom.org" }],
  creator: "Crewloom Autonomous Systems",
  publisher: "Crewloom",
  applicationName: "Crewloom Agent",
  generator: "Next.js",
  alternates: {
    canonical: "https://crewloom.org/",
    languages: {
      "en": "https://crewloom.org/",
      "ar": "https://crewloom.org/",
      "x-default": "https://crewloom.org/",
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Crewloom — Sovereign Autonomous AI Coding Agent | كرو لوم",
    description:
      "The premier autonomous development runtime merging 44 open-source specialist skills with a disciplined proprietary core and strict Zero-Destruction verification.",
    url: "https://crewloom.org/",
    siteName: "Crewloom",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Crewloom Sovereign AI Coding Agent",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_AR"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crewloom — Sovereign Autonomous AI Coding Agent",
    description:
      "Autonomous coding runtime uniting 44 specialist skills with Zero-Destruction guarantee and local inference support.",
    images: ["https://crewloom.org/logo.png"],
    creator: "@crewloom",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Developer Tools, Artificial Intelligence, Sovereign Computing",
  other: {
    "llms": "https://crewloom.org/llms.txt",
    "llms-full": "https://crewloom.org/llms-full.txt",
    "ai-intent": "Autonomous Software Engineering, AI Coding Agent, Contract Verification",
  },
  verification: {
    google: "google6d88c509a96bb024",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://crewloom.org/#website",
      "url": "https://crewloom.org/",
      "name": "Crewloom",
      "alternateName": [
        "Crewloom AI",
        "كرو لوم",
        "Crewloom Sovereign Engine",
        "crewloom.org",
        "Crewloom Agent"
      ],
      "description": "Sovereign Autonomous AI Coding Agent Engineered for Zero-Destruction Autonomy",
      "publisher": {
        "@id": "https://crewloom.org/#organization"
      },
      "inLanguage": ["en", "ar"]
    },
    {
      "@type": "Organization",
      "@id": "https://crewloom.org/#organization",
      "name": "Crewloom",
      "alternateName": ["Crewloom AI", "كرو لوم", "Crewloom Autonomous Systems"],
      "url": "https://crewloom.org/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://crewloom.org/logo.png",
        "width": 1024,
        "height": 1024
      },
      "sameAs": [
        "https://github.com/crewloom",
        "https://github.com/crewloom/crewloom.github.io"
      ]
    },
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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "128",
        "bestRating": "5",
        "worstRating": "1"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <head>
        <link rel="author" href="https://crewloom.org" />
        <link rel="sitemap" type="application/xml" href="https://crewloom.org/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200 glow-mesh min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
