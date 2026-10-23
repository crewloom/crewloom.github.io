import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dir?: 'ltr' | 'rtl';
}

export function Breadcrumbs({ items, dir = 'ltr' }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs sm:text-sm text-gray-400 py-3 mb-6 overflow-x-auto whitespace-nowrap"
      dir={dir}
    >
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:text-cyan-400 transition-colors"
            title="Crewloom Home"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              {isLast ? (
                <span
                  className="font-medium text-cyan-300 truncate max-w-[200px] sm:max-w-md"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-cyan-400 transition-colors truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
