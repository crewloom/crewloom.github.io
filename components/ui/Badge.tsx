import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'cyan' | 'emerald' | 'amber' | 'purple' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulseDot?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  cyan: {
    container: 'bg-cyan-950/70 border-cyan-800/60 text-cyan-300',
    dot: 'bg-cyan-400',
  },
  emerald: {
    container: 'bg-emerald-950/70 border-emerald-800/60 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  amber: {
    container: 'bg-amber-950/70 border-amber-800/60 text-amber-300',
    dot: 'bg-amber-400',
  },
  purple: {
    container: 'bg-purple-950/70 border-purple-800/60 text-purple-300',
    dot: 'bg-purple-400',
  },
  neutral: {
    container: 'bg-white/5 border-white/10 text-gray-300',
    dot: 'bg-gray-400',
  },
};

export function Badge({
  className,
  variant = 'cyan',
  pulseDot = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border backdrop-blur shadow-inner transition-colors',
        styles.container,
        className
      )}
      {...props}
    >
      {pulseDot && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              styles.dot
            )}
          />
          <span
            className={cn('relative inline-flex rounded-full h-2 w-2', styles.dot)}
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
