/**
 * HTML Element
 *
 */

import React from 'react'
import clsx from 'clsx'
import type { ElementProps } from '../Element'
import E from '../Element'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type DlProps = {
  /**
   * Use "true" to horizontally align both the term and the description
   */
  layout?: 'vertical' | 'horizontal' | 'grid'
}

export type DlAllProps = DlProps &
  React.AllHTMLAttributes<HTMLDListElement> &
  Omit<ElementProps, 'skeleton' | 'skeletonMethod'>

const Dl = ({ layout, ...props }: DlAllProps) => {
  if (layout) {
    props.className = clsx(props.className, `dnb-dl__layout--${layout}`)
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
        className={clsx(className, 'dnb-dl__item')}
        {...props}
      />
    </>
  )
}

withComponentMarkers(Dl, { _supportsSpacingProps: true })

export default Dl
