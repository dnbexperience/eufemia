import { useCallback, useContext, useReducer } from 'react'
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
      return undefined // stop here
    }
    if (hasInvalidStepsState(undefined, ['error'])) {
      return {
        // Show FormStatus inside the StepIndicator
        statusMessage: translations.Step.stepHasError,
        status: 'error',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
    return {}
  }, [
    hasErrorInOtherStepRef,
    hasInvalidStepsState,
    translations.Step.stepHasError,
  ])

  const { statusMessage, status } = getStepIndicatorStatus() ?? {}

  return (
    <div className="dnb-forms-wizard-layout__indicator">
      <StepIndicator
        bottom
        currentStep={activeIndexRef.current}
        data={Array.from(stepsRef.current.values()).map(
          ({
            stringifiedTitle,
            title,
            inactive,
            status: statusMessage,
            statusState: status,
          }) =>
            ({
              title: stringifiedTitle || title,
              inactive,
              statusMessage,
              status,
            }) satisfies Omit<StepIndicatorItemProps, 'currentItemNum'>
        )}
        mode={mode}
        noAnimation={noAnimation}
        expandedInitially={expandedInitially}
        onChange={handleChange}
        outset={outset}
        statusMessage={statusMessage}
        status={status}
      />
    </div>
  )
}
