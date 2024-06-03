import React from 'react'
import { OnChange, Path } from '../../types'
import { SectionProps } from '.'

export interface SectionContextState {
  path?: Path
  props?: SectionProps
  errorPrioritization?: Array<
    'fieldSchema' | 'sectionSchema' | 'contextSchema'
  >
  handleChange?: OnChange<unknown>
}

const SectionContext = React.createContext<
  SectionContextState | undefined
>(undefined)

export default SectionContext
