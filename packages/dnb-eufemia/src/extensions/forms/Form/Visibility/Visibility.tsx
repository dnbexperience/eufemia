import React, { AriaAttributes } from 'react'

import { warn } from '../../../../shared/helpers'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import HeightAnimation, {
  HeightAnimationProps,
} from '../../../../components/HeightAnimation'
import FieldProps from '../FieldProps'
import useVisibility from './useVisibility'

import type { UseFieldProps } from '../../types'
import type { DataAttributes } from '../../hooks/useFieldProps'
import { FilterData } from '../../DataContext'

export type VisibleWhen =
  | {
      path: string
      hasValue: unknown
    }
  | {
      path: string
      withValue: (value: unknown) => boolean
    }

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
  visibleWhen?: VisibleWhen
  /** Same as `visibleWhen`, but with inverted logic. */
  visibleWhenNot?: VisibleWhen
  /** Infer visibility calling given derivative function with the whole data set. Should return true/false for visibility.   */
  inferData?: (data: unknown) => boolean
  /** Filter data based on provided criteria. The first parameter is the path, the second is the value, and the third is the props, and the fourth is the internal. Return false to filter out the data. */
  filterData?: FilterData
  /** Animate the visibility change */
  animate?: boolean
  /** Keep the content in the DOM, even if it's not visible */
  keepInDOM?: boolean
  /** To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`. */
  compensateForGap?: HeightAnimationProps['compensateForGap']
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
  visibleWhenNot,
  inferData,
  filterData,
  animate,
  keepInDOM,
  compensateForGap,
  fieldPropsWhenHidden,
  children,
  ...rest
}: Props) {
  useMountEffect(() => {
    if (fieldPropsWhenHidden && !keepInDOM) {
      warn('Using "fieldPropsWhenHidden" requires "keepInDOM" to be true.')
    }
  })

  const { check } = useVisibility({
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
    visibleWhenNot,
    inferData,
    filterData,
  })
  const open = check()

  if (animate) {
    const props = !open ? fieldPropsWhenHidden : null

    return (
      <HeightAnimation
        open={open}
        keepInDOM={Boolean(keepInDOM)}
        className="dnb-forms-visibility"
        compensateForGap={compensateForGap}
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
