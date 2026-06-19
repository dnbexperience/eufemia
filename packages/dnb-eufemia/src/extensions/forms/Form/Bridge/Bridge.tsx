import { useContext, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import {
  createSharedState,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import type { SharedAttachments } from '../../DataContext/Provider'
import type { ContextState } from '../../DataContext/Context'
import DataContext from '../../DataContext/Context'
import DataContextRefContext from '../../DataContext/DataContextRefContext'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import FormElement from '../Element'

const invalidBridgeErrorMessage =
  'Form.Bridge needs a valid formHandlerId that points to a mounted Form.Handler'

export type FormBridgeProps = {
  /**
   * Required Form.Handler id used to link this bridge to a specific form context.
   */
  formHandlerId: SharedStateId

  /**
   * Content rendered inside the linked Form.Handler context.
   */
  children: ReactNode
}

function Bridge(props: FormBridgeProps) {
  const { formHandlerId, children } = props
  const outerContext = useContext(DataContext)
  const isInsideLinkedHandler =
    outerContext?.hasContext && outerContext?.id === formHandlerId

  // Subscribe to reactive attachments updates to trigger re-renders
  // when linked validation/form state changes in the source handler.
  const { data: linkedAttachments } = useSharedState<
    SharedAttachments<unknown>
  >(createReferenceKey(formHandlerId, 'attachments'))
  const linkedValidationVersion = linkedAttachments?.validationVersion
  const linkedShowAllErrors = linkedAttachments?.showAllErrors

  // Stable reference to the linked data-context shared store.
  // createSharedState is idempotent — safe to call in render, but we memoize
  // the result so useMemo below has a stable dep without an eslint-disable.
  const dataContextStore = useMemo(
    () =>
      createSharedState<ContextState>(
        createReferenceKey(formHandlerId, 'data-context')
      ),
    [formHandlerId]
  )

  const dataContextRef = useRef<ContextState>(undefined)

  const dataContext = useMemo(() => {
    // Consume the reactive signals so the context is re-read on validation
    // state changes (e.g. submit-triggered showAllErrors) without a
    // redundant eslint-disable.
    void linkedValidationVersion
    void linkedShowAllErrors

    const context = dataContextStore.get() as ContextState

    if (!context?.hasContext) {
      throw new Error(invalidBridgeErrorMessage)
    }

    return context
  }, [dataContextStore, linkedValidationVersion, linkedShowAllErrors])

  // Mirror the linked context into a stable ref so consumers using
  // `useDataValue` (which subscribe through `DataContextRefContext`) can
  // resolve `subscribeDataValue` and re-render on data changes.
  dataContextRef.current = dataContext

  return (
    <DataContext.Provider value={dataContext}>
      <DataContextRefContext value={dataContextRef}>
        {isInsideLinkedHandler ? (
          children
        ) : (
          <FormElement>{children}</FormElement>
        )}
      </DataContextRefContext>
    </DataContext.Provider>
  )
}

withComponentMarkers(Bridge, {
  _supportsSpacingProps: 'children',
})

export default Bridge
