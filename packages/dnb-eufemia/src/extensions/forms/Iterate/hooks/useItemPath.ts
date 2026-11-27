import { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import usePath from '../../hooks/usePath'
import type { UsePathProps } from '../../hooks/usePath'

export default function useItemPath({
  path,
  itemPath,
  omitSectionPath,
}: UsePathProps) {
  const { joinPath, path: resolvedPath } = usePath({
    path,
    itemPath,
    omitSectionPath,
  })
  const iterateItemContext = useContext(IterateItemContext)

  const absolutePath =
    itemPath &&
    iterateItemContext &&
    joinPath([
      iterateItemContext.path,
      String(iterateItemContext.index),
      itemPath,
    ])

  return { absolutePath, resolvedPath }
}
