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

const Hr = ({ fullscreen, light, medium, ...props }: HrProps = {}) => {
  if (fullscreen) {
    props.className = classnames(props.className, 'dnb-hr--fullscreen')
  }
  if (light) {
    props.className = classnames(props.className, 'dnb-hr--light')
  }
  if (medium) {
    props.className = classnames(props.className, 'dnb-hr--medium')
  }

  return <E as="hr" {...props} />
}

export default Hr
