/**
 * HTML Element
 *
 */

import React, { useContext } from 'react'
import clsx from 'clsx'
import type { ElementProps } from '../Element'
import E from '../Element'
import Context from '../../shared/Context'
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
  const context = useContext(Context)

  return (
    <E
      as="ul"
      {...props}
      className={clsx(
        props.className,
        context?.theme?.surface === 'dark' && 'dnb-ul--surface-dark',
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
