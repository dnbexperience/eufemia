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

export type OlProps = {
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

export type OlAllProps = OlProps &
  React.AllHTMLAttributes<HTMLOListElement> &
  Omit<ElementProps, 'skeleton' | 'skeletonMethod'>

const Ol = ({ nested, inside, outside, ...props }: OlAllProps = {}) => {
  const context = useContext(Context)

  return (
    <E
      as="ol"
      {...props}
      className={clsx(
        props.className,
        context?.theme?.surface === 'dark' && 'dnb-ol--surface-dark',
        nested && 'dnb-ol--nested',
        inside && 'dnb-ol--inside',
        outside && 'dnb-ol--outside'
      )}
      skeleton={false}
    />
  )
}

withComponentMarkers(Ol, { _supportsSpacingProps: true })

export default Ol
