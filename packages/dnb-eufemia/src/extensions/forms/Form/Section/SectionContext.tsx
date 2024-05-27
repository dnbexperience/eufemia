import React from 'react'
import { Path } from '../../types'
import { SectionProps } from '.'

export interface SectionContextState {
  path?: Path
  errorPrioritization?: Array<
    'fieldSchema' | 'sectionSchema' | 'contextSchema'
  >
  handleChange?: (path: Path, data: unknown) => void
  props?: SectionProps
}

const SectionContext = React.createContext<
  SectionContextState | undefined
>(undefined)

export default SectionContext
