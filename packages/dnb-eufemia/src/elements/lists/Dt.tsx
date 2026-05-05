/**
 * HTML Element
 *
 */

import type { AllHTMLAttributes, Ref } from 'react'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'

export type DtProps = AllHTMLAttributes<HTMLDListElement>

function Dt({
  ref,
  ...props
}: DtProps & SpacingProps & { ref?: Ref<HTMLDListElement> }) {
  return <E as="dt" ref={ref} {...props} />
}

export default Dt
