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
  ElementProps

const Ol = ({ nested, inside, outside, ...p }: OlAllProps = {}) => {
  console.log({ ...p })
  return (
    <E
      as="ol"
      {...p}
      className={classnames(
        p.className,
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
