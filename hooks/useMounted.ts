'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to check if component has mounted on client, preventing hydration mismatches
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
