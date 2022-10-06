/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../shared/types'
import E from './Element'

export type DtProps = {
  className?: string
  children: React.ReactNode
}

const Dt = React.forwardRef((props: DtProps & SpacingProps, ref) => (
  <E is="dt" inner_ref={ref} {...props} />
))

export default Dt
