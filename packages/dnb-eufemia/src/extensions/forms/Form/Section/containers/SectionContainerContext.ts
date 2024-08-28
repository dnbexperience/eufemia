import React from 'react'
import { ContainerMode } from './SectionContainer'

export interface SectionContainerContextState {
  containerMode?: ContainerMode
  validateFieldsInitially?: boolean
  switchContainerMode?: (mode: ContainerMode) => void
}

const SectionContainerContext = React.createContext<
  SectionContainerContextState | undefined
>(undefined)

export default SectionContainerContext
