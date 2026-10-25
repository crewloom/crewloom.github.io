import React from 'react';
import { cn } from '@/lib/utils';
import { Badge, BadgeVariant } from './Badge';

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  badge?: string;
  badgeVariant?: BadgeVariant;
  badgeIcon?: React.ReactNode;
  pulseDot?: boolean;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'center' | 'left';
}

export function SectionHeading({
  className,
  badge,
  badgeVariant = 'cyan',
  badgeIcon,
  pulseDot = false,
  title,
  description,
  align = 'center',
  ...props
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-8 sm:mb-10',
        isCenter ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-xl',
        className
      )}
      {...props}
    >
      {badge && (
        <div className={cn('mb-2.5 sm:mb-3', isCenter ? 'flex justify-center' : 'inline-block')}>
          <Badge
            variant={badgeVariant}
            pulseDot={pulseDot}
            icon={badgeIcon}
            className="tracking-wider uppercase text-[10px] sm:text-xs py-0.5 px-2.5"
          >
            {badge}
          </Badge>
        </div>
      )}

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-[1.25] mb-2 sm:mb-2.5">
        {title}
      </h2>

      {description && (
        <p className="text-xs sm:text-sm text-gray-300/80 font-normal leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
