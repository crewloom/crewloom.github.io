import React from "react";

export function Logo({ className = "w-10 h-10", glow = true }: { className?: string; glow?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-cyan-500/25 blur-xl rounded-full scale-125 pointer-events-none animate-pulse" />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Gradients for Interwoven Loom Strands */}
          <linearGradient id="loomGrad1" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          
          <linearGradient id="loomGrad2" x1="90" y1="20" x2="10" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="loomGrad3" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>

          <linearGradient id="coreGlow" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Hex-Loom Framework (Isometric Weave) */}
        <g filter="url(#subtleShadow)">
          {/* Strand Alpha - Cybernetic Loop Left */}
          <path
            d="M50 12 L78 28 L78 48 C78 62 66 74 50 74 C34 74 22 62 22 48 L22 28 Z"
            stroke="url(#loomGrad1)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-95"
          />

          {/* Strand Beta - Interlocking Infinity Arch */}
          <path
            d="M26 36 L50 50 L74 36 L74 64 L50 78 L26 64 Z"
            stroke="url(#loomGrad2)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />

          {/* Strand Gamma - Vertical Convergence Loom Spine */}
          <path
            d="M50 18 L50 82 M34 40 L66 60 M66 40 L34 60"
            stroke="url(#loomGrad3)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            className="opacity-80"
          />

          {/* Central Sovereign Nucleus Node */}
          <circle cx="50" cy="50" r="8" fill="url(#coreGlow)" />
          <circle cx="50" cy="50" r="13" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 2" className="animate-spin origin-center" style={{ animationDuration: '8s' }} />
        </g>
      </svg>
    </div>
  );
}
