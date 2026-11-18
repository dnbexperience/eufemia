import { useCallback, useContext, useMemo, useRef } from 'react'
import type { JsonObject } from '../../utils/json-pointer'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import { warnOnServer } from '../../../../shared/helpers/warnOnServer'
import {
  createReferenceKey,
  createSharedState,
  useSharedStateStore,
  SharedStateScopeContext,
} from '../../../../shared/helpers/useSharedState'
import { defaultContextState } from '../../DataContext/Context'
import DataContextRefContext from '../../DataContext/DataContextRefContext'
import type { SharedAttachments } from '../../DataContext/Provider'
import type { UseDataReturn, UseDataSharedData } from './useData'
import { useDataReturn } from './useData'

export type UseDataWithoutSubscriptionReturn<Data> = Omit<
  UseDataReturn<Data>,
  'data'
> & {
  getData: () => Data
}

/**
 * Provides data management helpers without subscribing to data changes.
 */
export default function useDataWithoutSubscription<Data = JsonObject>(
  id: SharedStateId = undefined,
  initialData: Data = undefined
): UseDataWithoutSubscriptionReturn<Data> {
  const sharedDataRef = useRef<UseDataSharedData<Data> | null>(null)
  const sharedAttachmentsRef = useRef<ReturnType<
    typeof createSharedState<SharedAttachments<Data>>
  > | null>(null)

  const store = useSharedStateStore()
  // On the server, sharing by id needs a surrounding Form.Handler or Provider
  const hasScope = Boolean(useContext(SharedStateScopeContext))
  if (id && !hasScope) {
    warnOnServer(
      'Form.useDataWithoutSubscription',
      id,
      'gets no data from other components during server rendering, because no Form.Handler or Eufemia Provider surrounds it. Put it and the Form.Handler inside the same Provider.'
    )
  }
  sharedDataRef.current = id
    ? createSharedState<Data>(id, initialData, store)
    : null

  sharedAttachmentsRef.current = id
    ? createSharedState<SharedAttachments<Data>>(
        createReferenceKey(id, 'attachments', store),
        undefined,
        store
      )
    : null

  const dataContextRef = useContext(DataContextRefContext)
  const dataContext = dataContextRef?.current ?? defaultContextState

  const {
    remove,
    update,
    set,
    getValue,
    reduceToVisibleFields,
    filterData,
  } = useDataReturn({
    id,
    initialData,
    sharedDataRef,
    sharedAttachmentsRef,
    dataContext,
    dataContextRef,
    errorMessage:
      'useDataWithoutSubscription needs to run inside DataContext (Form.Handler) or have a valid id',
  })

  const getData = useCallback(() => {
    if (id) {
      return sharedDataRef.current?.get?.() as Data
    }

    return getValue('/') as Data
  }, [getValue, id])

  return useMemo(
    () => ({
      getData,
      remove,
      update,
      set,
      getValue,
      reduceToVisibleFields,
      filterData,
    }),
    [
      getData,
      remove,
      update,
      set,
      getValue,
      reduceToVisibleFields,
      filterData,
    ]
  )
}
