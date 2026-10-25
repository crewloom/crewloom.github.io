import { cn } from '@/lib/utils';

interface LogoLoaderProps {
  className?: string;
  size?: number;
  /** Accessible name announced while loading. */
  label?: string;
}

/** Loading indicator: the Crewloom mark weaving itself. Motion-sensitive visitors get the finished mark. */
export function LogoLoader({ className, size = 96, label = 'Loading' }: LogoLoaderProps) {
  return (
    <span role="status" aria-label={label} className={cn('inline-flex shrink-0 select-none leading-[0]', className)}>
      <picture>
        <source media="(prefers-reduced-motion: reduce)" srcSet="/logo.svg" />
        {/* eslint-disable-next-line @next/next/no-img-element -- animated SVG: next/image would serve it static */}
        <img src="/logo-loader.svg" width={size} height={size} alt="" draggable={false} />
      </picture>
    </span>
  );
}
