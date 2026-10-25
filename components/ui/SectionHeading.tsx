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
        'mb-12 sm:mb-16',
        isCenter ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl',
        className
      )}
      {...props}
    >
      {badge && (
        <div className={cn('mb-4', isCenter ? 'flex justify-center' : 'inline-block')}>
          <Badge
            variant={badgeVariant}
            pulseDot={pulseDot}
            icon={badgeIcon}
            className="tracking-wider uppercase"
          >
            {badge}
          </Badge>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.25] mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-gray-300/80 font-normal leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
