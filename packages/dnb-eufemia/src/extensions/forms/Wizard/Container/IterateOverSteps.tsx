import React, { useContext } from 'react'
import WizardContext from '../Context/WizardContext'
import Step, {
  Props as StepProps,
  handleDeprecatedProps as handleDeprecatedStepProps,
} from '../Step/Step'

export function IterateOverSteps({ children }) {
  const {
    check,
    collectStepsData,
    stepsRef,
    activeIndexRef,
    totalStepsRef,
    stepIndexRef,
    prerenderFieldProps,
    prerenderFieldPropsRef,
    hasErrorInOtherStepRef,
  } = useContext(WizardContext)

  // Reset before iterating and calling "collectStepsData" and other variables are collected.
  stepsRef.current = new Map()
  hasErrorInOtherStepRef.current = false
  stepIndexRef.current = -1
  totalStepsRef.current = 0

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      let step = child

      if (child?.type !== Step && typeof child.type === 'function') {
        step = child.type.apply(child.type, [
          child.props,
        ]) as React.ReactElement

        if (step?.type === Step) {
          child = step
        }
      }

      if (child?.type === Step) {
        const {
          title: titleProp,
          inactive,
          include,
          includeWhen,
          id,
        } = handleDeprecatedStepProps(child.props)

        if (include === false) {
          return null
        }

        if (
          includeWhen &&
          !check({
            visibleWhen: includeWhen,
          })
        ) {
          return null
        }

        const index = totalStepsRef.current
        totalStepsRef.current = totalStepsRef.current + 1

        collectStepsData({ id, index, inactive, titleProp })

        if (
          prerenderFieldProps &&
          typeof document !== 'undefined' &&
          index !== activeIndexRef.current &&
          typeof prerenderFieldPropsRef.current['step-' + index] ===
            'undefined'
        ) {
          const key = `${index}-${activeIndexRef.current}`
          prerenderFieldPropsRef.current['step-' + index] = () =>
            React.cloneElement(child as React.ReactElement<StepProps>, {
              key,
              index,
              prerenderFieldProps: true,
            })
        }
      }
    }

    return child
  })

  // Ensure we never have a higher index than the available children
  // else we get a white screen
  if (totalStepsRef.current === 0) {
    activeIndexRef.current = 0
  } else if (totalStepsRef.current < activeIndexRef.current + 1) {
    activeIndexRef.current = totalStepsRef.current - 1
  }

  return children
}
