import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'interactive' | 'beam';
}

export function Card({
  className,
  variant = 'glass',
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    glass:
      'bg-space-900/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-2xl',
    solid:
      'bg-space-950 border border-white/10 shadow-xl rounded-2xl',
    interactive:
      'bg-space-900/60 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 hover:bg-space-900/80 transition-all duration-300 rounded-2xl group',
    beam:
      'beam-border rounded-2xl shadow-2xl',
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {variant === 'beam' ? (
        <div className="beam-content p-6 sm:p-8">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6 pb-3', className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-bold text-white tracking-tight leading-none', className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs sm:text-sm text-gray-400 leading-relaxed font-normal', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0 border-t border-white/[0.06] mt-4', className)}
      {...props}
    />
  );
}
