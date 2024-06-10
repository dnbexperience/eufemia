import React from 'react'
import { Path } from '../../types'
import { SectionProps } from '.'

export interface SectionContextState {
  path?: Path
  props?: SectionProps
  errorPrioritization?: Array<
    'fieldSchema' | 'sectionSchema' | 'contextSchema'
  >
}

const SectionContext = React.createContext<
  SectionContextState | undefined
>(undefined)

export default SectionContext
