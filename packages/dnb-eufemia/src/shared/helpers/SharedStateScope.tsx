import type { ReactNode } from 'react'
import {
  SharedStateScopeContext,
  useSharedStateStore,
} from './useSharedState'

/**
 * Gives each server render its own shared state store.
 * Nested scopes reuse the outermost store. In the browser, the process-wide store is used.
 */
export default function SharedStateScope({
  children,
}: {
  children: ReactNode
}) {
  const store = useSharedStateStore()

  return (
    <SharedStateScopeContext value={store}>
      {children}
    </SharedStateScopeContext>
  )
}
