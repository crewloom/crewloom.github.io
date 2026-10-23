import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { createPageMetadata } from "@/lib/seo/metadata";
import { generateWebSiteSchema, generateOrganizationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

const baseMetadata = createPageMetadata({
  titleTemplate: "%s | Crewloom",
  pathname: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  other: {
    "llms": "https://crewloom.org/llms.txt",
    "llms-full": "https://crewloom.org/llms-full.txt",
    "ai-intent": "Autonomous Software Engineering, AI Coding Agent, Contract Verification",
  },
  verification: {
    google: "google6d88c509a96bb024",
  },
};

const rootSchemas = [
  generateWebSiteSchema(),
  generateOrganizationSchema(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="author" href="https://crewloom.org" />
        <link rel="sitemap" type="application/xml" href="https://crewloom.org/sitemap.xml" />
        <JsonLd data={rootSchemas} />
      </head>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200 glow-mesh min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
