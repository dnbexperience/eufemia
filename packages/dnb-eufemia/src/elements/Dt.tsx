/**
 * HTML Element
 *
 */

import React from 'react'
import { ISpacingProps } from '../shared/interfaces'
import E from './Element'

export type DtProps = {
  className?: string
  children: React.ReactNode
}

const Dt = React.forwardRef((props: DtProps & ISpacingProps, ref) => (
  <E is="dt" inner_ref={ref} {...props} />
))

export default Dt
