/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from '../Element'

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
  return (
    <E
      as="ol"
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
Ol._supportsSpacingProps = true

export default Ol
