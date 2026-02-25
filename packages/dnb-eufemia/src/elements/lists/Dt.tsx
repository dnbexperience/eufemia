/**
 * HTML Element
 *
 */

import React from 'react'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'

export type DtProps = React.AllHTMLAttributes<HTMLDListElement>

function Dt({
  ref,
  ...props
}: DtProps & SpacingProps & { ref?: React.Ref<HTMLDListElement> }) {
  return <E as="dt" innerRef={ref} {...props} />
}

export default Dt
