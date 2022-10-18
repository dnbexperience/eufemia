/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from './Element'

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
  if (nested) {
    p.className = classnames(p.className, 'dnb-ol--nested')
  }
  if (inside) {
    p.className = classnames(p.className, 'dnb-ol--inside')
  }
  if (outside) {
    p.className = classnames(p.className, 'dnb-ol--outside')
  }

  return <E as="ol" {...p} skeleton={false} />
}

export default Ol
