/**
 * Web ScrollView Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../../components/space/SpacingHelper'
import { SpacingProps } from '../../shared/types'

export type ScrollViewProps = {
  /**
   * Set to `true` to make the content accessible to keyboard navigation
   * Default: false
   */
  interactive?: boolean
}

export type ScrollViewAllProps = ScrollViewProps &
  SpacingProps &
  Partial<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>> & {
    innerRef?: React.ForwardedRef<unknown>
  }

const defaultProps = {
  children: null,
}

function ScrollView(localProps: ScrollViewAllProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.ScrollView
  )

  const {
    interactive,
    children,
    className = null,
    innerRef,
    ...attributes
  } = props

  const mainParams: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {
    className: classnames(
      'dnb-scroll-view',
      createSpacingClasses(props),
      className
    ),
    ...(attributes as React.HTMLAttributes<unknown>),
  }

  if (innerRef) {
    mainParams.ref = innerRef as React.RefObject<HTMLDivElement>
  }

  if (interactive) {
    mainParams.tabIndex = 0 // Ensure that scrollable region has keyboard access
  }

  validateDOMAttributes(props, mainParams)

  return <div {...mainParams}>{children}</div>
}

export default React.forwardRef((props: ScrollViewAllProps, ref) => {
  return <ScrollView {...props} innerRef={ref} />
})
