import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'glow' | 'outline' | 'ghost' | 'cyber';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-black font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 active:scale-[0.98]',
  glow:
    'relative bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] hover:brightness-110 active:scale-[0.98]',
  outline:
    'border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/40 hover:border-cyan-400 active:scale-[0.98]',
  ghost:
    'text-gray-400 hover:text-white hover:bg-white/5 active:scale-[0.98]',
  cyber:
    'font-mono bg-space-950 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-950/80 hover:border-cyan-500 shadow-inner active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1 text-xs rounded-md gap-1.5',
  sm: 'px-3 py-1.5 text-xs sm:text-sm rounded-lg gap-2',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2.5',
  lg: 'px-6 py-3.5 text-base rounded-xl gap-3 font-semibold',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-950',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
