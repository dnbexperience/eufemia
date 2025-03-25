import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import WizardContext from '../Context/WizardContext'
import WizardStepContext from './StepContext'
import Flex from '../../../../components/flex/Flex'
import {
  convertJsxToString,
  warn,
} from '../../../../shared/component-helper'
import FieldProvider from '../../Field/Provider'
import type { VisibleWhen } from '../../Form/Visibility'

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
     * Determines if the step should be kept in the DOM. Defaults to `false`.
     */
    keepInDOM?: boolean

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
    id, // eslint-disable-line
    className,
    title: titleProp,
    index: indexProp,
    inactive, // eslint-disable-line
    include = true,
    includeWhen,
    required,
    keepInDOM: keepInDOMProp,
    prerenderFieldProps,
    children,
    ...restProps
  } = handleDeprecatedProps(props)
  const {
    check,
    activeIndex,
    initialActiveIndex,
    stepElementRef,
    stepIndexRef,
    keepInDOM,
  } = useContext(WizardContext) || {}

  const initialIndex = useMemo(() => {
    if (indexProp === undefined && stepIndexRef) {
      stepIndexRef.current += 1
    }
    return indexProp ?? stepIndexRef?.current
  }, [indexProp, stepIndexRef])

  if (prerenderFieldProps) {
    return children as JSX.Element
  }

  if (include === false) {
    return <></>
  }

  if (
    includeWhen &&
    !check({
      visibleWhen: includeWhen,
    })
  ) {
    return <></>
  }

  const index = indexProp ?? initialIndex
  const ariaLabel = convertJsxToString(titleProp)
  const fieldProps =
    typeof required === 'boolean' ? { required } : undefined

  const content = (
    <WizardStepContext.Provider value={{ index }}>
      <Flex.Stack
        className={classnames('dnb-forms-step', className)}
        element="section"
        aria-label={ariaLabel}
        innerRef={stepElementRef}
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
    (includeWhen && !check({ visibleWhen: includeWhen }))
  ) {
    if (keepInDOMProp ?? keepInDOM) {
      return (
        <div title="Wizard Step" hidden>
          {content}
        </div>
      )
    } else {
      if (initialActiveIndex > 0) {
        warn(
          `initialActiveIndex={${initialActiveIndex}} is used. Fields of previews steps may not validate. You can use "keepInDOM" to always run validation.`
        )
      }
    }

    // Another step is active
    return <></>
  }

  return <>{content}</>
}

Step._supportsSpacingProps = true
export default Step
