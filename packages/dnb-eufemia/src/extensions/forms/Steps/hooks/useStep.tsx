import { useContext, useEffect, useRef } from 'react'
import StepsContext, {
  OnStepChange,
  StepsContextState,
} from '../Context/StepsContext'
import { Identifier } from '../../types'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

export default function useStep(
  id: Identifier = null,
  { onStepChange }: { onStepChange?: OnStepChange } = {}
) {
  const context = useContext(StepsContext)

  // In order to make it possible to add a "onStepChange" handler without an id,
  // we at least check if there is one from the context.
  if (onStepChange && !id && context.id) {
    id = context.id
  }

  const sharedDataRef =
    useRef<ReturnType<typeof useSharedState<StepsContextState>>>(null)
  sharedDataRef.current = useSharedState<StepsContextState>(
    id ? id + '-steps' : undefined
  )

  useEffect(() => {
    sharedDataRef.current.extend({
      onStepChange,
    } as unknown as StepsContextState) // Internal type
  }, [onStepChange])

  return sharedDataRef.current.data || context
}
