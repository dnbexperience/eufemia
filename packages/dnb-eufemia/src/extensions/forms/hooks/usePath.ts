import { useCallback, useContext, useMemo } from 'react'
import { Path } from '../types'
import useId from '../../../shared/helpers/useId'
import SectionContext from '../Form/Section/SectionContext'
import IterateItemContext from '../Iterate/IterateItemContext'

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
    useContext(IterateItemContext) ?? {}

  if (pathProp && !pathProp.startsWith('/')) {
    throw new Error(`path="${pathProp}" must start with a slash`)
  }
  if (itemPathProp && !itemPathProp.startsWith('/')) {
    throw new Error(`itemPath="${itemPathProp}" must start with a slash`)
  }

  const joinPath = useCallback((paths: Array<Path>) => {
    return cleanPath(
      paths.reduce((acc, cur) => (cur ? `${acc}/${cur}` : acc), '/')
    )
  }, [])

  const makeSectionPath = useCallback(
    (path: Path) => {
      return cleanPath(
        `${sectionPath && sectionPath !== '/' ? sectionPath : ''}${path}`
      )
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

      return cleanPath(
        `${root}${iteratePath || ''}/${iterateElementIndex}${
          itemPath || ''
        }`
      )
    },
    [
      itemPathProp,
      iteratePathProp,
      sectionPath,
      iterateElementIndex,
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
    cleanPath,
  }
}

// Will remove duplicate slashes and trailing slashes
// /foo///bar/// => /foo/bar
function cleanPath(path: Path) {
  return path.replace(/\/+$|\/(\/)+/g, '$1')
}
