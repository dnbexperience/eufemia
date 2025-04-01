import React, { useCallback, useContext, useReducer } from 'react'
import WizardContext from '../Context'
import StepIndicator from '../../../../components/StepIndicator'
import { StepIndicatorItemProps } from '../../../../components/step-indicator/StepIndicatorItem'
import { useTranslation } from '../../hooks'

export function DisplaySteps({
  mode,
  variant,
  noAnimation,
  handleChange,
  sidebarId,
}) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const {
    id,
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

  const sidebar_id =
    variant === 'drawer' && !sidebarId ? undefined : sidebarId ?? id

  const getTriggerStatus = useCallback(() => {
    if (!hasErrorInOtherStepRef.current) {
      return // stop here
    }
    if (hasInvalidStepsState(undefined, ['error'])) {
      return {
        status: translations.Step.stepHasError,
        status_state: 'error',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
    if (hasInvalidStepsState(undefined, ['unknown'])) {
      return {
        status: 'Unknown state',
        status_state: 'warn',
      } satisfies Omit<StepIndicatorItemProps, 'title' | 'currentItemNum'>
    }
  }, [
    hasErrorInOtherStepRef,
    hasInvalidStepsState,
    translations.Step.stepHasError,
  ])

  return (
    <aside className="dnb-forms-wizard-layout__indicator">
      <StepIndicator.Sidebar sidebar_id={sidebar_id} />
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
        on_change={handleChange}
        sidebar_id={sidebar_id}
        triggerButtonProps={getTriggerStatus()}
      />
    </aside>
  )
}
