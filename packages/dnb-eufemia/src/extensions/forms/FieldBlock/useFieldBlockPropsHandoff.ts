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
  const isServer = isServerEnvironment()

  return {
    set(props: Record<string, unknown>) {
      const store =
        isServer && !scope
          ? getUnscopedServerStore()
          : (scope ?? undefined)
      createSharedState(key, undefined, store).set(props, {
        silent: true,
      })
    },
    get(): FieldBlockProps | undefined {
      if (!isServer) {
        return createSharedState<FieldBlockProps>(
          key,
          undefined,
          scope ?? undefined
        ).get()
      }

      const scopedProps = scope?.states.get(key)?.data
      if (scopedProps !== undefined) {
        return scopedProps
      }

      // The field may have rendered outside of the scope this FieldBlock is in
      const unscopedProps = unscopedServerStore?.states.get(key)?.data
      unscopedServerStore?.states.delete(key)

      return unscopedProps
    },
  }
}
