import { useContext, useMemo, useRef } from 'react'
import type { JsonObject } from '../../utils/json-pointer'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import {
  createReferenceKey,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'
import { defaultContextState } from '../../DataContext/Context'
import DataContextRefContext from '../../DataContext/DataContextRefContext'
import type { SharedAttachments } from '../../DataContext/Provider'
import type { UseDataReturn, UseDataSharedData } from './useData'
import { useDataReturn } from './useData'

export type UseDataWithoutSubscriptionReturn<Data> = Omit<
  UseDataReturn<Data>,
  'data'
>

/**
 * Provides data management helpers without subscribing the component to data
 * changes.
 */
export default function useDataWithoutSubscription<Data = JsonObject>(
  id: SharedStateId = undefined,
  initialData: Data = undefined
): UseDataWithoutSubscriptionReturn<Data> {
  const sharedDataRef = useRef<UseDataSharedData<Data> | null>(null)
  const sharedAttachmentsRef = useRef<ReturnType<
    typeof createSharedState<SharedAttachments<Data>>
  > | null>(null)

  sharedDataRef.current = id
    ? createSharedState<Data>(id, initialData)
    : null

  sharedAttachmentsRef.current = id
    ? createSharedState<SharedAttachments<Data>>(
        createReferenceKey(id, 'attachments')
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

  return useMemo(
    () => ({
      remove,
      update,
      set,
      getValue,
      reduceToVisibleFields,
      filterData,
    }),
    [remove, update, set, getValue, reduceToVisibleFields, filterData]
  )
}
