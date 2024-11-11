/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from '../Element'
import type { SpacingProps } from '../../shared/types'

export type DlProps = {
  /**
   * Use "true" to horizontally align both the term and the description
   */
  layout?: 'vertical' | 'horizontal' | 'grid'

  /**
   * @deprecated Use layout instead
   */
  direction?: 'vertical' | 'horizontal'
}

export type DlAllProps = DlProps &
  React.AllHTMLAttributes<HTMLDListElement> &
  Omit<ElementProps, 'skeleton' | 'skeletonMethod'>

const Dl = ({ direction, layout, ...props }: DlAllProps) => {
  if (layout || direction) {
    props.className = classnames(
      props.className,
      `dnb-dl__layout--${layout || direction}`
    )
  }
  return <E as="dl" {...props} skeleton={false} />
}

Dl.Item = ({
  className,
  children,
  ...props
}: React.AllHTMLAttributes<HTMLSpanElement> & SpacingProps) => {
  return (
    <>
      {children}
      <E
        as="dd"
        aria-hidden
        className={classnames(className, 'dnb-dl__item')}
        {...props}
      />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Dl._supportsSpacingProps = true

export default Dl
