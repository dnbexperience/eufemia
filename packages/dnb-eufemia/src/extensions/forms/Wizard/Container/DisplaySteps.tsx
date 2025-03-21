import React, { useCallback, useContext, useReducer } from 'react'
import WizardContext from '../Context'
import StepIndicator from '../../../../components/StepIndicator'
import { StepIndicatorItemProps } from '../../../../components/step-indicator/StepIndicatorItem'
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
    if (hasInvalidStepsState(['error'])) {
      return {
        status: translations.Step.stepHasError,
        status_state: 'error',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
    if (hasInvalidStepsState(['unknown'])) {
      return {
        status: 'Unknown state',
        status_state: 'warn',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
    return {}
  }, [hasInvalidStepsState, translations.Step.stepHasError])

  const { status, status_state } = getStepIndicatorStatus() ?? {}

  return (
    <aside className="dnb-forms-wizard-layout__indicator">
      <StepIndicator
        bottom
        current_step={activeIndexRef.current}
        data={Object.values(stepsRef.current).map(
          ({ title, inactive, status, statusState }) =>
            ({
              title,
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
    </aside>
  )
}
