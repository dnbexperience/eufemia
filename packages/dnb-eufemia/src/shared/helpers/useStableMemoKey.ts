import { useRef } from 'react'
import { shallowEqual } from './useSharedState'

/**
 * Returns a stable string key derived from a (shallow) object, suitable for
 * use as a `useMemo`/`useEffect` dependency – or for reconstructing the object
 * with `JSON.parse`.
 *
 * The relatively expensive `JSON.stringify` is only recomputed when the
 * object's shallow contents change (checked with the cheaper `shallowEqual`).
 * On renders where the input is shallow-equal to the previous one, the cached
 * key is returned without serializing again.
 *
 * The returned value equals `JSON.stringify(object ?? {})`, so it is a drop-in
 * replacement for calling `JSON.stringify` on every render.
 */
export default function useStableMemoKey(
  object?: Record<string, unknown> | null
): string {
  const cacheRef = useRef<{ object: unknown; key: string } | null>(null)

  if (
    !cacheRef.current ||
    !shallowEqual(cacheRef.current.object, object)
  ) {
    cacheRef.current = { object, key: JSON.stringify(object ?? {}) }
  }

  return cacheRef.current.key
}
