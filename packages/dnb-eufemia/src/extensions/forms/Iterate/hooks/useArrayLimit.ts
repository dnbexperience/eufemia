import { useCallback, useContext } from 'react'
import { useTranslation } from '../../hooks'
import type { Path } from '../../types'
import DataContext from '../../DataContext/Context'
import {
  createReferenceKey,
  useSharedState,
  useSharedStateStore,
} from '../../../../shared/helpers/useSharedState'

type SharedState = {
  show?: boolean
  limit?: number
  total?: number
}

export default function useArrayLimit(path: Path) {
  const store = useSharedStateStore()
  const { internalDataRef } = useContext(DataContext) || {}

  // Give each form its own limit, so another form with the same path does
  // not change it
  const key = path + '-iterate-limit'
  const sharedState = useSharedState<SharedState>(
    internalDataRef
      ? createReferenceKey(internalDataRef, key, store)
      : key,
    undefined,
    undefined,
    { store }
  )
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
