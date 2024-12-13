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
import Section from '../section/Section'
import Space from '../space/Space'
import StepIndicatorTriggerButton from './StepIndicatorTriggerButton'
import StepIndicatorList from './StepIndicatorList'
import StepIndicatorContext from './StepIndicatorContext'
import { HeightAnimation } from '../lib'

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
      <Section
        backgroundColor="var(--color-black-3)"
        innerSpace={{
          top: 'small',
          bottom: 'small',
        }}
      >
        <StepIndicatorTriggerButton
          onClick={() => {
            if (context.openState) {
              closeHandler()
            } else {
              context.openHandler()
            }
          }}
          inner_ref={triggerRef}
        />
      </Section>
      <HeightAnimation
        open={context.openState}
        onOpen={(state) => {
          if (state) {
            context.openHandler()
          } else {
            closeHandler()
          }
        }}
      >
        <Space innerSpace={{ top: 'small' }}>
          <StepIndicatorList />
        </Space>
      </HeightAnimation>
    </>
  )
}

export default StepIndicatorModal
