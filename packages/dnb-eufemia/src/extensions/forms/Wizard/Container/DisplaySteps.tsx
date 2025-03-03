import React, { useCallback, useContext, useReducer } from 'react'
import WizardContext from '../Context'
import StepIndicator from '../../../../components/StepIndicator'
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
    hasInvalidStepsState,
  } = useContext(WizardContext) || {}
  updateTitlesRef.current = () => {
    forceUpdate()
  }
  const translations = useTranslation()

  const sidebar_id =
    variant === 'drawer' && !sidebarId ? undefined : sidebarId ?? id

  const getTriggerStatus = useCallback(() => {
    if (hasInvalidStepsState(['unknown'])) {
      return {
        status: 'Unknown state',
        status_state: 'warn',
      }
    }
    if (hasInvalidStepsState(['error'])) {
      return {
        status: translations.Step.stepHasError,
        status_state: 'error',
      }
    }
  }, [hasInvalidStepsState, translations.Step.stepHasError])

  return (
    <aside className="dnb-forms-wizard-layout__indicator">
      <StepIndicator.Sidebar sidebar_id={sidebar_id} />
      <StepIndicator
        bottom
        current_step={activeIndexRef.current}
        data={Object.values(stepsRef.current).map(
          ({ title, inactive, status, statusState }) => ({
            title,
            inactive,
            status,
            status_state: statusState,
          })
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
