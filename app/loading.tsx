import { LogoLoader } from '@/components/common/LogoLoader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-950">
      <LogoLoader size={112} />
    </div>
  );
}
