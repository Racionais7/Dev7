import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport width is below the given breakpoint (default 640px).
 * Listens for resize so components re-render when the user rotates / resizes.
 */
export default function useIsMobile(breakpoint = 640) {
  const getMatch = () =>
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;

  const [isMobile, setIsMobile] = useState(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    // Safari <14 fallback
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else mql.addListener(handler);
    setIsMobile(mql.matches);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler);
      else mql.removeListener(handler);
    };
  }, [breakpoint]);

  return isMobile;
}
