/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../shared/types'
import E from './Element'

export type DtProps = React.AllHTMLAttributes<HTMLDListElement>

const Dt = React.forwardRef((props: DtProps & SpacingProps, ref) => (
  <E as="dt" innerRef={ref} {...props} />
))

export default Dt
