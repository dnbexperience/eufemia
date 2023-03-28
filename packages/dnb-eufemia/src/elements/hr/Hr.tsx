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
    light?: boolean
    medium?: boolean
    fullscreen?: boolean
  }

const Hr = ({
  fullscreen,
  light,
  medium,
  className,
  ...props
}: HrProps = {}) => {
  return (
    <E
      as="hr"
      className={classnames(
        className,
        light && 'dnb-hr--light',
        medium && 'dnb-hr--medium',
        fullscreen && 'dnb-hr--fullscreen'
      )}
      {...props}
    />
  )
}

export default Hr
