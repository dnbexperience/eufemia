import { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import { usePath } from '../../hooks'
import type { Path } from '../../types'

export default function useItemPath(itemPath: Path) {
  const { joinPath } = usePath()
  const iterateItemContext = useContext(IterateItemContext)

  return (
    itemPath &&
    iterateItemContext &&
    joinPath([
      iterateItemContext.path,
      String(iterateItemContext.index),
      itemPath,
    ])
  )
}
