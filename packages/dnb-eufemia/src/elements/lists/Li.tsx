/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from '../Element'
import Ul from './Ul'
import Ol from './Ol'

export type LiAllProps = React.AllHTMLAttributes<HTMLLIElement> &
  ElementProps

const Li = ({ className, ...props }: LiAllProps = {}) => {
  /**
   * Check if we have a nested list,
   * then we set the class "is-nested" and give it a max-height,
   * if it is a skeleton
   */

  if (Array.isArray(props.children)) {
    props.children.forEach((Comp) => {
      if (Comp && (Comp.type === Ul || Comp.type === Ol)) {
        className = classnames(className, 'is-nested')
      }
    })
  }

  return <E as="li" {...props} className={className} />
}

export default Li
