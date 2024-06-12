/**
 * Web StepIndicator Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import Drawer from '../drawer/Drawer'
import StepIndicatorTriggerButton from './StepIndicatorTriggerButton'
import StepIndicatorList from './StepIndicatorList'
import StepIndicatorContext from './StepIndicatorContext'

function StepIndicatorModal() {
  const context = useContext(StepIndicatorContext)

  const [container, setContainer] = useState(null)

  const triggerRef = useRef(null)

  useEffect(() => {
    const container = document.getElementById(
      'sidebar__' + context.sidebar_id
    )

    setContainer(container)
  }, [context.sidebar_id])

  const closeHandler = useCallback(() => {
    if (context.hasSidebar) {
      triggerRef.current?.focus()
    }
    context.closeHandler()
  }, [context])

  const renderPortal = useCallback(() => {
    if (!container) {
      return null
    }

    return ReactDOM.createPortal(<StepIndicatorList />, container)
  }, [container])

  if (context.sidebarIsVisible) {
    return renderPortal()
  }

  return (
    <>
      <StepIndicatorTriggerButton
        on_click={context.openHandler}
        inner_ref={triggerRef}
      />
      <Drawer
        id={context.sidebar_id}
        title={context.overview_title}
        omitTriggerButton
        openState={context.openState}
        onOpen={context.openHandler}
        onClose={closeHandler}
      >
        <Drawer.Body styleType="white">
          <div className="dnb-step-indicator-wrapper">
            <p className="dnb-p dnb-step-indicator__label">
              {context.stepsLabelExtended}
            </p>
            <StepIndicatorList />
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  )
}

export default StepIndicatorModal
