/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import type { ElementProps } from '../Element'
import E from '../Element'

export type UlProps = {
  /**
   * Defines the position of the marker
   */
  inside?: boolean

  /**
   * Defines the position of the marker (default)
   */
  outside?: boolean

  /**
   * Will ensure a nested structure of several lists
   */
  nested?: boolean
}

export type UlAllProps = UlProps &
  React.AllHTMLAttributes<HTMLUListElement> &
  Omit<ElementProps, 'skeleton' | 'skeletonMethod'>

const Ul = ({ nested, inside, outside, ...props }: UlAllProps = {}) => {
  return (
    <E
      as="ul"
      {...props}
      className={classnames(
        props.className,
        nested && 'dnb-ul--nested',
        inside && 'dnb-ul--inside',
        outside && 'dnb-ul--outside'
      )}
      skeleton={false}
    />
  )
}

Ul._supportsSpacingProps = true

export default Ul
