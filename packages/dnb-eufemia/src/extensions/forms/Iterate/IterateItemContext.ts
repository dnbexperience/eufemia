import React from 'react'
import { Path } from '../types'
import { ContainerMode, ElementChild } from './Array/types'

export type ModeOptions = {
  omitFocusManagement?: boolean
}

export interface IterateItemContextState {
  id?: string
  index?: number
  value?: unknown
  isNew?: boolean
  path?: Path
  arrayValue?: Array<ElementChild>
  containerMode?: ContainerMode
  previousContainerMode?: ContainerMode
  initialContainerMode?: ContainerMode
  containerRef?: React.RefObject<HTMLDivElement>
  elementRef?: React.RefObject<HTMLDivElement>
  modeOptions?: ModeOptions
  switchContainerMode?: (
    mode: ContainerMode,
    options?: ModeOptions
  ) => void
  handleChange?: (path: Path, value: unknown) => void
  handleRemove?: ({ keepItems }?: { keepItems?: boolean }) => void
  handlePush?: (value: unknown) => void
  restoreOriginalValue?: (value: unknown) => void
  fulfillRemove?: () => void
}

const IterateItemContext = React.createContext<
  IterateItemContextState | undefined
>(undefined)

export default IterateItemContext
