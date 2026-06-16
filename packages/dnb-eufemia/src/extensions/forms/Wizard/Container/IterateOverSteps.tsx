import { Children, createElement, isValidElement, useContext } from 'react'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'
import WizardContext from '../Context/WizardContext'
import WizardStepContext from '../Step/StepContext'
import type { WizardStepProps as StepProps } from '../Step/Step'
import Step from '../Step/Step'
import { useCollectStepsData } from './useCollectStepsData'

export function getWizardStepElement(
  child: unknown
): ReactElement<StepProps> | undefined {
  if (isValidElement<StepProps>(child)) {
    if (child.type === Step) {
      return child
    }

    if (typeof child.type === 'function') {
      const result = (child.type as (props: unknown) => ReactElement)(
        child.props
      )

      if (result?.type === Step) {
        return result as ReactElement<StepProps>
      }
    }
  }

  return undefined
}

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
    updateTitlesRef,
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
      const stepElement = getWizardStepElement(child)

      if (stepElement) {
        child = stepElement

        const { title, inactive, keepInDOM, include, id, includeWhen } =
          stepElement.props || {}

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

  const totalSteps = totalStepsRef.current
  useLayoutEffect(() => {
    updateTitlesRef.current?.()
  }, [totalSteps, updateTitlesRef])

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
