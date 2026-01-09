/**
 * HTML Element
 *
 */

import React from 'react'
import type { SpacingProps } from '../../components/space/types'
import E from '../Element'
import classnames from 'classnames'

type HrProps = SpacingProps &
  React.HTMLAttributes<HTMLHRElement> & {
    /**
     * To make the hr full width.
     */
    breakout?: boolean

    /**
     * To make the hr dashed.
     */
    dashed?: boolean
  }

const Hr = ({ breakout, dashed, className, ...props }: HrProps = {}) => {
  return (
    <E
      as="hr"
      className={classnames(
        className,
        dashed && 'dnb-hr--dashed',
        breakout && 'dnb-hr--breakout'
      )}
      {...props}
    />
  )
}

Hr._supportsSpacingProps = true

export default Hr
