/**
 * SSR-safe useLayoutEffect hook
 *
 * During server-side rendering (SSR), `useLayoutEffect` can trigger warnings
 * because the DOM is not available. This hook uses `useEffect` on the server
 * and `useLayoutEffect` on the client, preventing SSR warnings while maintaining
 * proper layout effect behavior in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */
import { useEffect } from 'react';
export declare const useIsomorphicLayoutEffect: typeof useEffect;
