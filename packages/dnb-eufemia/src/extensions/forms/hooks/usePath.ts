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

  if (
    pathProp &&
    !pathProp.startsWith('/') &&
    !pathProp.startsWith('//') &&
    !isParentRelativePath(pathProp)
  ) {
    throw new Error(
      `path="${pathProp}" must start with "/" or use "//" or "../"`
    )
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
      // If path starts with //, it's a root-relative path, so don't prepend section path
      if (path.startsWith('//')) {
        return path.substring(1) as Path // Remove one slash, keep the leading /
      }
      if (isParentRelativePath(path)) {
        return resolveParentRelativePath(path, sectionPath)
      }
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
      // If path starts with //, it's a root-relative path
      if (path.startsWith('//')) {
        return path.substring(1) as Path // Remove one slash, keep the leading /
      }

      if (itemPathProp) {
        return itemPath
      }

      if (sectionPath || isParentRelativePath(path)) {
        return makeSectionPath(path)
      }

      // Identifier is used is registries of multiple fields, like in the DataContext keeping track of errors
      return path
    },
    [itemPathProp, sectionPath, itemPath, makeSectionPath]
  )

  const path = useMemo(() => {
    if (pathProp) {
      return makePath(pathProp)
    }
    if (itemPath) {
      return itemPath
    }
    return undefined
  }, [itemPath, makePath, pathProp])

  // When itemPath exists, use it as identifier; otherwise use path or id
  const identifier = itemPath ?? path ?? id
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

function isParentRelativePath(path: Path) {
  return path.startsWith('../')
}

function resolveParentRelativePath(path: Path, sectionPath?: Path): Path {
  let base = ''
  if (sectionPath && sectionPath !== '/') {
    base = sectionPath
    // trim leading/trailing slashes without regex
    while (base.startsWith('/')) {
      base = base.slice(1)
    }
    while (base.endsWith('/')) {
      base = base.slice(0, -1)
    }
  }

  // count "../"
  let idx = 0
  while (path.startsWith('../', idx)) {
    idx += 3
  }
  const up = idx / 3

  const baseSegments = base ? base.split('/') : []
  if (up) {
    baseSegments.length = Math.max(0, baseSegments.length - up)
  }

  let rest = path.slice(idx)
  while (rest.startsWith('/')) {
    rest = rest.slice(1)
  }
  const restSegments = rest ? rest.split('/') : []

  const resolved = `/${baseSegments
    .concat(restSegments)
    .filter(Boolean)
    .join('/')}`
  const normalized = cleanPath(resolved as Path)
  return (normalized === '' ? '/' : normalized) as Path
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
