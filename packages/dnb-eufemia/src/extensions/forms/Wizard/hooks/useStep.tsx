import { useCallback, useContext, useEffect, useRef } from 'react'
import WizardContext, {
  OnStepChange,
  WizardContextState,
} from '../Context/WizardContext'
import { Identifier } from '../../types'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

export default function useStep(
  id: Identifier = null,
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
    id ? id + '-wizard' : undefined
  )

  useEffect(() => {
    sharedDataRef.current.extend({
      onStepChange,
    } as unknown as WizardContextState) // Internal type
  }, [onStepChange])

  return sharedDataRef.current.data || context
}
