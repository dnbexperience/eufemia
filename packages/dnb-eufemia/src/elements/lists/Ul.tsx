/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from '../Element'

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
        nested && 'dnb-ol--nested',
        inside && 'dnb-ol--inside',
        outside && 'dnb-ol--outside'
      )}
      skeleton={false}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Ul._supportsSpacingProps = true

export default Ul
