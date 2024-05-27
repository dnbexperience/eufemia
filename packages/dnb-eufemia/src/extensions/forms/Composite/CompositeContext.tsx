import React from 'react'
import { Path } from '../types'
import { BlockProps } from './Block'

export interface CompositeContextState {
  path?: Path
  errorPrioritization?: Array<
    'fieldSchema' | 'blockSchema' | 'contextSchema'
  >
  handleChange?: (path: Path, data: unknown) => void
  props?: BlockProps
}

const CompositeContext = React.createContext<
  CompositeContextState | undefined
>(undefined)

export default CompositeContext
