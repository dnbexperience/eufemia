import { useCallback, useContext, useMemo, useRef } from 'react'
import {
  SharedStateId,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import DataContext, { ContextState } from '../../DataContext/Context'

type UseDataReturn = {
  hasErrors: ContextState['hasErrors']
  hasFieldError: ContextState['hasFieldError']
  setFormError: (error: Error) => void
}

export default function useError(
  id: SharedStateId = undefined
): UseDataReturn {
  const sharedAttachmentsRef = useRef(null)
  sharedAttachmentsRef.current = useSharedState<UseDataReturn>(
    id + '-attachments'
  )

  const fallback = useCallback(() => false, [])

  // If no id is provided, use the context version
  const context = useContext(DataContext)
  const hasErrors =
    sharedAttachmentsRef.current?.data?.hasErrors ||
    (!id && context?.hasErrors) ||
    fallback
  const hasFieldError =
    sharedAttachmentsRef.current?.data?.hasFieldError ||
    (!id && context?.hasFieldError) ||
    fallback

  // Error handling
  const setSubmitState =
    sharedAttachmentsRef.current?.data?.setSubmitState ||
    (!id && context?.setSubmitState) ||
    fallback
  const setFormError = useCallback(
    (error: Error) => {
      setSubmitState?.({ error })
    },
    [setSubmitState]
  )

  return useMemo(
    () => ({ hasErrors, hasFieldError, setFormError }),
    [hasErrors, hasFieldError, setFormError]
  )
}
