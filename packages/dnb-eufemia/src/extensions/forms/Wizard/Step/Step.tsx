import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import type { Props as FlexContainerProps } from '../../../../components/flex/Container'
import WizardContext from '../Context/WizardContext'
import WizardStepContext from './StepContext'
import Flex from '../../../../components/flex/Flex'
import { convertJsxToString } from '../../../../shared/component-helper'
import FieldProvider from '../../Field/Provider'
import type { VisibleWhen } from '../../Form/Visibility'

export type Props = ComponentProps &
  FlexContainerProps & {
    /**
     * An unique title of the step.
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
    id,
    className,
    title,
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
    enableMapOverChildren,
    activeIndex,
    totalStepsRef,
    stepElementRef,
    stepIndexRef,
    stepsRef,
    keepInDOM,
  } = useContext(WizardContext) || {}

  const wizardStepContext = useContext(WizardStepContext) || {}
  const indexFromContext = wizardStepContext.index

  const totalSteps = totalStepsRef?.current
  const ariaLabel = useMemo(() => convertJsxToString(title), [title])
  const index = useMemo(() => {
    if (indexProp !== undefined) {
      return indexProp
    }

    // Try to use the index from the step context
    if (indexFromContext !== undefined) {
      return indexFromContext
    }

    if (stepsRef?.current) {
      // Try different ways to find the step index
      const { index } =
        Array.from(stepsRef.current.values()).find(
          ({
            id: currentId,
            title: originalTitleProp,
            stringifiedTitle,
          }) => {
            // Try to find the step by id
            if (id !== undefined) {
              return id === currentId
            }

            // Try to find the step by <Translation id="..." />
            const translationId = originalTitleProp?.['props']?.id
            if (translationId) {
              return translationId === title?.['props']?.id
            }

            // Try to find the step by a string (with convertJsxToString) title
            if (stringifiedTitle) {
              return stringifiedTitle === ariaLabel
            }

            // Try to find the step by a JSX title
            return originalTitleProp === title
          }
        ) || {}

      if (index !== undefined) {
        return index
      }
    }

    if (
      totalSteps && // Is only used to make the deps ESLint happy.
      stepIndexRef
    ) {
      stepIndexRef.current += 1
    }

    return stepIndexRef?.current
  }, [
    indexProp,
    stepsRef,
    totalSteps, // "totalSteps" is needed to make dynamic steps work.
    stepIndexRef,
    indexFromContext,
    title,
    id,
    ariaLabel,
  ])

  // If the index is greater than the total steps,
  // its a sign that e.g. React.StrictMode is used.
  // And if no title or id is given,
  // we need to force an re-render and use an alternative render method,
  // using React.Children.map(children, ...).
  if (!prerenderFieldProps && index >= totalSteps) {
    enableMapOverChildren()
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

  const fieldProps =
    typeof required === 'boolean' ? { required } : undefined
  const childrenWithFieldProvider = fieldProps ? (
    <FieldProvider {...fieldProps}>{children}</FieldProvider>
  ) : (
    children
  )

  if (prerenderFieldProps) {
    return (
      <WizardStepContext.Provider value={{ index }}>
        {childrenWithFieldProvider as JSX.Element}
      </WizardStepContext.Provider>
    )
  }

  const innerRef = activeIndex === index ? stepElementRef : null
  const childrenWithFlex = (
    <WizardStepContext.Provider value={{ index }}>
      <Flex.Stack
        className={classnames('dnb-forms-step', className)}
        element="section"
        aria-label={ariaLabel}
        innerRef={innerRef}
        tabIndex={-1}
        {...restProps}
      >
        {childrenWithFieldProvider}
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
          {childrenWithFlex}
        </div>
      )
    }

    // Another step is active
    return <></>
  }

  return <>{childrenWithFlex}</>
}

Step._supportsSpacingProps = true
export default Step
