import React from 'react'
import { Path } from '../types'

export interface CompositeContextState {
  path?: Path
  errorPrioritization?: Array<
    'fieldSchema' | 'blockSchema' | 'contextSchema'
  >
  handleChange?: (path: Path, data: unknown) => void
}

const CompositeContext = React.createContext<
  CompositeContextState | undefined
>(undefined)

export default CompositeContext
