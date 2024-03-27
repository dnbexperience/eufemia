import { useContext, useRef } from 'react'
import StepsContext, { StepsContextState } from '../Context/StepsContext'
import { Identifier } from '../../types'
import { useSharedState } from '../../../../shared/helpers/useSharedState'

export function useStep(id: Identifier = null) {
  const sharedDataRef =
    useRef<ReturnType<typeof useSharedState<StepsContextState>>>(null)
  sharedDataRef.current = useSharedState<StepsContextState>(
    id ? id + '-steps' : undefined
  )

  const context = useContext(StepsContext)
  return sharedDataRef.current.data || context
}
