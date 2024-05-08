import React, { useContext } from 'react'
import pointer from 'json-pointer'
import * as DataContext from '../../DataContext'
import HeightAnimation, {
  HeightAnimationProps,
} from '../../../../components/HeightAnimation'
import FieldProps from '../FieldProps'
import type { UseFieldProps } from '../../types'

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
  /** Given data context path must match, as well as the "whenValue" value */
  pathValue?: string
  /** Given data context value must match this value to show children */
  whenValue?: unknown
  /** Infer visibility calling given derivative function with the whole data set. Should return true/false for visibility.   */
  inferData?: (data: unknown) => boolean
  /** Animate the visibility change */
  animate?: boolean
  /** Keep the content in the DOM, even if it's not visible */
  keepInDOM?: boolean
  /** When visibility is hidden, and `keepInDOM` is true, pass these props to the children */
  fieldPropsWhenHidden?: UseFieldProps
  element?: HeightAnimationProps['element']
  children: React.ReactNode
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
  inferData,
  animate,
  keepInDOM,
  fieldPropsWhenHidden,
  children,
  ...rest
}: Props) {
  const dataContext = useContext(DataContext.Context)

  const check = () => {
    if (visible === false) {
      return
    }

    if (pathDefined && !pointer.has(dataContext.data, pathDefined)) {
      return
    }
    if (pathUndefined && pointer.has(dataContext.data, pathUndefined)) {
      return
    }

    if (
      pathTruthy &&
      (!pointer.has(dataContext.data, pathTruthy) ||
        !pointer.get(dataContext.data, pathTruthy))
    ) {
      return
    }
    if (
      pathFalsy &&
      pointer.has(dataContext.data, pathFalsy) &&
      Boolean(pointer.get(dataContext.data, pathFalsy))
    ) {
      return
    }

    if (
      pathTrue &&
      (!pointer.has(dataContext.data, pathTrue) ||
        pointer.get(dataContext.data, pathTrue) !== true)
    ) {
      return
    }
    if (
      pathFalse &&
      (!pointer.has(dataContext.data, pathFalse) ||
        pointer.get(dataContext.data, pathFalse) !== false)
    ) {
      return
    }

    if (
      pathValue &&
      !(
        pointer.has(dataContext.data, pathValue) &&
        pointer.get(dataContext.data, pathValue) === whenValue
      )
    ) {
      return
    }

    if (inferData && !inferData(dataContext.data)) {
      return
    }

    return true
  }

  if (animate) {
    const open = Boolean(check())
    return (
      <HeightAnimation
        open={open}
        keepInDOM={keepInDOM}
        className="dnb-forms-visibility"
        {...rest}
      >
        <FieldProps {...(open ? null : fieldPropsWhenHidden)}>
          {children}
        </FieldProps>
      </HeightAnimation>
    )
  }

  if (check()) {
    return <>{children}</>
  }

  if (keepInDOM) {
    return (
      <span className="dnb-forms-visibility" hidden>
        <FieldProps {...fieldPropsWhenHidden}>{children}</FieldProps>
      </span>
    )
  }

  return null
}

Visibility._supportsSpacingProps = 'children'
export default Visibility
