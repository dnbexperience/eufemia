import { createContext } from 'react'
import type { Path } from '../../types'
import type { SnapshotName } from './Snapshot'

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
