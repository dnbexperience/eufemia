import React, { useCallback, useContext, useReducer } from 'react'
import WizardContext from '../Context'
import StepIndicator from '../../../../components/StepIndicator'
import type { StepIndicatorItemProps } from '../../../../components/step-indicator/StepIndicatorItem'
import { useTranslation } from '../../hooks'

export function DisplaySteps({
  mode,
  noAnimation,
  handleChange,
  expandedInitially,
  outset,
}) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const {
    activeIndexRef,
    stepsRef,
    updateTitlesRef,
    hasErrorInOtherStepRef,
    hasInvalidStepsState,
  } = useContext(WizardContext) || {}
  updateTitlesRef.current = () => {
    forceUpdate()
  }
  const translations = useTranslation()

  const getStepIndicatorStatus = useCallback(() => {
    if (!hasErrorInOtherStepRef.current) {
      return // stop here
    }
    if (hasInvalidStepsState(undefined, ['error'])) {
      return {
        // Show FormStatus inside the StepIndicator
        status: translations.Step.stepHasError,
        status_state: 'error',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
    return {}
  }, [
    hasErrorInOtherStepRef,
    hasInvalidStepsState,
    translations.Step.stepHasError,
  ])

  const { status, status_state } = getStepIndicatorStatus() ?? {}

  return (
    <div className="dnb-forms-wizard-layout__indicator">
      <StepIndicator
        bottom
        current_step={activeIndexRef.current}
        data={Array.from(stepsRef.current.values()).map(
          ({ stringifiedTitle, title, inactive, status, statusState }) =>
            ({
              title: stringifiedTitle || title,
              inactive,
              status,
              status_state: statusState,
            }) satisfies Omit<StepIndicatorItemProps, 'currentItemNum'>
        )}
        mode={mode}
        no_animation={noAnimation}
        expandedInitially={expandedInitially}
        on_change={handleChange}
        outset={outset}
        status={status}
        status_state={status_state}
      />
    </div>
  )
}
