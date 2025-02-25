import React, { useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import WizardContext from '../Context/WizardContext'
import Flex from '../../../../components/flex/Flex'
import { convertJsxToString } from '../../../../shared/component-helper'
import FieldProvider from '../../Field/Provider'
import type { VisibleWhen } from '../../Form/Visibility'

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
     * Will treat the step as non-navigable if set to `true`.
     */
    inactive?: boolean

    /**
     * To determine if the step should be rendered.
     * Used internally by the WizardContainer.
     */
    index?: number

    /**
     * Will make all the fields inside the step to be required.
     */
    required?: boolean

    /**
     * If set to `false`, the step will not be rendered.
     */
    active?: boolean

    /**
     * Provide a `path` and a `hasValue` property with the expected value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.
     */
    activeWhen?: VisibleWhen

    /**
     * If set to `true`, the step will always be rendered.
     * For internal use only.
     */
    prerenderFieldProps?: boolean
  }

function Step(props: Props): JSX.Element {
  const {
    className,
    title,
    inactive,
    index,
    active = true,
    activeWhen,
    required,
    prerenderFieldProps,
    children,
    ...restProps
  } = props
  const { check, activeIndex, stepsRef, stepElementRef } =
    useContext(WizardContext) || {}

  const ariaLabel = useMemo(() => {
    return (
      (!prerenderFieldProps &&
        (stepsRef?.current?.[index]?.title ||
          stepsRef?.current?.[index])) ??
      convertJsxToString(title)
    )
  }, [index, prerenderFieldProps, title, stepsRef])

  const currentElementRef = useRef<HTMLElement>()
  useLayoutEffect(() => {
    if (!prerenderFieldProps && typeof stepElementRef !== 'undefined') {
      if (currentElementRef.current) {
        stepElementRef.current = currentElementRef.current
      }
      return () => {
        stepElementRef.current = null
      }
    }
  }, [prerenderFieldProps, stepElementRef])

  if (prerenderFieldProps) {
    return children as JSX.Element
  }

  if (
    activeIndex !== index ||
    active === false ||
    (activeWhen && !check({ visibleWhen: activeWhen }))
  ) {
    // Another step is active
    return <></>
  }

  const fieldProps =
    typeof required === 'boolean' ? { required } : undefined

  return (
    <Flex.Stack
      className={classnames('dnb-forms-step', className)}
      element="section"
      aria-label={ariaLabel}
      innerRef={currentElementRef}
      tabIndex={-1}
      {...restProps}
    >
      {fieldProps ? (
        <FieldProvider {...fieldProps}>{children}</FieldProvider>
      ) : (
        children
      )}
    </Flex.Stack>
  )
}

Step._supportsSpacingProps = true
export default Step
