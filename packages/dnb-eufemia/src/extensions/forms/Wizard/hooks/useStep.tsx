import React, { useCallback, useContext, useRef } from 'react'
import WizardContext, {
  OnStepChange,
  WizardContextState,
} from '../Context/WizardContext'
import {
  SharedStateId,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useStep(
  id: SharedStateId = null,
  { onStepChange }: { onStepChange?: OnStepChange } = {}
) {
  const setFormError = useCallback(() => null, [])
  const context = useContext(WizardContext) || { setFormError }

  // In order to make it possible to add a "onStepChange" handler without an id,
  // we at least check if there is one from the context.
  if (onStepChange && !id && context.id) {
    id = context.id
  }

  const sharedDataRef =
    useRef<ReturnType<typeof useSharedState<WizardContextState>>>(null)
  sharedDataRef.current = useSharedState<WizardContextState>(
    id ? createReferenceKey(id, 'wizard') : undefined
  )

  useLayoutEffect(() => {
    sharedDataRef.current.extend({
      onStepChange,
    } as unknown as WizardContextState) // Internal type
  }, [onStepChange])

  const data = sharedDataRef.current.data
  if (data && !data.setFormError) {
    data.setFormError = setFormError
  }

  const value = data || context
  const { stepsRef } = value || {}
  const setTotalSteps = useCallback(() => {
    const totalSteps = Object.keys(stepsRef?.current || {}).length || 0
    if (value.totalSteps !== totalSteps) {
      value.totalSteps = totalSteps
    }
  }, [stepsRef, value])
  if (data) {
    setTotalSteps()
  }
  useLayoutEffect(() => {
    setTotalSteps()
  }, [setTotalSteps, stepsRef, value])

  return value
}
