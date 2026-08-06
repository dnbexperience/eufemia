import { useContext, useRef } from 'react'
import type { ReactNode } from 'react'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import {
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import type { SharedAttachments } from '../../DataContext/Provider'
import type { ContextState } from '../../DataContext/Context'
import DataContext from '../../DataContext/Context'
import DataContextRefContext from '../../DataContext/DataContextRefContext'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import FormElement from '../Element'
import FlexLayoutContext from '../../../../components/flex/FlexLayoutContext'
import FlexLayoutChildren, {
  useFlexLayoutRoot,
} from '../../../../components/flex/FlexLayoutChildren'

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
  const flexLayout = useContext(FlexLayoutContext)
  const isInsideLinkedHandler =
    outerContext?.hasContext && outerContext?.id === formHandlerId

  // Subscribe to reactive attachments updates to trigger re-renders
  // when linked validation/form state changes in the source handler.
  useSharedState<SharedAttachments<unknown>>(
    createReferenceKey(formHandlerId, 'attachments')
  )

  const { data: dataContext } = useSharedState<ContextState>(
    createReferenceKey(formHandlerId, 'data-context')
  )

  const dataContextRef = useRef<ContextState>(undefined)
  const layoutRootRef = useRef<HTMLFormElement>(null)
  const rootLayout = useFlexLayoutRoot(flexLayout, layoutRootRef)

  if (!dataContext?.hasContext) {
    return null
  }

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
          <FormElement ref={layoutRootRef}>
            <FlexLayoutChildren layout={rootLayout}>
              {children}
            </FlexLayoutChildren>
          </FormElement>
        )}
      </DataContextRefContext>
    </DataContext.Provider>
  )
}

withComponentMarkers(Outlet, {
  _supportsSpacingProps: 'children',
})

export default Outlet
