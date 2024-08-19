import { createContext } from 'react'
import { Path } from '../../types'
import { ContainerMode } from '../Array'

type CreateEntryContainerContext = {
  path: Path
  entries?: Array<unknown>
  commitHandleRef: React.MutableRefObject<() => void>
  switchContainerMode?: (mode: ContainerMode) => void
}

const CreateEntryContainerContext =
  createContext<CreateEntryContainerContext>(null)

export default CreateEntryContainerContext
