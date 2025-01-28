import { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import usePath from '../../hooks/usePath'
import type { Path } from '../../types'

export default function useItemPath(itemPath: Path) {
  const { joinPath } = usePath()
  const iterateItemContext = useContext(IterateItemContext)

  const absolutePath =
    itemPath &&
    iterateItemContext &&
    joinPath([
      iterateItemContext.path,
      String(iterateItemContext.index),
      itemPath,
    ])

  return { absolutePath }
}
