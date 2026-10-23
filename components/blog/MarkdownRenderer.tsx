import React from 'react';
import { Hash } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { TocItem } from './TableOfContents';

interface MarkdownRendererProps {
  content: string;
  dir?: 'ltr' | 'rtl';
}

/**
 * Creates a URL-friendly slug from heading text (supports English, Arabic, and numbers).
 */
export function slugifyHeading(text: string): string {
  return text
    .replace(/\*\*|`|\[.*?\]|\(.*?\)/g, '') // remove markdown tokens
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // replace non-alphanumeric unicode with hyphen
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts H2 and H3 headings for Table of Contents generation.
 */
export function extractHeadings(content: string): TocItem[] {
  const lines = content.split('\n');
  const headings: TocItem[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('## ')) {
      const text = line.slice(3).replace(/\*\*|`|\[.*?\]|\(.*?\)/g, '').trim();
      headings.push({
        id: slugifyHeading(text),
        text,
        level: 2,
      });
    } else if (line.startsWith('### ')) {
      const text = line.slice(4).replace(/\*\*|`|\[.*?\]|\(.*?\)/g, '').trim();
      headings.push({
        id: slugifyHeading(text),
        text,
        level: 3,
      });
    }
  }

  return headings;
}

function renderInline(text: string): React.ReactNode[] {
  // Regex pattern for bold, inline code, and links
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-white/[0.08] text-cyan-300 font-mono text-xs border border-white/[0.05]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const isExternal = url.startsWith('http');
      return (
        <a
          key={index}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export function MarkdownRenderer({ content, dir = 'ltr' }: MarkdownRendererProps) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyIndex = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      
      elements.push(
        <CodeBlock
          key={`code-${keyIndex++}`}
          code={codeLines.join('\n')}
          language={lang}
        />
      );
      continue;
    }

    // Markdown Table
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        
        // Skip separator line tableLines[1] (e.g. | :--- | :--- |)
        const bodyLines = tableLines.slice(2);

        elements.push(
          <div key={`table-${keyIndex++}`} className="my-8 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm" dir={dir}>
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  {headerCells.map((header, idx) => (
                    <th key={idx} className="px-4 py-3.5 font-bold text-cyan-300 font-mono tracking-wider">
                      {renderInline(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {bodyLines.map((rowLine, rowIdx) => {
                  const cells = rowLine
                    .split('|')
                    .slice(1, -1)
                    .map((c) => c.trim());
                  return (
                    <tr key={rowIdx} className="hover:bg-white/[0.02] transition-colors">
                      {cells.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 text-gray-300">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Heading 2
    if (line.startsWith('## ')) {
      const rawHeadingText = line.slice(3).trim();
      const slug = slugifyHeading(rawHeadingText);

      elements.push(
        <h2
          key={`h2-${keyIndex++}`}
          id={slug}
          className="group text-2xl sm:text-3xl font-black text-white tracking-tight mt-10 mb-4 border-b border-white/[0.08] pb-3 flex items-center gap-2 scroll-mt-24"
        >
          <span>{renderInline(rawHeadingText)}</span>
          <a
            href={`#${slug}`}
            aria-label={`Link to section: ${rawHeadingText}`}
            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-cyan-400 transition-opacity p-1"
          >
            <Hash className="w-4 h-4" />
          </a>
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3
    if (line.startsWith('### ')) {
      const rawHeadingText = line.slice(4).trim();
      const slug = slugifyHeading(rawHeadingText);

      elements.push(
        <h3
          key={`h3-${keyIndex++}`}
          id={slug}
          className="group text-lg sm:text-xl font-bold text-cyan-300 tracking-tight mt-8 mb-3 flex items-center gap-2 scroll-mt-24"
        >
          <span>{renderInline(rawHeadingText)}</span>
          <a
            href={`#${slug}`}
            aria-label={`Link to subsection: ${rawHeadingText}`}
            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-cyan-400 transition-opacity p-1"
          >
            <Hash className="w-3.5 h-3.5" />
          </a>
        </h3>
      );
      i++;
      continue;
    }

    // Bullet List
    if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${keyIndex++}`} className="my-4 space-y-2 list-disc list-inside text-gray-300 text-sm sm:text-base leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${keyIndex++}`} className="my-4 text-gray-300 text-base leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-2" dir={dir}>{elements}</div>;
}
