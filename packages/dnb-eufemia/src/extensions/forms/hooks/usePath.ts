import { useCallback, useContext, useMemo } from 'react'
import { Path } from '../types'
import useId from '../../../shared/helpers/useId'
import SectionContext from '../Form/Section/SectionContext'
import IterateItemContext from '../Iterate/IterateItemContext'

export type Props = {
  id?: string
  path?: Path
  itemPath?: Path
  omitSectionPath?: boolean
}

export default function usePath(props: Props = {}) {
  const { path: pathProp, itemPath: itemPathProp, omitSectionPath } = props
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
      if (omitSectionPath) {
        return path
      }
      return cleanPath(
        `${sectionPath && sectionPath !== '/' ? sectionPath : ''}${path}`
      )
    },
    [omitSectionPath, sectionPath]
  )

  const makeIteratePath = useCallback(
    (
      itemPath: Path = itemPathProp,
      iteratePath: Path = iteratePathProp,
      { omitSectionPath = false } = {}
    ) => {
      let root = ''

      if (sectionPath && !omitSectionPath) {
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
export function cleanPath(path: Path) {
  return path.replace(/\/+$|\/(\/)+/g, '$1')
}

// Appends a path part to a base path, normalizing '/' to empty string
// Used for combining section paths with error paths
export function appendPath(base: Path, part: Path | undefined): Path {
  const normalizedBase = base && base !== '/' ? base : ''
  const normalizedPart = part && part !== '/' ? part : ''
  if (normalizedBase && normalizedPart) {
    return `${normalizedBase}${normalizedPart}`
  }
  if (normalizedBase) {
    return normalizedBase
  }
  if (normalizedPart) {
    return normalizedPart
  }
  return '/'
}
