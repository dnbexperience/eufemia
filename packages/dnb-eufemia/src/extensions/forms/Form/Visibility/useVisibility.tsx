import { useCallback, useContext, useRef } from 'react'
import pointer from 'json-pointer'
import DataContext from '../../DataContext/Context'
import SectionContext from '../Section/SectionContext'
import { Path } from '../../types'
import { Props } from './Visibility'

export type { Props }

export default function useVisibility(props?: Partial<Props>) {
  const { filterDataHandler, data: originalData } = useContext(DataContext)
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

  // Forward props to the "check" method with ref to avoid infinite loop
  const propsRef = useRef(props)
  propsRef.current = props

  const check = useCallback(
    (
      {
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
      }: Partial<Props> = propsRef.current
    ) => {
      if (visible === false) {
        return false
      }

      const data =
        (filterData && filterDataHandler?.(originalData, filterData)) ||
        originalData

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
            (Object.prototype.hasOwnProperty.call(
              visibleWhen,
              'hasValue'
            ) &&
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
      if (
        pathFalsy &&
        Boolean(getValue(composePath(pathFalsy))) === true
      ) {
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
    },
    [composePath, filterDataHandler, originalData]
  )

  return { check }
}
