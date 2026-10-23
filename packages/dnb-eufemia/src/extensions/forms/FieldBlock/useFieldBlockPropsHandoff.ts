import { useContext } from 'react'
import {
  SharedStateScopeContext,
  createSharedState,
  isServerEnvironment,
} from '../../../shared/helpers/useSharedState'
import type { FieldBlockProps } from './FieldBlock'

/** Passes field props by id within a scoped render or the browser. */
export function useFieldBlockPropsHandoff(id: string) {
  const scope = useContext(SharedStateScopeContext)
  const key = 'field-block-props-' + id
  const isServer = isServerEnvironment()

  return {
    set(props: FieldBlockProps) {
      if (isServer && !scope) {
        return
      }
      const store = scope ?? undefined
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

      return undefined
    },
  }
}
