import { useCallback, useContext, useMemo } from 'react'
import { Path } from '../types'
import useId from '../../../shared/helpers/useId'
import SectionContext from '../Form/Section/SectionContext'
import IterateElementContext from '../Iterate/IterateItemContext'

export type Props = {
  id?: string
  path?: Path
  itemPath?: Path
}

export default function usePath(props: Props = {}) {
  const { path: pathProp, itemPath: itemPathProp } = props
  const id = useId(props.id)
  const { path: sectionPath } = useContext(SectionContext) ?? {}
  const { path: iteratePathProp, index: iterateElementIndex } =
    useContext(IterateElementContext) ?? {}

  if (pathProp && !pathProp.startsWith('/')) {
    throw new Error(`path="${pathProp}" must start with a slash`)
  }
  if (itemPathProp && !itemPathProp.startsWith('/')) {
    throw new Error(`itemPath="${itemPathProp}" must start with a slash`)
  }

  const joinPath = useCallback((paths: Array<Path>) => {
    return paths
      .reduce((acc, cur) => (cur ? `${acc}/${cur}` : acc), '/')
      .replace(/\/{2,}/g, '/')
      .replace(/\/+$/, '')
  }, [])

  const makeSectionPath = useCallback(
    (path: Path) => {
      return `${
        sectionPath && sectionPath !== '/' ? sectionPath : ''
      }${path}`.replace(/\/$/, '')
    },
    [sectionPath]
  )

  const makeIteratePath = useCallback(
    (
      itemPath: Path = itemPathProp,
      iteratePath: Path = iteratePathProp
    ) => {
      let root = ''

      if (sectionPath) {
        root = makeSectionPath('')
      }

      return `${root}${iteratePath || ''}/${iterateElementIndex}${
        itemPath && itemPath !== '/' ? itemPath : ''
      }`
    },
    [
      iteratePathProp,
      sectionPath,
      iterateElementIndex,
      itemPathProp,
      makeSectionPath,
    ]
  )

  const itemPath = useMemo(() => {
    if (itemPathProp) {
      return makeIteratePath()
    }
  }, [itemPathProp, makeIteratePath])

  const makePath = useCallback(
    (path: Path) => {
      if (itemPathProp) {
        return itemPath
      }

      if (sectionPath) {
        return makeSectionPath(path)
      }

      // Identifier is used is registries of multiple fields, like in the DataContext keeping track of errors
      return path
    },
    [itemPathProp, sectionPath, itemPath, makeSectionPath]
  )

  const path = useMemo(() => {
    return makePath(pathProp)
  }, [makePath, pathProp])

  const identifier = path ?? id
  return {
    identifier,
    path,
    itemPath,
    joinPath,
    makePath,
    makeIteratePath,
    makeSectionPath,
  }
}
