import { useContext } from 'react'
import type { SharedStateStore } from '../../../shared/helpers/useSharedState'
import {
  SharedStateScopeContext,
  createSharedState,
  createSharedStateStore,
  isServerEnvironment,
} from '../../../shared/helpers/useSharedState'
import type { FieldBlockProps } from './FieldBlock'

let unscopedServerStore: SharedStateStore | null = null

function getUnscopedServerStore() {
  if (!unscopedServerStore) {
    unscopedServerStore = createSharedStateStore()
    queueMicrotask(() => {
      unscopedServerStore = null
    })
  }

  return unscopedServerStore
}

/**
 * Passes the props of a field to its FieldBlock.
 * On the server without a scope, the props only live until the
 * FieldBlock has read them or the current render work is done.
 */
export function useFieldBlockPropsHandoff(id: string) {
  const scope = useContext(SharedStateScopeContext)
  const key = 'field-block-props-' + id
  const isUnscopedServer = !scope && isServerEnvironment()
  const store = isUnscopedServer
    ? getUnscopedServerStore()
    : (scope ?? undefined)

  return {
    set(props: Record<string, unknown>) {
      createSharedState(key, undefined, store).set(props, {
        silent: true,
      })
    },
    get(): FieldBlockProps | undefined {
      const data = createSharedState<FieldBlockProps>(
        key,
        undefined,
        store
      ).get()

      if (isUnscopedServer) {
        store.states.delete(key)
      }

      return data
    },
  }
}
