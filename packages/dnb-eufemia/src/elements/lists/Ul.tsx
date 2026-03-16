/**
 * HTML Element
 *
 */

import React from 'react'
import clsx from 'clsx'
import E, { type ElementProps } from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
      className={clsx(
        props.className,
        nested && 'dnb-ul--nested',
        inside && 'dnb-ul--inside',
        outside && 'dnb-ul--outside'
      )}
      skeleton={false}
    />
  )
}

withComponentMarkers(Ul, { _supportsSpacingProps: true })

export default Ul
