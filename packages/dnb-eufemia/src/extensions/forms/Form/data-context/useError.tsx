import { useRef } from 'react'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import type { ContextState } from '../../DataContext/Context'

type UseDataReturn = {
  hasErrors: ContextState['hasErrors']
}

export default function useError(id: string): UseDataReturn {
  const sharedAttachmentsRef = useRef(null)
  sharedAttachmentsRef.current = useSharedState<UseDataReturn>(
    id + '-attachments'
  )

  const { data } = sharedAttachmentsRef.current

  return {
    hasErrors: data?.hasErrors || (() => false),
  }
}
