import { useSyncExternalStore } from 'react'

const subscribe = () => () => undefined
const getClientSnapshot = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined'
const getServerSnapshot = () => false

/**
 * False on the server and during hydration, true in all other client renders.
 * Set `waitForHydration` to false to skip the extra render after hydration.
 */
export default function useCanUseDOM({
  waitForHydration = true,
}: { waitForHydration?: boolean } = {}) {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    waitForHydration ? getServerSnapshot : getClientSnapshot
  )
}
