import { useCallback, useContext } from 'react'
import { useTranslation } from '../../hooks'
import type { Path } from '../../types'
import DataContext from '../../DataContext/Context'
import {
  useSharedState,
  useSharedStateStore,
} from '../../../../shared/helpers/useSharedState'

type SharedState = {
  show?: boolean
  limit?: number
  total?: number
}

// A key per form that does not keep the form in memory after it unmounts
const formKeys = new WeakMap<object, string>()
let formCount = 0

function getFormKey(form: object) {
  let key = formKeys.get(form)
  if (!key) {
    key = `form-${++formCount}-`
    formKeys.set(form, key)
  }
  return key
}

export default function useArrayLimit(path: Path) {
  const store = useSharedStateStore()
  const { internalDataRef } = useContext(DataContext) || {}

  // Give each form its own limit, so another form with the same path does
  // not change it
  const formKey = internalDataRef ? getFormKey(internalDataRef) : ''
  const sharedState = useSharedState<SharedState>(
    formKey + path + '-iterate-limit',
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
