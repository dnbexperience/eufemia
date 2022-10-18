/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from './Element'

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
  ElementProps

const Ul = ({ nested, inside, outside, ...p }: UlAllProps = {}) => {
  if (nested) {
    p.className = classnames(p.className, 'dnb-ul--nested')
  }
  if (inside) {
    p.className = classnames(p.className, 'dnb-ul--inside')
  }
  if (outside) {
    p.className = classnames(p.className, 'dnb-ul--outside')
  }

  return <E as="ul" {...p} skeleton={false} />
}

export default Ul
