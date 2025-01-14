import React from 'react'
import { Path } from '../types'
import { ContainerMode } from './Array/types'

export type ModeOptions = {
  omitFocusManagement?: boolean
  preventUpdate?: boolean
}

export interface IterateItemContextState {
  id?: string
  index?: number
  value?: unknown
  isNew?: boolean
  path?: Path
  itemPath?: Path
  arrayValue?: Array<unknown>
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
