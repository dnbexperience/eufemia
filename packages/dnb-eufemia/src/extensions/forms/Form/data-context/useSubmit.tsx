import { useCallback, useContext, useMemo } from 'react'
import {
  SharedStateId,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import DataContext, { ContextState } from '../../DataContext/Context'
import type { EventStateObject } from '../../types'

const invalidUseSubmitErrorMessage =
  'Form.useSubmit needs to run inside Form.Handler or have a valid id'

export type UseSubmitReturn = {
  /**
   * Triggers form submit. Runs validation and calls the form's onSubmit when valid.
   * Use this when the submit button is rendered outside Form.Element (e.g. in a modal footer).
   * Resolves with the submit result or undefined.
   */
  submit: () => Promise<EventStateObject | undefined>

  /**
   * Whether the form is currently submitting via a React transition.
   * True from when the submit starts until the async onSubmit completes.
   */
  isPending: boolean
}

/**
 * Hook to trigger form submit from outside the form element.
 * Must be used within Form.Handler, or linked via an id to a Form.Handler.
 *
 * Useful when the submit button is placed outside Form.Element (e.g. in a drawer footer or toolbar).
 *
 * @param id - Optional id to link to a Form.Handler outside the component tree (string, function, object or React Context).
 * @returns {UseSubmitReturn} Object with a `submit` function that triggers the form submit flow.
 * @throws Error when used outside Form.Handler and no valid id is provided.
 */
export default function useSubmit(id?: SharedStateId): UseSubmitReturn {
  const { get } = useSharedState<ContextState>(
    createReferenceKey(id, 'data-context')
  )
  const dataContext = useContext(DataContext)

  if (!id && !dataContext?.hasContext) {
    throw new Error(invalidUseSubmitErrorMessage)
  }

  const isPending = id ? get()?.isPending ?? false : dataContext?.isPending ?? false

  const submit = useCallback(() => {
    const context = id ? get() : dataContext

    if (!context?.hasContext) {
      return Promise.reject(new Error(invalidUseSubmitErrorMessage))
    }

    return context.handleSubmit?.() ?? Promise.resolve(undefined)
  }, [dataContext, get, id])

  return useMemo(() => ({ submit, isPending }), [submit, isPending])
}
