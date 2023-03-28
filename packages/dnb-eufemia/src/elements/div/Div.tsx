/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type DivProps = SpacingProps & React.HTMLAttributes<HTMLElement>

const Div = React.forwardRef((props: DivProps, ref) => (
  <E as="div" skeletonMethod="shape" innerRef={ref} {...props} />
))

export default Div
