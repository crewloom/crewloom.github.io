'use client';

import { useState, useCallback } from 'react';

interface UseClipboardOptions {
  timeout?: number;
}

export function useClipboard({ timeout = 2500 }: UseClipboardOptions = {}) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        setError(new Error('Clipboard API not available in this environment'));
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setError(null);

        setTimeout(() => {
          setCopiedText((current) => (current === text ? null : current));
        }, timeout);

        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to copy text'));
        return false;
      }
    },
    [timeout]
  );

  const isCopied = useCallback(
    (text: string) => copiedText === text,
    [copiedText]
  );

  return {
    copiedText,
    isCopied,
    copy,
    hasCopied: copiedText !== null,
    error,
  };
}
