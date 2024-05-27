import { useCallback, useContext, useMemo } from 'react'
import { Path } from '../types'
import useId from '../../../shared/helpers/useId'
import SectionContext from '../Form/Section/SectionContext'
import IterateElementContext from '../Iterate/IterateElementContext'

export type Props = {
  id?: string
  path?: Path
  itemPath?: Path
}

export default function usePath(props: Props = {}) {
  const { path: pathProp, itemPath: itemPathProp } = props
  const id = useId(props.id)
  const { path: sectionPath } = useContext(SectionContext) ?? {}
  const { path: iteratePath, index: iterateElementIndex } =
    useContext(IterateElementContext) ?? {}

  if (pathProp && !pathProp.startsWith('/')) {
    throw new Error(`path="${pathProp}" must start with a slash`)
  }
  if (itemPathProp && !itemPathProp.startsWith('/')) {
    throw new Error(`itemPath="${itemPathProp}" must start with a slash`)
  }

  const makeSectionPath = useCallback(
    (path: Path) => {
      return `${
        sectionPath && sectionPath !== '/' ? sectionPath : ''
      }${path}`
    },
    [sectionPath]
  )

  const makeIteratePath = useCallback(
    (iteratePath: Path = '') => {
      let root = ''

      if (sectionPath) {
        root = makeSectionPath('')
      }

      return `${root}${iteratePath}/${iterateElementIndex}${
        itemPathProp && itemPathProp !== '/' ? itemPathProp : ''
      }`
    },
    [sectionPath, itemPathProp, iterateElementIndex, makeSectionPath]
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

      if (sectionPath) {
        return makeSectionPath(path)
      }

      // Identifier is used is registries of multiple fields, like in the DataContext keeping track of errors
      return path
    },
    [itemPath, sectionPath, makeSectionPath]
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
    makeSectionPath,
  }
}
