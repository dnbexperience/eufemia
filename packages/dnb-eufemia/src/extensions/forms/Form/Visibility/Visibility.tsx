import React, { AriaAttributes, useContext } from 'react'
import pointer from 'json-pointer'
import { warn } from '../../../../shared/helpers'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import HeightAnimation, {
  HeightAnimationProps,
} from '../../../../components/HeightAnimation'
import DataContext from '../../DataContext/Context'
import FieldProps from '../FieldProps'
import type { UseFieldProps } from '../../types'
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

    const data = dataContext.data

    if (pathDefined && !pointer.has(data, pathDefined)) {
      return
    }
    if (pathUndefined && pointer.has(data, pathUndefined)) {
      return
    }

    if (
      pathTruthy &&
      (!pointer.has(data, pathTruthy) || !pointer.get(data, pathTruthy))
    ) {
      return
    }
    if (
      pathFalsy &&
      pointer.has(data, pathFalsy) &&
      Boolean(pointer.get(data, pathFalsy))
    ) {
      return
    }

    if (
      pathTrue &&
      (!pointer.has(data, pathTrue) ||
        pointer.get(data, pathTrue) !== true)
    ) {
      return
    }
    if (
      pathFalse &&
      (!pointer.has(data, pathFalse) ||
        pointer.get(data, pathFalse) !== false)
    ) {
      return
    }

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

    if (
      pathValue &&
      !(
        pointer.has(data, pathValue) &&
        pointer.get(data, pathValue) === whenValue
      )
    ) {
      return
    }

    if (inferData && !inferData(data)) {
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
        keepInDOM={keepInDOM}
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
