/**
 * Web ScrollView Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  usePropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../../components/space/SpacingHelper'
import { ISpacingProps } from '../../shared/interfaces'

export type ScrollViewProps = {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  innerRef?: React.ForwardedRef<unknown>
} & ISpacingProps &
  Partial<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>>

const defaultProps = {
  children: null,
}

function ScrollView(localProps: ScrollViewProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = usePropsWithContext(
    localProps,
    defaultProps,
    context.FormRow,
    context.ScrollView
  )

  const { children, className = null, innerRef, ...attributes } = props

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

  validateDOMAttributes(props, mainParams)

  return <div {...mainParams}>{children}</div>
}

export default React.forwardRef((props: ScrollViewProps, ref) => {
  return <ScrollView {...props} innerRef={ref} />
})
