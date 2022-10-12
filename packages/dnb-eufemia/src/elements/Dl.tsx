/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from './Element'

export type DlProps = {
  /**
   * Use "true" to horizontallly align both the term and the description
   */
  direction?: 'vertical' | 'horizontal'
}

export type DlAllProps = DlProps &
  React.AllHTMLAttributes<Omit<HTMLDListElement, 'children'>> &
  ElementProps

const Dl = ({ direction, ...props }: DlAllProps) => {
  if (direction) {
    props.className = classnames(
      props.className,
      `dnb-dl__direction--${direction}`
    )
  }
  return <E is="dl" {...props} skeleton={false} />
}

export type DlItemProps = {
  //
}

Dl.Item = ({
  className,
  children,
}: DlItemProps & React.AllHTMLAttributes<HTMLSpanElement>) => {
  return (
    <>
      {children}
      <dd aria-hidden className={classnames(className, 'dnb-dl__item')} />
    </>
  )
}

export default Dl
