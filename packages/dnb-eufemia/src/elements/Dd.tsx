/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../shared/types'
import E from './Element'

export type DdProps = {
  className?: string
  children: React.ReactNode
}

const Dd = React.forwardRef((props: DdProps & SpacingProps, ref) => (
  <E is="dd" inner_ref={ref} {...props} />
))

export default Dd
