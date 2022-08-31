/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import { ISpacingProps } from '../shared/interfaces'
import E from './Element'

export type DlProps = {
  /**
   * Use "true" to horizontallly align both the term and the description
   */
  direction?: 'vertical' | 'horizontal'

  className?: string
  children: React.ReactNode
}

const Dl = ({
  direction,
  ...props
}: DlProps &
  ISpacingProps &
  Partial<Omit<HTMLDListElement, 'children'>>) => {
  if (direction) {
    props.className = classnames(
      props.className,
      `dnb-dl__direction--${direction}`
    )
  }
  return <E is="dl" {...props} skeleton={false} />
}

export type DlLineProps = {
  children: React.ReactNode
}

Dl.Line = ({ className, children }: DlLineProps & HTMLSpanElement) => {
  return (
    <span className={classnames(className, 'dnb-dl__line')}>
      {children}
    </span>
  )
}

export default Dl
