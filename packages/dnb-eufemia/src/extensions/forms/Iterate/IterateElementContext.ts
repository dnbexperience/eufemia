import React from 'react'
import { Path } from '../types'
import { ContainerMode } from './Array/types'

export interface IterateElementContextState {
  id?: string
  index?: number
  value?: unknown
  isNew?: boolean
  path?: Path
  arrayValue?: Array<unknown>
  containerMode?: ContainerMode
  containerRef?: React.RefObject<HTMLDivElement>
  elementRef?: React.RefObject<HTMLDivElement>
  switchContainerMode?: (mode: ContainerMode) => void
  handleChange?: (path: Path, value: unknown) => void
  handleRemove?: ({ keepItems }?: { keepItems?: boolean }) => void
  handlePush?: (value: unknown) => void
  restoreOriginalValue?: (value: unknown) => void
  fulfillRemove?: () => void
}

const IterateElementContext = React.createContext<
  IterateElementContextState | undefined
>(undefined)

export default IterateElementContext
