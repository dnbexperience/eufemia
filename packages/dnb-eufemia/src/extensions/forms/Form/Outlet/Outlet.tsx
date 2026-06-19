import { useContext, useMemo } from 'react'
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
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import FormElement from '../Element'

const invalidOutletErrorMessage =
  'Form.Outlet needs a valid formHandlerId that points to a mounted Form.Handler'

export type FormOutletProps = {
  /**
   * Required Form.Handler id used to link this outlet to a specific form context.
   */
  formHandlerId: SharedStateId

  /**
   * Content rendered inside the linked Form.Handler context.
   */
  children: ReactNode
}

function Outlet(props: FormOutletProps) {
  const { formHandlerId, children } = props
  const outerContext = useContext(DataContext)

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

  const dataContext = useMemo(() => {
    // Consume the reactive signals so the context is re-read on validation
    // state changes (e.g. submit-triggered showAllErrors) without a
    // redundant eslint-disable.
    void linkedValidationVersion
    void linkedShowAllErrors

    const context = dataContextStore.get() as ContextState

    if (!context?.hasContext) {
      throw new Error(invalidOutletErrorMessage)
    }

    return context
  }, [dataContextStore, linkedValidationVersion, linkedShowAllErrors])

  return (
    <DataContext.Provider value={dataContext}>
      {outerContext?.hasContext ? (
        children
      ) : (
        <FormElement>{children}</FormElement>
      )}
    </DataContext.Provider>
  )
}

withComponentMarkers(Outlet, {
  _supportsSpacingProps: 'children',
})

export default Outlet
