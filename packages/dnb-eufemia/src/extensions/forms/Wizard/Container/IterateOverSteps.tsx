import React, { useContext } from 'react'
import { useTranslation } from '../../hooks'
import { convertJsxToString } from '../../../../shared/component-helper'
import WizardContext from '../Context/WizardContext'
import Step, {
  Props as StepProps,
  handleDeprecatedProps as handleDeprecatedStepProps,
} from '../Step/Step'

export function IterateOverSteps({ children }) {
  const {
    check,
    stepsRef,
    activeIndexRef,
    totalStepsRef,
    stepStatusRef,
    prerenderFieldProps,
    prerenderFieldPropsRef,
  } = useContext(WizardContext)

  stepsRef.current = {}
  let incrementIndex = -1

  const translations = useTranslation()

  const childrenArray = React.Children.map(children, (child) => {
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

        incrementIndex++

        const index = incrementIndex
        const title =
          titleProp !== undefined
            ? convertJsxToString(titleProp)
            : 'Title missing'
        const state = stepStatusRef.current[index]
        const status =
          index !== activeIndexRef.current
            ? state === 'error'
              ? translations.Step.stepHasError
              : state === 'unknown'
              ? 'Unknown state'
              : undefined
            : undefined
        const statusState = state === 'error' ? 'error' : undefined // undefined shows 'warn' by default
        const key = `${index}-${activeIndexRef.current}`

        stepsRef.current[index] = {
          id,
          title,
          inactive,
          status,
          statusState,
        }

        const clone = (props) =>
          React.cloneElement(child as React.ReactElement<StepProps>, props)

        if (
          prerenderFieldProps &&
          typeof document !== 'undefined' &&
          index !== activeIndexRef.current &&
          typeof prerenderFieldPropsRef.current['step-' + index] ===
            'undefined'
        ) {
          prerenderFieldPropsRef.current['step-' + index] = () =>
            clone({
              key,
              index,
              prerenderFieldProps: true,
            })
        }

        return clone({
          key,
          index,
        })
      }
    }

    return child
  })

  // Ensure we never have a higher index than the available children
  // else we get a white screen
  if (childrenArray?.length === 0) {
    activeIndexRef.current = 0
  } else if (childrenArray?.length < activeIndexRef.current + 1) {
    activeIndexRef.current = childrenArray.length - 1
  }

  totalStepsRef.current = childrenArray?.length

  return childrenArray
}
