/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../../components/space/types'
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
  } & HrDeprecatedProps

type HrDeprecatedProps = {
  /**
   * Not official prop, but used to make the hr lighter.
   * @deprecated Will be removed in future version.
   */
  light?: boolean
}

const Hr = ({
  breakout,
  dashed,
  light,
  className,
  ...props
}: HrProps = {}) => {
  return (
    <E
      as="hr"
      className={classnames(
        className,
        light && 'dnb-hr--light',
        dashed && 'dnb-hr--dashed',
        breakout && 'dnb-hr--breakout'
      )}
      {...props}
    />
  )
}

Hr._supportsSpacingProps = true

export default Hr
