import { createContext } from 'react'
import type { ContainerMode } from './SectionContainer'

export type SectionContainerContextState = {
  validateInitially?: boolean
  containerMode?: ContainerMode
  initialContainerMode?: ContainerMode
  switchContainerMode?: (mode: ContainerMode) => void
  disableEditing?: boolean
}

const SectionContainerContext = createContext<
  SectionContainerContextState | undefined
>(undefined)

export default SectionContainerContext
