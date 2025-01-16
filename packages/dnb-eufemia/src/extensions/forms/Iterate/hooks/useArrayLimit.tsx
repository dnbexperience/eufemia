import { useCallback } from 'react'
import { useTranslation } from '../../hooks'
import { Path } from '../../types'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

type SharedState = {
  show?: boolean
  limit?: number
  total?: number
}

export default function useArrayLimit(path: Path) {
  const sharedState = useSharedState<SharedState>(path + '-iterate-limit')
  const { set, update, extend, data } = sharedState || {}
  const { limit, total, show } = data || {}

  const setLimitProps = useCallback(
    (props: Omit<SharedState, 'show'>) => {
      if (props.total !== total) {
        update(props)
      } else {
        set(props)
      }
    },
    [set, total, update]
  )

  const setShowStatus = useCallback(
    (show: boolean) => {
      extend({ show })
    },
    [extend]
  )

  const hasReachedLimit = typeof limit === 'number' && total >= limit
  const { itemsLimitReached } = useTranslation().IteratePushContainer
  const error = show
    ? new Error(itemsLimitReached.replace('{limit}', String(limit)))
    : undefined

  return { setShowStatus, setLimitProps, error, hasReachedLimit }
}
