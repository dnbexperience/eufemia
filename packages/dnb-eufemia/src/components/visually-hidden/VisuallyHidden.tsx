import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useContext } from 'react'
import type { HTMLProps } from 'react'
import { clsx } from 'clsx'

// Shared
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type { DynamicElement } from '../../shared/types'

export type VisuallyHiddenProps = {
  /**
   * Set to `true` to hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user). Defaults to `false`.
   */
  focusable?: boolean

  /**
   * Custom root HTML element for the component. Defaults to `<span>`.
   */
  element?: DynamicElement
}

export type VisuallyHiddenAllProps = VisuallyHiddenProps &
  HTMLProps<HTMLSpanElement>

const defaultProps: Partial<VisuallyHiddenAllProps> = {
  focusable: false,
  element: 'span',
}

const VisuallyHidden = (localProps: VisuallyHiddenAllProps) => {
  // Every component should have a context
  const context = useContext(Context)

  // Extract additional props from global context
  const { element, children, className, focusable, ...props } =
    extendPropsWithContext(
      localProps,
      defaultProps,
      context?.VisuallyHidden
    )

  const visuallyHiddenClassNames = clsx(
    'dnb-visually-hidden',
    focusable ? 'dnb-visually-hidden--focusable' : 'dnb-sr-only',
    className
  )
  const Element = element || 'span'

  return (
    <Element
      className={visuallyHiddenClassNames}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </Element>
  )
}

withComponentMarkers(VisuallyHidden, {
  _supportsSpacingProps: false,
})

export default VisuallyHidden
