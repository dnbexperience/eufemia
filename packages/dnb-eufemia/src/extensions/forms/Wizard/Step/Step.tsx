import React, { useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import WizardContext from '../Context/WizardContext'
import Flex from '../../../../components/flex/Flex'
import { convertJsxToString } from '../../../../shared/component-helper'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type Props = ComponentProps &
  FlexContainerProps & {
    /**
     * A title that will be displayed in the indicator.
     */
    title?: React.ReactNode

    /**
     * To determine if the step should be rendered.
     * Used internally by the WizardContainer.
     */
    index?: number
  }

function Step(props: Props) {
  const { className, title, index, children, ...restProps } = props
  const { activeIndex, stepElementRef } = useContext(WizardContext) || {}

  const ariaLabel = useMemo(() => {
    return convertJsxToString(title)
  }, [title])

  const currentElementRef = useRef<HTMLElement>()
  useLayoutEffect(() => {
    if (typeof stepElementRef !== 'undefined') {
      if (currentElementRef.current) {
        stepElementRef.current = currentElementRef.current
      }
      return () => {
        stepElementRef.current = null
      }
    }
  }, [stepElementRef])

  if (activeIndex !== index) {
    // Another step is active
    return null
  }

  return (
    <Flex.Stack
      className={classnames('dnb-forms-step', className)}
      element="section"
      aria-label={ariaLabel}
      innerRef={currentElementRef}
      tabIndex={-1}
      {...restProps}
    >
      {children}
    </Flex.Stack>
  )
}

Step._supportsSpacingProps = true
export default Step
