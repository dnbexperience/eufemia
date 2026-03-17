import { createContext } from 'react'
import type { ContextState } from '../../DataContext/Context'
import type { IsolationDataReference } from './IsolationDataReference'

export type IsolationContext = {
  dataReference: IsolationDataReference
  resetDataAfterCommit: boolean
  outerContext: ContextState
  preventUncommittedChanges: boolean
  setIsolatedData: (data: unknown) => void
}

const IsolationContext = createContext<IsolationContext>(null)

export default IsolationContext
