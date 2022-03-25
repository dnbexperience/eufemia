import React from 'react'
import classnames from 'classnames'

// Shared
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface VisuallyHiddenProps {
  /**
   * The content of the visually hidden element, can be a string or a React Element
   * Default: null
   */
  children?: string | React.ReactNode // ReactNode allows multiple elements, strings, numbers, fragments, portals...

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user)
   * Default: false
   */
  focusable?: boolean

  /**
   * Root element of the component
   * Default: span
   */
  element?: string | React.ReactNode
}

export const defaultProps = {
  className: null,
  children: null,
  focusable: false,
  element: 'span',
}

const VisuallyHidden = (localProps: VisuallyHiddenProps) => {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const { element, children, className, focusable, ...props } =
    extendPropsWithContext(
      { ...defaultProps, ...localProps },
      defaultProps,
      context?.translation?.VisuallyHidden,
      context?.VisuallyHidden
    )

  const visuallyHiddenClassNames = classnames(
    'dnb-visually-hidden',
    focusable
      ? 'dnb-visually-hidden--focusable'
      : 'dnb-visually-hidden--default',
    className
  )
  const Element = element

  return (
    <Element
      data-testid="visually-hidden"
      className={visuallyHiddenClassNames}
      {...props}
    >
      {children}
    </Element>
  )
}

export default VisuallyHidden
