import React, { useContext } from 'react'
import WizardContext from '../Context/WizardContext'
import WizardStepContext from '../Step/StepContext'
import type { Props as StepProps } from '../Step/Step'
import Step from '../Step/Step'
import { useCollectStepsData } from './useCollectStepsData'

export function IterateOverSteps({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
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

  const childrenArray = React.Children.map(children, (child) => {
    if (React.isValidElement<any>(child)) {
      let step = child

      if (child?.type !== Step && typeof child.type === 'function') {
        step = (child.type as (props: unknown) => React.ReactElement)(
          child.props
        ) as React.ReactElement

        if (step?.type === Step) {
          child = step
        }
      }

      if (child?.type === Step) {
        const { title, inactive, keepInDOM, include, id, includeWhen } =
          (child as React.ReactElement<any>).props || {}

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
          typeof (
            prerenderFieldPropsRef.current as Record<string, unknown>
          )[`step-${index}`] === 'undefined'
        ) {
          const key = `${index}-${activeIndexRef.current}`
          ;(prerenderFieldPropsRef.current as Record<string, unknown>)[
            `step-${index}`
          ] = {
            index,
            fn: () =>
              React.createElement(
                (child as React.ReactElement<StepProps>)
                  .type as React.ComponentType<StepProps>,
                {
                  ...(child as React.ReactElement<StepProps>).props,
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
