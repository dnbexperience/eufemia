import { createContext } from 'react'
import { Path } from '../../types'
import { ContainerMode } from '../Array'

type PushContainerContext = {
  path: Path
  itemPath: Path
  entries?: Array<unknown>
  commitHandleRef: React.MutableRefObject<() => void>
  switchContainerMode?: (mode: ContainerMode) => void
}

const PushContainerContext = createContext<PushContainerContext>(null)

export default PushContainerContext
