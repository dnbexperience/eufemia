import React, { AriaAttributes } from 'react'

import { warn } from '../../../../shared/helpers'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import HeightAnimation, {
  HeightAnimationProps,
} from '../../../../components/HeightAnimation'
import FieldProvider from '../../Field/Provider'
import useVisibility from './useVisibility'

import type { Path, UseFieldProps } from '../../types'
import type { DataAttributes } from '../../hooks/useFieldProps'
import { FilterData } from '../../DataContext'
import VisibilityContext from './VisibilityContext'

export type VisibleWhen =
  | {
      path: Path
      hasValue: unknown | ((value: unknown) => boolean)
    }
  | {
      itemPath: Path
      hasValue: unknown | ((value: unknown) => boolean)
    }
  | {
      path: Path
      isValid: boolean
      continuousValidation?: boolean
    }
  | {
      itemPath: Path
      isValid: boolean
      continuousValidation?: boolean
    }

  /**
   * @deprecated Will be removed in v11!
   */
  | {
      path: Path
      /** @deprecated Use `hasValue` instead */
      withValue: (value: unknown) => boolean
    }
  /**
   * @deprecated  Will be removed in v11!
   */
  | {
      itemPath: Path
      /** @deprecated Use `hasValue` instead */
      withValue: (value: unknown) => boolean
    }

export type Props = {
  visible?: boolean
  /** Given data context path must be defined to show children */
  pathDefined?: Path
  /** Given data context path must be undefined to show children */
  pathUndefined?: Path
  /** Given data context path must be truthy to show children */
  pathTruthy?: Path
  /** Given data context path must be falsy to show children */
  pathFalsy?: Path
  /** Given data context path must be true to show children */
  pathTrue?: Path
  /** Given data context path must be false to show children */
  pathFalse?: Path
  /** Provide a `path` or `itemPath` and a `hasValue` method that returns a boolean or the excepted value in order to show children. The first parameter is the value of the path. */
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
  /** Callback when the content is visible. Only for when `animate` is true. */
  onOpen?: HeightAnimationProps['onOpen']
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
  const content = (
    <VisibilityContext.Provider
      value={{
        isVisible: open,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  )

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
        <FieldProvider {...props}>{content}</FieldProvider>
      </HeightAnimation>
    )
  }

  if (keepInDOM) {
    const props = !open ? fieldPropsWhenHidden : null
    return (
      <span className="dnb-forms-visibility" hidden={!open}>
        <FieldProvider {...props}>{content}</FieldProvider>
      </span>
    )
  }

  return <>{open ? content : null}</>
}

Visibility._supportsSpacingProps = 'children'
export default Visibility
