import Link from 'next/link';
import { Compass, Home, Terminal, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container, Button, Badge } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-space-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 relative">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        <Container size="sm" className="relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="cyan" icon={<Compass className="w-3.5 h-3.5 text-cyan-400" />}>
              ERROR 404 · PAGE NOT FOUND
            </Badge>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 tracking-tighter mb-4 font-mono">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Lost in Sovereign Cyberspace · الصفحة غير موجودة
          </h2>

          <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto mb-8 leading-relaxed font-normal">
            The resource you requested does not exist or has been relocated within the sovereign runtime.
            <br />
            لم نتمكن من العثور على الصفحة المطلوبة، يمكنك العودة إلى إحدى الوجهات التالية:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/">
              <Button variant="primary" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                <span>Home Page</span>
              </Button>
            </Link>
            <Link href="/ar/">
              <Button variant="secondary" size="sm" className="gap-2">
                <span>الرئيسية بالعربية</span>
              </Button>
            </Link>
            <Link href="/blog/">
              <Button variant="ghost" size="sm" className="gap-2 border border-white/10 hover:border-cyan-500/40">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Articles & Research</span>
              </Button>
            </Link>
            <Link href="/#simulator">
              <Button variant="ghost" size="sm" className="gap-2 border border-white/10 hover:border-cyan-500/40">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Live Simulator</span>
              </Button>
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
