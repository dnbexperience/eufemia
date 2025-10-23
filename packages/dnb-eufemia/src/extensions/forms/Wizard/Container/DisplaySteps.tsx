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
    if (hasInvalidStepsState(undefined, ['error'])) {
      return {
        // Show FormStatus inside the StepIndicator
        status: translations.Step.stepHasError,
        statusState: 'error',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
    return {}
  }, [
    hasErrorInOtherStepRef,
    hasInvalidStepsState,
    translations.Step.stepHasError,
  ])

  const { status, statusState } = getStepIndicatorStatus() ?? {}

  return (
    <div className="dnb-forms-wizard-layout__indicator">
      <StepIndicator
        bottom
        currentStep={activeIndexRef.current}
        data={Array.from(stepsRef.current.values()).map(
          ({ stringifiedTitle, title, inactive, status, statusState }) =>
            ({
              title: stringifiedTitle || title,
              inactive,
              status,
              statusState: statusState,
            }) satisfies Omit<StepIndicatorItemProps, 'currentItemNum'>
        )}
        mode={mode}
        noAnimation={noAnimation}
        expandedInitially={expandedInitially}
        on_change={handleChange}
        outset={outset}
        status={status}
        statusState={statusState}
      />
    </div>
  )
}
