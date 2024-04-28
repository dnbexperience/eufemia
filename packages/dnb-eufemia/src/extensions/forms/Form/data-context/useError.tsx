import { useCallback, useMemo, useRef } from 'react'
import {
  SharedStateId,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useDataContext from './useDataContext'
import { ContextState } from '../../DataContext/Context'

type UseDataReturn = {
  hasErrors: ContextState['hasErrors']
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
  const context = useDataContext()
  const hasErrors =
    sharedAttachmentsRef.current?.data?.hasErrors ||
    (!id && context?.hasErrors) ||
    fallback

  // Error handling
  const setSubmitState =
    sharedAttachmentsRef.current?.data?.setSubmitState ||
    (!id && context?.setSubmitState) ||
    fallback
  const setFormError = useCallback(
    (error: Error) => {
      setSubmitState?.({ error })
      // console.error(error)
    },
    [setSubmitState]
  )

  return useMemo(
    () => ({ hasErrors, setFormError }),
    [hasErrors, setFormError]
  )
}
