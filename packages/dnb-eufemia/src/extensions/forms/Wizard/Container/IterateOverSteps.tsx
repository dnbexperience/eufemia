import { Children, createElement, isValidElement, useContext } from 'react'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import WizardContext from '../Context/WizardContext'
import WizardStepContext from '../Step/StepContext'
import type { WizardStepProps as StepProps } from '../Step/Step'
import Step from '../Step/Step'
import { useCollectStepsData } from './useCollectStepsData'

export function IterateOverSteps({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const {
    check,
    stepsRef,
    activeIndexRef,
    totalStepsRef,
    stepIndexRef,
    prerenderFieldProps,
    prerenderFieldPropsRef,
    hasErrorInOtherStepRef,
    mapOverChildrenRef,
  } = useContext(WizardContext)

  const { collectStepsData } = useCollectStepsData()

  // Reset before iterating and calling "collectStepsData" and other variables are collected.
  stepsRef.current = new Map()
  hasErrorInOtherStepRef.current = false
  stepIndexRef.current = -1
  totalStepsRef.current = 0

  const childrenArray = Children.map(children, (child) => {
    if (isValidElement<any>(child)) {
      let step = child

      if (child?.type !== Step && typeof child.type === 'function') {
        step = (child.type as (props: unknown) => ReactElement)(
          child.props
        ) as ReactElement

        if (step?.type === Step) {
          child = step
        }
      }

      if (child?.type === Step) {
        const { title, inactive, keepInDOM, include, id, includeWhen } =
          (child as ReactElement<any>).props || {}

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

        collectStepsData({
          id,
          index,
          title,
          inactive,
          keepInDOM,
        })

        if (
          prerenderFieldProps &&
          typeof document !== 'undefined' &&
          index !== activeIndexRef.current &&
          typeof prerenderFieldPropsRef.current['step-' + index] ===
            'undefined'
        ) {
          const key = `${index}-${activeIndexRef.current}`
          prerenderFieldPropsRef.current['step-' + index] = {
            index,
            fn: () =>
              createElement(
                (child as ReactElement<StepProps>)
                  .type as ComponentType<StepProps>,
                {
                  ...(child as ReactElement<StepProps>).props,
                  key,
                  index,
                  prerenderFieldProps: true,
                }
              ),
          }
        }

        return child
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

  if (mapOverChildrenRef.current) {
    return childrenArray.map((child, index) => {
      return (
        <WizardStepContext key={index} value={{ index }}>
          {child}
        </WizardStepContext>
      )
    })
  }

  return children
}
