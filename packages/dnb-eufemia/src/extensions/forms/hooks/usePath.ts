import { useCallback, useContext, useMemo } from 'react'
import { Path } from '../types'
import useId from '../../../shared/helpers/useId'
import CompositeContext from '../Composite/CompositeContext'
import IterateElementContext from '../Iterate/IterateElementContext'

export type Props = {
  id?: string
  path?: Path
  itemPath?: Path
}

export default function usePath(props: Props = {}) {
  const { path: pathProp, itemPath: itemPathProp } = props
  const id = useId(props.id)
  const { path: compositePath } = useContext(CompositeContext) ?? {}
  const { path: iteratePath, index: iterateElementIndex } =
    useContext(IterateElementContext) ?? {}

  if (pathProp && !pathProp.startsWith('/')) {
    throw new Error(`path="${pathProp}" must start with a slash`)
  }
  if (itemPathProp && !itemPathProp.startsWith('/')) {
    throw new Error(`itemPath="${itemPathProp}" must start with a slash`)
  }

  const makeCompositePath = useCallback(
    (path: Path) => {
      return `${
        compositePath && compositePath !== '/' ? compositePath : ''
      }${path}`
    },
    [compositePath]
  )

  const makeIteratePath = useCallback(
    (iteratePath: Path = '') => {
      let root = ''

      if (compositePath) {
        root = makeCompositePath('')
      }

      return `${root}${iteratePath}/${iterateElementIndex}${
        itemPathProp && itemPathProp !== '/' ? itemPathProp : ''
      }`
    },
    [compositePath, itemPathProp, iterateElementIndex, makeCompositePath]
  )

  const itemPath = useMemo(() => {
    if (itemPathProp) {
      return makeIteratePath(iteratePath)
    }
  }, [itemPathProp, makeIteratePath, iteratePath])

  const makePath = useCallback(
    (path: Path) => {
      if (itemPath) {
        return itemPath
      }

      if (compositePath) {
        return makeCompositePath(path)
      }

      // Identifier is used is registries of multiple fields, like in the DataContext keeping track of errors
      return path
    },
    [itemPath, compositePath, makeCompositePath]
  )

  const path = useMemo(() => {
    return makePath(pathProp)
  }, [makePath, pathProp])

  const identifier = path ?? id
  return {
    identifier,
    path,
    itemPath,
    makePath,
    makeIteratePath,
    makeCompositePath,
  }
}
