import { useCallback, useContext } from 'react'
import pointer from 'json-pointer'
import DataContext from '../../DataContext/Context'
import SectionContext from '../Section/SectionContext'
import { Path } from '../../types'
import { Props } from './Visibility'

export default function useVisibility({
  visible,
  visibleWhen,
  visibleWhenNot,
  pathDefined,
  pathUndefined,
  pathTruthy,
  pathFalsy,
  pathTrue,
  pathFalse,
  pathValue,
  whenValue,
  inferData,
  filterData,
}: Partial<Props>) {
  const dataContext = useContext(DataContext)
  const sectionContext = useContext(SectionContext)

  const sectionPath = sectionContext?.path
  const composePath = useCallback(
    (path: Path) => {
      return `${
        sectionPath && sectionPath !== '/' ? sectionPath : ''
      }${path}`
    },
    [sectionPath]
  )

  const check = () => {
    if (visible === false) {
      return false
    }

    const data =
      (filterData &&
        dataContext.filterDataHandler?.(dataContext.data, filterData)) ||
      dataContext.data

    if (visibleWhen || visibleWhenNot) {
      if (visibleWhenNot) {
        visibleWhen = visibleWhenNot
      }
      const hasPath = pointer.has(data, composePath(visibleWhen.path))
      if (hasPath) {
        const value = pointer.get(data, composePath(visibleWhen.path))

        const withValue = visibleWhen?.['withValue']
        const result =
          (withValue && withValue?.(value) === false) ||
          (Object.prototype.hasOwnProperty.call(visibleWhen, 'hasValue') &&
            visibleWhen?.['hasValue'] !== value)

        if (visibleWhenNot) {
          if (!result) {
            return false
          }
        } else if (result) {
          return false
        }
      } else {
        return false
      }
    }

    if (pathDefined && !pointer.has(data, composePath(pathDefined))) {
      return false
    }
    if (pathUndefined && pointer.has(data, composePath(pathUndefined))) {
      return false
    }

    const getValue = (path: Path) => {
      if (pointer.has(data, path)) {
        return pointer.get(data, path)
      }
    }

    if (pathTrue && getValue(composePath(pathTrue)) !== true) {
      return false
    }
    if (pathFalse && getValue(composePath(pathFalse)) !== false) {
      return false
    }
    if (
      pathTruthy &&
      Boolean(getValue(composePath(pathTruthy))) === false
    ) {
      return false
    }
    if (pathFalsy && Boolean(getValue(composePath(pathFalsy))) === true) {
      return false
    }
    if (inferData && !inferData(data)) {
      return false
    }

    // Deprecated can be removed in v11
    if (pathValue && getValue(composePath(pathValue)) !== whenValue) {
      return false
    }

    return true
  }

  return { check }
}
