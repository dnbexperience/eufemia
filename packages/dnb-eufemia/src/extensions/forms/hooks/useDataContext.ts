import { useCallback, useContext } from 'react'
import type { SharedStateId } from '../../../shared/helpers/useSharedState'
import {
  createReferenceKey,
  createSharedState,
} from '../../../shared/helpers/useSharedState'
import type { ContextState } from '../DataContext/Context'
import DataContext from '../DataContext/Context'

export default function useDataContext(id: SharedStateId = undefined): {
  dataContext?: ContextState
  getContext: () => ContextState
} {
  const sharedDataContext = id
    ? createSharedState<ContextState>(
        createReferenceKey(id, 'data-context')
      )
    : null

  const dataContext = useContext(DataContext)
  const getContext = useCallback(() => {
    // If no id is provided, use the context data
    if (!id) {
      if (!dataContext.hasContext) {
        throw new Error(
          'useDataContext needs to run inside DataContext (Form.Handler) or have a valid id'
        )
      } else {
        return dataContext
      }
    }

    return sharedDataContext?.get()
  }, [dataContext, id, sharedDataContext])

  return { getContext, dataContext }
}
