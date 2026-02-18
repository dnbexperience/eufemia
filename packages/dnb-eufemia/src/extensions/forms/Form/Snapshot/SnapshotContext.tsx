import { createContext } from 'react'
import { Path } from '../../types'
import { SnapshotName } from './Snapshot'

export type SnapshotMap = React.MutableRefObject<Map<Path, unknown>>

export type SnapshotContextState = {
  name: SnapshotName
  setMountedField: (
    path: Path,
    { isMounted }: { isMounted: boolean }
  ) => void
}

const SnapshotContext = createContext<SnapshotContextState>(null)

export default SnapshotContext
