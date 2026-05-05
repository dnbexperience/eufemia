import { createContext } from 'react'
import type { RefObject } from 'react'
import type { Path } from '../../types'
import type { ContainerMode } from '../Array'

type PushContainerContext = {
  path: Path
  itemPath: Path
  entries?: Array<unknown>
  commitHandleRef: RefObject<() => void>
  switchContainerMode?: (mode: ContainerMode) => void
}

const PushContainerContext = createContext<PushContainerContext>(null)

export default PushContainerContext
