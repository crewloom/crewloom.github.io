import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  glow?: boolean;
  size?: number;
}

/**
 * Crewloom woven mark: teal weft threads are roles, violet warp threads are memory,
 * the ring is the evidence checkpoint. Geometry generated from
 * agent/apps/crewloom-desktop/src/lib/logo-geometry.ts (full layout); keep both in sync.
 */
const WEFT = '#2dd4bf';
const WARP = '#7388f5';
const THICKNESS = 34;
const THREADS: Array<{ axis: 'weft' | 'warp'; paths: string[]; caps: Array<[number, number]> }> = [
  { axis: 'warp', paths: ['M176 128V230', 'M176 282V384'], caps: [[176,128], [176,384]] },
  { axis: 'warp', paths: ['M256 128V150', 'M256 202V310', 'M256 362V384'], caps: [[256,128], [256,384]] },
  { axis: 'warp', paths: ['M336 128V230', 'M336 282V384'], caps: [[336,128], [336,384]] },
  { axis: 'weft', paths: ['M128 176H150', 'M202 176H310', 'M362 176H384'], caps: [[128,176], [384,176]] },
  { axis: 'weft', paths: ['M128 256H230', 'M282 256H352'], caps: [[128,256], [352,256]] },
  { axis: 'weft', paths: ['M128 336H150', 'M202 336H310', 'M362 336H384'], caps: [[128,336], [384,336]] },
];

export function Logo({ className = 'w-9 h-9', glow = true }: LogoProps) {
  const rawId = useId();
  // Sanitize id for SVG url reference
  const gradId = `crewloom-grad-${rawId.replace(/:/g, '')}`;

  return (
    <div className={cn('relative flex items-center justify-center shrink-0 select-none', className)}>
      {glow && (
        <div
          className="absolute inset-0 bg-gradient-to-tr from-teal-400/25 via-cyan-400/20 to-sky-400/25 blur-md rounded-2xl scale-110 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 rounded-2xl transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label="Crewloom"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="116" fill="#0b0f14" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
        {THREADS.map(thread => {
          const color = thread.axis === 'weft' ? WEFT : WARP;
          return (
            <g key={thread.paths[0]}>
              {thread.paths.map(d => (
                <path key={d} d={d} stroke={color} strokeWidth={THICKNESS} />
              ))}
              {thread.caps.map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={THICKNESS / 2} fill={color} />
              ))}
            </g>
          );
        })}
        <circle cx="404" cy="256" r="30" stroke={`url(#${gradId})`} strokeWidth="16" />
        <circle cx="404" cy="256" r="8" fill={`url(#${gradId})`} />
      </svg>
    </div>
  );
}
