import type { EffectCallback, DependencyList } from 'react';
/**
 * UseEffect that does not run on the initial mount
 */
export default function useUpdateEffect(callback: EffectCallback, deps?: DependencyList): void;
