import { useRef } from 'react'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

type UseDataReturn = {
  hasErrors: () => boolean
}

export default function useError(id: string): UseDataReturn {
  const sharedAttachmentsRef = useRef(null)

  sharedAttachmentsRef.current = useSharedState<{
    hasErrors?: UseDataReturn['hasErrors']
  }>(id + '-attachments')

  return {
    hasErrors:
      sharedAttachmentsRef.current?.data?.hasErrors || (() => false),
  }
}
