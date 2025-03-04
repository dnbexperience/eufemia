import React, { useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import WizardContext from '../Context/WizardContext'
import WizardStepContext from './StepContext'
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
     * @deprecated use `include` instead
     */
    active?: boolean

    /**
     * Provide a `path` and a `hasValue` property with the expected value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.
     * @deprecated use `includeWhen` instead
     */
    activeWhen?: VisibleWhen

    /**
     * If set to `false`, the step will not be rendered.
     */

    include?: boolean
    /**
     * Provide a `path` and a `hasValue` property with the expected value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.
     */
    includeWhen?: VisibleWhen

    /**
     * If set to `true`, the step will always be rendered.
     * For internal use only.
     */
    prerenderFieldProps?: boolean
  }

export function handleDeprecatedProps({
  active,
  activeWhen,
  include,
  includeWhen,
  ...rest
}: Props): Omit<Props, 'active' | 'activeWhen'> {
  return {
    include: include ?? active,
    includeWhen: includeWhen ?? activeWhen,
    ...rest,
  }
}
function Step(props: Props): JSX.Element {
  const {
    className,
    title,
    inactive, // eslint-disable-line
    index,
    include = true,
    includeWhen,
    required,
    prerenderFieldProps,
    children,
    ...restProps
  } = handleDeprecatedProps(props)
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

  const fieldProps =
    typeof required === 'boolean' ? { required } : undefined

  const content = (
    <WizardStepContext.Provider value={{ index }}>
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
    </WizardStepContext.Provider>
  )

  if (
    activeIndex !== index ||
    include === false ||
    (includeWhen && !check({ visibleWhen: includeWhen }))
  ) {
    // Another step is active
    return <></>
  }

  return <>{content}</>
}

Step._supportsSpacingProps = true
export default Step
