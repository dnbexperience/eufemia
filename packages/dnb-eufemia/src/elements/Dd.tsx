/**
 * HTML Element
 *
 */

import React from 'react'
import { ISpacingProps } from '../shared/interfaces'
import E from './Element'

export type DdProps = {
  className?: string
  children: React.ReactNode
}

const Dd = React.forwardRef((props: DdProps & ISpacingProps, ref) => (
  <E is="dd" inner_ref={ref} {...props} />
))

export default Dd
