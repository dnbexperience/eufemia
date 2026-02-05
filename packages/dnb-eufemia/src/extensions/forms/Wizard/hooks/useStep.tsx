import React, { useCallback, useContext, useMemo, useRef } from 'react'
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

type SetActiveIndexHandler = NonNullable<
  WizardContextState['setActiveIndex']
>

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

  const data = sharedDataRef.current.data
  if (data && !data.setFormError) {
    data.setFormError = setFormError
  }

  const context = (data || wizardContext) as WizardContextState
  const { totalStepsRef } = context
  const totalSteps = totalStepsRef?.current || 0
  if (context.totalSteps !== totalSteps) {
    context.totalSteps = totalSteps
  }

  const actualSetActiveIndex = context.setActiveIndex
  const pendingSetActiveIndexCallsRef = useRef<
    Array<Parameters<SetActiveIndexHandler>>
  >([])
  const setActiveIndexRef = useRef<SetActiveIndexHandler>()

  const setActiveIndexFromHook = useCallback<SetActiveIndexHandler>(
    (index, options) => {
      const handler = setActiveIndexRef.current
      if (handler) {
        handler(index, options)
        return
      }

      pendingSetActiveIndexCallsRef.current.push([index, options])
    },
    []
  )

  useLayoutEffect(() => {
    setActiveIndexRef.current = actualSetActiveIndex

    if (
      actualSetActiveIndex &&
      pendingSetActiveIndexCallsRef.current.length > 0
    ) {
      pendingSetActiveIndexCallsRef.current.forEach(([index, options]) => {
        actualSetActiveIndex(index, options)
      })
      pendingSetActiveIndexCallsRef.current = []
    }
  }, [actualSetActiveIndex])

  useLayoutEffect(() => {
    const { onStepChangeEventsRef } = context
    if (
      onStepChange &&
      onStepChangeEventsRef?.current &&
      !onStepChangeEventsRef.current.has(onStepChange)
    ) {
      onStepChangeEventsRef?.current.add(onStepChange)
    }
  }, [context, onStepChange])

  useLayoutEffect(() => {
    if (id) {
      // Sync the shared context
      sharedDataRef.current.extend({})
    }
  }, [id])

  const contextWithBridge = useMemo<WizardContextState>(() => {
    return {
      ...context,
      setActiveIndex: setActiveIndexFromHook,
    }
  }, [context, setActiveIndexFromHook])

  return contextWithBridge
}
