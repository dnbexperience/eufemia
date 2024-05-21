import React, { AriaAttributes, useContext } from 'react'
import pointer from 'json-pointer'
import { warn } from '../../../../shared/helpers'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import HeightAnimation, {
  HeightAnimationProps,
} from '../../../../components/HeightAnimation'
import DataContext, { FilterData } from '../../DataContext/Context'
import FieldProps from '../FieldProps'
import type { Path, UseFieldProps } from '../../types'
import type { DataAttributes } from '../../hooks/useFieldProps'

export type Props = {
  visible?: boolean
  /** Given data context path must be defined to show children */
  pathDefined?: string
  /** Given data context path must be undefined to show children */
  pathUndefined?: string
  /** Given data context path must be truthy to show children */
  pathTruthy?: string
  /** Given data context path must be falsy to show children */
  pathFalsy?: string
  /** Given data context path must be true to show children */
  pathTrue?: string
  /** Given data context path must be false to show children */
  pathFalse?: string
  /** Provide a `path` and a `hasValue` property with the excepted value in order to show children. You can alternatively provide a `withValue` function that returns a boolean. The first parameter is the value of the path. */
  visibleWhen?:
    | {
        path: string
        hasValue: unknown
      }
    | {
        path: string
        withValue: (value: unknown) => boolean
      }
  /** Infer visibility calling given derivative function with the whole data set. Should return true/false for visibility.   */
  inferData?: (data: unknown) => boolean
  /** Filter data based on provided criteria. The first parameter is the path, the second is the value, and the third is the props, and the fourth is the internal. Return false to filter out the data. */
  filterData?: FilterData
  /** Animate the visibility change */
  animate?: boolean
  /** Keep the content in the DOM, even if it's not visible */
  keepInDOM?: boolean
  /** When visibility is hidden, and `keepInDOM` is true, pass these props to the children */
  fieldPropsWhenHidden?: UseFieldProps & DataAttributes & AriaAttributes
  element?: HeightAnimationProps['element']
  children: React.ReactNode

  /** @deprecated Use `visibleWhen` instead */
  pathValue?: string
  /** @deprecated Use `visibleWhen` instead */
  whenValue?: unknown
}

function Visibility({
  visible,
  pathDefined,
  pathUndefined,
  pathTruthy,
  pathFalsy,
  pathTrue,
  pathFalse,
  pathValue,
  whenValue,
  visibleWhen,
  inferData,
  filterData,
  animate,
  keepInDOM,
  fieldPropsWhenHidden,
  children,
  ...rest
}: Props) {
  const dataContext = useContext(DataContext)

  useMountEffect(() => {
    if (fieldPropsWhenHidden && !keepInDOM) {
      warn('Using "fieldPropsWhenHidden" requires "keepInDOM" to be true.')
    }
  })

  const check = () => {
    if (visible === false) {
      return
    }

    const data =
      (filterData &&
        dataContext.filterDataHandler?.(dataContext.data, filterData)) ||
      dataContext.data

    if (visibleWhen) {
      const hasValue = pointer.has(data, visibleWhen.path)
      if (hasValue) {
        const value = pointer.get(data, visibleWhen.path)

        const withValue = visibleWhen?.['withValue']
        if (withValue && withValue?.(value) === false) {
          return
        } else if (
          Object.prototype.hasOwnProperty.call(visibleWhen, 'hasValue') &&
          visibleWhen?.['hasValue'] !== value
        ) {
          return
        }
      }
    }

    if (pathDefined && !pointer.has(data, pathDefined)) {
      return
    }
    if (pathUndefined && pointer.has(data, pathUndefined)) {
      return
    }

    const getValue = (path: Path) => {
      if (pointer.has(data, path)) {
        return pointer.get(data, path)
      }
    }

    if (pathTrue && getValue(pathTrue) !== true) {
      return
    }
    if (pathFalse && getValue(pathFalse) !== false) {
      return
    }
    if (pathTruthy && Boolean(getValue(pathTruthy)) === false) {
      return
    }
    if (pathFalsy && Boolean(getValue(pathFalsy)) === true) {
      return
    }
    if (inferData && !inferData(data)) {
      return
    }

    // Deprecated can be removed in v11
    if (pathValue && getValue(pathValue) !== whenValue) {
      return
    }

    return true
  }

  const open = Boolean(check())

  if (animate) {
    const props = !open ? fieldPropsWhenHidden : null

    return (
      <HeightAnimation
        open={open}
        keepInDOM={Boolean(keepInDOM)}
        className="dnb-forms-visibility"
        {...rest}
      >
        <FieldProps {...props}>{children}</FieldProps>
      </HeightAnimation>
    )
  }

  if (keepInDOM) {
    const props = !open ? fieldPropsWhenHidden : null
    return (
      <span className="dnb-forms-visibility" hidden={!open}>
        <FieldProps {...props}>{children}</FieldProps>
      </span>
    )
  }

  return <>{open ? children : null}</>
}

Visibility._supportsSpacingProps = 'children'
export default Visibility
