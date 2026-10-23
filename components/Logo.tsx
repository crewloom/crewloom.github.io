import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  glow?: boolean;
  size?: number;
}

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
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 rounded-2xl transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label="Crewloom Sovereign Brand Logo"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {/* Squircle Background Base */}
        <rect width="1024" height="1024" rx="232" fill="#0b0f14" stroke="rgba(255,255,255,0.12)" strokeWidth="16" />
        {/* Horizontal Loom Matrix Threads */}
        <g stroke="#5eead4" strokeWidth="26" strokeLinecap="round" opacity="0.45">
          <path d="M268 348H756M268 512H756M268 676H756" />
        </g>
        {/* Vertical Loom Matrix Threads */}
        <g stroke="#8ca9ff" strokeWidth="26" strokeLinecap="round" opacity="0.45">
          <path d="M372 262V762M512 262V762M652 262V762" />
        </g>
        {/* Center Loom Nucleus */}
        <circle cx="512" cy="512" r="188" fill="#0b0f14" />
        <circle cx="512" cy="512" r="188" fill="none" stroke={`url(#${gradId})`} strokeWidth="34" />
        {/* Sovereign "C" Core Arc */}
        <path d="M596 424a122 122 0 1 0 0 176" fill="none" stroke={`url(#${gradId})`} strokeWidth="58" strokeLinecap="round" />
      </svg>
    </div>
  );
}
