import { useSyncExternalStore } from 'react'

const subscribe = () => () => undefined
const getClientSnapshot = () => typeof document !== 'undefined'
const getServerSnapshot = () => false

/**
 * Returns `false` on the server and while React hydrates server-rendered markup, and `true` otherwise.
 * Use it to render browser-only output after hydration without a hydration mismatch.
 */
export default function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )
}
