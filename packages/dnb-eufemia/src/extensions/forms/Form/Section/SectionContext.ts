import { createContext } from 'react'
import type { Path } from '../../types'
import type { SectionProps } from '.'

export type SectionContextState = {
  path?: Path
  props?: SectionProps
  errorPrioritization?: Array<
    'fieldSchema' | 'sectionSchema' | 'contextSchema'
  >
}

const SectionContext = createContext<SectionContextState | undefined>(
  undefined
)

export default SectionContext
