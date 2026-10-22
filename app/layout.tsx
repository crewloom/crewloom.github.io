import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crewloom — الوكيل البرمجي السيادي ثنائي النواة | Sovereign Dual-Core AI Agent",
  description: "Crewloom is an autonomous sovereign AI coding agent with a dual Arabic/English core, 44 specialist roles, absolute Zero-Destruction guarantee, and omni-channel bridge mediation.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200 glow-mesh min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
