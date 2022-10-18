/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from './Element'
import { SpacingProps } from '../shared/types'

export type DlProps = {
  /**
   * Use "true" to horizontallly align both the term and the description
   */
  direction?: 'vertical' | 'horizontal'
}

export type DlAllProps = DlProps &
  React.AllHTMLAttributes<HTMLDListElement> &
  ElementProps

const Dl = ({ direction, ...props }: DlAllProps) => {
  if (direction) {
    props.className = classnames(
      props.className,
      `dnb-dl__direction--${direction}`
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

export default Dl
