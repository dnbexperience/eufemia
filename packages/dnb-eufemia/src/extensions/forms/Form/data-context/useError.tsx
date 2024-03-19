import { useContext, useRef } from 'react'
import {
  SharedStateId,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import DataContext, { ContextState } from '../../DataContext/Context'

type UseDataReturn = {
  hasErrors: ContextState['hasErrors']
}

export default function useError(
  id: SharedStateId = undefined
): UseDataReturn {
  const sharedAttachmentsRef = useRef(null)
  sharedAttachmentsRef.current = useSharedState<UseDataReturn>(
    id + '-attachments'
  )

  // If no id is provided, use the context version
  const context = useContext(DataContext)
  const hasErrors =
    sharedAttachmentsRef.current?.data?.hasErrors ||
    (!id && context?.hasErrors) ||
    (() => false)

  return { hasErrors }
}
