import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Crewloom — Sovereign Dual-Core AI Coding Agent | الوكيل البرمجي السيادي",
  description:
    "Crewloom is an autonomous sovereign AI coding agent with a dual English/Arabic core, 44 specialist roles, absolute Zero-Destruction guarantee, and omni-channel bridge mediation.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Crewloom — Sovereign Dual-Core AI Coding Agent",
    description:
      "The premier autonomous development runtime merging 44 open-source specialist skills with a proprietary disciplined engine.",
    url: "https://crewloom.org",
    siteName: "Crewloom",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200 glow-mesh min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
