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
    "Crewloom is the sovereign autonomous AI coding agent engineered for zero-destruction software development, 44 specialist skills, dual English/Arabic intelligence, and omni-channel bridge mediation.",
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
    "كرو لوم",
    "وكيل برمجي",
    "ذكاء اصطناعي للبرمجة",
    "أتمتة برمجية",
  ],
  authors: [{ name: "Crewloom Team", url: "https://crewloom.org" }],
  creator: "Crewloom Autonomous Systems",
  publisher: "Crewloom",
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
      "The premier autonomous development engine uniting 44 open-source specialist skills with a disciplined proprietary core and strict Zero-Destruction verification.",
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crewloom — Sovereign Autonomous AI Coding Agent",
    description:
      "Autonomous coding runtime uniting 44 specialist skills with Zero-Destruction guarantee.",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://crewloom.org/#website",
      "url": "https://crewloom.org/",
      "name": "Crewloom",
      "alternateName": ["Crewloom AI", "كرو لوم", "Crewloom Sovereign Engine", "crewloom.org"],
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
      "alternateName": ["Crewloom AI", "كرو لوم"],
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
      "description": "The sovereign autonomous AI coding agent engineered for zero-destruction software development with 44 specialist skills.",
      "url": "https://crewloom.org/",
      "downloadUrl": "https://crewloom.org/install.sh",
      "softwareVersion": "1.0.0",
      "author": {
        "@id": "https://crewloom.org/#organization"
      }
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
