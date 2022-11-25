import React from 'react'
import classnames from 'classnames'

// Shared
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import { DynamicElement } from '../../shared/types'

export interface VisuallyHiddenProps {
  /**
   * Hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user)
   * Default: false
   */
  focusable?: boolean

  /**
   * Root element of the component
   * Default: span
   */
  element?: DynamicElement
}

export type VisuallyHiddenAllProps = VisuallyHiddenProps &
  React.HTMLProps<HTMLSpanElement>

export const defaultProps = {
  focusable: false,
  element: 'span',
}

const VisuallyHidden = (localProps: VisuallyHiddenAllProps) => {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const { element, children, className, focusable, ...props } =
    extendPropsWithContext(
      localProps,
      defaultProps,
      context?.VisuallyHidden
    )

  const visuallyHiddenClassNames = classnames(
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

export default VisuallyHidden
