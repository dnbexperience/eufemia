import React from 'react'
import { Path } from '../types'
import { Props, ContainerMode, ElementChild } from './Array/types'

export interface IterateItemContextState {
  id?: string
  index?: number
  value?: unknown
  isNew?: boolean
  path?: Path
  arrayValue?: Array<ElementChild>
  containerMode?: ContainerMode
  initialContainerMode?: ContainerMode
  minimumRequiredItems?: Props['minimumRequiredItems']
  containerRef?: React.RefObject<HTMLDivElement>
  elementRef?: React.RefObject<HTMLDivElement>
  hideToolbarWhen?: Props['hideToolbarWhen']
  switchContainerMode?: (mode: ContainerMode) => void
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
