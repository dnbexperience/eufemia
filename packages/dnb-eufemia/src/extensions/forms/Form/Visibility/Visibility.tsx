import { useCallback, useContext } from 'react'
import type { AriaAttributes, ReactNode } from 'react'

import { warn } from '../../../../shared/helpers'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import useMounted from '../../../../shared/helpers/useMounted'
import type { HeightAnimationAllProps } from '../../../../components/HeightAnimation'
import HeightAnimation from '../../../../components/HeightAnimation'
import FieldProvider from '../../Field/Provider'
import useVisibility from './useVisibility'
import VisibilityContext from './VisibilityContext'
import SummaryListContext from '../../Value/SummaryList/SummaryListContext'

import type { Path, UseFieldProps } from '../../types'
import type { DataAttributes } from '../../hooks/useFieldProps'
import type { FilterData } from '../../DataContext'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

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
      validateContinuously?: boolean
    }
  | {
      itemPath: Path
      isValid: boolean
      validateContinuously?: boolean
    }

export type FormVisibilityProps = {
  /** A unique identifier for the component's wrapper element. */
  id?: string
  visible?: boolean
  /**
   * Given data context path must be defined to show children.
   */
  pathDefined?: Path
  /**
   * Given data context path must be `undefined` to show children.
   */
  pathUndefined?: Path
  /**
   * Given data context path must be truthy to show children.
   */
  pathTruthy?: Path
  /**
   * Given data context path must be falsy to show children.
   */
  pathFalsy?: Path
  /**
   * Given data context path must be `true` to show children.
   */
  pathTrue?: Path
  /**
   * Given data context path must be `false` to show children.
   */
  pathFalse?: Path
  /**
   * Provide a `path` or `itemPath`, and a `hasValue` function that returns either a boolean or the expected value to determine whether the children should be shown. The first parameter passed to `hasValue` is the value at the given `path`. If the `path` does not exist, the value will be `undefined`. Alternatively, you can use `isValid` instead of `hasValue` to show the children only when the field has no validation errors and has been blurred (lost focus). You can change this behavior by setting the `validateContinuously` property.
   */
  visibleWhen?: VisibleWhen
  /** Same as `visibleWhen`, but with inverted logic. */
  visibleWhenNot?: VisibleWhen
  /**
   * Will be called to decide by external logic, and show/hide contents based on the return value.
   */
  inferData?: (data: unknown) => boolean
  /**
   * Filter data based on provided criteria. More info about `filterData` can be found in the [Getting Started](/uilib/extensions/forms/getting-started/#filter-data) documentation.
   */
  filterData?: FilterData
  /**
   * Callback for when the content gets visible. Returns a boolean as the first parameter.
   */
  onVisible?: HeightAnimationAllProps['onOpen']

  /**
   * When visibility is hidden, and `keepInDOM` is `true`, pass these properties to the children.
   */
  fieldPropsWhenHidden?: UseFieldProps & DataAttributes & AriaAttributes
  children: ReactNode

  /** For internal use only. Used by "Iterate.Visibility" */
  withinIterate?: boolean
} & Pick<
  HeightAnimationAllProps,
  | 'onAnimationEnd'
  | 'animate'
  | 'keepInDOM'
  | 'element'
  | 'compensateForGap'
>

function Visibility(props: FormVisibilityProps) {
  const {
    id,
    visible,
    pathDefined,
    pathUndefined,
    pathTruthy,
    pathFalsy,
    pathTrue,
    pathFalse,
    visibleWhen,
    visibleWhenNot,
    inferData,
    filterData,
    onVisible,
    onAnimationEnd,
    animate,
    keepInDOM,
    compensateForGap,
    fieldPropsWhenHidden,
    withinIterate,
    children,
    ...rest
  } = props

  useMountEffect(() => {
    if (fieldPropsWhenHidden && !keepInDOM) {
      warn('Using "fieldPropsWhenHidden" requires "keepInDOM" to be true.')
    }
  })

  const { check } = useVisibility({
    visible,
    withinIterate,
    pathDefined,
    pathUndefined,
    pathTruthy,
    pathFalsy,
    pathTrue,
    pathFalse,
    visibleWhen,
    visibleWhenNot,
    inferData,
    filterData,
  })
  const open = check()
  const content = (
    <VisibilityContext
      value={{
        isVisible: open,
        keepInDOM,
        props, // Used by ValueBlock and for when nested in a Visibility
      }}
    >
      {children}
    </VisibilityContext>
  )
  const mountedRef = useMounted()

  const onOpen: HeightAnimationAllProps['onOpen'] = useCallback(
    (state) => {
      if (mountedRef.current) {
        onVisible?.(state)
      }
    },
    [mountedRef, onVisible]
  )

  const summaryListContext = useContext(SummaryListContext)
  const providerProps = !open ? fieldPropsWhenHidden : null

  if (
    (animate || keepInDOM) &&
    summaryListContext &&
    !summaryListContext.isNested
  ) {
    // Handle the animation inside the SummaryList
    return <FieldProvider {...providerProps}>{content}</FieldProvider>
  }

  if (animate) {
    return (
      <HeightAnimation
        id={id}
        open={open}
        onAnimationEnd={onAnimationEnd}
        onOpen={onOpen}
        keepInDOM={Boolean(keepInDOM)}
        className="dnb-forms-visibility"
        compensateForGap={compensateForGap}
        {...rest}
      >
        <FieldProvider {...providerProps}>{content}</FieldProvider>
      </HeightAnimation>
    )
  }

  if (mountedRef.current) {
    onVisible?.(open)
  }

  if (keepInDOM) {
    return (
      <span id={id} className="dnb-forms-visibility" hidden={!open}>
        <FieldProvider {...providerProps}>{content}</FieldProvider>
      </span>
    )
  }

  if (id) {
    return (
      <>
        {open ? (
          <span id={id} className="dnb-forms-visibility">
            {content}
          </span>
        ) : null}
      </>
    )
  }

  return <>{open ? content : null}</>
}

withComponentMarkers(Visibility, {
  _supportsSpacingProps: 'children',
})

export default Visibility
