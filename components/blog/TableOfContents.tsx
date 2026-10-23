'use client';

import React from 'react';
import { ListFilter } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  dir?: 'ltr' | 'rtl';
}

export function TableOfContents({ items, title = 'On this page', dir = 'ltr' }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm sticky top-24"
      aria-label="Table of Contents"
      dir={dir}
    >
      <div className="flex items-center gap-2 mb-3 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
        <ListFilter className="w-4 h-4" />
        <span>{title}</span>
      </div>
      <nav>
        <ul className="space-y-2 text-xs sm:text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? (dir === 'rtl' ? 'mr-3' : 'ml-3') : ''}
            >
              <a
                href={`#${item.id}`}
                className="text-gray-400 hover:text-cyan-300 transition-colors line-clamp-1 block py-0.5"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
