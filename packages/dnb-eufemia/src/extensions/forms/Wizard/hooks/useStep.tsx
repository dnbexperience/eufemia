import React, { useCallback, useContext, useRef } from 'react'
import WizardContext, {
  WizardContextState,
} from '../Context/WizardContext'
import type { OnStepChange } from '../Context/types'
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
  const wizardContext = useContext(WizardContext) || { setFormError }

  // In order to make it possible to add a "onStepChange" handler without an id,
  // we at least check if there is one from the context.
  if (onStepChange && !id && wizardContext.id) {
    id = wizardContext.id
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

  const context = data || wizardContext
  const { totalStepsRef } = context || {}
  const totalSteps = totalStepsRef?.current || 0
  if (context && context.totalSteps !== totalSteps) {
    context.totalSteps = totalSteps
  }

  return context
}
